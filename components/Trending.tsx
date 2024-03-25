import { StyleSheet, Text, View, useColorScheme } from "react-native";

const trending = [
  "on sale",
  "new arrivals",
  "top rated",
  "best sellers",
  "most popular",
];

export function Trending() {
  const colorScheme = useColorScheme();

  return (
    <View>
      <Text
        style={[
          styles.header,
          colorScheme === "light" ? { color: "#334155" } : { color: "#e2e8f0" },
        ]}
      >
        Trending searches
      </Text>
      <View style={styles.wrapper}>
        {trending.map((item) => (
          <Text
            style={[
              styles.text,
              colorScheme === "light"
                ? { borderColor: "#cbd5e1", color: "#64748b" }
                : {
                    color: "#f1f5f9",
                    backgroundColor: "#334155",
                  },
            ]}
            key={item}
          >
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
  },
  text: {
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",

    fontSize: 12,
    textTransform: "uppercase",
    padding: 4,
    borderRadius: 8,
    overflow: "hidden",
  },
  wrapper: {
    gap: 6,
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
