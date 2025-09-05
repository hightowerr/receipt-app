import {FirebaseStorageService} from "../storage";
import {UploadMetadata} from "../../types/firebase";

// Define mocks for the inner Firebase functions
const mockPutFile = jest.fn();
const mockGetDownloadURL = jest
  .fn()
  .mockResolvedValue("http://download-url.com");
const mockRef = jest.fn(() => ({
  putFile: mockPutFile,
  getDownloadURL: mockGetDownloadURL,
}));

const mockSet = jest.fn();
const mockUpdate = jest.fn();
const mockOnSnapshot = jest.fn();
const mockDoc = jest.fn(() => ({
  set: mockSet,
  update: mockUpdate,
  onSnapshot: mockOnSnapshot,
  id: "test-doc-id",
}));
const mockCollection = jest.fn(() => ({
  doc: mockDoc,
}));

// Mock the entire firebase.config module
jest.mock("../../config/firebase.config", () => {
  // Create a mock function for rnFirestore
  const firestoreMock = jest.fn(() => ({
    collection: mockCollection,
  }));

  // Attach the static FieldValue property to the mock function
  (firestoreMock as any).FieldValue = {
    serverTimestamp: jest.fn(() => "MOCK_TIMESTAMP"),
  };

  return {
    rnStorage: jest.fn(() => ({
      ref: mockRef,
    })),
    rnFirestore: firestoreMock,
  };
});

describe("FirebaseStorageService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("validateImageFile", () => {
    it("should return true for valid image files", () => {
      expect(
        FirebaseStorageService.validateImageFile("test.jpg", 5 * 1024 * 1024)
      ).toBe(true);
    });

    it("should throw an error for oversized files", () => {
      expect(() =>
        FirebaseStorageService.validateImageFile("test.jpg", 11 * 1024 * 1024)
      ).toThrow("File size exceeds 10MB limit");
    });

    it("should throw an error for invalid file types", () => {
      expect(() =>
        FirebaseStorageService.validateImageFile("test.gif", 5 * 1024 * 1024)
      ).toThrow("Invalid file type. Only JPEG and PNG images are supported");
    });
  });

  describe("generateUploadMetadata", () => {
    it("should generate correct metadata", () => {
      const metadata = FirebaseStorageService.generateUploadMetadata(
        "user-123",
        "receipt.jpg",
        12345
      );
      expect(metadata.uid).toBe("user-123");
      expect(metadata.fileName).toBe("receipt.jpg");
      expect(metadata.fileSize).toBe(12345);
      expect(metadata.docId).toBe("test-doc-id");
    });
  });

  describe("uploadImage", () => {
    const metadata: UploadMetadata = {
      docId: "test-doc-id",
      uid: "user-123",
      timestamp: Date.now(),
      fileName: "receipt.jpg",
      fileSize: 12345,
    };

    it("should upload an image and update Firestore correctly", async () => {
      const onProgress = jest.fn();
      const uploadTask = {
        on: jest.fn((event, callback) => {
          if (event === "state_changed") {
            callback({bytesTransferred: 12345, totalBytes: 12345});
          }
        }),
        then: jest.fn((resolve) => resolve(true)),
      };
      mockPutFile.mockReturnValue(uploadTask);

      const downloadURL = await FirebaseStorageService.uploadImage(
        "test.jpg",
        metadata,
        onProgress
      );

      expect(mockSet).toHaveBeenCalledWith(
        expect.objectContaining({status: "uploading"})
      );
      expect(onProgress).toHaveBeenCalledWith(
        expect.objectContaining({percentage: 100})
      );
      expect(mockUpdate).toHaveBeenCalledWith(
        expect.objectContaining({status: "uploaded"})
      );
      expect(downloadURL).toBe("http://download-url.com");
    });

    it("should handle upload errors and update Firestore", async () => {
      const onProgress = jest.fn();
      const error = new Error("Upload failed");
      const uploadTask = {
        on: jest.fn(),
        then: jest.fn((resolve, reject) => reject(error)),
      };
      mockPutFile.mockReturnValue(uploadTask);

      await expect(
        FirebaseStorageService.uploadImage("test.jpg", metadata, onProgress)
      ).rejects.toEqual({
        code: "storage/unknown",
        message: "Upload failed",
      });
      expect(mockUpdate).toHaveBeenCalledWith(
        expect.objectContaining({
          status: "error",
          errorMessage: "Upload failed",
        })
      );
    });
  });
});
