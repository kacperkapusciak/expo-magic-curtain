import { View, StyleSheet, useColorScheme } from "react-native";

import HomeIcon from "../icons/HomeIcon";
import HeartIcon from "../icons/HeartIcon";
import CartIcon from "../icons/CartIcon";
import { BlurView } from "expo-blur";

export function BottomTabs() {
  const colorScheme = useColorScheme();
  return (
    <View style={styles.container}>
      <BlurView intensity={30} tint="regular" style={styles.blurContainer}>
        <View style={styles.tab}>
          <HomeIcon color={colorScheme === "light" ? "#1e293b" : "#f8fafc"} />
        </View>
        <View style={styles.tab}>
          <CartIcon color={colorScheme === "light" ? "#1e293b" : "#f8fafc"} />
        </View>
        <View style={styles.tab}>
          <HeartIcon color={colorScheme === "light" ? "#1e293b" : "#f8fafc"} />
        </View>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 40,
    borderWidth: 2,
    borderRadius: 60,
    borderColor: "#cbd5e1",
    overflow: "hidden",
    alignSelf: "center",
    borderCurve: "continuous",
  },
  blurContainer: {
    flexDirection: "row",
    padding: 16,
    justifyContent: "space-between",
  },
  tab: {
    // flex: 1,
    paddingHorizontal: 16,
    alignItems: "center",
  },
});
