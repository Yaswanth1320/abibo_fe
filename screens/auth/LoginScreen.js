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
} from "react-native";
import Checkbox from "@react-native-community/checkbox";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts, Montserrat_400Regular } from "@expo-google-fonts/montserrat";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSelected, setSelection] = useState(false);

  const navigation = useNavigation();
  let [fontsLoaded] = useFonts({
    Montserrat_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }
  const handleLogin = () => {
    console.log("Login pressed");
    navigation.navigate("Main"); // Placeholder
  };

  const handleSignup = () => {
    console.log("Signup pressed");
    navigation.replace("Signup");
  };

  const handleOTPLogin = () => {
    console.log("OTP Login pressed");
    navigation.replace("OTPLogin");
  };

  const handleForgotPassword = () => {
    console.log("Forgot Password pressed");
    navigation.replace("ForgotPassword");
  };

  const toggleSelection = () => {
    setSelection(!isSelected);
  };

  return (
    <LinearGradient
      colors={["#fce4ec", "#f8bbd0"]} //  Updated colors
      style={styles.gradientContainer}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <View style={styles.topSection}>
            <Image
              source={require("../../assets/logo-r.png")}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text
              style={[
                styles.welcomeText,
                { fontFamily: "Montserrat_400Regular" },
              ]}
            >
              Welcome Back to Ivykart
            </Text>
            <Text
              style={[styles.subText, { fontFamily: "Montserrat_400Regular" }]}
            >
              Welcome back to Ivykart! Log in now to explore amazing deals and
              enjoy a seamless shopping experience!
            </Text>
          </View>

          {/* Form and Remaining Elements Section */}
          <View style={styles.bottomSection}>
            <View style={styles.inputContainer}>
              <Text
                style={[styles.label, { fontFamily: "Montserrat_400Regular" }]}
              >
                Email / Phone Number
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Please enter your email address / phone number"
                placeholderTextColor="#888"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <View style={styles.passwordContainer}>
              <Text
                style={[styles.label, { fontFamily: "Montserrat_400Regular" }]}
              >
                Password
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Please enter your password"
                placeholderTextColor="#888"
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
            <TouchableOpacity onPress={handleForgotPassword}>
              <Text style={styles.forgotPasswordText}>Forgot Password ?</Text>
            </TouchableOpacity>
            {/* <View style={styles.rememberMeContainer}>
                  <Checkbox
                    value={isSelected}
                    onValueChange={toggleSelection}
                    style={styles.checkbox}
                  />
                  <Text>Remember me</Text>
                  <TouchableOpacity onPress={handleForgotPassword}>
                    <Text style={styles.forgotPasswordText}>Forgot Password</Text>
                  </TouchableOpacity>
                </View> */}

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text
                style={[
                  styles.buttonText,
                  { fontFamily: "Montserrat_400Regular" },
                ]}
              >
                Login
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleOTPLogin}>
              <Text
                style={[
                  styles.linkText,
                  { fontFamily: "Montserrat_400Regular" },
                ]}
              >
                Login via OTP
              </Text>
            </TouchableOpacity>

            <View style={styles.signupContainer}>
              <Text style={{ fontFamily: "Montserrat_400Regular" }}>
                Don't have an account?
              </Text>
              <TouchableOpacity onPress={handleSignup}>
                <Text
                  style={[
                    styles.signUpText,
                    { fontFamily: "Montserrat_400Regular" },
                  ]}
                >
                  {" "}
                  Sign Up
                </Text>
              </TouchableOpacity>
              <Text style={{ fontFamily: "Montserrat_400Regular" }}> here</Text>
            </View>
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
    paddingHorizontal: 40, // Increased padding horizontally
    paddingBottom: 20,
    backgroundColor: "transparent",
  },
  topSection: {
    paddingTop: 40, // Added padding top
    alignItems: "center", // Center items horizontally
    marginBottom: 20, // Added spacing
  },
  bottomSection: {
    display: "flex",
    justifyContent: "center",
  },
  logo: {
    width: 220,
    height: 120,
    marginBottom: 5, // Reduced bottom margin
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#222",
    textAlign: "center",
    marginBottom: 20,
  },
  subText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 40,
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
    color: "#444",
    marginBottom: 4,
    fontStyle: "bold",
    paddingLeft: 2,
  },
  inputContainer: {
    marginBottom: 30,
  },
  passwordContainer: {
    marginBottom: 10,
  },
  input: {
    height: 45,
    borderColor: "#ccc",
    placeholderTextColor: "#888",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontFamily: "Montserrat_400Regular",
  },
  passwordLengthText: {
    fontSize: 12,
    color: "#888",
    marginTop: 5,
    paddingLeft: 3,
    marginBottom: 2, // Reduced bottom margin
  },
  rememberMeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16, // Reduced bottom margin
    justifyContent: "space-between", //Added to align text to the right
  },
  checkbox: {
    marginRight: 8,
  },
  forgotPasswordText: {
    color: "crimson",
    alignSelf: "flex-end",
    fontFamily: "Montserrat_400Regular",
    fontSize: 13,
    marginTop: 7,
    marginBottom: 8, // Reduced bottom margin
  },
  button: {
    backgroundColor: "crimson",
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30, // Reduced bottom margin
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  linkText: {
    color: "crimson",
    textAlign: "center",
    fontSize: 16,
    marginBottom: 30,
    textDecorationLine: "underline",
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  signUpText: {
    color: "crimson",
    textDecorationLine: "underline",
  },
});

export default LoginScreen;
