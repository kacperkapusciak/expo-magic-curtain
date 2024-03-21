import {
  View,
  Text,
  StyleSheet,
  useColorScheme,
  SafeAreaView,
  Pressable,
  Appearance,
} from "react-native";
import { BottomTabs } from "./components/BottomTabs";
import { SearchBar } from "./components/SearchBar";
import { Trending } from "./components/Trending";
import { Cards } from "./components/Cards";

import SunIcon from "./icons/SunIcon";
import MoonIcon from "./icons/MoonIcon";

export default function App() {
  const colorScheme = useColorScheme();
  return (
    <>
      <SafeAreaView
        style={[
          styles.container,
          colorScheme === "light"
            ? { backgroundColor: "white" }
            : { backgroundColor: "#020617" },
        ]}
      >
        <View style={styles.padding}>
          <View style={styles.row}>
            <Text
              style={[
                styles.header,
                colorScheme === "light"
                  ? { color: "#0f172a" }
                  : { color: "#f1f5f9" },
              ]}
            >
              Home
            </Text>
            <Pressable
              style={styles.themeSwitcher}
              onPress={() => {
                Appearance.setColorScheme(
                  colorScheme === "light" ? "dark" : "light",
                );
              }}
            >
              {colorScheme === "light" ? (
                <MoonIcon color="#1e293b" />
              ) : (
                <SunIcon color="#e2e8f0" />
              )}
            </Pressable>
          </View>
          <SearchBar />
          <Trending />
          <Cards />
        </View>
      </SafeAreaView>
      <BottomTabs />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  padding: {
    padding: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  themeSwitcher: {
    paddingBottom: 10,
    paddingRight: 4,
    // borderRadius: 8,
  },
  header: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 16,
  },
});
