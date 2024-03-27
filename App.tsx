import { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  useColorScheme,
  SafeAreaView,
  Pressable,
  Appearance,
  Dimensions,
  Platform,
} from "react-native";
import { useAtom } from "jotai";
import {
  Canvas,
  Fill,
  Image,
  ImageShader,
  makeImageFromView,
  Shader,
  type SkImage,
} from "@shopify/react-native-skia";
import {
  runOnJS,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { BottomTabs } from "./components/BottomTabs";
import { SearchBar } from "./components/SearchBar";
import { Trending } from "./components/Trending";
import { Cards, themeSwitchAtom } from "./components/Cards";

import SunIcon from "./icons/SunIcon";
import MoonIcon from "./icons/MoonIcon";
import { Transition, glsl, transition } from "./utils/shader";
import { StatusBar } from "expo-status-bar";

const TRANSITION_DURATION = 500;

const { width, height } = Dimensions.get("window");

const wipeLeft: Transition = glsl`
// Author: Jake Nelson
// License: MIT

vec4 transition(vec2 uv) {
  vec2 p=uv.xy/vec2(1.0).xy;
  vec4 a=getFromColor(p);
  vec4 b=getToColor(p);
  return mix(a, b, step(1.0-p.x,progress));
}
`;

const wipeRight: Transition = glsl`
// Author: Jake Nelson
// License: MIT

vec4 transition(vec2 uv) {
  vec2 p=uv.xy/vec2(1.0).xy;
  vec4 a=getFromColor(p);
  vec4 b=getToColor(p);
  return mix(a, b, step(0.0+p.x,progress));
}
`;

export default function App() {
  const progress = useSharedValue(0);
  const colorScheme = useColorScheme();
  const [isThemeSwitching, setThemeSwitching] = useAtom(themeSwitchAtom);

  const ref = useRef<View>(null);
  const [firstSnapshot, setFirstSnapshot] = useState<SkImage | null>(null);
  const [secondSnapshot, setSecondSnapshot] = useState<SkImage | null>(null);

  const changeTheme = async () => {
    if (isThemeSwitching) return;

    progress.value = 0;
    const snapshot1 = await makeImageFromView(ref);
    setFirstSnapshot(snapshot1);
    Appearance.setColorScheme(colorScheme === "light" ? "dark" : "light");
    setThemeSwitching(true);
  };

  useEffect(() => {
    const listener = Appearance.addChangeListener(async () => {
      setTimeout(async () => {
        const snapshot2 = await makeImageFromView(ref);
        setSecondSnapshot(snapshot2);
        progress.value = withTiming(
          1,
          { duration: TRANSITION_DURATION },
          () => {
            runOnJS(setFirstSnapshot)(null);
            runOnJS(setSecondSnapshot)(null);
            runOnJS(setThemeSwitching)(false);
          },
        );
      }, 100);
    });

    return () => {
      listener.remove();
    };
  }, []);

  const uniforms = useDerivedValue(() => {
    return {
      progress: progress.value,
      resolution: [width, height],
    };
  });

  const isTransitioning = firstSnapshot !== null && secondSnapshot !== null;
  if (isTransitioning) {
    return (
      <View style={styles.fill}>
        <Canvas style={{ height: height }}>
          <Fill>
            <Shader
              source={transition(
                colorScheme === "light" ? wipeLeft : wipeRight,
              )}
              uniforms={uniforms}
            >
              <ImageShader
                image={firstSnapshot}
                fit="cover"
                width={width}
                height={height}
              />
              <ImageShader
                image={secondSnapshot}
                fit="cover"
                width={width}
                height={height}
              />
            </Shader>
          </Fill>
        </Canvas>
        <StatusBar translucent />
      </View>
    );
  }

  return (
    <View style={styles.fill}>
      {firstSnapshot && (
        <Canvas style={styles.absolute}>
          <Image
            image={firstSnapshot}
            fit="cover"
            width={width}
            height={height}
          />
        </Canvas>
      )}
      <View
        ref={ref}
        style={[
          styles.container,
          { height: height },
          colorScheme === "light"
            ? { backgroundColor: "white" }
            : { backgroundColor: "#020617" },
        ]}
      >
        <View
          style={[
            { width: width },
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
              <Pressable style={styles.themeSwitcher} onPress={changeTheme}>
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
          <BottomTabs />
        </View>
      </View>
      <StatusBar translucent />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "ios" ? 50 : 10,
  },
  fill: {
    flex: 1,
  },
  padding: {
    padding: 16,
  },
  absolute: {
    position: "absolute",
    height: height,
    width: width,
    zIndex: 1,
    elevation: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  themeSwitcher: {
    paddingBottom: 10,
    paddingRight: 4,
  },
  header: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 16,
  },
});
