import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  Platform,
  Modal,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts, Montserrat_400Regular } from "@expo-google-fonts/montserrat";

const SignupScreen = () => {
  const [isBusiness, setIsBusiness] = useState(false);
  const [businessName, setBusinessName] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [gstNumber, setGstNumber] = useState("");
  const [pincode, setPincode] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState(""); // OTP for the modal
  const [isModalVisible, setIsModalVisible] = useState(false);

  const navigation = useNavigation();
  let [fontsLoaded] = useFonts({
    Montserrat_400Regular,
  });

  if (!fontsLoaded) {
    return null; // Render something else or loading indicator
  }

  const handleSignup = () => {
    console.log("Sign Up pressed");
    setIsModalVisible(true); //Show the modal after sign up button has been pressed
  };

  const handleBusinessPress = () => {
    setIsBusiness(true);
  };

  const handleIndividualPress = () => {
    setIsBusiness(false);
  };

  const handleLoginPress = () => {
    navigation.replace("Login");
  };

  const handleVerifyOtp = () => {
    console.log("Verifying OTP: " + otp);
    Alert.alert("OTP Verified!", "Navigating to Home");
    setIsModalVisible(false);
    navigation.navigate("Main");
  };

  return (
    <LinearGradient
      colors={["#fce4ec", "#f8bbd0"]}
      style={styles.gradientContainer}
    >
      <SafeAreaView style={styles.safeArea}>
        <View
          style={[styles.container, { fontFamily: "Montserrat_400Regular" }]}
        >
          <View style={styles.headerContainer}>
            <Image
              source={require("../../assets/logo-r.png")}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text
              style={[styles.title, { fontFamily: "Montserrat_400Regular" }]}
            >
              Create Account
            </Text>
            <Text
              style={[styles.subtitle, { fontFamily: "Montserrat_400Regular" }]}
            >
              Join Ivykart today! Sign up now to unlock exclusive deals and shop
              with ease!
            </Text>
          </View>

          {/* Business/Individual Buttons */}
          <View style={styles.typeButtonsContainer}>
            <TouchableOpacity
              style={[styles.typeButton, isBusiness && styles.activeTypeButton]}
              onPress={handleBusinessPress}
            >
              <Text
                style={[
                  styles.typeButtonText,
                  isBusiness && styles.activeTypeButtonText,
                  { fontFamily: "Montserrat_400Regular" },
                ]}
              >
                Business
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.typeButton,
                !isBusiness && styles.activeTypeButton,
              ]}
              onPress={handleIndividualPress}
            >
              <Text
                style={[
                  styles.typeButtonText,
                  !isBusiness && styles.activeTypeButtonText,
                  { fontFamily: "Montserrat_400Regular" },
                ]}
              >
                Individual
              </Text>
            </TouchableOpacity>
          </View>

          {/* Input Fields */}
          <View style={styles.formContainer}>
            {/* Conditional Rendering based on User Type */}
            {isBusiness ? (
              <>
                {/* Business Fields */}
                <Text
                  style={[
                    styles.label,
                    { fontFamily: "Montserrat_400Regular" },
                  ]}
                >
                  Business Name
                </Text>
                <TextInput
                  style={styles.input}
                  placeholder="Please enter your business name"
                  value={businessName}
                  onChangeText={setBusinessName}
                />
              </>
            ) : (
              <>
                {/* Individual Fields */}
                <Text
                  style={[
                    styles.label,
                    { fontFamily: "Montserrat_400Regular" },
                  ]}
                >
                  Name
                </Text>
                <TextInput
                  style={styles.input}
                  placeholder="Please enter your name"
                  value={name}
                  onChangeText={setName}
                />
              </>
            )}

            <Text
              style={[styles.label, { fontFamily: "Montserrat_400Regular" }]}
            >
              Phone Number
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Please enter your phone number"
              keyboardType="phone-pad"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />
            {/* Pincode */}
            <>
              <Text
                style={[styles.label, { fontFamily: "Montserrat_400Regular" }]}
              >
                Pincode
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Please enter your pincode"
                keyboardType="number-pad"
                value={pincode}
                onChangeText={setPincode}
              />
            </>
            <Text
              style={[styles.label, { fontFamily: "Montserrat_400Regular" }]}
            >
              Email (optional)
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Please enter your email"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />

            {isBusiness && (
              <>
                {/* GST Field Rendered conditionally with a toggle */}
                <Text
                  style={[
                    styles.label,
                    { fontFamily: "Montserrat_400Regular" },
                  ]}
                >
                  GST Number (optional)
                </Text>
                <TextInput
                  style={styles.input}
                  placeholder="Please enter your GST number"
                  value={gstNumber}
                  onChangeText={setGstNumber}
                />
              </>
            )}
            <Text
              style={[styles.label, { fontFamily: "Montserrat_400Regular" }]}
            >
              Password
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Please enter your password"
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
            />
            <Text
              style={[
                styles.passwordLengthText,
                { fontFamily: "Montserrat_400Regular" },
              ]}
            >
              Password must be at least 8 characters long
            </Text>
          </View>

          {/* Sign Up Button */}
          <TouchableOpacity style={styles.button} onPress={handleSignup}>
            <Text
              style={[
                styles.buttonText,
                { fontFamily: "Montserrat_400Regular" },
              ]}
            >
              Verify & Sign Up
            </Text>
          </TouchableOpacity>

          {/* Already have an account? Login */}
          <View style={styles.loginContainer}>
            <Text style={{ fontFamily: "Montserrat_400Regular" }}>
              Already have an account?
            </Text>
            <TouchableOpacity onPress={handleLoginPress}>
              <Text
                style={[
                  styles.loginText,
                  { fontFamily: "Montserrat_400Regular" },
                ]}
              >
                {" "}
                Login
              </Text>
            </TouchableOpacity>
            <Text style={{ fontFamily: "Montserrat_400Regular" }}> here</Text>
          </View>

          <Modal
            animationType="fade" // Match visual style with fade
            transparent={true} // Make background transparent
            visible={isModalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setIsModalVisible(!isModalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text
                  style={[
                    styles.modalText,
                    { fontFamily: "Montserrat_400Regular" },
                  ]}
                >
                  Enter OTP
                </Text>
                <TextInput
                  style={styles.modalInput}
                  placeholder="Please enter your OTP here"
                  placeholderTextColor="#888"
                  keyboardType="number-pad"
                  value={otp}
                  onChangeText={setOtp}
                />
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={handleVerifyOtp}
                >
                  <Text
                    style={[
                      styles.buttonText,
                      { fontFamily: "Montserrat_400Regular" },
                    ]}
                  >
                    Verify OTP
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 25 : 0,
  },
  container: {
    flex: 1,
    paddingHorizontal: 40,
    backgroundColor: "transparent",
  },
  headerContainer: {
    paddingTop: 10,
    alignItems: "center",
    marginBottom: 10, // Reduced from 20
  },
  logo: {
    width: 180, // Reduced from 220
    height: 100, // Reduced from 120
    marginBottom: 4,
  },
  title: {
    fontSize: 18, // Reduced from 20
    fontWeight: "bold",
    color: "#222",
    textAlign: "center",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 12, // Reduced from 13
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  typeButtonsContainer: {
    flexDirection: "row",
    justifyContent: "spaceEvenly",
    marginBottom: 16, // Reduced from 20
  },
  typeButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 16, //Reduced border radius
    paddingVertical: 8, // Reduced from 10
    marginHorizontal: 3, // reduced from 5
    alignItems: "center",
  },
  activeTypeButton: {
    backgroundColor: "crimson",
    borderColor: "crimson",
  },
  typeButtonText: {
    color: "#555",
    fontSize: 14, // Reduced from 16
    fontWeight: "bold",
  },
  activeTypeButtonText: {
    color: "white",
  },
  formContainer: {
    marginBottom: 18, // Reduced from 25
  },
  label: {
    fontSize: 12, // Reduced from 14
    fontWeight: "600",
    color: "#444",
    marginBottom: 2,
  },
  input: {
    height: 36, // Reduced from 40
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8, // Reduced from 10
    marginBottom: 12, // Reduced from 15
    fontFamily: "Montserrat_400Regular",
  },
  passwordLengthText: {
    fontSize: 10,
    color: "#888",
    paddingLeft: 2,
    marginBottom: 6,
  },
  button: {
    backgroundColor: "crimson",
    height: 44, // Reduced from 50
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20, // Reduced from 30
  },
  buttonText: {
    color: "white",
    fontSize: 16, // Reduced from 18
    fontWeight: "bold",
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  loginText: {
    color: "crimson",
    textDecorationLine: "underline",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Add a semi-transparent black background
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
    width: "80%", // Make modal 80% of screen width
    backgroundColor: "#f9f9f9", // Add background color
    borderColor: "#FFB6C1", // Add boder color.
    borderWidth: 1,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "crimson", // pink button
    borderRadius: 10, // border
    alignItems: "center", // aligntment
    width: 100, // size
    marginTop: 10, // spacing
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  modalInput: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    width: "100%", // Make input full width,
    backgroundColor: "#fff", //Add input BG
    padding: 10,
    fontFamily: "Montserrat_400Regular",
  },
  modalButton: {
    backgroundColor: "crimson",
    height: 44, // Reduced from 50
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30, // for making it fit
    paddingVertical: 10,
  },
  logo: {
    width: 220,
    height: 120,
    marginBottom: 5, // Reduced bottom margin
  },
});

export default SignupScreen;
