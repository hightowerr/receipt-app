// src/services/storage.ts
import {rnStorage, rnFirestore} from "../config/firebase.config";
import {UploadMetadata, UploadProgress, StorageError} from "../types/firebase";

export class FirebaseStorageService {
  /**
   * Validate image file before upload
   */
  static validateImageFile(uri: string, fileSize: number): boolean {
    const maxSize = 10 * 1024 * 1024; // 10MB limit
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];

    // Check file size
    if (fileSize > maxSize) {
      throw new Error("File size exceeds 10MB limit");
    }

    // Basic file type check (more validation in upload)
    const extension = uri.toLowerCase().split(".").pop();
    const validExtensions = ["jpg", "jpeg", "png"];

    if (!extension || !validExtensions.includes(extension)) {
      throw new Error(
        "Invalid file type. Only JPEG and PNG images are supported"
      );
    }

    return true;
  }

  /**
   * Generate upload metadata for Cloud Function trigger
   */
  static generateUploadMetadata(
    userId: string,
    fileName: string,
    fileSize: number
  ): UploadMetadata {
    const docId = rnFirestore().collection("receipts").doc().id;

    return {
      docId,
      uid: userId,
      timestamp: Date.now(),
      fileName,
      fileSize,
    };
  }

  /**
   * Upload image to Firebase Storage with progress tracking
   */
  static async uploadImage(
    imageUri: string,
    metadata: UploadMetadata,
    onProgress: (progress: UploadProgress) => void
  ): Promise<string> {
    try {
      // Validate file first
      this.validateImageFile(imageUri, metadata.fileSize);

      // Create storage reference in receipts folder
      const fileName = `${metadata.uid}_${metadata.timestamp}_${metadata.fileName}`;
      const storageRef = rnStorage().ref(`receipts/${fileName}`);

      // Create Firestore document for tracking
      await rnFirestore().collection("receipts").doc(metadata.docId).set({
        uid: metadata.uid,
        status: "uploading",
        fileName: metadata.fileName,
        createdAt: rnFirestore.FieldValue.serverTimestamp(),
        updatedAt: rnFirestore.FieldValue.serverTimestamp(),
      });

      // Start upload with progress tracking
      const uploadTask = storageRef.putFile(imageUri, {
        customMetadata: {
          docId: metadata.docId,
          uid: metadata.uid,
        },
      });

      // Track upload progress
      uploadTask.on("state_changed", (snapshot) => {
        const progress: UploadProgress = {
          bytesTransferred: snapshot.bytesTransferred,
          totalBytes: snapshot.totalBytes,
          percentage: Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          ),
        };
        onProgress(progress);
      });

      // Wait for upload completion
      await uploadTask;

      // Get download URL
      const downloadURL = await storageRef.getDownloadURL();

      // Update Firestore document
      await rnFirestore().collection("receipts").doc(metadata.docId).update({
        status: "uploaded",
        downloadURL,
        updatedAt: rnFirestore.FieldValue.serverTimestamp(),
      });

      return downloadURL;
    } catch (error: any) {
      // Update Firestore with error
      await rnFirestore().collection("receipts").doc(metadata.docId).update({
        status: "error",
        errorMessage: error.message,
        updatedAt: rnFirestore.FieldValue.serverTimestamp(),
      });

      throw {
        code: error.code || "storage/unknown",
        message: error.message || "Upload failed",
      } as StorageError;
    }
  }

  /**
   * Listen to processing status changes
   */
  static onProcessingStatusChanged(
    docId: string,
    callback: (status: any) => void
  ): () => void {
    return rnFirestore()
      .collection("receipts")
      .doc(docId)
      .onSnapshot((doc) => {
        if (doc.exists()) {
          callback(doc.data());
        }
      });
  }
}
