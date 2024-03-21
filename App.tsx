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
      <SafeAreaView style={styles.container}>
        <View style={styles.padding}>
          <Text style={styles.header}>Home</Text>
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
    color: "#0f172a",
  },
});
