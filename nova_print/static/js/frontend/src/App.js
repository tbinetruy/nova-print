import React, {Component} from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.login = this.login.bind(this);

    this.login();
  }
  async login() {
    const o = {method: "POST"};

    const clientId = "F9pKxCwq8n9mr41YwLjFjAoaXOL7FOs7rEvzirTA";
    const clientSecret =
      "8sfNsRo5wfSYmD0hzqPesPWCcTnoU7SyYsbgpdvypj2riZSTFzPs01mnlOb6m9MVbVhIgp7jfmMNAAqC5EeyWk08QiDJDxyQqttwEFkav13ZygCU71HsCbDb7GhYaoJ4";
    const username = "victor";
    const password = "i am here";

    const url = `/user-auth/token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=password&username=${username}&password=${password}`;

    let token = "";
    try {
      const resp = await fetch(url, o);
      const json = await resp.json();
      console.log(json);
      token = json.access_token;
    } catch (e) {
      console.log(e);
    }

    const url2 = `/api/users`;
    const options = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    const r2 = await fetch(url2, options);
    const json2 = await r2.json();
    console.log(json2);
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer">
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
