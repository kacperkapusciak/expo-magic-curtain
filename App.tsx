import { View, Text, StyleSheet, useColorScheme } from "react-native";
import { Canvas, Circle, Group } from "@shopify/react-native-skia";
import { BottomTabs } from "./components/BottomTabs";

export default function App() {
  const colorScheme = useColorScheme();
  const width = 256;
  const height = 256;
  const r = width * 0.33;
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Home</Text>
      <Canvas style={{ width, height }}>
        <Group blendMode="multiply">
          <Circle cx={r} cy={r} r={r} color="cyan" />
          <Circle cx={width - r} cy={r} r={r} color="magenta" />
          <Circle cx={width / 2} cy={width - r} r={r} color="yellow" />
        </Group>
      </Canvas>
      <BottomTabs />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
