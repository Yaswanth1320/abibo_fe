import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native"; // Import the useNavigation hook

const HelpScreen = () => {
  const navigation = useNavigation(); // Get navigation object
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F2F2F2" />
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Help & Support</Text>
        </View>
        <ScrollView style={styles.optionsContainer}>
          <TouchableOpacity style={styles.option}>
            <Text style={styles.optionText}>Request Cancellation</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option}>
            <Text style={styles.optionText}>Request Exchange</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option}>
            <Text style={styles.optionText}>FAQs</Text>
            <Text style={styles.optionSubText}>
              Common questions and answers
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option}>
            <Text style={styles.optionText}>Account Issues</Text>
            <Text style={styles.optionSubText}>
              Login, profile, or payment problems
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option}>
            <Text style={styles.optionText}>Shipping & Delivery</Text>
            <Text style={styles.optionSubText}>
              Delivery status and tracking issues
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option}>
            <Text style={styles.optionText}>Other Issues</Text>
            <Text style={styles.optionSubText}>
              Any other questions or concerns
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F2F2F2",
  },
  container: {
    flex: 1,
    backgroundColor: "#F2F2F2", // Set light gray background
    padding: 20, // Adjust overall padding for spacing
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    marginBottom: 20,
  },
  backButton: {
    marginRight: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    fontFamily: "Montserrat_400Regular",
  },
  optionsContainer: {
    flex: 1,
  },
  option: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 25,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  optionText: {
    fontSize: 18,
    color: "black",
    marginBottom: 4,
    fontFamily: "Montserrat_400Regular",
  },
  optionSubText: {
    fontSize: 12,
    color: "gray",
    fontFamily: "Montserrat_400Regular",
  },
});

export default HelpScreen;
