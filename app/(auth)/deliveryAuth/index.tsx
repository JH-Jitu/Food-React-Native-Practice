import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import LoginScreen from "../LoginScreen";
import { StatusBar } from "expo-status-bar";

const DeliveryLoginScreen: React.FC = () => {
  const handleDeliveryLogin = (username: string, password: string) => {
    // Implement Delivery login logic here
    console.log("Delivery Username:", username);
    console.log("Delivery Password:", password);
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
