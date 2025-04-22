import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  SectionList,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const notificationsData = [
  {
    title: "Today",
    data: [
      {
        id: "notif_order_12345",
        icon: "OD",
        title: "Order Shipped",
        subtitle: "Order #12345 is on its way",
        actionText: "Track your order",
        timestamp: "10:38 AM",
        type: "Orders",
      },
      {
        id: "notif_sale_weekend",
        icon: "%",
        title: "Weekend Flash Sale!",
        subtitle: "Get 20% off on bulk flours and sugars",
        actionText: "Shop now",
        timestamp: "8:15 AM",
        type: "Offers",
      },
    ],
  },
  {
    title: "Yesterday",
    data: [
      {
        id: "notif_login_samsung",
        icon: "AC",
        title: "New Login Detected",
        subtitle: "New login from Samsung Galaxy device",
        actionText: "Secure account",
        timestamp: "4:22 PM",
        type: "Account",
      },
      {
        id: "notif_restock_chips",
        icon: "RM",
        title: "Time To Restock!",
        subtitle: "Running low on chocolate chips?",
        actionText: "Reorder now",
        timestamp: "4:22 PM",
        type: "Orders", // Or could be a different category
      },
    ],
  },
  {
    title: "This Week",
    data: [
      {
        id: "notif_support_243637",
        icon: "SP",
        title: "Support Ticket Resolved",
        subtitle: "Ticket #243637 has been resolved",
        actionText: "View details",
        timestamp: "Monday",
        type: "Account", // Or 'Support'
      },
      {
        id: "notif_update_2.5",
        icon: "SY",
        title: "App Update Available",
        subtitle: "Version 2.5 with new features",
        actionText: "Update now",
        timestamp: "Sunday",
        type: "Account", // Or 'System'
      },
    ],
  },
];

const FILTERS = ["All", "Orders", "Offers", "Account"];
const ACTIVE_COLOR = "palevioletred";
const INACTIVE_CHIP_BG = "#E0E0E0";
const INACTIVE_CHIP_TEXT = "#616161";
const PRIMARY_PINK = "#E91E63";
const AVATAR_BG = "#F8BBD0";
const AVATAR_TEXT = "#AD1457";
const SUBTITLE_COLOR = "#555555";
const TIMESTAMP_COLOR = "#757575";
const SECTION_HEADER_COLOR = "#757575";
const BORDER_COLOR = "#E0E0E0";

const NotificationItem = ({ item }) => (
  <View style={styles.notificationItem}>
    <View style={styles.avatarContainer}>
      <Text style={styles.avatarText}>{item.icon}</Text>
    </View>

    <View style={styles.notificationTextContainer}>
      <Text style={styles.notificationTitle}>{item.title}</Text>
      <Text style={styles.notificationSubtitle}>{item.subtitle}</Text>
      {item.actionText && (
        <TouchableOpacity
          onPress={() => console.log("Action pressed:", item.id)}
        >
          <Text style={styles.notificationAction}>{item.actionText}</Text>
        </TouchableOpacity>
      )}
    </View>
    <Text style={styles.timestamp}>{item.timestamp}</Text>
  </View>
);

const SectionHeader = ({ title }) => (
  <View style={styles.sectionHeaderContainer}>
    <Text style={styles.sectionHeaderText}>{title}</Text>
  </View>
);

const NotificationsScreen = ({ navigation }) => {
  const [selectedFilter, setSelectedFilter] = useState("All");

  const filteredData = notificationsData
    .map((section) => ({
      ...section,
      data: section.data.filter(
        (item) => selectedFilter === "All" || item.type === selectedFilter
      ),
    }))
    .filter((section) => section.data.length > 0);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation?.goBack()}
          style={styles.backButton}
        >
          <Icon name="arrow-back" size={22} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
      </View>
      <View style={styles.chipContainer}>
        {FILTERS.map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.chip,
              selectedFilter === filter
                ? styles.activeChip
                : styles.inactiveChip,
            ]}
            onPress={() => setSelectedFilter(filter)}
          >
            <Text
              style={[
                styles.chipText,
                selectedFilter === filter
                  ? styles.activeChipText
                  : styles.inactiveChipText,
              ]}
            >
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <SectionList
        sections={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <NotificationItem item={item} />}
        renderSectionHeader={({ section: { title } }) => (
          <SectionHeader title={title} />
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={styles.listContentContainer}
        stickySectionHeadersEnabled={false} // Keep headers static
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: ACTIVE_COLOR,
    paddingHorizontal: 15,
    paddingVertical: 12,
    gap: 7,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "bold",
    fontFamily: "Montserrat_400Regular",
  },
  headerPlaceholder: {
    // Invisible view to balance the back button space
    width: 34, // Approximate width of the back button + padding
  },
  chipContainer: {
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: BORDER_COLOR,
  },
  chip: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 8,
    justifyContent: "center",
    alignItems: "center",
    
  },
  activeChip: {
    backgroundColor: ACTIVE_COLOR,
  },
  inactiveChip: {
    backgroundColor: INACTIVE_CHIP_BG,
  },
  chipText: {
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "Montserrat_400Regular",
  },
  activeChipText: {
    color: "#FFFFFF",
  },
  inactiveChipText: {
    color: INACTIVE_CHIP_TEXT,
  },
  listContentContainer: {
    paddingBottom: 20, // Add padding at the bottom of the list
  },
  sectionHeaderContainer: {
    backgroundColor: "#C9C9CAD1", // Light background for section headers
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: BORDER_COLOR,
  },
  sectionHeaderText: {
    fontSize: 15,
    fontWeight: "800",
    color: SECTION_HEADER_COLOR,
    fontFamily: "Montserrat_400Regular",
  },
  notificationItem: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 16,
    alignItems: "flex-start", // Align items to the top
    backgroundColor: "#FFFFFF",
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: AVATAR_BG,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avatarText: {
    color: AVATAR_TEXT,
    fontSize: 14,
    fontWeight: "bold",
    fontFamily: "Montserrat_400Regular",
    
  },
  notificationTextContainer: {
    flex: 1, // Take remaining space
    marginRight: 10,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 2,
    fontFamily: "Montserrat_400Regular",
  },
  notificationSubtitle: {
    fontSize: 14,
    color: SUBTITLE_COLOR,
    marginBottom: 4,
    lineHeight: 18, // Improve readability
    fontFamily: "Montserrat_400Regular",
  },
  notificationAction: {
    fontSize: 14,
    color: PRIMARY_PINK,
    fontWeight: "600",
    marginTop: 2,
    fontFamily: "Montserrat_400Regular",
  },
  timestamp: {
    fontSize: 12,
    color: TIMESTAMP_COLOR,
    paddingTop: 2, // Align slightly better with title
    fontFamily: "Montserrat_400Regular",
  },
  separator: {
    height: 1,
    backgroundColor: BORDER_COLOR,
    marginLeft: 16 + 40 + 12, // Align separator start after avatar + margin
  },
});

export default NotificationsScreen;
