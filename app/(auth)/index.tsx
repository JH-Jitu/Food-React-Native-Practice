import { Pressable, StyleSheet, View } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text } from "@/components/Themed";
import { FontAwesome } from "@expo/vector-icons";
import { Link } from "expo-router";

export default function Auth() {
  return (
    <View style={{ flex: 1, backgroundColor: "#f7801a" }}>
      <View style={styles.container}>
        <View style={styles.content}>
          <View>
            {/* <FontAwesome name="lock" size={50} color="#2c3e50" /> */}
            <View style={styles.buttonsContainer}>
              <Link href="/adminAuth/" asChild>
                <Pressable
                  style={{
                    backgroundColor: "#c26513",
                    ...styles.button,
                  }}
                >
                  <Text style={styles.buttonText}>Login As a Admin</Text>
                  <FontAwesome
                    style={styles.icons}
                    name="user"
                    size={20}
                    color="white"
                  />
                </Pressable>
              </Link>
              <Link href="/deliveryAuth/" asChild>
                <Pressable
                  style={{
                    backgroundColor: "#f7801a",
                    ...styles.button,
                  }}
                >
                  <Text style={styles.buttonText}>Login As a Delivery Man</Text>
                  <FontAwesome
                    style={styles.icons}
                    name="truck"
                    size={20}
                    color="white"
                  />
                </Pressable>
              </Link>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "#f7d7bc",
  },
  content: {
    // flexDirection: "row",
    alignItems: "center",
  },
  buttonsContainer: {
    marginTop: 30,
    flexDirection: "column",
    marginBottom: 20,
    // justifyContent: "center",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    width: 400,
    borderRadius: 20,
    marginBottom: 20,
    paddingVertical: 10,
    // height: 100,
    // borderRadius: 50,
    position: "relative",
  },
  buttonText: {
    fontSize: 18,
  },
  icons: {
    position: "absolute",
    left: 20,
  },
});
