import {
  View,
  Text,
  StyleSheet,
  useColorScheme,
  SafeAreaView,
  Pressable,
  Appearance,
  Dimensions,
} from "react-native";
import { BottomTabs } from "./components/BottomTabs";
import { SearchBar } from "./components/SearchBar";
import { Trending } from "./components/Trending";
import { Cards } from "./components/Cards";

import SunIcon from "./icons/SunIcon";
import MoonIcon from "./icons/MoonIcon";
import { useEffect, useRef, useState } from "react";
import {
  Canvas,
  Fill,
  Image,
  ImageShader,
  makeImageFromView,
  Shader,
  type SkImage,
} from "@shopify/react-native-skia";
import Animated, {
  interpolateColor,
  runOnJS,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Transition, glsl, transition } from "./utils/shader";

const TRANSITION_DURATION = 800;

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
  const colorSchemeSv = useSharedValue(colorScheme);

  const ref = useRef<SafeAreaView>(null);
  const [firstSnapshot, setFirstSnapshot] = useState<SkImage | null>(null);
  const [secondSnapshot, setSecondSnapshot] = useState<SkImage | null>(null);

  const animatedBackgroundColor = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        progress.value,
        [0, 1],
        colorSchemeSv.value === "light"
          ? ["#020617", "#ffffff"]
          : ["#ffffff", "#020617"],
      ),
    };
  });

  const changeTheme = async () => {
    progress.value = 0;
    const snapshot1 = await makeImageFromView(ref);
    setFirstSnapshot(snapshot1);
    Appearance.setColorScheme(colorScheme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    const listener = Appearance.addChangeListener(async ({ colorScheme }) => {
      setTimeout(async () => {
        const snapshot2 = await makeImageFromView(ref);
        setSecondSnapshot(snapshot2);
        colorSchemeSv.value = colorScheme;
        progress.value = withTiming(
          1,
          { duration: TRANSITION_DURATION },
          () => {
            runOnJS(setFirstSnapshot)(null);
            runOnJS(setSecondSnapshot)(null);
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

  const transitioning = firstSnapshot !== null && secondSnapshot !== null;
  if (transitioning) {
    return (
      <Animated.View style={[{ flex: 1 }, animatedBackgroundColor]}>
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
      </Animated.View>
    );
  }
  return (
    <View style={{ flex: 1 }}>
      {firstSnapshot && (
        <Canvas style={[{ height: height }]}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    paddingTop: 53,
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
