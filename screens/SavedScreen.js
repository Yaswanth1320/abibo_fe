import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Feather from "react-native-vector-icons/Feather";

const CustomCheckBox = ({ value, onValueChange }) => (
  <TouchableOpacity
    onPress={() => onValueChange(!value)}
    style={styles.checkbox}
  >
    {value && <Text style={styles.checkmark}>✓</Text>}
  </TouchableOpacity>
);

// Product data
const products = [
  {
    id: "1",
    image: require("../assets/cookies.jpeg"),
    name: "Product Name",
    variant: "Variant",
    unitPrice: 9,
    totalPrice: 99,
    quantity: 11,
  },
  {
    id: "2",
    image: require("../assets/cupcakes.jpg"),
    name: "Product Name",
    variant: "Variant",
    unitPrice: 9,
    totalPrice: 99,
    quantity: 11,
  },
  {
    id: "3",
    image: require("../assets/dough.jpg"),
    name: "Product Name",
    variant: "Variant",
    unitPrice: 9,
    totalPrice: 99,
    quantity: 11,
  },
  {
    id: "4",
    image: require("../assets/flour.webp"),
    name: "Product Name",
    variant: "Variant",
    unitPrice: 9,
    totalPrice: 99,
    quantity: 11,
  },
  {
    id: "5",
    image: require("../assets/bd.webp"),
    name: "Product Name",
    variant: "Variant",
    unitPrice: 9,
    totalPrice: 99,
    quantity: 11,
  },
];

const SavedScreen = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [productList, setProductList] = useState(products); // moved to state

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelected([]);
    } else {
      setSelected(productList.map((p) => p.id));
    }
    setSelectAll(!selectAll);
  };

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const updateQuantity = (id, delta) => {
    setProductList((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQty = Math.max(1, item.quantity + delta);
          return {
            ...item,
            quantity: newQty,
            totalPrice: newQty * item.unitPrice,
          };
        }
        return item;
      })
    );
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <CustomCheckBox
        value={selected.includes(item.id)}
        onValueChange={() => toggleSelect(item.id)}
      />
      <Image source={item.image} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.variant}>{item.variant}</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            TouchableOpacity
            onPress={() => updateQuantity(item.id, -1)}
          >
            <Text style={styles.quantityButton}>−</Text>
          </TouchableOpacity>

          <Text style={styles.quantity}>{item.quantity}</Text>

          <TouchableOpacity onPress={() => updateQuantity(item.id, 1)}>
            <Text style={styles.quantityButton}>+</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.unitPrice}>₹{item.unitPrice} Per Unit</Text>
      </View>
      <View style={styles.priceContainer}>
        <Text style={styles.totalPrice}>₹{item.totalPrice}</Text>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Saved Items</Text>
        <View />
      </View>
      <Text style={styles.headerText}>
        Add items to this saved list and easily select them anytime to add
        directly to your cart!
      </Text>
      <View style={styles.selectAllContainer}>
        <CustomCheckBox value={selectAll} onValueChange={toggleSelectAll} />
        <Text style={styles.selectAllText}>Select All</Text>
      </View>
      <FlatList
        data={productList}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
      />
      <TouchableOpacity style={styles.footerButton}>
        <Text style={styles.footerButtonText}>Select Items to Add to Cart</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
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
    fontFamily: "Montserrat_400Regular",
  },
  headerText: {
    backgroundColor: "#FDCFD7",
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginBottom: 14,
    fontSize: 12,
    color: "#000",
    fontFamily: "Montserrat_400Regular",
  },
  selectAllContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    paddingHorizontal: 19,
  },
  selectAllText: {
    fontSize: 16,
    color: "#333",
    fontFamily: "Montserrat_400Regular",
  },
  listContent: {
    paddingBottom: 80,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    paddingVertical: 8,
    paddingHorizontal: 14,
    marginBottom: 10,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  image: {
    width: 75,
    height: 75,
    borderRadius: 8,
    marginHorizontal: 10,
  },
  infoContainer: {
    flex: 2,
  },
  productName: {
    fontWeight: "bold",
    fontSize: 14,
    fontFamily: "Montserrat_400Regular",
  },
  variant: {
    color: "#555",
    fontSize: 12,
    fontFamily: "Montserrat_400Regular",
    marginBottom: 2,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  quantityButton: {
    paddingHorizontal: 10,
    fontSize: 16,
    backgroundColor: "#e0e0e0",
    borderRadius: 4,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  quantity: {
    fontSize: 15,
    marginHorizontal: 10,
  },
  unitPrice: {
    fontSize: 12,
    color: "#999",
    fontFamily: "Montserrat_400Regular",
  },
  priceContainer: {
    alignItems: "flex-end",
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 20,
    fontFamily: "Montserrat_400Regular",
  },
  addButton: {
    backgroundColor: "#f44366",
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontFamily: "Montserrat_400Regular",
  },
  footerButton: {
    position: "absolute",
    bottom: 10,
    left: 10,
    right: 10,
    backgroundColor: "#f44366",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  footerButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    fontFamily: "Montserrat_400Regular",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: "#f44366",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 6,
  },
  checkmark: {
    color: "#f44366",
    fontWeight: "bold",
  },
});

export default SavedScreen;
