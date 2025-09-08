// __tests__/e2e/receipt-upload-flow.test.tsx
import React from "react";
import {render, fireEvent, waitFor} from "@testing-library/react-native";
import * as ImagePicker from "expo-image-picker";
import {PermissionStatus} from "expo-image-picker";
import CameraScreen from "../../app/(tabs)/index";

jest.mock("expo-image-picker");
jest.mock("../../src/hooks/useAuth", () => {
  const originalModule = jest.requireActual("../../src/hooks/useAuth");
  return {
    __esModule: true,
    ...originalModule,
    useAuth: () => ({
      user: {
        uid: "test-user",
        email: "test@example.com",
        displayName: null,
        emailVerified: false,
      },
      loading: false,
      isAuthenticated: true,
    }),
  };
});
jest.mock("../../src/services/storage");

describe("Receipt Upload E2E Flow", () => {
  const mockUser = {
    uid: "test-user",
    email: "test@example.com",
    displayName: null,
    emailVerified: false,
  };

  it("should complete camera capture and upload flow", async () => {
    const mockImagePicker = ImagePicker as jest.Mocked<typeof ImagePicker>;
    mockImagePicker.requestCameraPermissionsAsync.mockResolvedValue({
      status: PermissionStatus.GRANTED,
      expires: "never",
      granted: true,
      canAskAgain: true,
    });
    mockImagePicker.requestMediaLibraryPermissionsAsync.mockResolvedValue({
      status: PermissionStatus.GRANTED,
      expires: "never",
      granted: true,
      canAskAgain: true,
    });
    mockImagePicker.launchCameraAsync.mockResolvedValue({
      canceled: false,
      assets: [
        {
          uri: "file://test-image.jpg",
          fileName: "receipt.jpg",
          fileSize: 1024,
          width: 100,
          height: 100,
        },
      ],
    });

    const {getByText} = render(<CameraScreen />);
    const takePhotoButton = getByText("Take Photo");

    fireEvent.press(takePhotoButton);

    await waitFor(() => {
      const {FirebaseStorageService} = require("../../src/services/storage");
      expect(FirebaseStorageService.uploadImage).toHaveBeenCalled();
    });
  });

  it("should handle permission denial gracefully", async () => {
    const mockImagePicker = ImagePicker as jest.Mocked<typeof ImagePicker>;
    mockImagePicker.requestCameraPermissionsAsync.mockResolvedValue({
      status: PermissionStatus.DENIED,
      expires: "never",
      granted: false,
      canAskAgain: true,
    });

    const {getByText} = render(<CameraScreen />);
    const takePhotoButton = getByText("Take Photo");

    fireEvent.press(takePhotoButton);

    // Test should verify permission error alert
  });
});
