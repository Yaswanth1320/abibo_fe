import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const BestSellers = () => {
  const staticProducts = [
    {
      id: "5",
      brandName: "Brand1",
      productName: "Product 1",
      description: "Product 1 Description",
      rating: 4.9,
      image: require("../assets/cupcakes.jpg"),
    },
    {
      id: "6",
      brandName: "Brand2",
      productName: "Product 2",
      description: "Product 2 Description",
      rating: 4.8,
      image: require("../assets/cookies.jpeg"),
    },
    {
      id: "7",
      brandName: "Brand3",
      productName: "Product 3",
      description: "Product 3 Description",
      rating: 4.1,
      image: require("../assets/pan.webp"),
    },
    {
      id: "8",
      brandName: "Brand4",
      productName: "Product 4",
      description: "Product 4 Description",
      rating: 4.5,
      image: require("../assets/dough.jpg"),
    },
    {
      id: "9",
      brandName: "Brand5",
      productName: "Product 5",
      description: "Product 5 Description",
      rating: 4.3,
      image: require("../assets/cakes.jpg"),
    },
    {
      id: "10",
      brandName: "Brand6",
      productName: "Product 6",
      description: "Product 6 Description",
      rating: 4.0,
      image: require("../assets/flour.webp"),
    },
  ];

  return (
    <View style={styles.sectionContainer}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Best Sellers</Text>
        <TouchableOpacity>
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.topRatedContainer}>
        {staticProducts.map((item) => (
          <View style={styles.topRatedItem} key={item.id}>
            <Image
              source={item.image}
              style={styles.topRatedImage}
              resizeMode="cover"
            />
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={12} color="white" />
              <Text style={styles.rating}>{item.rating}</Text>
            </View>
            <Text style={styles.topRatedProduct}>{item.productName}</Text>
            <Text style={styles.topRatedSeller}>{item.brandName}</Text>
            <Text style={styles.topRatedDescription}>{item.description}</Text>
            <TouchableOpacity style={styles.shopNowButton}>
              <Text style={styles.shopNowText}>Buy Now</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 25,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    fontFamily: "Montserrat_400Regular",
  },
  viewAll: {
    color: "crimson",
    textDecorationLine: "underline",
  },
  topRatedContainer: {
    paddingHorizontal: 13,
    marginBottom: 20,
    flexDirection: "row", //Make sure this was add
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "flex-start",
  },
  topRatedItem: {
    backgroundColor: "whitesmoke",
    width: "44%",
    height: 268,
    marginHorizontal: 3,
    marginBottom: 20,
    borderRadius: 23,
    position: "relative",
  },
  topRatedImage: {
    width: "100%",
    height: 160,
    borderTopLeftRadius: 23,
    borderTopRightRadius: 23,
    marginBottom: 4,
  },
  topRatedSeller: {
    fontSize: 11,
    color: "#B33771",
    paddingLeft: 6,
    fontFamily: "Montserrat_400Regular",
    marginBottom: 8,
  },
  topRatedProduct: {
    fontSize: 14,
    fontWeight: "bold",
    paddingLeft: 5,
    marginTop: 2,
    marginBottom: 2,
    fontFamily: "Montserrat_400Regular",
  },
  ratingContainer: {
    position: "absolute", // Absolut
    top: 10, // Place it 10 pixels from the top
    right: 10, // and 10 pixels from the right
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 25,
    backgroundColor: "rgba(205, 92, 92, 0.73)",
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 2,
    paddingBottom: 2,
  },
  rating: {
    fontSize: 11,
    color: "white",
    marginLeft: 2,
  },
  topRatedDescription: {
    fontSize: 12,
    color: "#555",
    paddingLeft: 6,
    fontFamily: "Montserrat_400Regular",
  },
  shopNowButton: {
    backgroundColor: "crimson",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    marginTop: 12,
    width: "50%",
    marginLeft: 7,
  },
  shopNowText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "bold",
    fontFamily: "Montserrat_400Regular",
  },
});

export default BestSellers;
