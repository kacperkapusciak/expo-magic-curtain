import { View, StyleSheet, useColorScheme, Platform } from "react-native";

import HomeIcon from "../icons/HomeIcon";
import HeartIcon from "../icons/HeartIcon";
import CartIcon from "../icons/CartIcon";
import { BlurView } from "expo-blur";

export function BottomTabs() {
  const colorScheme = useColorScheme();

  const icons = (
    <>
      <View style={styles.tab}>
        <HomeIcon color={colorScheme === "light" ? "#1e293b" : "#f8fafc"} />
      </View>
      <View style={styles.tab}>
        <CartIcon color={colorScheme === "light" ? "#1e293b" : "#f8fafc"} />
      </View>
      <View style={styles.tab}>
        <HeartIcon color={colorScheme === "light" ? "#1e293b" : "#f8fafc"} />
      </View>
    </>
  );

  return (
    <View style={styles.container}>
      {Platform.OS === "ios" ? (
        <BlurView intensity={30} tint="regular" style={styles.blurContainer}>
          {icons}
        </BlurView>
      ) : (
        <View
          style={[
            styles.blurContainer,
            { backgroundColor: "rgba(0, 0, 0, 0.2)" },
          ]}
        >
          {icons}
        </View>
      )}
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
    borderRadius: 60,
  },
  tab: {
    // flex: 1,
    paddingHorizontal: 16,
    alignItems: "center",
  },
});
