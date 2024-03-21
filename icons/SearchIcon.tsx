import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SvgComponent = ({ color = "#001A72", ...rest }) => (
  <Svg width={24} height={24} fill="none" {...rest}>
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m20 20-4.197-4.197M18 10.5a7.5 7.5 0 1 0-15 0 7.5 7.5 0 0 0 15 0Z"
    />
  </Svg>
);
export default SvgComponent;
