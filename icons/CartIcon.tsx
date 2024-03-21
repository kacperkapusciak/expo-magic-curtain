import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SvgComponent = ({ color = "#001A72", ...rest }) => (
  <Svg width={24} height={24} fill="none" {...rest}>
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M2 3h2.5l2 14H17m0 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM6.071 14H18l3-9H4.786M11 19a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"
    />
  </Svg>
);
export default SvgComponent;
