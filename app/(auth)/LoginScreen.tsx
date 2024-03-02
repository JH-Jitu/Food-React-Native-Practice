import CustomInput from "@/components/CystomInput";
import React, { useState } from "react";
import { View, StyleSheet, Pressable, Text } from "react-native";

interface LoginScreenProps {
  title: string;
  onSubmit: (username: string, password: string) => void;
  submitButtonText: string;
}

const LoginScreen: React.FC<LoginScreenProps> = ({
  title,
  onSubmit,
  submitButtonText,
}) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = () => {
    onSubmit(username, password);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View
        style={{
          width: "80%",
        }}
      >
        <CustomInput
          placeholder="Email"
          value={username}
          onChangeText={setUsername}
        />
        <CustomInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          type="password"
        />
      </View>
      <Pressable style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>{submitButtonText}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f7d7bc",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: "#3498db",
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default LoginScreen;
