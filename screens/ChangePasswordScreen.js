import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert, // Import Alert for showing messages
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const ChangePasswordScreen = () => {
  const navigation = useNavigation();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);


  const handleUpdatePassword = () => {
    // Password validation
    if (newPassword.length < 8) {
      Alert.alert(
        "Password Requirements",
        "New password must be at least 8 characters long."
      );
      return;
    }

    if (newPassword !== confirmNewPassword) {
      Alert.alert("Passwords do not match", "Please re-enter your new password.");
      return;
    }

    // Implement the update password logic here
    // This is where you would usually make an API call
    // Example:
    // try {
    //   await api.updatePassword(currentPassword, newPassword);
    //   Alert.alert("Success", "Password updated successfully!");
    //   navigation.goBack(); // Or navigate to account screen: navigation.navigate("AccountScreen");
    // } catch (error) {
    //   Alert.alert("Error", error.message || "Failed to update password.");
    // }

    // Simulate successful update for demonstration purposes
    Alert.alert("Success", "Password updated successfully!");
    // Navigate back to the Account Screen
    navigation.goBack(); // OR:  navigation.navigate("AccountScreen") if you want to go to the account screen directly
  };

  const handleForgotPassword = () => {
    // Implement the forgot password logic here
    // For example, navigate to the Forgot Password screen
    navigation.navigate("ForgotPassword"); // Replace "ForgotPassword" with your screen name
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
        <Text style={styles.headerTitle}>Change Password</Text>
        <View style={{ width: styles.backButton.padding * 2 + 22 }} />
      </View>

      <View style={styles.content}>
        <Ionicons name="lock-closed" size={48} color="#e91e63" style={styles.lockIcon} />
        <Text style={styles.description}>
          Create a strong password with at least 8 characters, including uppercase,
          lowercase, numbers, and special characters.
        </Text>

        <Text style={styles.label}>Current Password</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Current Password"
            secureTextEntry={!showCurrentPassword}
            value={currentPassword}
            onChangeText={setCurrentPassword}
          />
          <TouchableOpacity
            onPress={() => setShowCurrentPassword(!showCurrentPassword)}
            style={styles.eyeIcon}
          >
            <Ionicons
              name={showCurrentPassword ? "eye-off" : "eye"}
              size={20}
              color="gray"
            />
          </TouchableOpacity>
        </View>


        <Text style={styles.label}>New Password</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="New Password"
            secureTextEntry={!showNewPassword}
            value={newPassword}
            onChangeText={setNewPassword}
          />
          <TouchableOpacity
            onPress={() => setShowNewPassword(!showNewPassword)}
            style={styles.eyeIcon}
          >
            <Ionicons
              name={showNewPassword ? "eye-off" : "eye"}
              size={20}
              color="gray"
            />
          </TouchableOpacity>
        </View>



        <Text style={styles.label}>Confirm New Password</Text>
         <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Confirm New Password"
            secureTextEntry={!showConfirmNewPassword}
            value={confirmNewPassword}
            onChangeText={setConfirmNewPassword}
          />
          <TouchableOpacity
            onPress={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
            style={styles.eyeIcon}
          >
            <Ionicons
              name={showConfirmNewPassword ? "eye-off" : "eye"}
              size={20}
              color="gray"
            />
          </TouchableOpacity>
        </View>


        <TouchableOpacity style={styles.button} onPress={handleUpdatePassword}>
          <Text style={styles.buttonText}>Update Password</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleForgotPassword}>
          <Text style={styles.forgotPasswordText}>Forgot Current Password?</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFF0F5", // Pinkish background
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
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 20, // Increased font size
    fontWeight: "bold",
    color: "#333",
    fontFamily: "Montserrat_400Regular", // Use the specified font
  },
  content: {
    padding: 20,
  },
  lockIcon: {
    alignSelf: "center",
    marginBottom: 20,
  },
  description: {
    fontSize: 14,
    color: "#555",
    marginBottom: 20,
    textAlign: "center",
    fontFamily: "Montserrat_400Regular",
  },
  label: {
    fontSize: 14,
    color: "#555",
    marginBottom: 6,
    fontWeight: "500",
    fontFamily: "Montserrat_400Regular",
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 15,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    fontFamily: 'Montserrat_400Regular',
  },
  eyeIcon: {
    padding: 5,
  },
  button: {
    backgroundColor: "#e91e63", // Pink button
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Montserrat_400Regular",
  },
  forgotPasswordText: {
    color: "#e91e63",
    textAlign: "center",
    marginTop: 15,
    fontFamily: "Montserrat_400Regular",
  },
});

export default ChangePasswordScreen;