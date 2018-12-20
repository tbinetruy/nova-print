import React from "react";
import {Hover} from "./HOC.js";
import {getThemeColor} from "./helpers.js";

const Button = Hover(props => {
  const buttonStyle = {
    ...props.style,
    backgroundColor: getThemeColor(
      props.color,
      props.isHovered ? 0.7 : 0,
      true,
    ),
    width: "100%",
    cursor: "pointer",
  };
  return (
    <div style={buttonStyle} onClick={props.onClick}>
      {props.title}
    </div>
  );
});

export {Button};
