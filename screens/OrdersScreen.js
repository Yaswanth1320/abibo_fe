import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";

//Import Images from Assests
import cookie from "../assets/cookies.jpeg";
import cake from "../assets/cake.jpg";
import cupcake from "../assets/cupcakes.jpg";

const OrdersScreen = () => {
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  const orders = [
    {
      id: "ORD-2025-03127",
      date: "March 19, 2025",
      items: 5,
      paymentMethod: "Paid UPI",
      totalAmount: "₹15,999",
      status: "Delivered",
      itemImages: [cookie, cake, cupcake],
      products: [
        { name: "Premium Flour (25kg)", quantity: 5, price: 1299 },
        { name: "Cocoa Powder (5kg)", quantity: 3, price: 1800 },
        { name: "Vanilla Essence (1L)", quantity: 2, price: 950 },
        { name: "Premium Flour (25kg)", quantity: 1, price: 1250 },
        { name: "Premium Flour (25kg)", quantity: 1, price: 454 },
      ],
      deliveryInfo: {
        address:
          "87-2-47, Lakshmi Nagar Main Road, Chennai, Tamil Nadu - 600083",
        method: "Standard Shipping",
        tracking: "TGSCW36738873",
        status: "Delivered",
      },
    },
    {
      id: "ORD-2025-03094",
      date: "March 15, 2025",
      items: 7,
      paymentMethod: "Paid Net Banking",
      totalAmount: "₹23,499",
      status: "Shipped",
      itemImages: [cake, cupcake, cookie],
      products: [
        { name: "Cocoa Powder (5kg)", quantity: 2, price: 1800 },
        { name: "Vanilla Essence (1L)", quantity: 1, price: 950 },
      ],
      deliveryInfo: {
        address: "Some other address",
        method: "Express Shipping",
        tracking: "TRACK123",
        status: "Shipped",
      },
    },
    {
      id: "ORD-2025-02986",
      date: "March 02, 2025",
      items: 3,
      paymentMethod: "Unpaid Credit Card",
      totalAmount: "₹35,450",
      status: "Pending",
      itemImages: [cupcake, cookie, cake],
      products: [{ name: "Cupcake Mix", quantity: 3, price: 500 }],
      deliveryInfo: null,
    },
  ];

  const toggleOrderDetails = (orderId) => {
    setExpandedOrderId((prevId) => (prevId === orderId ? null : orderId));
  };

  const renderOrderItem = (order) => {
    let statusColor = "gray";
    if (order.status === "Delivered") {
      statusColor = "green";
    } else if (order.status === "Shipped") {
      statusColor = "skyblue";
    } else {
      statusColor = "purple";
    }

    const isExpanded = expandedOrderId === order.id;

    return (
      <View style={styles.mainContainer} key={order.id}>
        <View style={styles.orderContainer}>
          <View>
            <Text style={styles.orderId}>{order.id}</Text>
            <Text style={styles.orderDate}>{order.date}</Text>
            <View style={styles.itemImages}>
              {order.itemImages.slice(0, 3).map((image, index) => (
                <Image key={index} source={image} style={styles.itemImage} />
              ))}
              {order.items > 3 && (
                <Text style={[styles.moreItems, { marginLeft: 3 }]}>
                  +{order.items - 3}
                </Text>
              )}
            </View>
            <Text style={styles.paymentMethod}>{order.paymentMethod}</Text>
          </View>
          <View style={styles.rightSection}>
            <Text style={[styles.status, { backgroundColor: statusColor }]}>
              {order.status}
            </Text>
            <Text style={styles.amount}>{order.totalAmount}</Text>
            <TouchableOpacity onPress={() => toggleOrderDetails(order.id)}>
              <Ionicons
                name={
                  isExpanded ? "chevron-up-outline" : "chevron-down-outline"
                }
                size={24}
                color="black"
              />
            </TouchableOpacity>
          </View>
        </View>

        {isExpanded && (
          <View
            style={[
              styles.orderDetails,
              isExpanded && styles.expandedOrderDetails,
            ]}
          >
            <Text style={styles.productsTitle}>Products</Text>
            {order.products.map((product, index) => (
              <View style={styles.productItem} key={index}>
                <Image source={cookie} style={styles.productImage} />
                <Text style={styles.productName}>
                  {product.name}
                  {"\n"}
                  <Text style={styles.productQuantity}>
                    {product.quantity} x ₹{product.price}
                  </Text>
                </Text>
                <Text style={styles.productPrice}>
                  ₹{product.quantity * product.price}
                </Text>
              </View>
            ))}

            {order.deliveryInfo && (
              <View style={styles.deliveryInfoContainer}>
                <Text style={styles.deliveryInfoHeader}>
                  Delivery Information
                </Text>
                <Text>{order.deliveryInfo.address}</Text>
                <Text>Method: {order.deliveryInfo.method}</Text>
                <Text>Tracking: {order.deliveryInfo.tracking}</Text>
                <Text>Status: {order.deliveryInfo.status}</Text>
              </View>
            )}

            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.reorderButton}>
                <Ionicons name="repeat" size={16} color="white" />
                <Text style={styles.reorderButtonText}> Reorder</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.invoiceButton}>
                <Ionicons name="download" size={16} color="black" />
                <Text style={styles.invoiceButtonText}> Invoice</Text>
              </TouchableOpacity>
            </View>
            {order.status === "Delivered" ? (
              <TouchableOpacity style={styles.requestExchangeButton}>
                <Ionicons name="repeat" size={16} color="black" />
                <Text style={styles.requestExchangeButtonText}>
                  {" "}
                  Request Exchange
                </Text>
              </TouchableOpacity>
            ) : order.status === "Pending" ? (
              <TouchableOpacity style={styles.cancelOrderButton}>
                <Ionicons name="close-circle" size={16} color="black" />
                <Text style={styles.cancelOrderButtonText}> Cancel Order</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>My Orders</Text>
        </View>
        <View style={styles.searchContainer}>
          <Ionicons
            name="search"
            size={20}
            color="gray"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search orders or products"
          />
        </View>

        <ScrollView contentContainerStyle={styles.ordersListContainer}>
          {orders.map((order) => renderOrderItem(order))}
        </ScrollView>
        {/* Filter Button */}
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="funnel" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    marginBottom: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 20,
    height: 50,
    fontFamily: "Montserrat_400Regular",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
    fontFamily: "Montserrat_400Regular",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontFamily: "Montserrat_400Regular",
  },
  ordersListContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  orderContainer: {
    backgroundColor: "#f8f8f5",
    borderRadius: 10,
    padding: 15,
    marginBottom: 0,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  orderId: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Montserrat_400Regular",
    marginBottom: 3,
  },
  orderDate: {
    fontSize: 14,
    color: "gray",
    fontFamily: "Montserrat_400Regular",
  },
  itemImages: {
    flexDirection: "row",
    marginTop: 5,
    alignItems: "center",
  },
  itemImage: {
    width: 25,
    height: 25,
    borderRadius: 5,
    marginRight: 3,
  },
  moreItems: {
    fontSize: 12,
    color: "gray",
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
    padding: 5,
    marginLeft: 3,
  },
  paymentMethod: {
    fontSize: 13,
    color: "gray",
    marginTop: 5,
    fontFamily: "Montserrat_400Regular",
  },
  rightSection: {
    alignItems: "flex-end",
  },
  status: {
    fontSize: 12,
    color: "white",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 5,
    fontFamily: "Montserrat_400Regular",
  },
  amount: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
    fontFamily: "Montserrat_400Regular",
  },
  filterButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#e91e63",
    borderRadius: 30,
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },

  orderDetails: {
    borderRadius: 10, // Added borderRadius
    padding: 15, // Added padding
    marginTop: 0, // Removed marginTop
    marginBottom: 15, // Added marginBottom
    backgroundColor: "#f8f8f5", // Added background color and its same as main container
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  productsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 6,
    fontFamily: "Montserrat_400Regular",
  },
  productItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  productImage: {
    width: 40,
    height: 40,
    borderRadius: 5,
    marginRight: 10,
  },
  productName: {
    fontSize: 14,
    flex: 1,
    fontFamily: "Montserrat_400Regular",
  },
  productQuantity: {
    fontSize: 12,
    color: "gray",
  },
  productPrice: {
    fontSize: 14,
    fontWeight: "bold",
    fontFamily: "Montserrat_400Regular",
  },
  deliveryInfoContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
  },
  deliveryInfoHeader: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
    fontFamily: "Montserrat_400Regular",
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    gap: 5,
  },
  reorderButton: {
    flex: 1,
    backgroundColor: "#e91e63",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
  },
  reorderButtonText: {
    color: "white",
    fontFamily: "Montserrat_400Regular",
  },
  invoiceButton: {
    flex: 1,
    backgroundColor: "#ddd",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
  },
  invoiceButtonText: {
    fontFamily: "Montserrat_400Regular",
  },
  requestExchangeButton: {
    marginTop: 10,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  requestExchangeButtonText: {
    fontFamily: "Montserrat_400Regular",
  },
  cancelOrderButton: {
    marginTop: 10,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  cancelOrderButtonText: {
    fontFamily: "Montserrat_400Regular",
  },
  expandedOrderDetails: {
    borderBottomLeftRadius: 0, // Remove bottom-left radius when expanded
    borderBottomRightRadius: 0, // Remove bottom-right radius when expanded
  },
});

export default OrdersScreen;
