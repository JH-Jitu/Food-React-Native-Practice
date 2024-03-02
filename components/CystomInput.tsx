import { FontAwesome } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  TextInput,
  StyleSheet,
  TextInputProps,
  Text,
  View,
} from "react-native";

interface CustomInputProps extends TextInputProps {
  placeholder: string;
  type?: string;
}

const CustomInput: React.FC<CustomInputProps> = ({
  placeholder,
  type,
  ...rest
}) => {
  const [showPass, setShowPass] = useState<boolean>(false);
  return (
    <View style={{ position: "relative" }}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#7f8c8d"
        secureTextEntry={type === "password" && !showPass ? true : false}
        {...rest}
      />
      {type === "password" && (
        <>
          <FontAwesome
            name={showPass ? "eye-slash" : "eye"}
            size={20}
            onPress={() => setShowPass((prevState) => !prevState)}
            style={{ position: "absolute", end: 20, top: 18 }}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: "100%",
    paddingHorizontal: 15,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#bdc3c7",
    borderRadius: 10,
    fontSize: 16,
    color: "#34495e",
    backgroundColor: "#ecf0f1",
  },
});

export default CustomInput;
