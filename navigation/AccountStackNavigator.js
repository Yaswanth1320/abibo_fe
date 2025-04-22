import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import MyProfileScreen from "../screens/AccountScreen"; // Your existing profile screen
import EditProfileScreen from "../screens/EditProfileScreen";
import ManageAddressesScreen from "../screens/ManageAddressesScreen";
import PaymentMethodsScreen from "../screens/PaymentMethodsScreen";
import HelpScreen from "../screens/HelpScreen";
import ChangePasswordScreen from "../screens/ChangePasswordScreen";
import AddNewAddressScreen from "../screens/AddNewAddressScreen";
import AddPaymentMethodScreen from "../screens/AddPaymentMethodScreen";

const Stack = createStackNavigator();

const AccountStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MyProfile" component={MyProfileScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="ManageAddresses" component={ManageAddressesScreen} />
      <Stack.Screen name="PaymentMethods" component={PaymentMethodsScreen} />
      <Stack.Screen name="HelpSupport" component={HelpScreen} />
      <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
      <Stack.Screen name="AddNewAddress" component={AddNewAddressScreen} />
      <Stack.Screen
        name="AddNewPaymentMethod"
        component={AddPaymentMethodScreen}
      />
    </Stack.Navigator>
  );
};

export default AccountStackNavigator;
