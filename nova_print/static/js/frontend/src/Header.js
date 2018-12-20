import React from "react";
const Header = props => {
  const styles = {
    header: {
      display: "flex",
      flex: 1,
      height: "3rem",
      padding: "1rem",
      backgroundColor: "rgba(0, 0, 0, 0.1)",
    },
    username: {
      margin: "0 1rem",
    },
  };
  return (
    <div style={styles.header}>
      <div style={styles.logout}>
        <span style={styles.username}>Hello {props.username}</span>
        <button onClick={props.logout} key={2}>
          Logout
        </button>
      </div>
    </div>
  );
};
export default Header;
