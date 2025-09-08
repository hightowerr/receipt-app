// app/auth/sign-in.tsx
import React, {useState} from "react";
import {StyleSheet, TextInput, Alert} from "react-native";
import {ThemedText} from "../../components/ThemedText";
import {ThemedView} from "../../components/ThemedView";
import {Button} from "../../components/Button";
import {useAuth} from "../../src/hooks/useAuth";
import {router} from "expo-router";

export default function SignInScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {signIn, loading, error} = useAuth();

  const handleSignIn = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Error", "Please enter both email and password");
      return;
    }

    await signIn(email, password);

    if (!error) {
      router.replace("/(tabs)");
    }
  };

  const goToSignUp = () => {
    router.push("/auth/sign-up");
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Sign In
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

      {error && <ThemedText style={styles.error}>{error}</ThemedText>}

      <Button
        title={loading ? "Signing In..." : "Sign In"}
        onPress={handleSignIn}
        disabled={loading}
        testID="sign-in-button"
      />

      <Button
        title="Create Account"
        onPress={goToSignUp}
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
