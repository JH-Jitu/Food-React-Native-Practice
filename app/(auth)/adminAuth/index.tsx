import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import LoginScreen from "../LoginScreen";
import { StatusBar } from "expo-status-bar";
import { useLoginMutation } from "@/Context/auth/authAPI";

const AdminLoginScreen: React.FC = () => {
  const [login, { isLoading, isError, error }] = useLoginMutation();
  const handleAdminLogin = (email: string, password: string) => {
    // Implement admin login logic here
    console.log("Admin Email:", email);
    console.log("Admin Password:", password);
    login({ email, password });
  };

  return (
    <View style={styles.container}>
      <LoginScreen
        title="Admin Login"
        onSubmit={handleAdminLogin}
        submitButtonText="Login as Admin"
      />
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} animated />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    // backgroundColor: "#ffffff",
  },
});

export default AdminLoginScreen;
