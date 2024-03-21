import { StyleSheet, Text, View } from "react-native";

import SearchIcon from "../icons/SearchIcon";

export function SearchBar() {
  return (
    <View style={[styles.container, styles.padding]}>
      <SearchIcon color="#475569" />
      <Text style={styles.text}>Search</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: "#f1f5f9",
    borderRadius: 20,
    borderCurve: "continuous",
    alignItems: "center",
    flexDirection: "row",
  },
  padding: {
    padding: 16,
  },
  text: {
    fontSize: 18,
    color: "#64748b",
    marginHorizontal: 8,
  },
});
