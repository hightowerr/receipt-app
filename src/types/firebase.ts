// src/types/firebase.ts
export interface FirebaseUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  emailVerified: boolean;
}

export interface UploadMetadata {
  docId: string;
  uid: string;
  timestamp: number;
  fileName: string;
  fileSize: number;
}

export interface UploadProgress {
  bytesTransferred: number;
  totalBytes: number;
  percentage: number;
}

export interface ProcessingStatus {
  id: string;
  status: "uploading" | "processing" | "done" | "error";
  textRaw?: string;
  errorMessage?: string;
  createdAt: any; // Firestore Timestamp
  updatedAt: any; // Firestore Timestamp
}

export interface AuthError {
  code: string;
  message: string;
}

export interface StorageError {
  code: string;
  message: string;
}
