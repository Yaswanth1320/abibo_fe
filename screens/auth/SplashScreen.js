import React, { useEffect } from "react";
import { View, StyleSheet, Image, ActivityIndicator } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useWindowDimensions } from "react-native";

const SplashScreen = ({ navigation }) => {
  const { width, height } = useWindowDimensions();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      navigation.replace("Login");
    }, 2000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [navigation]);

  return (
    <LinearGradient
      colors={["#FFB6C1", "#FF69B4"]}
      style={[styles.container, { width: width, height: height }]}
    >
      <Image
        source={require("../../assets/logo-r.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="medium" color="white" />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: "center",
    justifyContent: 'center', // Vertical centering, but we'll adjust this
  },
  logo: {
    width: 200,
    height: 200,
  },
  loaderContainer: {
    position: 'absolute',  // Absolute positioning
    bottom: 40,             // Place it 40 pixels from the bottom
    alignItems: 'center',
    marginBottom: 20, // Add a small margin for better spacing

  },
});

export default SplashScreen;