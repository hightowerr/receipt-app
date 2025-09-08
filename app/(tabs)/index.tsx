// app/(tabs)/index.tsx
import React, {useState} from "react";
import {StyleSheet, Alert} from "react-native";
import * as ImagePicker from "expo-image-picker";
import {ThemedText} from "../../components/ThemedText";
import {ThemedView} from "../../components/ThemedView";
import {Button} from "../../components/Button";
import {useAuth} from "../../src/hooks/useAuth";
import {FirebaseStorageService} from "../../src/services/storage";
import {UploadProgress} from "../../src/types/firebase";
import {PositioningGuide} from "../../components/PositioningGuide";

export default function CameraScreen() {
  const {user} = useAuth();
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<UploadProgress | null>(
    null
  );

  const requestPermissions = async () => {
    const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
    const mediaLibraryPermission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (
      cameraPermission.status !== "granted" ||
      mediaLibraryPermission.status !== "granted"
    ) {
      Alert.alert(
        "Permissions Required",
        "Camera and photo library permissions are required to upload receipts.",
        [{text: "OK"}]
      );
      return false;
    }

    return true;
  };

  const captureImage = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      await uploadImage(result.assets[0]);
    }
  };

  const selectFromGallery = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      await uploadImage(result.assets[0]);
    }
  };

  const uploadImage = async (asset: ImagePicker.ImagePickerAsset) => {
    if (!user) {
      Alert.alert("Error", "You must be signed in to upload images");
      return;
    }

    try {
      setUploading(true);
      setUploadProgress({bytesTransferred: 0, totalBytes: 0, percentage: 0});

      const metadata = FirebaseStorageService.generateUploadMetadata(
        user.uid,
        asset.fileName || "receipt.jpg",
        asset.fileSize || 0
      );

      const downloadURL = await FirebaseStorageService.uploadImage(
        asset.uri,
        metadata,
        (progress) => setUploadProgress(progress)
      );

      Alert.alert(
        "Success",
        "Receipt uploaded successfully! OCR processing started."
      );

      // Listen for processing status updates
      const unsubscribe = FirebaseStorageService.onProcessingStatusChanged(
        metadata.docId,
        (status) => {
          console.log("Processing status:", status);
          if (status.status === "done") {
            Alert.alert(
              "Processing Complete",
              "Your receipt has been processed!"
            );
            unsubscribe();
          }
        }
      );
    } catch (error: any) {
      Alert.alert("Upload Error", error.message);
    } finally {
      setUploading(false);
      setUploadProgress(null);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Camera</ThemedText>
      <ThemedText>Scan your receipts here</ThemedText>

      {uploadProgress && (
        <ThemedView style={styles.progressContainer}>
          <ThemedText>Uploading: {uploadProgress.percentage}%</ThemedText>
        </ThemedView>
      )}

      <Button
        title={uploading ? "Uploading..." : "Take Photo"}
        onPress={captureImage}
        disabled={uploading}
        style={styles.button}
      />

      <Button
        title="Select from Gallery"
        onPress={selectFromGallery}
        disabled={uploading}
        style={styles.button}
      />
      <PositioningGuide />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  progressContainer: {
    marginVertical: 20,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
  },
  button: {
    marginVertical: 10,
    width: "80%",
  },
});
