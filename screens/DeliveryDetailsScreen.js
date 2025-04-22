import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather"; // For edit icon
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"; // For checkbox

const sampleAddresses = [
  {
    id: "addr1",
    type: "Home",
    name: "Naveen",
    addressLine1: "87-2-47, Lakshmi Nagar Main Road",
    city: "Chennai",
    state: "Tamil Nadu",
    pincode: "600083",
    phone: "+91 8976543322",
  },
  {
    id: "addr2",
    type: "Office",
    name: "Kamal", // Name might differ per address
    addressLine1: "87-2-47, Lakshmi Nagar Main Road", // Example, could be different
    city: "Chennai",
    state: "Tamil Nadu",
    pincode: "600083",
    phone: "+91 8976543322", // Example, could be different
  },
];

const AddressItem = ({ address, isSelected, onSelect, onEdit }) => {
  return (
    <TouchableOpacity
      style={[
        styles.addressItemContainer,
        isSelected && styles.selectedAddressItem,
      ]}
      onPress={() => onSelect(address.id)}
      activeOpacity={0.7}
    >
      <View style={styles.radioAndContent}>
        <Ionicons
          name={isSelected ? "radio-button-on" : "radio-button-off"}
          size={24}
          color={isSelected ? "#E91E63" : "#AAAAAA"}
          style={styles.radioIcon}
        />
        <View style={styles.addressDetails}>
          <Text style={styles.addressLabel}>{address.type}</Text>
          <Text style={styles.addressText}>
            {address.name}, {address.addressLine1}, {address.city},
          </Text>
          <Text style={styles.addressText}>
            {address.state} – {address.pincode}
          </Text>
          <Text style={styles.addressText}>{address.phone}</Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => onEdit(address.id)}
        style={styles.editIconContainer}
      >
        <Feather name="edit-2" size={18} color="#777777" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const DeliveryDetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  // Assuming totalAmount might be needed later or passed through
  const totalAmount = route.params?.totalAmount;

  // State for selections
  const [shippingAddresses, setShippingAddresses] = useState(sampleAddresses); // Use actual data
  const [billingAddresses, setBillingAddresses] = useState(sampleAddresses); // Use actual data
  const [selectedShippingId, setSelectedShippingId] = useState(
    sampleAddresses[0]?.id || null
  ); // Default to first
  const [selectedBillingId, setSelectedBillingId] = useState(
    sampleAddresses[1]?.id || null
  ); // Default to second or first if only one
  const [billingSameAsShipping, setBillingSameAsShipping] = useState(false);

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleConfirmDetails = () => {
    const finalBillingId = billingSameAsShipping
      ? selectedShippingId
      : selectedBillingId;

    if (!selectedShippingId || !finalBillingId) {
      alert("Please select both shipping and billing addresses.");
      return;
    }

    console.log("Selected Shipping ID:", selectedShippingId);
    console.log("Selected Billing ID:", finalBillingId);
    const selectedShippingAddress = shippingAddresses.find(
      (addr) => addr.id === selectedShippingId
    );
    const selectedBillingAddress = billingAddresses.find(
      (addr) => addr.id === finalBillingId
    );

    navigation.navigate("Checkout", {
      totalAmount: totalAmount,
      shippingAddressId: selectedShippingId,
      billingAddressId: finalBillingId,
    });
  };

  const handleAddNewAddress = (type) => {
    console.log(`Add new ${type} address`);
    // Navigate to an Add/Edit Address Screen (implementation not shown here)
    // navigation.navigate('AddEditAddress', { type: type });
  };

  const handleEditAddress = (id, type) => {
    console.log(`Edit ${type} address with id: ${id}`);
    // Navigate to an Add/Edit Address Screen with the ID
    // navigation.navigate('AddEditAddress', { addressId: id, type: type });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Delivery Details</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Shipping Address Section */}
        <View style={styles.addressSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Shipping Address</Text>
            <TouchableOpacity onPress={() => handleAddNewAddress("shipping")}>
              <Text style={styles.addNewText}>+ Add New</Text>
            </TouchableOpacity>
          </View>
          {shippingAddresses.map((address) => (
            <AddressItem
              key={address.id}
              address={address}
              isSelected={selectedShippingId === address.id}
              onSelect={setSelectedShippingId}
              onEdit={(id) => handleEditAddress(id, "shipping")}
            />
          ))}
        </View>

        {/* Billing Same as Shipping Checkbox */}
        <TouchableOpacity
          style={styles.checkboxContainer}
          onPress={() => setBillingSameAsShipping(!billingSameAsShipping)}
          activeOpacity={0.8}
        >
          <MaterialCommunityIcons
            name={
              billingSameAsShipping
                ? "checkbox-marked"
                : "checkbox-blank-outline"
            }
            size={24}
            color={billingSameAsShipping ? "#E91E63" : "#777777"}
          />
          <Text style={styles.checkboxLabel}>
            Billing address is the same as the shipping address
          </Text>
        </TouchableOpacity>

        {/* Billing Address Section (Conditional) */}
        {!billingSameAsShipping && (
          <View style={styles.addressSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Billing Address</Text>
              <TouchableOpacity onPress={() => handleAddNewAddress("billing")}>
                <Text style={styles.addNewText}>+ Add New</Text>
              </TouchableOpacity>
            </View>
            {billingAddresses.map((address) => (
              <AddressItem
                key={address.id}
                address={address}
                isSelected={selectedBillingId === address.id}
                onSelect={setSelectedBillingId}
                onEdit={(id) => handleEditAddress(id, "billing")}
              />
            ))}
          </View>
        )}
      </ScrollView>

      {/* Footer Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={handleConfirmDetails}
        >
          <Text style={styles.confirmButtonText}>Confirm Details</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8F8F8", // Light background
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    justifyContent: "space-between",
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    fontFamily: "Montserrat_400Regular",
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 15,
    paddingBottom: 80,
  },
  addressSection: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    fontFamily: "Montserrat_400Regular",
  },
  addNewText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#E91E63",
    fontFamily: "Montserrat_400Regular",
  },
  addressItemContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    backgroundColor: "#FFFFFF",
  },
  selectedAddressItem: {
    borderColor: "#E91E63",
    borderWidth: 1.5,
    fontFamily: "Montserrat_400Regular",
  },
  radioAndContent: {
    flexDirection: "row",
    flex: 1,
    alignItems: "flex-start",
  },
  radioIcon: {
    marginRight: 10,
    marginTop: 2,
  },
  addressDetails: {
    flex: 1,
  },
  addressLabel: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
    fontFamily: "Montserrat_400Regular",
  },
  addressText: {
    fontSize: 14,
    color: "#555",
    lineHeight: 20,
    marginBottom: 2,
    fontFamily: "Montserrat_400Regular",
  },
  editIconContainer: {
    padding: 5,
    marginLeft: 10,
    alignSelf: "flex-start",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  checkboxLabel: {
    marginLeft: 10,
    fontSize: 14,
    color: "#444",
    flex: 1,
    fontFamily: "Montserrat_400Regular",
  },
  footer: {
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    backgroundColor: "#FFFFFF",
  },
  confirmButton: {
    backgroundColor: "#E91E63",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  confirmButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Montserrat_400Regular", 
  },
});

export default DeliveryDetailsScreen;
