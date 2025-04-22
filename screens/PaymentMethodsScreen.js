import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Image,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const PaymentMethodsScreen = () => {
  const navigation = useNavigation();

  const handleAddNewPaymentMethod = () => {
    navigation.navigate("AddNewPaymentMethod");
  };

  const savedCards = [
    {
      id: "1",
      type: "Credit Card",
      last4: "4567",
      expiry: "12/25",
      isDefault: true,
      logo: require("../assets/visa.png"),
    },
    {
      id: "2",
      type: "Debit Card",
      last4: "4567",
      expiry: "12/25",
      isDefault: false,
      logo: require("../assets/mastercard.jpg"),
    },
  ];
  const upiDetails = { id: "upi1", upiId: "johndoe@bank", isVerified: true };

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

      <TouchableOpacity
        style={styles.addButton}
        onPress={handleAddNewPaymentMethod}
      >
        <Ionicons name="add" size={20} color="#fff" />
        <Text style={styles.addButtonText}>Add New Payment Method</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Saved Cards</Text>
          {savedCards.map((card) => (
            <View style={styles.cardItem} key={card.id}>
              <Image
                source={card.logo}
                style={styles.cardLogo}
                resizeMode="contain"
              />
              <View style={styles.cardDetails}>
                <Text style={styles.cardType}>{card.type}</Text>
                <Text style={styles.cardNumber}>
                  **** **** **** {card.last4}
                </Text>
                <Text style={styles.cardExpiry}>Exp: {card.expiry}</Text>
              </View>
              <View style={styles.cardActions}>
                {card.isDefault && (
                  <View style={styles.defaultBadge}>
                    <Ionicons name="checkmark-circle" size={14} color="green" />
                    <Text style={styles.defaultText}>Default</Text>
                  </View>
                )}
                <TouchableOpacity style={styles.actionIcon}>
                  <MaterialIcons name="edit" size={18} color="gray" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionIcon}>
                  <MaterialIcons name="delete" size={18} color="red" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* UPI Details Section */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>UPI Details</Text>
          <View style={styles.upiItem}>
            <View style={styles.upiDetails}>
              <Text style={styles.upiLabel}>UPI ID</Text>
              <Text style={styles.upiId}>{upiDetails.upiId}</Text>
            </View>
            <View style={styles.upiActions}>
              {upiDetails.isVerified && (
                <View style={styles.verifiedBadge}>
                  <Ionicons name="checkmark-circle" size={14} color="green" />
                  <Text style={styles.verifiedText}>Verified</Text>
                </View>
              )}
              <TouchableOpacity style={styles.actionIcon}>
                <MaterialIcons name="delete" size={18} color="red" />
              </TouchableOpacity>
            </View>
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
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e91e63",
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 20,
    marginVertical: 20,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
    fontFamily: "Montserrat_400Regular",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  sectionCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 18,
    color: "#333",
    fontFamily: "Montserrat_400Regular",
  },
  cardItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  cardLogo: {
    width: 40,
    height: 25,
    marginRight: 15,
  },
  cardDetails: {
    flex: 1,
  },
  cardType: {
    fontSize: 14,
    fontWeight: "500",
    color: "#444",
    fontFamily: "Montserrat_400Regular",
  },
  cardNumber: {
    fontSize: 13,
    color: "gray",
    marginTop: 2,
    fontFamily: "Montserrat_400Regular",
  },

  cardExpiry: {
    fontSize: 12,
    color: "gray",
    marginTop: 2,
    fontFamily: "Montserrat_400Regular",
  },
  cardActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  defaultBadge: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  defaultText: {
    fontSize: 12,
    color: "green",
    marginLeft: 3,
    fontFamily: "Montserrat_400Regular",
  },
  actionIcon: {
    marginLeft: 10,
    padding: 3,
  },
  upiItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  upiDetails: {},
  upiLabel: {
    fontSize: 13,
    color: "gray",
    fontFamily: "Montserrat_400Regular",
    marginBottom: 2,
  },
  upiId: {
    fontSize: 15,
    color: "#333",
    marginTop: 2,
    fontFamily: "Montserrat_400Regular",
  },
  upiActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  verifiedBadge: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  verifiedText: {
    fontSize: 12,
    color: "green",
    marginLeft: 3,
    fontFamily: "Montserrat_400Regular",
  },
});

export default PaymentMethodsScreen;
