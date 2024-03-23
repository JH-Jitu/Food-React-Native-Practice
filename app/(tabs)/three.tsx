import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  FlatList,
} from "react-native";

const DeliveryManForm = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [location, setLocation] = useState("");

  const handleCreateDeliveryMan = () => {
    // Input validation
    if (!name || !password || !mobile || !location) {
      console.error("Please fill in all the fields.");
      return;
    }

    // API endpoint
    const apiUrl = "https://digitalrangersbd.com/app/ladidh/adminLogin.php";

    // Constructing the request body
    const requestBody = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        n: name,
        p: password,
        mobile: mobile,
        location: location,
      }),
    };

    // Making the API call
    fetch(apiUrl, requestBody)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to create delivery man.");
        }
        return response.json();
      })
      .then((data) => {
        Alert?.alert("Delivery man created successfully");
        // You can perform further actions here, such as showing a success message
      })
      .catch((error) => {
        Alert?.alert("Error creating delivery man");
        // You can handle the error, such as displaying an error message to the user
      });
  };

  const renderDeliveryManItem = ({ item }: any) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.n}</Text>
      <Text style={styles.cell}>{item.p}</Text>
      <Text style={styles.cell}>{item.mobile}</Text>
      <Text style={styles.cell}>{item.location}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Create Delivery Man</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        onChangeText={setName}
        value={name}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Mobile"
        onChangeText={setMobile}
        value={mobile}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Location"
        onChangeText={setLocation}
        value={location}
      />
      <TouchableOpacity style={styles.button} onPress={handleCreateDeliveryMan}>
        <Text style={styles.buttonText}>Create Delivery Man</Text>
      </TouchableOpacity>

      <View style={{ marginTop: 20, flex: 1 }}>
        <Text
          style={{
            textAlign: "center",
            marginBottom: 10,
            fontSize: 16,
            backgroundColor: "#fff",
            borderRadius: 5,
            paddingVertical: 5,
            fontWeight: "bold",
          }}
        >
          List of Delivery Man
        </Text>
        <FlatList
          data={deliveryMenList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderDeliveryManItem}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    padding: 20,
    backgroundColor: "#f7d7bc",
    position: "relative",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    shadowColor: "#ccc",
  },
  button: {
    backgroundColor: "#c27b41",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    position: "relative",
    bottom: 0,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 10,
  },
  cell: {
    flex: 1,
    textAlign: "center",
  },
});

export default DeliveryManForm;

const deliveryMenList = [
  {
    n: "John Doe",
    p: "password123",
    mobile: "1234567890",
    location: "123 Main St",
  },
  {
    n: "Alice Smith",
    p: "abc123",
    mobile: "9876543210",
    location: "456 Elm St",
  },
  {
    n: "Bob Johnson",
    p: "password456",
    mobile: "5551234567",
    location: "789 Oak St",
  },
  {
    n: "Emily Davis",
    p: "pass123",
    mobile: "9998887777",
    location: "321 Pine St",
  },
  {
    n: "Michael Brown",
    p: "password789",
    mobile: "7776665555",
    location: "654 Maple St",
  },
  {
    n: "Emma Wilson",
    p: "pass987",
    mobile: "4443332222",
    location: "987 Cedar St",
  },
  {
    n: "Sophia Jones",
    p: "password321",
    mobile: "1112223333",
    location: "456 Birch St",
  },
  {
    n: "William Taylor",
    p: "pass321",
    mobile: "2223334444",
    location: "123 Walnut St",
  },
  {
    n: "Olivia Martinez",
    p: "abc456",
    mobile: "3334445555",
    location: "789 Cherry St",
  },
  {
    n: "James Anderson",
    p: "abc789",
    mobile: "8889990000",
    location: "654 Orange St",
  },
  {
    n: "Isabella Lopez",
    p: "pass456",
    mobile: "7778889999",
    location: "321 Lemon St",
  },
  {
    n: "David Garcia",
    p: "pass789",
    mobile: "5556667777",
    location: "987 Grape St",
  },
  {
    n: "Sophie Wilson",
    p: "abc321",
    mobile: "1112223333",
    location: "456 Pear St",
  },
  {
    n: "Alexander Thomas",
    p: "passwordabc",
    mobile: "2223334444",
    location: "123 Peach St",
  },
  {
    n: "Ella White",
    p: "passabc",
    mobile: "3334445555",
    location: "789 Plum St",
  },
  {
    n: "Mia Hall",
    p: "passwordxyz",
    mobile: "8889990000",
    location: "654 Apple St",
  },
  {
    n: "Lucas Moore",
    p: "passxyz",
    mobile: "7778889999",
    location: "321 Banana St",
  },
  {
    n: "Ava Scott",
    p: "abcxyz",
    mobile: "5556667777",
    location: "987 Grapefruit St",
  },
  {
    n: "Liam Mitchell",
    p: "password123",
    mobile: "1234567890",
    location: "123 Pear St",
  },
  {
    n: "Harper Lee",
    p: "abc123",
    mobile: "9876543210",
    location: "456 Peach St",
  },
];
