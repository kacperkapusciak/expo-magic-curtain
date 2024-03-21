import {
  View,
  Text,
  StyleSheet,
  useColorScheme,
  SafeAreaView,
} from "react-native";
import { Canvas, Circle, Group } from "@shopify/react-native-skia";
import { BottomTabs } from "./components/BottomTabs";
import { SearchBar } from "./components/SearchBar";

export default function App() {
  const colorScheme = useColorScheme();
  const width = 256;
  const height = 256;
  const r = width * 0.33;
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.padding}>
        <Text style={styles.header}>Home</Text>
        <SearchBar />
        <BottomTabs />
      </View>
    </SafeAreaView>
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
