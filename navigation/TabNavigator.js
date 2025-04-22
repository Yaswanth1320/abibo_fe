import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

import HomeScreen from "../screens/HomeScreen";
import ExploreScreen from "../screens/ExploreScreen";
import SavedScreen from "../screens/SavedScreen";
import OrdersScreen from "../screens/OrdersScreen";
import AccountStackNavigator from "./AccountStackNavigator";

const Tab = createBottomTabNavigator();
const getTabBarVisibility = (route) => {
  // Get the name of the route focused within the nested stack navigator
  // Provide a default name ('MyProfile' in this case) if the stack hasn't loaded yet
  const routeName = getFocusedRouteNameFromRoute(route) ?? "MyProfile";
  const hideOnScreens = [
    "EditProfile",
    "ManageAddresses",
    "PaymentMethods",
    "ChangePassword",
    "AddNewAddress",
    "AddNewPaymentMethod",
  ];
  if (hideOnScreens.includes(routeName)) {
    return "none";
  }

  return "flex";
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Explore") {
            iconName = focused ? "compass" : "compass-outline";
          } else if (route.name === "Saved") {
            iconName = focused
              ? "checkmark-circle"
              : "checkmark-circle-outline";
          } else if (route.name === "Orders") {
            iconName = focused ? "reader" : "reader-outline";
          } else if (route.name === "AccountStack") {
            iconName = focused ? "person" : "person-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "crimson",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
        tabBarStyle: { display: getTabBarVisibility(route) },
        tabBarLabelStyle: {
          fontFamily: "Montserrat_400Regular",
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="Saved" component={SavedScreen} />
      <Tab.Screen name="Orders" component={OrdersScreen} />
      <Tab.Screen
        name="AccountStack"
        component={AccountStackNavigator}
        options={{ title: "Account" }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
