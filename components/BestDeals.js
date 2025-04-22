import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

const BestDeals = () => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  function calculateTimeLeft() {
    const difference = +new Date("2025-03-22") - +new Date(); // Target Date

    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  }

  return (
    <View style={styles.sectionContainer}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Best Deals</Text>
        <TouchableOpacity>
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.dealBanner}>
        <View style={styles.dealContent}>
          <Text style={styles.dealTitle}>Deal of the Day</Text>
          <Text style={styles.dealDiscount}>Flat 60% OFF</Text>
          <Text style={styles.dealText}>
            Starts at 8pm. Grab all your products in bulk at lowest prices
          </Text>
          <View style={styles.countdownContainer}>
            <Text style={styles.time}>{timeLeft.hours}</Text>
            <Text style={styles.colon}> : </Text>
            <Text style={styles.time}>{timeLeft.minutes}</Text>
            <Text style={styles.colon}> : </Text>
            <Text style={styles.time}>{timeLeft.seconds}</Text>
          </View>
          <TouchableOpacity style={styles.shopNowButton}>
            <Text style={styles.shopNowText}>
              Shop Now <Ionicons name="arrow-forward" size={16} color="white" />
            </Text>
          </TouchableOpacity>
        </View>
        <Image
          source={require("../assets/cake.jpg")} // Replace with your cake image
          style={styles.dealImage}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 30,
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 25,
    marginBottom: 12,
    fontFamily: "Montserrat_400Regular",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    fontFamily: "Montserrat_400Regular",
  },
  viewAll: {
    color: "crimson",
    fontSize: 14,
    fontFamily: "Montserrat_400Regular",
    textDecorationLine: "underline",
  },
  dealBanner: {
    height: 250, // adjust it to your needs
    backgroundColor: "rgba(251, 198, 205, 0.3)",
    overflow: "hidden", // Clip to the rounded shape
    marginTop: 15, // Spacing
    marginHorizontal: 20, // Margin
    borderRadius: 10,
    padding: 20,
    display: "flex",
    justifyContent: "space-between",
  },
  dealTitle: {
    fontSize: 18,
    fontFamily: "Montserrat_400Regular",
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  dealDiscount: {
    fontSize: 27,
    fontFamily: "Montserrat_400Regular",
    fontWeight: "bold",
    color: "crimson",
    marginBottom: 5,
  },
  dealText: {
    fontSize: 13,
    color: "#555",
    marginBottom: 15,
    fontFamily: "Montserrat_400Regular",
  },
  countdownContainer: {
    flexDirection: "row",
    marginBottom: 15,
    paddingLeft: 3,
  },
  shopNowButton: {
    backgroundColor: "#222",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-start",
  },
  shopNowText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 5,
    fontFamily: "Montserrat_400Regular",
  },
  dealImage: {
    position: "absolute",
    right: 0,
    bottom: 0,
    width: 140, // Adjust size as needed
    height: 140, // Adjust size as needed
  },
  time: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#444",
    fontFamily: "Montserrat_400Regular",
    paddingRight: 2,
  },
  colon: {
    fontSize: 24,
    fontWeight: "bold",
    color: "crimson",
    fontFamily: "Montserrat_400Regular",
  },
});

export default BestDeals;
