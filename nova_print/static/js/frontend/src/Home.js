import React from "react";
import novaPrintScreenshot from "./img/nova-print-screenshot.png";

const Intro = props => {
  const styles = {
    wrapper: {
      marginTop: "5rem",
    },
    screenshot: {
      maxHeight: "50vh",
    },
  };
  return (
    <div style={styles.wrapper}>
      <p>Welcome to Nova Print !! Here's what it looks like</p>
      <img src={novaPrintScreenshot} style={styles.screenshot} />
    </div>
  );
};

const LoginForm = props => {
  return (
    <div className="wrapper">
      <p>{props.errorMsg}</p>
      <form onSubmit={props.onSubmit}>
        <input
          placeholder="Username"
          name="username"
          value={props.username}
          onChange={e => props.onChange(e, "username")}
        />
        <input
          placeholder="Password"
          name="password"
          type="password"
          value={props.password}
          onChange={e => props.onChange(e, "password")}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export {Intro, LoginForm};
