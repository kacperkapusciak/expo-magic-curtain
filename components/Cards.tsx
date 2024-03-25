import { useState } from "react";
import { View, Image, StyleSheet, Dimensions, Pressable } from "react-native";
import { BlurView } from "expo-blur";

import HeartIcon from "../icons/HeartIcon";
import HeartDuotoneIcon from "../icons/HeartDuotoneIcon";

export function Cards() {
  return (
    <View style={styles.container}>
      <Card image={require("../images/bike.jpg")} />
      <Card image={require("../images/milk.jpg")} />
      <Card image={require("../images/teddybear.jpg")} />
      <Card image={require("../images/ball.jpg")} />
    </View>
  );
}

function Card({ image }) {
  const [isLiked, setIsLiked] = useState(false);
  return (
    <View style={[styles.card, styles.round]}>
      <Image source={image} style={[styles.image, styles.round]} />
      <View style={styles.iconWrapper}>
        <Pressable onPress={() => setIsLiked(!isLiked)}>
          <BlurView intensity={30} tint="regular" style={styles.blurContainer}>
            {isLiked ? (
              <HeartDuotoneIcon color="#5eead4" />
            ) : (
              <HeartIcon color="#f1f5f9" />
            )}
          </BlurView>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 16,
    marginVertical: 16,
  },
  card: {
    position: "relative",
  },
  round: {
    borderRadius: 16,
    overflow: "hidden",
  },
  image: {
    width: Dimensions.get("window").width / 2 - 24,
    height: 250,
  },
  blurContainer: {
    height: 48,
    width: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  iconWrapper: {
    borderRadius: 32,
    position: "absolute",
    bottom: 16,
    right: 16,
    overflow: "hidden",
  },
});
