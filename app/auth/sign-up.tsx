// app/auth/sign-up.tsx
import React, {useState} from "react";
import {StyleSheet, TextInput, Alert} from "react-native";
import {ThemedText} from "../../components/ThemedText";
import {ThemedView} from "../../components/ThemedView";
import {Button} from "../../components/Button";
import {useAuth} from "../../src/hooks/useAuth";
import {router} from "expo-router";

export default function SignUpScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const {signUp, loading, error} = useAuth();

  const validateForm = () => {
    if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
      Alert.alert("Error", "Please fill in all fields");
      return false;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return false;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters");
      return false;
    }

    return true;
  };

  const handleSignUp = async () => {
    if (!validateForm()) return;

    await signUp(email, password);

    if (!error) {
      router.replace("/(tabs)");
    }
  };

  const goToSignIn = () => {
    router.push("/auth/sign-in");
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Create Account
      </ThemedText>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoComplete="password"
      />

      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      {error && <ThemedText style={styles.error}>{error}</ThemedText>}

      <Button
        title={loading ? "Creating Account..." : "Create Account"}
        onPress={handleSignUp}
        disabled={loading}
      />

      <Button
        title="Already have an account? Sign In"
        onPress={goToSignIn}
        style={styles.secondaryButton}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    textAlign: "center",
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  error: {
    color: "red",
    textAlign: "center",
    marginBottom: 15,
  },
  secondaryButton: {
    marginTop: 15,
    backgroundColor: "transparent",
  },
});
