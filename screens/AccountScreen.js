import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Image,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Icon = ({ name, style }) => (
  <Text style={[styles.iconPlaceholder, style]}>{name}</Text>
);

const MyProfileScreen = () => {
  const navigation = useNavigation();
  const legalLinks = [
    "ABOUT US",
    "TERMS OF USE",
    "PRIVACY POLICY",
    "EXCHANGE POLICY",
    "CANCELLATION POLICY",
    "REFUND POLICY",
  ];

  const goToEditProfile = () => navigation.navigate("EditProfile");
  const goToManageAddresses = () => navigation.navigate("ManageAddresses");
  const goToPaymentMethods = () => navigation.navigate("PaymentMethods");
  const goToHelpSupport = () => navigation.navigate("HelpSupport");

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={styles.header.backgroundColor}
      />
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Profile</Text>
        <View style={styles.headerRightPlaceholder} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
      >
        {/* Profile Card - Navigate to EditProfile */}
        <TouchableOpacity style={styles.card} onPress={goToEditProfile}>
          <View style={styles.profileInfoContainer}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <Image
                  source={require("../assets/profile.png")} // Ensure this path is correct
                  style={styles.logo}
                  resizeMode="cover"
                />
              </View>
              <View style={styles.cameraIconContainer}>
                <Ionicons name="camera-outline" size={12} color="#e91e63" />
              </View>
            </View>
            <View style={styles.profileTextContainer}>
              <Text style={styles.profileName}>Banana Bakery</Text>
              <Text style={styles.accountType}>Account Type</Text>
            </View>
          </View>
        </TouchableOpacity>

        <View style={[styles.card, styles.actionsCard]}>
          <View style={styles.actionsRow}>
            {/* My Account Button - Navigate to EditProfile */}
            <TouchableOpacity
              style={styles.actionButton}
              onPress={goToEditProfile}
            >
              <MaterialIcons
                name="person-outline"
                size={26}
                color="#777"
                style={styles.materialIconStyle}
              />
              <Text style={styles.actionText}>My Account</Text>
            </TouchableOpacity>
            {/* Addresses Button - Navigate to ManageAddresses */}
            <TouchableOpacity
              style={styles.actionButton}
              onPress={goToManageAddresses}
            >
              <MaterialIcons
                name="location-pin"
                size={26}
                color="#e91e63" // Use consistent pink
                style={styles.materialIconStyle}
              />
              <Text style={styles.actionText}>Addresses</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.actionsRow}>
            {/* Payments Button - Navigate to PaymentMethods */}
            <TouchableOpacity
              style={styles.actionButton}
              onPress={goToPaymentMethods}
            >
              <MaterialIcons
                name="credit-card"
                size={26}
                color="#1976D2"
                style={styles.materialIconStyle}
              />
              <Text style={styles.actionText}>Payments</Text>
            </TouchableOpacity>
            {/* Help & Support Button - Add navigation if needed */}
            <TouchableOpacity
              style={styles.actionButton}
              onPress={goToHelpSupport}
            >
              <MaterialIcons
                name="help-outline"
                size={20}
                color="#555"
                style={styles.materialIconStyle}
              />
              <Text style={styles.actionText}>Help & Support</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Legal Links Section */}
        <View style={styles.card}>
          {legalLinks.map((link, index) => (
            <TouchableOpacity key={index} style={styles.legalLinkItem}>
              <Text style={styles.legalLinkText}>{link}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Version & Logout Section */}
        <View style={[styles.card, styles.versionLogoutCard]}>
          <View style={styles.versionRow}>
            <Text style={styles.versionText}>VERSION</Text>
            <Text style={styles.versionNumber}>1.0</Text>
          </View>
          <TouchableOpacity style={styles.logoutButton}>
            <Text style={styles.logoutButtonText}>LOG OUT</Text>
            <MaterialIcons
              name="logout"
              size={20}
              color="#D32F2F"
              style={styles.logoutIcon}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f8bbd0",
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 15,
    backgroundColor: "#f8bbd0",
    marginBottom: 8,
  },
  backButton: {
    padding: 5,
  },
  backIcon: {
    fontSize: 24,
    color: "#333",
    marginBottom: 0,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    fontFamily: "Montserrat_400Regular",
  },
  headerRightPlaceholder: {
    width: 34, // Keep for balance if using space-between or centered title
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    marginHorizontal: 18,
    marginVertical: 8,
    paddingHorizontal: 15,
    paddingVertical: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  // Profile Section
  profileInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarContainer: {
    position: "relative",
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30, // Half of width/height for circle
    backgroundColor: "#E0E0E0", // Fallback background
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden", // **** ADD THIS **** Clips the image to the circle
  },
  // **** ADD THIS STYLE ****
  logo: {
    width: "100%", // Make image fill the avatar container
    height: "100%",
  },
  cameraIconContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 2,
    borderWidth: 1,
    borderColor: "#FADADD", // Lighter pink border
  },
  cameraIcon: {
    fontSize: 12,
    color: "#E57373", // Pinkish icon color
    marginBottom: 0, // Override iconPlaceholder margin if needed
  },
  profileTextContainer: {
    marginLeft: 15,
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    fontFamily: "Montserrat_400Regular",
  },
  accountType: {
    fontSize: 14,
    color: "#888",
    marginTop: 3,
    fontFamily: "Montserrat_400Regular",
  },
  arrowIcon: {
    fontSize: 26,
    color: "#AAAAAA",
    marginBottom: 0,
  },
  actionsCard: {
    paddingVertical: 6,
  },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 3,
  },
  actionButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    marginHorizontal: 4,
    backgroundColor: "#FFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#EEE",
  },
  iconPlaceholder: {
    fontSize: 18,
    marginBottom: 5,
  },
  actionText: {
    fontSize: 13,
    color: "#444",
    marginTop: 5,
    fontWeight: "500",
    fontFamily: "Montserrat_400Regular",
  },
  // Help & Support Section
  helpSupportCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    gap: 3,
  },
  helpIcon: {
    fontSize: 18,
    color: "#555",
    marginBottom: 0, // Override iconPlaceholder margin if needed
  },
  helpSupportText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    fontFamily: "Montserrat_400Regular",
  },
  legalLinkItem: {
    paddingVertical: 9,
    borderBottomWidth: 0, // No border in the example image
  },
  legalLinkText: {
    fontSize: 14,
    color: "#555",
    fontFamily: "Montserrat_400Regular",
  },
  // Version & Logout Section
  versionLogoutCard: {
    paddingHorizontal: 0,
    paddingVertical: 0,
    backgroundColor: "transparent",
    elevation: 0,
    shadowOpacity: 0,
    marginVertical: 8,
    marginHorizontal: 18, // Match other cards horizontal margin
  },
  versionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F5F5F5", // Light grey
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  versionText: {
    fontSize: 14,
    color: "#666",
    fontFamily: "Montserrat_400Regular",
  },
  versionNumber: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
    fontFamily: "Montserrat_400Regular",
  },
  logoutButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#E0E0E0", // Medium grey
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    marginTop: 1, // Small gap
  },
  logoutButtonText: {
    fontSize: 15,
    color: "#D32F2F", // Red
    fontWeight: "bold",
    fontFamily: "Montserrat_400Regular",
  },
  logoutIcon: {
    fontSize: 18,
    marginBottom: 0,
  },
});

export default MyProfileScreen;
