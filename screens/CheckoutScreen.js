import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Feather from "react-native-vector-icons/Feather"; // For edit icon

const CheckoutScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const totalAmount = route.params?.totalAmount || 1071;

  const [selectedPayment, setSelectedPayment] = useState("Net Banking"); // Default selected

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleEditCart = () => {
    navigation.goBack(); // Or navigate specifically to Cart screen if needed
  };

  const handleConfirmOrder = () => {
    console.log("Order Confirmed!");
    console.log("Selected Payment:", selectedPayment);
    console.log("Total Amount:", totalAmount);
  };

  const PaymentOption = ({
    iconType,
    iconName,
    imageSource,
    label,
    offer,
    value,
    isSelected,
    onPress,
  }) => (
    <TouchableOpacity
      style={[styles.paymentOption, isSelected && styles.selectedPaymentOption]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.paymentOptionContent}>
        {imageSource ? (
          <Image
            source={imageSource}
            style={styles.paymentImage}
            resizeMode="contain"
          />
        ) : (
          <IconRenderer
            iconType={iconType}
            name={iconName}
            size={24}
            color="#555"
          />
        )}
        <Text style={styles.paymentLabel}>{label}</Text>
        {offer && (
          <View style={styles.offerBadge}>
            <Text style={styles.offerText}>{offer}</Text>
          </View>
        )}
      </View>
      {isSelected && (
        <Ionicons
          name="checkmark-circle"
          size={24}
          color="#E91E63"
          style={styles.checkmark}
        />
      )}
    </TouchableOpacity>
  );

  const IconRenderer = ({ iconType, name, size, color }) => {
    switch (iconType) {
      case "Ionicons":
        return <Ionicons name={name} size={size} color={color} />;
      case "MaterialCommunityIcons":
        return <MaterialCommunityIcons name={name} size={size} color={color} />;
      default:
        return <Ionicons name={name} size={size} color={color} />; // Default to Ionicons
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Ionicons name="arrow-back" size={20} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Checkout</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons
              name="map-marker-outline"
              size={20}
              color="#555"
            />
            <Text style={styles.sectionTitle}>Delivery Details</Text>
          </View>
          <View style={styles.addressBox}>
            <Text style={styles.addressType}>Shipping address</Text>
            <Text style={styles.addressLabel}>Home</Text>
            <Text style={styles.addressText}>
              87-2-47, Lakshmi Nagar Main Road, Chennai, Tamil Nadu – 600083
            </Text>
            <Text style={styles.addressText}>+91 8976543322</Text>
          </View>
          <View style={styles.addressBox}>
            <Text style={styles.addressType}>Billing address</Text>
            <Text style={styles.addressLabel}>Office</Text>
            <Text style={styles.addressText}>
              87-2-47, Lakshmi Nagar Main Road, Chennai, Tamil Nadu – 600083
            </Text>
            <Text style={styles.addressText}>+91 8976543322</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          <View style={styles.summaryRow}>
            <View>
              <Text style={styles.summaryItem}>Whole Wheat Flour 5kg</Text>
              <Text style={styles.summaryDetail}>₹245 x 2</Text>
            </View>
            <Text style={styles.summaryAmount}>₹490</Text>
          </View>
          <View style={styles.summaryRow}>
            <View>
              <Text style={styles.summaryItem}>Caster Sugar 1kg</Text>
              <Text style={styles.summaryDetail}>₹85 x 4</Text>
            </View>
            <Text style={styles.summaryAmount}>₹340</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryAmount}>₹830</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Tax (5%)</Text>
            <Text style={styles.summaryAmount}>₹41.50</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Delivery fee</Text>
            <Text style={styles.summaryAmount}>₹200</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, styles.totalLabel]}>
              Total Payable
            </Text>
            <Text style={[styles.summaryAmount, styles.totalAmount]}>
              ₹{totalAmount}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle]}>Payment Options</Text>
          <PaymentOption
            iconType="Ionicons"
            iconName="card-outline"
            label="UPI"
            offer="5% OFF"
            value="UPI"
            isSelected={selectedPayment === "UPI"}
            onPress={() => setSelectedPayment("UPI")}
          />
          <PaymentOption
            iconType="Ionicons"
            iconName="card-outline"
            label="Credit/Debit Card"
            offer="3% OFF"
            value="Card"
            isSelected={selectedPayment === "Card"}
            onPress={() => setSelectedPayment("Card")}
          />
          <PaymentOption
            iconType="MaterialCommunityIcons"
            iconName="bank-outline"
            label="Net Banking"
            offer="3% OFF"
            value="Net Banking"
            isSelected={selectedPayment === "Net Banking"}
            onPress={() => setSelectedPayment("Net Banking")}
          />
          <PaymentOption
            iconType="Ionicons"
            iconName="cash-outline"
            label="Cash on Delivery"
            value="COD"
            isSelected={selectedPayment === "COD"}
            onPress={() => setSelectedPayment("COD")}
          />
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="wallet-outline" size={20} color="#555" />
            <Text style={styles.sectionTitle}>Pay on Credit</Text>
          </View>
          <View style={styles.creditDetailsBox}>
            <View style={styles.creditRow}>
              <Text style={styles.creditLabel}>Total Credit Limit</Text>
              <Text style={styles.creditValue}>₹XXXXXX</Text>
            </View>
            <View style={styles.creditRow}>
              <Text style={styles.creditLabel}>Available Credit</Text>
              <Text style={styles.creditValue}>₹XXXXXX</Text>
            </View>
            <View style={styles.creditRow}>
              <Text style={styles.creditLabel}>Credit Score</Text>
              <Text style={styles.creditValue}>₹XXXXXX</Text>
            </View>
            <View style={styles.remainingCreditBar}>
              <Text style={styles.remainingCreditText}>
                ₹9953.53 Credit Remaining
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Footer Buttons */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.editButton} onPress={handleEditCart}>
          <Feather name="edit" size={16} color="#555" style={styles.editIcon} />
          <Text style={styles.editButtonText}>Edit Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={handleConfirmOrder}
        >
          <Text style={styles.confirmButtonText}>
            Confirm Order (₹{totalAmount})
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    justifyContent: "space-between",
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    fontFamily: "Montserrat_400Regular",
  },
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8", // Light gray background for content area
  },
  scrollContent: {
    paddingBottom: 100, // Ensure space for footer
    padding: 8, // Padding around all content
  },
  section: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 15,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#EDEDED", // Subtle border for sections
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    fontFamily: "Montserrat_400Regular",
  },
  addressBox: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 6,
    padding: 8,
    marginBottom: 10,
    backgroundColor: "#FDFDFD",
  },
  addressType: {
    fontSize: 13,
    fontWeight: "600",
    color: "#444",
    marginBottom: 2,
    fontFamily: "Montserrat_400Regular",
  },
  addressLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  addressText: {
    fontSize: 14,
    color: "#555",
    lineHeight: 20,
    fontFamily: "Montserrat_400Regular",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
    paddingVertical: 2,
  },
  summaryItem: {
    fontSize: 14,
    color: "#444",
    fontFamily: "Montserrat_400Regular",
    marginTop: 2,
  },
  summaryDetail: {
    fontSize: 12,
    color: "#777",
    fontFamily: "Montserrat_400Regular",
  },
  summaryLabel: {
    fontSize: 14,
    color: "#444",
    fontWeight: "500",
    fontFamily: "Montserrat_400Regular",
  },
  summaryAmount: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
    fontFamily: "Montserrat_400Regular",
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    fontFamily: "Montserrat_400Regular",
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    fontFamily: "Montserrat_400Regular",
  },
  divider: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginVertical: 6,
  },
  paymentOption: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    marginBottom: 10,
  },
  selectedPaymentOption: {
    borderColor: "#E91E63",
    borderWidth: 1.5,
    backgroundColor: "#FFF8FA",
  },
  paymentOptionContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  paymentImage: {
    width: 40,
    height: 24,
    marginRight: 12,
  },
  paymentLabel: {
    fontSize: 15,
    fontWeight: "500",
    color: "#333",
    marginLeft: 10,
    flexShrink: 1,
    fontFamily: "Montserrat_400Regular",
  },
  offerBadge: {
    backgroundColor: "#D7F9E0", // Light green
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 8,
  },
  offerText: {
    color: "#2E7D32", // Darker green
    fontSize: 12,
    fontWeight: "bold",
    fontFamily: "Montserrat_400Regular",
  },
  checkmark: {
    marginLeft: 10, // Space before the checkmark
  },
  creditDetailsBox: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 6,
    padding: 12,
    marginTop: 5, // Space below section title
    backgroundColor: "#FDFDFD",
  },
  creditRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  creditLabel: {
    fontSize: 14,
    color: "#666",
    fontFamily: "Montserrat_400Regular",
  },
  creditValue: {
    fontSize: 14,
    color: "#444",
    fontWeight: "500",
    fontFamily: "Montserrat_400Regular",
  },
  remainingCreditBar: {
    backgroundColor: "#D7F9E0", // Light green
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginTop: 10,
    alignItems: "center",
  },
  remainingCreditText: {
    color: "#2E7D32", // Darker green
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "Montserrat_400Regular",
  },
  footer: {
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    backgroundColor: "#FFFFFF",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    marginBottom: 20,
  },
  editButton: {
    flex: 1,
    flexDirection: "row", // To place icon next to text
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E0E0E0", // Gray background
    paddingVertical: 14,
    borderRadius: 8,
    marginRight: 5, // Space between buttons
  },
  editIcon: {
    marginRight: 5,
  },
  editButtonText: {
    color: "#333", // Darker text
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Montserrat_400Regular",
  },
  confirmButton: {
    flex: 1.5, // Make confirm button slightly wider
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E91E63", // Pink background
    paddingVertical: 14,
    borderRadius: 8,
    marginLeft: 5, // Space between buttons
  },
  confirmButtonText: {
    color: "#FFFFFF", // White text
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Montserrat_400Regular",
  },
});

export default CheckoutScreen;
