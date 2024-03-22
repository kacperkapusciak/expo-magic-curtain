import {
  View,
  Text,
  StyleSheet,
  useColorScheme,
  SafeAreaView,
  Pressable,
  Appearance,
  PixelRatio,
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
  Skia,
  type SkImage,
} from "@shopify/react-native-skia";
import {
  runOnJS,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const pd = PixelRatio.get();
const { width, height } = Dimensions.get("window");

type Value = string | number;
type Values = Value[];

export const glsl = (source: TemplateStringsArray, ...values: Values) => {
  const processed = source.flatMap((s, i) => [s, values[i]]).filter(Boolean);
  return processed.join("");
};

export const frag = (source: TemplateStringsArray, ...values: Values) => {
  const code = glsl(source, ...values);
  const rt = Skia.RuntimeEffect.Make(code);
  if (rt === null) {
    throw new Error("Couln't Compile Shader");
  }
  return rt;
};

type Transition = string;

const transition = (t: Transition) => {
  return frag`
  uniform shader image1;
  uniform shader image2;

  uniform float progress;
  uniform float2 resolution;
  
  half4 getFromColor(float2 uv) {
    return image1.eval(uv * resolution);
  }
  
  half4 getToColor(float2 uv) {
    return image2.eval(uv * resolution);
  }
  
  ${t}

  half4 main(vec2 xy) {
    vec2 uv = xy / resolution;
    return transition(uv);
  }
  `;
};

const linear: Transition = glsl`
vec4 transition(vec2 uv) {
  return mix(
    getFromColor(uv),
    getToColor(uv),
    progress
  );
}
`;

const swirl: Transition = glsl`
// License: MIT
// Author: Sergey Kosarevsky
// ( http://www.linderdaum.com )
// ported by gre from https://gist.github.com/corporateshark/cacfedb8cca0f5ce3f7c

vec4 transition(vec2 UV)
{
	float Radius = 1.0;

	float T = progress;

	UV -= vec2( 0.5, 0.5 );

	float Dist = length(UV);

	if ( Dist < Radius )
	{
		float Percent = (Radius - Dist) / Radius;
		float A = ( T <= 0.5 ) ? mix( 0.0, 1.0, T/0.5 ) : mix( 1.0, 0.0, (T-0.5)/0.5 );
		float Theta = Percent * Percent * A * 8.0 * 3.14159;
		float S = sin( Theta );
		float C = cos( Theta );
		UV = vec2( dot(UV, vec2(C, -S)), dot(UV, vec2(S, C)) );
	}
	UV += vec2( 0.5, 0.5 );

	vec4 C0 = getFromColor(UV);
	vec4 C1 = getToColor(UV);

	return mix( C0, C1, T );
}
`;

export default function App() {
  const progress = useSharedValue(0);
  const colorScheme = useColorScheme();

  const ref = useRef<SafeAreaView>(null);
  const [firstSnapshot, setFirstSnapshot] = useState<SkImage | null>(null);
  const [secondSnapshot, setSecondSnapshot] = useState<SkImage | null>(null);

  const changeTheme = async () => {
    progress.value = 0;
    const snapshot1 = await makeImageFromView(ref);
    setFirstSnapshot(snapshot1);
    Appearance.setColorScheme(colorScheme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    const listener = Appearance.addChangeListener(async ({ colorScheme }) => {
      setTimeout(async () => {
        console.log(colorScheme);
        const snapshot2 = await makeImageFromView(ref);
        setSecondSnapshot(snapshot2);
        progress.value = withTiming(1, { duration: 4000 }, () => {
          runOnJS(setFirstSnapshot)(null);
          runOnJS(setSecondSnapshot)(null);
        });
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
      <SafeAreaView style={[styles.container]}>
        <Canvas style={{ height: height }}>
          <Fill>
            <Shader source={transition(swirl)} uniforms={uniforms}>
              <ImageShader
                image={firstSnapshot}
                fit="cover"
                width={width}
                height={height - 53}
              />
              <ImageShader
                image={secondSnapshot}
                fit="cover"
                width={width}
                height={height - 53}
              />
            </Shader>
          </Fill>
        </Canvas>
      </SafeAreaView>
    );
  }

  {
    if (firstSnapshot) {
      console.log(firstSnapshot);
      console.log(firstSnapshot.width(), firstSnapshot.height());
    }
  }
  return (
    <>
      <SafeAreaView
        style={[
          styles.container,
          // colorScheme === "light"
          //   ? { backgroundColor: "white" }
          //   : { backgroundColor: "#020617" },
        ]}
      >
        {firstSnapshot && !secondSnapshot && (
          <>
            <Canvas
              style={[
                {
                  height: height,
                },
              ]}
            >
              <Image
                image={firstSnapshot}
                fit="cover"
                width={width}
                height={height - 53}
              />
            </Canvas>
          </>
        )}
        <View
          ref={ref}
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
      </SafeAreaView>
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
