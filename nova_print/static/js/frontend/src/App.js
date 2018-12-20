import React, {Component} from "react";
import "./App.css";

const clientId = "F9pKxCwq8n9mr41YwLjFjAoaXOL7FOs7rEvzirTA";
const clientSecret =
  "8sfNsRo5wfSYmD0hzqPesPWCcTnoU7SyYsbgpdvypj2riZSTFzPs01mnlOb6m9MVbVhIgp7jfmMNAAqC5EeyWk08QiDJDxyQqttwEFkav13ZygCU71HsCbDb7GhYaoJ4";

const Form = props => {
  return (
    <div className="wrapper">
      <p>{props.errorMsg}</p>
      <input
        name="username"
        value={props.username}
        onChange={e => props.onChange(e, "username")}
      />
      <input
        name="password"
        type="password"
        value={props.password}
        onChange={e => props.onChange(e, "password")}
      />
      <button onClick={props.onSubmit}>Login</button>
    </div>
  );
};

const DocumentList = props => {
  const styles = {
    wrapper: {
      display: "flex",
      flexDirection: "column",
    },
  };

  const list = props.documents
    ? props.documents.map((d, i) => (
        <div style={styles.cell} key={i} onClick={e => props.loadDocument(i)}>
          {d.title}
        </div>
      ))
    : "";

  return (
    <div style={styles.wrapper}>
      <div style={styles.row}>{list}</div>
    </div>
  );
};

const DocumentViewer = props => {
  const styles = {
    wrapper: {
      display: "flex",
      flexDirection: "column",
    },
    headerWrapper: {
      display: "flex",
      flexDirection: "column",
    },
    paramInput: {
      display: "flex",
    },
    label: {
      width: "7rem",
    },
    viewerWrapper: {
      display: "flex",
      height: "60vh",
    },
    flex1: {
      display: "flex",
      flex: 1,
    },
  };
  return (
    <div style={styles.wrapper}>
      <div style={styles.headerWrapper}>
        <div style={styles.paramInput}>
          <label style={styles.label} htmlFor="tite">
            Title:{" "}
          </label>
          <input
            name="title"
            value={props.document.title}
            onChange={e => props.updateDocument(e, "title")}
          />
        </div>
        <div style={styles.paramInput}>
          <label style={styles.label} htmlFor="subtitle">
            Subtitle:{" "}
          </label>
          <input
            name="subtitle"
            value={props.document.subtitle}
            onChange={e => props.updateDocument(e, "subtitle")}
          />
        </div>
        <div style={styles.paramInput}>
          <label style={styles.label} htmlFor="theme_color">
            Theme color:{" "}
          </label>
          <input
            name="theme_color"
            value={props.document.theme_color}
            onChange={e => props.updateDocument(e, "theme_color")}
          />
        </div>
      </div>
      <div style={styles.viewerWrapper}>
        <textarea
          style={styles.flex1}
          cols="50"
          rows="10"
          value={props.document.org}
          onChange={e => props.updateDocument(e, "org")}
        />
        <iframe
          title="preview"
          key={props.iframeKey}
          style={styles.flex1}
          src={"http://127.0.0.1:8000/static/" + props.iframeUrl + ".pdf"}
        />
      </div>
      <button onClick={props.save}>Save</button>
      <button onClick={props.compile}>Compile document</button>
      <button onClick={props.createDocument}>New</button>
    </div>
  );
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      user: {},
      documents: "",
      errorMsg: "",
      currentDocument: {
        title: "",
        subtitle: "",
        theme_color: "",
        toc: false,
        org: "",
      },
      iframeKey: 0,
    };

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.onChange = this.onChange.bind(this);
    this.loadDocument = this.loadDocument.bind(this);
    this.createDocument = this.createDocument.bind(this);
    this.saveDocument = this.saveDocument.bind(this);
    this.updateDocument = this.updateDocument.bind(this);
    this.fetchDocuments = this.fetchDocuments.bind(this);
    this.compileDocument = this.compileDocument.bind(this);
    this.getCurrentDocumentPk = this.getCurrentDocumentPk.bind(this);
  }
  async createDocument() {
    const defaultDocument = {
      title: "Title",
      subtitle: "Subtitle",
      author: this.state.user.id,
      org: "Org mode goes here",
      toc: false,
      theme_color: "119fd4",
    };
    const url = `/api/documents/`;
    const options = {
      method: "POST",
      headers: {
        authorization: `Token ${this.state.user.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(defaultDocument),
    };

    try {
      await fetch(url, options);
    } catch (e) {
      console.log(e);
    }

    this.fetchDocuments();
  }
  async saveDocument() {
    const url = `/api/documents/${this.state.currentDocument.pk}/`;
    const options = {
      method: "PUT",
      headers: {
        authorization: `Token ${this.state.user.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state.currentDocument),
    };

    try {
      const r = await fetch(url, options);
      const json = await r.json();
      console.log(json);
    } catch (e) {
      console.log(e);
    }

    this.fetchDocuments();
  }
  async fetchDocuments() {
    const url = `/api/documents`;
    const options = {
      headers: {
        Authorization: `Token ${this.state.user.token}`,
      },
    };

    try {
      const r = await fetch(url, options);
      const json = await r.json();
      this.setState({documents: json});
    } catch (e) {
      console.log(e);
    }
  }
  logout() {
    this.setState({user: {}});
  }
  async login() {
    const {username, password} = this.state;
    const url = `/authenticate/?client_id=${clientId}&client_secret=${clientSecret}&grant_type=password`;
    const body = JSON.stringify({
      username,
      password,
    });
    const headers = {
      "Content-Type": "application/json",
    };
    const options = {method: "POST", body, headers};

    try {
      const resp = await fetch(url, options);
      const user = await resp.json();

      if (user.token) {
        this.setState({user, errorMsg: ""});
        this.fetchDocuments();
      } else this.setState({errorMsg: "Invalid creds"});
    } catch (e) {
      console.log(e);
    }
  }
  onChange(e, name) {
    this.setState({[name]: e.target.value});
  }
  loadDocument(i) {
    this.setState({currentDocument: this.state.documents[i]});
  }
  updateDocument(e, name) {
    const currentDocument = {
      ...this.state.currentDocument,
      [name]: e.target.value,
    };
    this.setState({currentDocument});
  }
  getOrgData() {
    const {title, subtitle, theme_color, org} = this.state.currentDocument;
    const doctype = "memo";

    const header = `
#+TITLE: ${subtitle} \n
#+INCLUDE: "./nova-print/doctype-${doctype}.org" \n
{{{subtitle(${title})}}} \n
{{{theme-color(${theme_color})}}} \n`;

    return header + org;
  }
  getCurrentDocumentPk() {
    return this.state.user.id + "-" + this.state.currentDocument.pk;
  }
  async compileDocument() {
    console.log("Compiling");
    const org = this.getOrgData();
    const data = {
      org,
      filename: this.getCurrentDocumentPk(),
    };
    const options = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    };
    await fetch("/submit", options);
    this.setState({iframeKey: this.state.iframeKey + 1});
    this.saveDocument();
    console.log("Done compiling");
  }
  render() {
    return (
      <div className="App">
        {!this.state.user.token ? (
          <Form
            password={this.state.password}
            username={this.state.username}
            onChange={this.onChange}
            onSubmit={this.login}
            errorMsg={this.state.errorMsg}
          />
        ) : (
          [
            <DocumentList
              key={0}
              documents={this.state.documents}
              loadDocument={this.loadDocument}
            />,
            <DocumentViewer
              key={1}
              document={this.state.currentDocument}
              updateDocument={this.updateDocument}
              createDocument={this.createDocument}
              save={this.saveDocument}
              compile={this.compileDocument}
              iframeKey={this.state.iframeKey}
              iframeUrl={this.getCurrentDocumentPk()}
            />,
            <button onClick={this.logout} key={2}>
              Logout
            </button>,
          ]
        )}
      </div>
    );
  }
}

export default App;
