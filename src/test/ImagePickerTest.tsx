import React, {useEffect, useState} from "react";
import {View, Text, Button} from "react-native";
import * as ImagePicker from "expo-image-picker";

export const ImagePickerTest = () => {
  const [status, setStatus] = useState("Testing...");

  useEffect(() => {
    (async () => {
      const cameraPermission =
        await ImagePicker.requestCameraPermissionsAsync();
      const mediaLibraryPermission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (
        cameraPermission.status !== "granted" ||
        mediaLibraryPermission.status !== "granted"
      ) {
        setStatus("❌ Permissions not granted");
      } else {
        setStatus("✅ Permissions granted");
      }
    })();
  }, []);

  return (
    <View style={{padding: 20}}>
      <Text>{status}</Text>
    </View>
  );
};
