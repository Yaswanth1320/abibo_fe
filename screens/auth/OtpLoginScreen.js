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
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts, Montserrat_400Regular } from "@expo-google-fonts/montserrat";

const OtpLoginScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpErrorMessage, setOtpErrorMessage] = useState("");

  const navigation = useNavigation();
  let [fontsLoaded] = useFonts({
    Montserrat_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  const handleSendOtp = () => {
    console.log(`Sending OTP to ${phoneNumber}`);
    Alert.alert("OTP Sent!", `OTP sent to ${phoneNumber}`); // Placeholder, replace with API call
    setOtpSent(true);
  };

  const handleVerifyOtp = () => {
    console.log(`Verifying OTP: ${otp} for ${phoneNumber}`);
    navigation.replace("Main");
  };

  const handleLoginPress = () => {
    navigation.replace("Login");
  };
  const handleIncorrectLinkPress = () => {
    navigation.replace("OTPLogin");
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
          {/* Logo and Title */}
          <View style={styles.headerContainer}>
            <Image
              source={require("../../assets/logo-r.png")}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text
              style={[styles.title, { fontFamily: "Montserrat_400Regular" }]}
            >
              OTP Login
            </Text>
          </View>

          {/* Phone Number Input or OTP Input - Conditionally Rendered */}
          <View style={styles.formContainer}>
            {/* Phone Number Input (Initially) */}
            {!otpSent && (
              <>
                <Text
                  style={[
                    styles.label,
                    { fontFamily: "Montserrat_400Regular" },
                  ]}
                >
                  Phone Number
                </Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your phone number"
                  keyboardType="phone-pad"
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                />
                <TouchableOpacity style={styles.button} onPress={handleSendOtp}>
                  <Text
                    style={[
                      styles.buttonText,
                      { fontFamily: "Montserrat_400Regular" },
                    ]}
                  >
                    Send OTP
                  </Text>
                </TouchableOpacity>
              </>
            )}

            {/* OTP Input (After Sending OTP) */}
            {otpSent && (
              <>
                <Text style={styles.otpMessageText}>
                  An otp is sent to a number {phoneNumber} if the number is
                  incorrect
                  <TouchableOpacity onPress={handleIncorrectLinkPress}>
                    <Text style={styles.clickHereLink}> click here</Text>
                  </TouchableOpacity>
                </Text>
                <Text
                  style={[
                    styles.label,
                    { fontFamily: "Montserrat_400Regular" },
                  ]}
                >
                  Enter OTP
                </Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter the OTP"
                  keyboardType="number-pad"
                  value={otp}
                  onChangeText={setOtp}
                  secureTextEntry={true}
                />
                <TouchableOpacity
                  style={styles.button}
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
              </>
            )}
          </View>

          {/* Login Link */}
          <View style={styles.loginContainer}>
            <TouchableOpacity onPress={handleLoginPress}>
              <Text
                style={[
                  styles.loginText,
                  { fontFamily: "Montserrat_400Regular" },
                ]}
              >
                {" "}
                Login with Email
              </Text>
            </TouchableOpacity>
          </View>
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
    fontFamily: "Montserrat_400Regular",
    justifyContent: "center",
    alignItems: "center",
  },
  headerContainer: {
    paddingTop: 40,
    alignItems: "center",
    marginBottom: 30,
  },
  logo: {
    width: 220,
    height: 100,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#222",
    textAlign: "center",
    fontFamily: "Montserrat_400Regular",
  },
  formContainer: {
    marginBottom: 25,
    width: "100%",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#444",
    marginBottom: 5,
    fontFamily: "Montserrat_400Regular",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    fontFamily: "Montserrat_400Regular",
  },
  button: {
    backgroundColor: "crimson",
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Montserrat_400Regular",
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  loginText: {
    color: "crimson",
    fontFamily: "Montserrat_400Regular",
    textDecorationLine: "underline",
  },
  otpMessageText: {
    fontSize: 14,
    marginBottom: 12,
    fontFamily: "Montserrat_400Regular",
  },
  clickHereLink: {
    color: "crimson",
    textDecorationLine: "underline",
    fontSize: 14,
    fontFamily: "Montserrat_400Regular",
  },
});

export default OtpLoginScreen;
