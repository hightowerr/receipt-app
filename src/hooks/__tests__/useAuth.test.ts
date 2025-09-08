// src/hooks/__tests__/useAuth.test.ts
import {renderHook, act} from "@testing-library/react-native";
import {useAuth} from "../useAuth";
import {FirebaseAuthService} from "../../services/auth";

jest.mock("../../services/auth");

describe("useAuth", () => {
  const mockFirebaseAuthService = FirebaseAuthService as jest.Mocked<
    typeof FirebaseAuthService
  >;

  beforeEach(() => {
    jest.clearAllMocks();
    mockFirebaseAuthService.onAuthStateChanged.mockReturnValue(() => {});
  });

  it("should initialize with loading state", () => {
    const {result} = renderHook(() => useAuth());

    expect(result.current.loading).toBe(true);
    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
  });

  it("should sign up user successfully", async () => {
    const mockUser = {
      uid: "123",
      email: "test@example.com",
      displayName: null,
      emailVerified: false,
    };
    mockFirebaseAuthService.signUp.mockResolvedValueOnce(mockUser);

    const {result} = renderHook(() => useAuth());

    await act(async () => {
      await result.current.signUp("test@example.com", "password123");
    });

    expect(result.current.user).toEqual(mockUser);
    expect(result.current.error).toBeNull();
  });

  it("should handle sign up error", async () => {
    mockFirebaseAuthService.signUp.mockRejectedValueOnce({
      message: "Email already exists",
    });

    const {result} = renderHook(() => useAuth());

    await act(async () => {
      await result.current.signUp("existing@example.com", "password123");
    });

    expect(result.current.error).toBe("Email already exists");
    expect(result.current.user).toBeNull();
  });
});
