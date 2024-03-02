import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import LoginScreen from "../LoginScreen";
import { StatusBar } from "expo-status-bar";
import { useLoginMutation } from "@/Context/auth/authAPI";

const DeliveryLoginScreen: React.FC = () => {
  const [login, { isLoading, isError, error }] = useLoginMutation();
  const handleDeliveryLogin = (email: string, password: string) => {
    // Implement Delivery login logic here
    console.log("Delivery email:", email);
    console.log("Delivery Password:", password);
    login({ email, password });
  };

  return (
    <View style={styles.container}>
      <LoginScreen
        title="Delivery Login"
        onSubmit={handleDeliveryLogin}
        submitButtonText="Login as Delivery"
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

export default DeliveryLoginScreen;
