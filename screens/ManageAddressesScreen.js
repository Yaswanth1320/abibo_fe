import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons"; // Import both
import { useNavigation } from "@react-navigation/native";

const ManageAddressesScreen = () => {
  const navigation = useNavigation();

  const handleAddNewAddress = () => {
    navigation.navigate("AddNewAddress");
  };

  const addresses = [
    {
      id: "1",
      type: "Home",
      name: "Naveen",
      details: "87-2-47, Lakshmi Nagar Main Road, Chennai, Tamil Nadu - 600083",
      phone: "+91 8976543322",
    },
    {
      id: "2",
      type: "Office",
      name: "Kamal",
      details: "87-2-47, Lakshmi Nagar Main Road, Chennai, Tamil Nadu - 600083",
      phone: "+91 8976543322",
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={styles.safeArea.backgroundColor}
      />
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Manage Addresses</Text>
        <View style={{ width: 34 }} />
      </View>

      <TouchableOpacity style={styles.addButton} onPress={handleAddNewAddress}>
        <Ionicons name="add" size={20} color="#fff" />
        <Text style={styles.addButtonText}>Add New Address</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {addresses.map((address) => (
          <View style={styles.addressCard} key={address.id}>
            <View style={styles.addressHeader}>
              <MaterialIcons name="location-pin" size={20} color="#e91e63" />
              <Text style={styles.addressType}>{address.type}</Text>
              <View style={styles.addressActions}>
                <TouchableOpacity style={styles.actionIcon}>
                  <MaterialIcons name="edit" size={18} color="gray" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionIcon}>
                  <MaterialIcons name="delete" size={18} color="red" />
                </TouchableOpacity>
              </View>
            </View>
            <Text style={styles.addressText}>
              {address.name}, {address.details}
            </Text>
            <Text style={styles.addressText}>{address.phone}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFF0F5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: "#FFF0F5",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  backButton: { padding: 5 },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    fontFamily: "Montserrat_400Regular",
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e91e63",
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 20,
    marginVertical: 15,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
    fontFamily: "Montserrat_400Regular",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  addressCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  addressHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  addressType: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 5,
    color: "#333",
    fontFamily: "Montserrat_400Regular",
  },
  addressActions: {
    flexDirection: "row",
    marginLeft: "auto",
  },
  actionIcon: {
    marginLeft: 12,
    padding: 3,
  },
  addressText: {
    fontSize: 14,
    color: "#555",
    lineHeight: 20,
    marginTop: 2,
    fontFamily: "Montserrat_400Regular",
  },
});

export default ManageAddressesScreen;
