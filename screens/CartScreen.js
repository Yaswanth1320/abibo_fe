import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const CartScreen = () => {
  const navigation = useNavigation();

  const [cartItems, setCartItems] = useState([
    {
      id: "1",
      name: "Product A",
      variant: "Variant 1",
      price: 99,
      quantity: 1,
      image: require("../assets/cupcakes.jpg"),
    },
    {
      id: "2",
      name: "Product B",
      variant: "Variant 2",
      price: 99,
      quantity: 2,
      image: require("../assets/cookies.jpeg"),
    },
    {
      id: "3",
      name: "Product C",
      variant: "Variant 3",
      price: 99,
      quantity: 1,
      image: require("../assets/pan.webp"),
    },
    {
      id: "4",
      name: "Product D",
      variant: "Variant 3",
      price: 70,
      quantity: 1,
      image: require("../assets/flour.webp"),
    },
    // ... more items
  ]);

  const [couponCode, setCouponCode] = useState("");

  const wholeWheatFlour = 490;
  const casterSugar = 340;
  const subtotal = 830;
  const taxRate = 0.05;
  const deliveryFee = 200;

  const tax = subtotal * taxRate;
  const total = subtotal + tax + deliveryFee;

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity < 1) return;

    setCartItems(
      cartItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (itemId) => {
    setCartItems(cartItems.filter((item) => item.id !== itemId));
  };

  const handleApplyCoupon = () => {
    console.log(`Applying coupon: ${couponCode}`);
  };

  const handleProceedToBuy = () => {
    console.log("Proceeding to checkout");
    navigation.navigate("DeliveryDetails", { totalAmount: total }); 
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  const commonTextStyle = {
    fontFamily: "Montserrat_400Regular",
  };

  const SummaryText = ({ label, value, detail = null }) => (
    <View style={styles.orderSummaryItem}>
      <View>
        <Text style={[styles.orderSummaryLabel, commonTextStyle]}>{label}</Text>
        {detail && (
          <Text style={[styles.orderSummaryDetail, commonTextStyle]}>
            {detail}
          </Text>
        )}
      </View>
      <Text style={[styles.orderSummaryValue, commonTextStyle]}>{value}</Text>
    </View>
  );
  const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: "#fff",
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 10,
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: "#ddd",
      justifyContent: "space-between",
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#333",
      ...commonTextStyle,
    },
    container: {
      flex: 1,
    },
    cartItemContainer: {
      paddingHorizontal: 10,
      marginBottom: 5,
    },
    discountBar: {
      backgroundColor: "palevioletred",
      padding: 8,
      marginBottom: 10,
      alignItems: "center",
      width: "100%",
    },
    discountText: {
      color: "white",
      fontSize: 14,
      ...commonTextStyle,
    },
    cartItem: {
      backgroundColor: "#f5f5f5",
      borderRadius: 10,
      padding: 8,
      marginBottom: 10,
      flexDirection: "row",
      alignItems: "center",
    },
    itemImage: {
      width: 80,
      height: 80,
      borderRadius: 10,
      marginRight: 10,
    },
    itemDetails: {
      flex: 1,
    },
    itemName: {
      fontSize: 16,
      fontWeight: "bold",
      ...commonTextStyle,
    },
    itemVariant: {
      fontSize: 14,
      color: "#666",
      ...commonTextStyle,
    },
    itemPrice: {
      fontSize: 16,
      fontWeight: "bold",
      textAlign: "right",
      ...commonTextStyle,
    },
    quantityContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 3,
      backgroundColor: "whitesmoke",
      borderRadius: 10,
      marginBottom: 3,
    },
    quantityButton: {
      fontSize: 20,
      paddingHorizontal: 10,
      ...commonTextStyle,
      backgroundColor: "#ddd",
      borderRadius: 5,
    },
    quantity: {
      fontSize: 16,
      marginHorizontal: 5,
      width: 30,
      textAlign: "center",
      backgroundColor: "white",
      borderRadius: 5,
      ...commonTextStyle,
    },
    perUnit: {
      fontSize: 12,
      color: "#888",
      ...commonTextStyle,
    },

    removeButton: {
      backgroundColor: "#ddd",
      borderRadius: 5,
      paddingHorizontal: 8,
      paddingVertical: 3,
      marginLeft: 5,
      marginTop: 20,
    },
    removeText: {
      fontSize: 12,
      color: "#555",
      textAlign: "center",
      ...commonTextStyle,
    },
    couponHeader: {
      ...commonTextStyle,
      fontSize: 15,
      marginLeft: 11,
      marginBottom: 1,
    },
    couponContainer: {
      backgroundColor: "#f5f5f5",
      borderRadius: 10,
      padding: 12,
      marginBottom: 10,
      marginHorizontal: 10,
    },
    couponInputContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 6,
    },
    couponInput: {
      flex: 1,
      backgroundColor: "white",
      borderRadius: 5,
      padding: 8,
      marginRight: 10,
      ...commonTextStyle,
    },
    applyCouponButton: {
      backgroundColor: "crimson",
      borderRadius: 5,
      padding: 8,
    },
    applyCouponText: {
      color: "white",
      fontSize: 14,
      textAlign: "center",
      ...commonTextStyle,
    },
    couponNotice: {
      fontSize: 14,
      marginTop: 6,
      color: "#666",
      ...commonTextStyle,
      padding: 12,
      borderWidth: 1,
      borderColor: "#888",
      borderRadius: 5,
    },
    orderSummaryContainer: {
      backgroundColor: "#f5f5f5",
      borderRadius: 10,
      padding: 10,
      marginHorizontal: 10,
      marginBottom: 12,
      borderWidth: 1, // Added border
      borderColor: "#ddd", // Added border color
    },
    summaryHeader: {
      marginBottom: 5,
      ...commonTextStyle,
    },
    orderSummaryItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 6,
    },
    orderSummaryLabel: {
      fontSize: 14,
      color: "#333",
      ...commonTextStyle,
    },
    orderSummaryValue: {
      fontSize: 14,
      fontWeight: "bold",
      ...commonTextStyle,
    },
    total: {
      flexDirection: "row",
      justifyContent: "space-between",
      fontWeight: "bold",
      fontSize: 16,
      ...commonTextStyle,
    },
    proceedButton: {
      backgroundColor: "crimson",
      borderRadius: 10,
      marginHorizontal: 10,
      padding: 15,
      alignItems: "center",
    },
    proceedText: {
      color: "white",
      fontSize: 16,
      fontWeight: "bold",
      ...commonTextStyle,
    },
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cart</Text>
        <View />
        {/* Placeholder for right-side item */}
      </View>

      <ScrollView style={styles.container}>
        <View style={styles.discountBar}>
          <Text style={styles.discountText}>
            Shop ₹500 more to get 10% discount!
          </Text>
        </View>

        <View style={styles.cartItemContainer}>
          {cartItems.map((item) => (
            <View style={styles.cartItem} key={item.id}>
              <Image source={item.image} style={styles.itemImage} />
              <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemVariant}>{item.variant}</Text>
                <View style={styles.quantityContainer}>
                  <TouchableOpacity
                    onPress={() =>
                      handleQuantityChange(item.id, item.quantity - 1)
                    }
                  >
                    <Text style={styles.quantityButton}>−</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantity}>{item.quantity}</Text>
                  <TouchableOpacity
                    onPress={() =>
                      handleQuantityChange(item.id, item.quantity + 1)
                    }
                  >
                    <Text style={styles.quantityButton}>+</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.perUnit}>₹9 Per Unit</Text>
              </View>
              <View>
                <Text style={styles.itemPrice}>
                  ₹{item.price * item.quantity}
                </Text>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => handleRemoveItem(item.id)}
                >
                  <Text style={styles.removeText}>Remove</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        <Text style={styles.couponHeader}>Apply Coupon</Text>

        <View style={styles.couponContainer}>
          <View style={styles.couponInputContainer}>
            <TextInput
              style={styles.couponInput}
              placeholder="Enter coupon code"
              value={couponCode}
              onChangeText={(text) => setCouponCode(text)}
            />
            <TouchableOpacity
              style={styles.applyCouponButton}
              onPress={handleApplyCoupon}
            >
              <Text style={styles.applyCouponText}>Apply Coupon</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.couponNotice}>
            Get Extra 20% off upto ₹2000 on a cart value of ₹10000 and above
          </Text>
        </View>

        <Text
          style={{
            color: "#555",
            textAlign: "center",
            ...commonTextStyle,
            marginHorizontal: 10,
            padding: 4,
            borderWidth: 1,
            borderColor: "#ddd",
            borderRadius: 5,
            marginBottom: 5,
          }}
        >
          Order above ₹1500 to get free shipping
        </Text>

        <View style={styles.orderSummaryContainer}>
          <Text style={styles.summaryHeader}>Order Summary</Text>
          <SummaryText
            label="Whole Wheat Flour 5kg"
            value="₹490"
            detail="₹245 x 2"
          />
          <SummaryText label="Caster Sugar 1kg" value="₹340" detail="₹85 x 4" />
          <SummaryText label="Subtotal" value={`₹${subtotal}`} />
          <SummaryText label="Tax (5%)" value={`₹${tax.toFixed(2)}`} />
          <SummaryText label="Delivery fee" value={`₹${deliveryFee}`} />
          <View
            style={{
              borderBottomColor: "black",
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          />
          <SummaryText label="Total" value={`₹${total.toFixed(2)}`} />
        </View>

        <TouchableOpacity
          style={styles.proceedButton}
          onPress={handleProceedToBuy}
        >
          <Text style={styles.proceedText}>Proceed to Buy</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CartScreen;
