import {
  View,
  Text,
  StyleSheet,
  useColorScheme,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Canvas, Circle, Group } from "@shopify/react-native-skia";
import { BottomTabs } from "./components/BottomTabs";
import { SearchBar } from "./components/SearchBar";
import { Trending } from "./components/Trending";
import { Cards } from "./components/Cards";

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
  header: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 16,
  },
});
