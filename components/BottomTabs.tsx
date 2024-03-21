import { View, StyleSheet } from "react-native";

import HomeIcon from "../icons/HomeIcon";
import HeartIcon from "../icons/HeartIcon";
import CartIcon from "../icons/CartIcon";
import { BlurView } from "expo-blur";

export function BottomTabs() {
  return (
    <View style={styles.container}>
      <BlurView intensity={80} tint="regular" style={styles.blurContainer}>
        <View style={styles.tab}>
          <HomeIcon color={"#334155"} />
        </View>
        <View style={styles.tab}>
          <CartIcon color={"#334155"} />
        </View>
        <View style={styles.tab}>
          <HeartIcon color={"#334155"} />
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
    borderColor: "#475569",
    overflow: "hidden",
    alignSelf: "center",
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
