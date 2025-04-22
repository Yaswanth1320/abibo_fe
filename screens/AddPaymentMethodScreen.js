import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TextInput,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const AddPaymentMethodScreen = () => {
  const navigation = useNavigation();
  const [paymentType, setPaymentType] = useState("Credit Card");
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const paymentOptions = ["Credit Card", "Debit Card", "UPI"];

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const selectPaymentType = (type) => {
    setPaymentType(type);
    setDropdownVisible(false);
  };

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
          <Ionicons name="arrow-back" size={22} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment Methods</Text>
        <View style={{ width: 34 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Add Payment Method</Text>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Payment Type</Text>
            <TouchableOpacity
              style={styles.paymentTypeContainer}
              onPress={toggleDropdown}
            >
              <Text style={styles.paymentTypeText}>{paymentType}</Text>
              <Ionicons
                name="chevron-down-outline"
                size={20}
                color="#333"
                style={styles.dropdownIcon}
              />
            </TouchableOpacity>

            <Modal visible={isDropdownVisible} transparent animationType="fade">
              <TouchableWithoutFeedback onPress={() => setDropdownVisible(false)}>
                <View style={styles.modalOverlay}>
                  <View style={styles.dropdownContainer}>
                    {paymentOptions.map((option) => (
                      <TouchableOpacity
                        key={option}
                        style={[
                          styles.dropdownItem,
                          option === paymentType && styles.selectedDropdownItem,
                        ]}
                        onPress={() => selectPaymentType(option)}
                      >
                        <Text style={styles.dropdownText}>{option}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </Modal>
          </View>

          {paymentType !== "UPI" && (
            <>
              <View style={styles.formGroup}>
                <Text style={styles.label}>Card Number</Text>
                <TextInput
                  style={styles.input}
                  placeholder="XXXX XXXX XXXX XXXX"
                  keyboardType="number-pad"
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Card Holder Name</Text>
                <TextInput style={styles.input} placeholder="Card Holder Name" />
              </View>

              <View style={styles.inlineInputs}>
                <View style={styles.formGroupHalf}>
                  <Text style={styles.label}>Expiry Date</Text>
                  <TextInput style={styles.input} placeholder="MM/YY" />
                </View>

                <View style={styles.formGroupHalf}>
                  <Text style={styles.label}>CVV</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="123"
                    keyboardType="number-pad"
                  />
                </View>
              </View>
            </>
          )}

          {paymentType === "UPI" && (
            <View style={styles.formGroup}>
              <Text style={styles.label}>UPI ID</Text>
              <TextInput style={styles.input} placeholder="yourname@bank" />
            </View>
          )}

          <View style={styles.buttons}>
            <TouchableOpacity style={styles.addPaymentButton}>
              <Text style={styles.buttonText}>Add Payment Method</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.cancelButton, styles.invertedButton]}
              onPress={() => navigation.goBack()}
            >
              <Text style={[styles.buttonText, styles.invertedButtonText]}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
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
    paddingVertical: 6,
    backgroundColor: "#FFF0F5",
  },
  backButton: { padding: 5 },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    fontFamily: "Montserrat_400Regular",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  sectionCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    fontFamily: "Montserrat_400Regular",
    marginBottom: 20,
  },
  formGroup: { marginBottom: 15 },
  label: {
    fontSize: 14,
    color: "#555",
    marginBottom: 8,
    fontFamily: "Montserrat_400Regular",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 14,
    color: "#333",
    fontFamily: "Montserrat_400Regular",
  },
  inlineInputs: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  formGroupHalf: {
    flex: 1,
    marginRight: 10,
  },
  buttons: {
    marginTop: 25,
  },
  addPaymentButton: {
    backgroundColor: "#e91e63",
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: "center",
  },
  cancelButton: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e91e63",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Montserrat_400Regular",
  },
  invertedButton: {
    backgroundColor: "transparent",
  },
  invertedButtonText: {
    color: "#e91e63",
  },
  paymentTypeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  paymentTypeText: {
    fontSize: 14,
    color: "#333",
    fontFamily: "Montserrat_400Regular",
  },
  dropdownIcon: {
    color: "#888",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-start",
    paddingTop: 120,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  dropdownContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginTop: 5,
    marginLeft: 20,
    marginRight: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  selectedDropdownItem: {
    backgroundColor: "#e91e63",
  },
  dropdownText: {
    fontSize: 14,
    color: "#333",
    fontFamily: "Montserrat_400Regular",
  },
});

export default AddPaymentMethodScreen;