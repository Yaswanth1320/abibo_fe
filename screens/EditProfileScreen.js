import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Modal,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";

const EditProfileScreen = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState("Primary");
  const [fullName, setFullName] = useState("Banana Bakery");
  const [email, setEmail] = useState("bananabakery@gmail.com");
  const [phone, setPhone] = useState("+91 8787878743");
  const [accountType, setAccountType] = useState("Business");
  const [bio, setBio] = useState(
    "Professional baker with 5 years of experience"
  );
  const [avatarSource, setAvatarSource] = useState(null);
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const [tempAccountType, setTempAccountType] = useState(accountType);

  // New states for delete account confirmation and success modal
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showDeletionSuccess, setShowDeletionSuccess] = useState(false);

  const handleSaveChanges = () => {
    console.log("Saving changes:", {
      fullName,
      email,
      phone,
      accountType,
      bio,
      avatarUri: avatarSource?.uri,
    });
    navigation.goBack();
  };

  const handleChoosePhoto = () => {
    const options = { mediaType: "photo", quality: 0.8 };
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log("User cancelled");
        return;
      }
      if (response.errorCode) {
        console.log("ImagePicker Error: ", response.errorMessage);
        return;
      }
      if (response.assets && response.assets.length > 0) {
        setAvatarSource({ uri: response.assets[0].uri });
      }
    });
  };

  const handleTakePhoto = () => {
    const options = { mediaType: "photo", quality: 0.8, saveToPhotos: true };
    launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log("User cancelled camera");
        return;
      }
      if (response.errorCode) {
        console.log("Camera Error: ", response.errorMessage);
        return;
      }
      if (response.assets && response.assets.length > 0) {
        setAvatarSource({ uri: response.assets[0].uri });
      }
    });
  };

  const openPickerModal = () => {
    setTempAccountType(accountType);
    setIsPickerVisible(true);
  };

  const handlePickerDone = () => {
    setAccountType(tempAccountType);
    setIsPickerVisible(false);
  };

  const handlePickerCancel = () => {
    setIsPickerVisible(false);
  };

  const handleDeleteAccount = () => {
    setShowDeleteConfirmation(true);
  };

  const handleUpdatePassword = () => {
    navigation.navigate("ChangePassword");
  };

  const confirmDeleteAccount = () => {
    // In real app, this is where you'd make an API call to delete the account
    console.log("Account deletion confirmed!");

    // Simulate successful deletion
    setShowDeleteConfirmation(false);
    setShowDeletionSuccess(true);

    // Simulate some delay before navigating (to show the success message)
    setTimeout(() => {
      setShowDeletionSuccess(false);
      navigation.navigate("Login"); // Redirect to login page (replace "Login" with your login screen name)
    }, 2000);
  };

  const cancelDeleteAccount = () => {
    setShowDeleteConfirmation(false);
  };

  const renderPrimaryInfo = () => (
    <View style={styles.form}>
      <Text style={styles.label}>Full Name</Text>
      <TextInput
        style={styles.input}
        value={fullName}
        onChangeText={setFullName}
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={styles.label}>Phone Number</Text>
      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />

      <Text style={styles.label}>Account Type</Text>
      <TouchableOpacity style={styles.pickerTrigger} onPress={openPickerModal}>
        <Text style={styles.pickerTriggerText}>
          {accountType || "Select Account Type"}
        </Text>
        <Ionicons name="chevron-down" size={20} color="gray" />
      </TouchableOpacity>

      <Text style={styles.label}>Bio</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={bio}
        onChangeText={setBio}
        multiline
        numberOfLines={4}
      />
    </View>
  );

  const renderOtherInfo = () => (
    <View style={styles.tabContent}>
      <Text style={styles.label}>GST Number</Text>
      <TextInput style={styles.input} placeholder="Enter the GST number" />
      <Text style={styles.label}>Account Type</Text>
      <TextInput
        style={styles.input}
        placeholder="ex: Business, Personal"
        keyboardType="url"
      />
    </View>
  );

  const renderSettings = () => (
    <View style={styles.tabContent}>
      <TouchableOpacity
        style={styles.settingItem}
        onPress={handleUpdatePassword}
      >
        <Text style={styles.settingItemText}>Update Password</Text>
        <Ionicons name="chevron-forward" size={20} color="gray" />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.settingItem, { borderBottomWidth: 0 }]}
        onPress={handleDeleteAccount} // Call handleDeleteAccount when the item is pressed
      >
        <View style={styles.deleteAccount}>
          <Text
            style={[styles.settingItemText, { color: "red", fontSize: 18 }]}
          >
            Delete My Account
          </Text>
          <Text
            style={[styles.settingItemText, { color: "gray", fontSize: 12 }]}
          >
            You will not be able to access your personal data including your old
            orders, saved addresses, payment methods etc.
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );

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
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <View style={{ width: styles.backButton.padding * 2 + 22 }} />
        {/* Balance */}
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "Primary" && styles.activeTab,
          ]}
          onPress={() => setActiveTab("Primary")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "Primary" && styles.activeTabText,
            ]}
          >
            Primary
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "Other Info" && styles.activeTab,
          ]}
          onPress={() => setActiveTab("Other Info")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "Other Info" && styles.activeTabText,
            ]}
          >
            Other Info
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "Settings" && styles.activeTab,
          ]}
          onPress={() => setActiveTab("Settings")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "Settings" && styles.activeTabText,
            ]}
          >
            Settings
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {activeTab === "Primary" && (
          <View style={styles.avatarSection}>
            <TouchableOpacity onPress={handleChoosePhoto}>
              <View style={styles.avatarPlaceholder}>
                {avatarSource ? (
                  <Image source={avatarSource} style={styles.avatarImage} />
                ) : (
                  <Ionicons name="person" size={80} color="#ccc" />
                )}
                <View style={styles.cameraIcon}>
                  <Ionicons name="camera" size={16} color="#fff" />
                </View>
              </View>
            </TouchableOpacity>
          </View>
        )}

        {activeTab === "Primary" && renderPrimaryInfo()}
        {activeTab === "Other Info" && renderOtherInfo()}
        {activeTab === "Settings" && renderSettings()}
      </ScrollView>

      {(activeTab === "Primary" || activeTab === "Other Info") && (
        <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={isPickerVisible}
        onRequestClose={handlePickerCancel}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={handlePickerCancel}
        >
          <View
            style={styles.modalContent}
            onStartShouldSetResponder={() => true}
          >
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={handlePickerCancel}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Select Account Type</Text>
              <TouchableOpacity onPress={handlePickerDone}>
                <Text style={[styles.modalButtonText, styles.modalDoneButton]}>
                  Done
                </Text>
              </TouchableOpacity>
            </View>
            <Picker
              selectedValue={tempAccountType}
              onValueChange={(itemValue) => setTempAccountType(itemValue)}
              itemStyle={styles.pickerItem}
              style={styles.pickerModal}
            >
              <Picker.Item label="Business" value="Business" />
              <Picker.Item label="Personal" value="Personal" />
              <Picker.Item label="guest" value="guest" />
            </Picker>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Delete account confirmation modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={showDeleteConfirmation}
        onRequestClose={cancelDeleteAccount}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Are you sure you want to delete your account?
            </Text>
            <Text style={styles.modalSubText}>
              You will not be able to access your personal data including your
              old orders, saved addresses, payment methods etc.
            </Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.buttonCancel]}
                onPress={cancelDeleteAccount}
              >
                <Text style={styles.textStyle}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.buttonConfirm]}
                onPress={confirmDeleteAccount}
              >
                <Text style={styles.textStyle}>Yes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Deletion success modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showDeletionSuccess}
        onRequestClose={() => setShowDeletionSuccess(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.successModalView}>
            <Ionicons name="checkmark-circle" size={50} color="green" />
            <Text style={styles.successModalText}>
              Account successfully deleted!
            </Text>
          </View>
        </View>
      </Modal>
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
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  backButton: { padding: 5 },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    fontFamily: "Montserrat_400Regular",
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    backgroundColor: "#FFF",
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginRight: 10,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  activeTab: {
    borderBottomColor: "#e91e63",
  },
  tabText: {
    fontSize: 14,
    color: "gray",
    fontFamily: "Montserrat_400Regular",
  },
  activeTabText: {
    color: "#e91e63",
    fontWeight: "bold",
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 80,
  },
  avatarSection: {
    alignItems: "center",
    marginBottom: 30,
  },
  avatarPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  avatarImage: {
    width: "100%",
    height: "100%",
    borderRadius: 60,
  },
  cameraIcon: {
    position: "absolute",
    bottom: 5,
    right: 5,
    backgroundColor: "#e91e63",
    padding: 8,
    borderRadius: 15,
  },
  form: {
    width: "100%",
    paddingHorizontal: 2,
  },
  label: {
    fontSize: 14,
    color: "#555",
    marginBottom: 6,
    fontWeight: "500",
    fontFamily: "Montserrat_400Regular",
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 15,
    color: "#333",
    fontFamily: "Montserrat_400Regular",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
    fontFamily: "Montserrat_400Regular",
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
    marginBottom: 15,
    height: 48,
  },
  pickerTriggerText: {
    fontSize: 16,
    color: "#333",
    fontFamily: "Montserrat_400Regular",
  },
  pickerItem: {
    height: 150,
    fontSize: 20,
    color: "#000",
    fontFamily: "Montserrat_400Regular",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  modalContent: {
    backgroundColor: "#f8f8f8",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingBottom: 20,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    fontFamily: "Montserrat_400Regular",
  },
  modalButtonText: {
    fontSize: 18,
    color: "#007AFF",
    fontFamily: "Montserrat_400Regular",
  },
  modalDoneButton: {
    fontWeight: "600",
  },
  pickerModal: {
    width: "100%",
    padding: 5,
    backgroundColor: "white",
  },
  tabContent: {
    padding: 8,
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
  },
  settingItemText: {
    fontSize: 16,
    color: "#333",
    fontFamily: "Montserrat_400Regular",
  },
  deleteAccount: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  settingItemIcon: {
    color: "#e91e63",
  },
  saveButton: {
    backgroundColor: "#e91e63",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    margin: 20,
    position: "absolute",
    bottom: 10,
    left: 10,
    right: 10,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Montserrat_400Regular",
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
    fontFamily: "Montserrat_400Regular",
    fontWeight: "bold",
  },
  modalSubText: {
    fontSize: 14,
    color: "gray",
    marginBottom: 20,
    textAlign: "center",
    fontFamily: "Montserrat_400Regular",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    width: "40%",
  },
  buttonCancel: {
    backgroundColor: "#f0f0f0",
  },
  buttonConfirm: {
    backgroundColor: "#e91e63",
    color: "white",
  },
  textStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Montserrat_400Regular",
  },
  successModalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  successModalText: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 20,
    fontWeight: "bold",
    color: "green",
    fontFamily: "Montserrat_400Regular",
  },
});

export default EditProfileScreen;
