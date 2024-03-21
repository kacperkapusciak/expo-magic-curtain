import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SvgComponent = ({ color = "#001A72", ...rest }) => (
  <Svg width={24} height={24} fill="none" {...rest}>
    <Path
      stroke={color}
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M3 17c7.952 1.618 13.683-8.242 8-14 5 .131 9 4.111 9 9 0 4.971-3.881 9-9 9-3.229 0-6.34-1.568-8-4Z"
    />
  </Svg>
);
export default SvgComponent;
