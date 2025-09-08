// src/services/__tests__/storage.test.ts
import {FirebaseStorageService} from "../storage";

jest.mock("@react-native-firebase/storage");
jest.mock("@react-native-firebase/firestore");

describe("FirebaseStorageService", () => {
  describe("validateImageFile", () => {
    it("should validate correct image files", () => {
      expect(() =>
        FirebaseStorageService.validateImageFile("test.jpg", 5 * 1024 * 1024)
      ).not.toThrow();
    });

    it("should reject files larger than 10MB", () => {
      expect(() =>
        FirebaseStorageService.validateImageFile("test.jpg", 15 * 1024 * 1024)
      ).toThrow("File size exceeds 10MB limit");
    });

    it("should reject non-image files", () => {
      expect(() =>
        FirebaseStorageService.validateImageFile("document.pdf", 1024)
      ).toThrow("Invalid file type. Only JPEG and PNG images are supported");
    });
  });

  describe("generateUploadMetadata", () => {
    it("should generate valid metadata", () => {
      const metadata = FirebaseStorageService.generateUploadMetadata(
        "user123",
        "receipt.jpg",
        1024
      );

      expect(metadata).toMatchObject({
        uid: "user123",
        fileName: "receipt.jpg",
        fileSize: 1024,
      });
      expect(metadata.docId).toBeDefined();
      expect(metadata.timestamp).toBeGreaterThan(0);
    });
  });
});
