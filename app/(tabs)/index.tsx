import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  Pressable,
  Alert,
  RefreshControl,
} from "react-native";

const TabOneScreen: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [selectedOrderId, setSelectedOrderId] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, [orders]);

  const fetchOrders = async () => {
    try {
      const response = await fetch(
        "https://digitalrangersbd.com/app/ladidh/loadAllOrders.php"
      );
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleStatusSelect = (orderId: string) => {
    setSelectedOrderId(orderId);
  };

  useEffect(() => {
    if (selectedOrderId && selectedStatus) {
      const handleStatusChange = async () => {
        try {
          const response = await fetch(
            `https://www.digitalrangersbd.com/app/ladidh/orderControl.php?i=${selectedOrderId}&s=${selectedStatus}`,
            { method: "GET" }
          );
          // const data = await response.json();
          Alert.alert("Status updated successfully:");
          // Update the status in the local state
          setOrders((prevOrders) =>
            prevOrders.map((order) =>
              order.id === selectedOrderId
                ? { ...order, status: selectedStatus }
                : order
            )
          );
          // Reset selected values
          setSelectedOrderId("");
          setSelectedStatus("");
        } catch (error) {
          console.error("Error updating status:", error);
        }
      };
      handleStatusChange();
    }
  }, [selectedOrderId, selectedStatus]);

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing} // State variable for refresh animation
          onRefresh={() => {
            // Your data fetching or refreshing logic here
            setRefreshing(true); // Set refreshing to true while fetching
            // ... (fetch data)
            fetchOrders();
            // .....
            setRefreshing(false); // Set refreshing to false after fetching
          }}
        />
      }
    >
      {orders.map((order) => (
        <View key={order.id} style={styles.orderContainer}>
          <View style={styles.orderDetails}>
            <View style={styles.detailRow}>
              <Text style={styles.detailTitle}>Name:</Text>
              <Text style={styles.value}>{order.name}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailTitle}>Mobile:</Text>
              <Text style={styles.value}>{order.mobile}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailTitle}>Location:</Text>
              <Text style={styles.value}>{order.location}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailTitle}>Items:</Text>
              <Text style={styles.value}>{order.items}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailTitle}>Bill:</Text>
              <Text style={styles.value}>{order.bill}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailTitle}>Delivery:</Text>
              <Text style={styles.value}>{order.delivery}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailTitle}>Status:</Text>
              <Text style={styles.value}>{order.status}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailTitle}>Date:</Text>
              <Text style={styles.value}>{order.date}</Text>
            </View>
          </View>
          <View style={styles.statusContainer}>
            <TouchableOpacity
              style={[
                styles.statusButton,
                {
                  backgroundColor:
                    order.status === "Pending"
                      ? "#d40303"
                      : order.status === "Order Received"
                      ? "#b10909"
                      : order.status === "On the Way"
                      ? "#810505"
                      : "#3b0303",
                },
              ]}
              onPress={() => handleStatusSelect(order.id)}
            >
              <Text style={{ color: "white" }}>{order.status}</Text>
            </TouchableOpacity>
            {/* Add buttons for other status options here */}
          </View>
        </View>
      ))}
      {/* Modal for selecting status */}
      <Modal
        visible={!!selectedOrderId}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setSelectedOrderId("")}
        style={{ width: "100%" }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Pressable
              style={styles.modalOption}
              onPress={() => setSelectedStatus("Pending")}
            >
              <Text>Pending</Text>
            </Pressable>
            <Pressable
              style={styles.modalOption}
              onPress={() => setSelectedStatus("Order Received")}
            >
              <Text>Order Received</Text>
            </Pressable>
            <Pressable
              style={styles.modalOption}
              onPress={() => setSelectedStatus("On the Way")}
            >
              <Text>On the Way</Text>
            </Pressable>
            <Pressable
              style={styles.modalOption}
              onPress={() => setSelectedStatus("Delivered")}
            >
              <Text>Delivered</Text>
            </Pressable>
            <Pressable
              style={styles.modalCloseButton}
              onPress={() => setSelectedOrderId("")}
            >
              <Text>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      {/* End of Modal */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f7d7bc",
  },
  orderContainer: {
    marginBottom: 20,
    borderWidth: 3,
    borderColor: "#e67b7b",
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#f8c191",
    shadowColor: "#ccc",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 20,
  },
  orderDetails: {
    flex: 1,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: "#ccbebe",
    width: "100%",
  },
  detailTitle: {
    marginRight: 5,
    fontWeight: "bold",
    width: "20%",
    fontSize: 15,
  },
  value: {
    flexWrap: "wrap",
    width: "80%",
    fontSize: 15,
  },
  statusContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  statusButton: {
    marginRight: 10,
    padding: 5,
    backgroundColor: "#eee",
    borderRadius: 5,
    width: 150,
    alignItems: "center",
  },
  activeStatus: {
    backgroundColor: "lightblue",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    // alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalOption: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  modalCloseButton: {
    paddingVertical: 10,
    alignItems: "center",
  },
});

export default TabOneScreen;
