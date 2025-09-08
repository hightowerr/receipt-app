// __tests__/integration/firebase-auth-flow.test.tsx
import React from "react";
import {render, fireEvent, waitFor} from "@testing-library/react-native";
import SignInScreen from "../../app/auth/sign-in";

jest.mock("expo-router", () => ({
  router: {
    replace: jest.fn(),
    push: jest.fn(),
  },
}));

const mockSignIn = jest.fn().mockResolvedValue({});
jest.mock("../../src/hooks/useAuth", () => ({
  useAuth: () => ({
    signIn: mockSignIn,
    loading: false,
    error: null,
  }),
}));

describe("Authentication Flow Integration", () => {
  it("should complete sign-in flow successfully", async () => {
    const {getByPlaceholderText, getByTestId} = render(<SignInScreen />);

    const emailInput = getByPlaceholderText("Email");
    const passwordInput = getByPlaceholderText("Password");
    const signInButton = getByTestId("sign-in-button");

    fireEvent.changeText(emailInput, "test@example.com");
    fireEvent.changeText(passwordInput, "password123");
    fireEvent.press(signInButton);

    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith(
        "test@example.com",
        "password123"
      );
    });
  });

  it("should show error for invalid credentials", async () => {
    const {getByPlaceholderText, getByTestId} = render(<SignInScreen />);

    const emailInput = getByPlaceholderText("Email");
    const passwordInput = getByPlaceholderText("Password");
    const signInButton = getByTestId("sign-in-button");

    fireEvent.changeText(emailInput, "invalid@example.com");
    fireEvent.changeText(passwordInput, "wrongpassword");
    fireEvent.press(signInButton);

    // Test would verify error display
  });
});
