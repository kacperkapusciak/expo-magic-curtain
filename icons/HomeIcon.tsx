import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SvgComponent = ({ color = "#001A72", ...rest }) => (
  <Svg width={24} height={24} fill="none" {...rest}>
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m4 10 8-7 8 7v10h-5v-4a3 3 0 0 0-6 0v4H4V10Z"
    />
  </Svg>
);
export default SvgComponent;
