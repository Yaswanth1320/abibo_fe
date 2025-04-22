import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons
// import { useNavigation } from '@react-navigation/native'; // If you are not receiving the navigation object from the parent.

const ForgotPasswordScreen = ({ navigation, isEmailSearch = false }) => {
  const [input, setInput] = useState("");
  const [searchType, setSearchType] = useState(
    isEmailSearch ? "email" : "phone"
  );

  const handleContinue = () => {
    console.log(`Continue with ${searchType}:`, input);
  };

  const switchSearchMethod = () => {
    setSearchType(searchType === "email" ? "phone" : "email");
    setInput("");
  };
  const backButton = () => {
    navigation.replace("Login");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={backButton}>
          <Ionicons name="arrow-back" size={28} color="black" />
        </TouchableOpacity>
        <Text style={styles.header}>Find your account</Text>
        <Text style={styles.subheader}>
          {searchType === "email"
            ? "Enter your email address"
            : "Enter your phone number"}
        </Text>

        <TextInput
          style={styles.input}
          placeholder={
            searchType === "email"
              ? "Please enter your email address"
              : "Please enter your phone number"
          }
          placeholderTextColor="#888"
          value={input}
          onChangeText={setInput}
          keyboardType={
            searchType === "email"
              ? "email-address"
              : Platform.OS === "ios"
              ? "number-pad"
              : "phone-pad"
          }
        />

        <Text style={styles.notification}>
          You may receive WhatsApp and SMS notifications from us for security
          and login purposes.
        </Text>

        <TouchableOpacity style={styles.button} onPress={handleContinue}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.linkButton}
          onPress={switchSearchMethod}
        >
          <Text style={styles.linkButtonText}>
            {searchType === "email"
              ? "Search by mobile number instead"
              : "Search by email address instead"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FCE4EC",
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FCE4EC",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    fontFamily: "Montserrat_400Regular",
  },
  subheader: {
    fontSize: 16,
    marginBottom: 20,
    fontFamily: "Montserrat_400Regular",
  },
  input: {
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 14,
    paddingHorizontal: 10,
    backgroundColor: "white",
    borderRadius: 5,
    fontFamily: "Montserrat_400Regular",
  },
  notification: {
    fontSize: 12,
    color: "gray",
    marginBottom: 20,
    fontFamily: "Montserrat_400Regular",
  },
  button: {
    backgroundColor: "#E91E63",
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Montserrat_400Regular",
  },
  linkButton: {
    marginTop: 10,
    alignItems: "center",
    borderColor: "#E91E63",
    borderWidth: 1,
    paddingVertical: 12,
    borderRadius: 5,
  },
  linkButtonText: {
    color: "#E91E63",
    fontSize: 14,
    fontFamily: "Montserrat_400Regular",
  },
  backButton: {
    marginBottom: 20,
    width: "10%",
  },
  backButtonText: {
    fontSize: 24,
    fontFamily: "Montserrat_400Regular",
  },
});

export default ForgotPasswordScreen;
