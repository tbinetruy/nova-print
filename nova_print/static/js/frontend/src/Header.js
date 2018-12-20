import React from "react";
import {getThemeColor} from "./helpers.js";
import {Button} from "./UI.js";

const Header = props => {
  const styles = {
    header: {
      display: "flex",
      flex: 1,
      height: "3rem",
      padding: "1rem",

      backgroundColor: getThemeColor(props.color, 0.1),
    },
    username: {
      margin: "0 1rem",
    },
  };
  return (
    <div style={styles.header}>
      <div style={styles.logout}>
        <span style={styles.username}>Hello {props.username}</span>
        <Button
          title={"Logout"}
          color={props.color}
          onClick={props.logout}
          key={2}
        />
      </div>
    </div>
  );
};
export default Header;
