import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Modal,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const indianStates = [
  "Andaman & Nicobar Islands",
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chandigarh",
  "Chhattisgarh",
  "Dadra & Nagar Haveli and Daman & Diu",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu & Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Ladakh",
  "Lakshadweep",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Puducherry",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

const AddNewAddressScreen = () => {
  const navigation = useNavigation();

  const [fullName, setFullName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [alternateMobile, setAlternateMobile] = useState("");
  const [flatHouseNo, setFlatHouseNo] = useState("");
  const [areaStreet, setAreaStreet] = useState("");
  const [landmark, setLandmark] = useState("");
  const [pincode, setPincode] = useState("");
  const [townCity, setTownCity] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [isDefault, setIsDefault] = useState(false);

  const [isStateModalVisible, setIsStateModalVisible] = useState(false);

  const handleSaveAddress = () => {
    if (
      !fullName ||
      !mobileNumber ||
      !flatHouseNo ||
      !areaStreet ||
      !pincode ||
      !townCity ||
      !selectedState
    ) {
      alert("Please fill in all required fields.");
      return;
    }
    if (pincode.length !== 6 || !/^\d+$/.test(pincode)) {
      alert("Please enter a valid 6-digit pincode.");
      return;
    }
    if (mobileNumber.length !== 10 || !/^\d+$/.test(mobileNumber)) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }

    const newAddress = {
      fullName,
      mobileNumber,
      alternateMobile,
      flatHouseNo,
      areaStreet,
      landmark,
      pincode,
      townCity,
      state: selectedState,
      isDefault,
    };

    console.log("Saving Address:", newAddress);
    // --- TODO: Add API call here to save the address ---
    // Navigate back after saving
    navigation.goBack();
  };

  const openStatePicker = () => {
    setIsStateModalVisible(true);
  };

  const selectState = (state) => {
    setSelectedState(state);
    setIsStateModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={styles.safeArea.backgroundColor}
      />
      <View style={styles.header}>
        <View style={{ width: 50 }} />
        <Text style={styles.headerTitle}>Enter a new delivery address</Text>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.label}>Full name</Text>
        <TextInput
          style={styles.input}
          placeholder="Please enter your full name"
          placeholderTextColor="#aaa"
          value={fullName}
          onChangeText={setFullName}
        />

        <Text style={styles.label}>Mobile number</Text>
        <TextInput
          style={styles.input}
          placeholder="Please enter your mobile number"
          placeholderTextColor="#aaa"
          value={mobileNumber}
          onChangeText={setMobileNumber}
          keyboardType="phone-pad"
          maxLength={10}
        />

        <Text style={styles.label}>Alternate mobile number</Text>
        <TextInput
          style={styles.input}
          placeholder="Please enter your alternate mobile number"
          placeholderTextColor="#aaa"
          value={alternateMobile}
          onChangeText={setAlternateMobile}
          keyboardType="phone-pad"
          maxLength={10}
        />

        <Text style={styles.label}>
          Flat, House no., Building, Company, Apartment
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Please enter here"
          placeholderTextColor="#aaa"
          value={flatHouseNo}
          onChangeText={setFlatHouseNo}
        />

        <Text style={styles.label}>Area, Street, Sector, Village</Text>
        <TextInput
          style={styles.input}
          placeholder="Please enter here"
          placeholderTextColor="#aaa"
          value={areaStreet}
          onChangeText={setAreaStreet}
        />

        <Text style={styles.label}>Landmark</Text>
        <TextInput
          style={styles.input}
          placeholder="Please enter here"
          placeholderTextColor="#aaa"
          value={landmark}
          onChangeText={setLandmark}
        />

        <View style={styles.row}>
          <View style={styles.halfInputContainer}>
            <Text style={styles.label}>Pincode</Text>
            <TextInput
              style={styles.input}
              placeholder="6-digit Pincode"
              placeholderTextColor="#aaa"
              value={pincode}
              onChangeText={setPincode}
              keyboardType="numeric"
              maxLength={6}
            />
          </View>
          <View style={styles.halfInputContainer}>
            <Text style={styles.label}>Town/City</Text>
            <TextInput
              style={styles.input}
              placeholder=""
              placeholderTextColor="#aaa"
              value={townCity}
              onChangeText={setTownCity}
            />
          </View>
        </View>

        <Text style={styles.label}>State</Text>
        <TouchableOpacity
          style={styles.pickerTrigger}
          onPress={openStatePicker}
        >
          <Text
            style={[
              styles.pickerText,
              !selectedState && styles.placeholderText,
            ]}
          >
            {selectedState || "Select"}
          </Text>
          <Ionicons name="chevron-down" size={20} color="gray" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.checkboxContainer}
          onPress={() => setIsDefault(!isDefault)}
        >
          <View style={[styles.checkbox, isDefault && styles.checkboxChecked]}>
            {isDefault && <Ionicons name="checkmark" size={14} color="#fff" />}
          </View>
          <Text style={styles.checkboxLabel}>Make this my default address</Text>
        </TouchableOpacity>
      </ScrollView>
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveAddress}>
        <Text style={styles.saveButtonText}>Save Address</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isStateModalVisible}
        onRequestClose={() => setIsStateModalVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setIsStateModalVisible(false)}
        >
          <Pressable style={styles.modalContent} onPress={() => {}}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>State</Text>
              <TouchableOpacity onPress={() => setIsStateModalVisible(false)}>
                <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.modalScrollView}>
              {indianStates.map((state, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.modalItem}
                  onPress={() => selectState(state)}
                >
                  <Text style={styles.modalItemText}>{state}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  cancelButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    minWidth: 50,
    alignItems: "flex-end",
  },
  cancelButtonText: {
    fontSize: 16,
    color: "#e91e63",
    fontFamily: "Montserrat_400Regular",
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    fontFamily: "Montserrat_400Regular",
    textAlign: "center",
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 80,
  },
  label: {
    fontSize: 14,
    color: "#555",
    marginBottom: 8,
    fontWeight: "500", // Bolder label
    fontFamily: "Montserrat_400Regular",
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 15,
    marginBottom: 18,
    color: "#333",
    fontFamily: "Montserrat_400Regular",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  halfInputContainer: {
    width: "48%",
  },
  pickerTrigger: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 20,
    height: 48,
  },
  pickerText: {
    fontSize: 15,
    color: "#333",
    fontFamily: "Montserrat_400Regular",
  },
  placeholderText: {
    color: "#aaa",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: "#aaa",
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  checkboxChecked: {
    backgroundColor: "#e91e63",
    borderColor: "#e91e63",
  },
  checkboxLabel: {
    fontSize: 14,
    color: "#555",
    fontFamily: "Montserrat_400Regular",
  },
  saveButton: {
    backgroundColor: "#e91e63",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 20,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Montserrat_400Regular",
  },

  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 0,
    width: "85%",
    maxHeight: "70%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    overflow: "hidden",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    fontFamily: "Montserrat_400Regular",
  },
  modalScrollView: {
    // Takes available height within maxHeight
  },
  modalItem: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  modalItemText: {
    fontSize: 16,
    color: "#333",
    fontFamily: "Montserrat_400Regular",
  },
});

export default AddNewAddressScreen;
