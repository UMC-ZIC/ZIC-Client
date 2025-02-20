import * as React from "react";
const IPin = (props) => (
    <svg
        viewBox="0 0 13 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="M6.6 17C6.6 17 1 11.0571 1 6.02857C1 3.25137 3.50721 1 6.6 1C9.6928 1 12.2 3.25137 12.2 6.02857C12.2 8.52027 10.825 11.2364 9.43774 13.3429"
            stroke="#7D7D7D"
            strokeWidth={1.5}
        />
        <ellipse
            cx={6.6}
            cy={6.6}
            rx={1.6}
            ry={1.6}
            stroke="#7D7D7D"
            strokeWidth={1.5}
        />
    </svg>
);
export default IPin;
