import { StyleSheet, Text, View } from "react-native";

const trending = [
  "on sale",
  "new arrivals",
  "top rated",
  "best sellers",
  "most popular",
];

export function Trending() {
  return (
    <View>
      <Text style={styles.header}>Trending searches</Text>
      <View style={styles.wrapper}>
        {trending.map((item) => (
          <Text style={styles.text} key={item}>
            {item}
          </Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 14,
    fontWeight: "bold",
    marginVertical: 12,
    color: "#334155",
  },
  text: {
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#cbd5e1",
    fontSize: 12,
    color: "#64748b",
    textTransform: "uppercase",
    padding: 4,
    borderRadius: 8,
  },
  wrapper: {
    gap: 6,
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
