import React, {Component} from "react";
import "./App.css";
import {colorList} from "./constants.js";
import novaPrintScreenshot from "./img/nova-print-screenshot.png";
import API from "./API.js";

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

const Hover = Comp =>
  class C extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isHovered: false,
      };
      this.onMouseLeave = this.onMouseLeave.bind(this);
      this.onMouseEnter = this.onMouseEnter.bind(this);
    }
    onMouseEnter() {
      this.setState({isHovered: true});
    }
    onMouseLeave() {
      this.setState({isHovered: false});
    }
    render() {
      return (
        <div onMouseLeave={this.onMouseLeave} onMouseEnter={this.onMouseEnter}>
          <Comp isHovered={this.state.isHovered} />
        </div>
      );
    }
  };

const DocumentList = props => {
  const styles = {
    wrapper: {
      display: "flex",
      flexDirection: "column",
      margin: "1rem",
      justifyContent: "center",
      backgroundColor: "rgba(0, 0, 0, 0.1)",
      maxWidth: "10rem",
      minWidth: "10rem",
    },
    button: {
      margin: "1rem",
    },
    cellWrapper: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "2rem",
      backgroundColor: "rgba(0, 0, 0, 0.1)",
      cursor: "pointer",
    },
    cell: {
      display: "block",
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
      padding: "0 0.5rem",
    },
    listWrapper: {
      display: "flex",
      flexDirection: "column",
      flex: 1,
      justifyContent: "center",
    },
    header: {
      padding: "1rem 0",
      background: "rgba(0, 0, 0, 0.2)",
      color: "rgba(74, 74, 74, 0.9)",
      fontWeight: "bold",
    },
  };

  const list = props.documents
    ? props.documents.map((d, i) =>
        React.createElement(
          Hover(hoverProps => (
            <div
              onClick={e => props.loadDocument(i)}
              style={{
                ...styles.cellWrapper,
                backgroundColor: `rgba(0, 0, 0, ${
                  hoverProps.isHovered ? 0.1 : 0
                })`,
              }}>
              <div style={styles.cell}>
                {d.title}
                {props.isHovered}
              </div>
            </div>
          )),
          {key: i},
        ),
      )
    : "";

  return (
    <div style={styles.wrapper}>
      <div style={styles.header}>My Docs</div>
      <div style={styles.listWrapper}>
        {list}
        <button style={styles.button} onClick={props.createDocument}>
          +
        </button>
      </div>
    </div>
  );
};

const DocumentViewer = props => {
  const styles = {
    wrapper: {
      display: "flex",
      flexDirection: "column",
      margin: "1rem",
      marginLeft: "0rem",
    },
    headerWrapper: {
      display: "flex",
      margin: "1rem",
      justifyContent: "space-between",
    },
    paramInput: {
      display: "flex",
    },
    label: {
      margin: "0 1rem",
      display: "flex",
      alignItems: "center",
    },
    viewerWrapper: {
      display: "flex",
      height: "60vh",
    },
    flex1: {
      display: "flex",
      flex: 1,
    },
    buttonWrapper: {
      display: "flex",
    },
    button: {
      flex: 1,
      margin: "0.5rem 4rem",
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
          <select
            onChange={e => props.updateDocument(e, "theme_color")}
            value={props.document.theme_color}>
            {colorList.map(c => (
              <option value={c}>{c}</option>
            ))}
          </select>
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
      <div style={styles.buttonWrapper}>
        <button style={styles.button} onClick={props.save}>
          Save
        </button>
        <button style={styles.button} onClick={props.compile}>
          Compile document
        </button>
      </div>
    </div>
  );
};

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
    try {
      await new API().createDocument(this.state.user);
    } catch (e) {
      console.log(e);
    }

    this.fetchDocuments();
  }
  async saveDocument() {
    try {
      await new API().saveDocument(
        this.state.user.token,
        this.state.currentDocument,
      );
    } catch (e) {
      console.log(e);
    }

    this.fetchDocuments();
  }
  async fetchDocuments() {
    try {
      const json = await new API().fetchDocuments(this.state.user.token);
      this.setState({documents: json});
    } catch (e) {
      console.log(e);
    }
  }
  logout() {
    this.setState({user: {}});
  }
  async login(e) {
    e.preventDefault();

    const {username, password} = this.state;

    try {
      const user = await new API().login(username, password);

      if (user.token) {
        this.setState({user, errorMsg: ""});
        await this.fetchDocuments();
        if (this.state.documents.length) {
          this.loadDocument(0);
        }
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
    try {
      await new API().compileDocument(
        this.getOrgData(),
        this.getCurrentDocumentPk(),
      );
      this.setState({iframeKey: this.state.iframeKey + 1});
      this.saveDocument();
    } catch (e) {
      console.log(e);
    }
    console.log("Done compiling");
  }
  render() {
    const styles = {
      dashboardWrapper: {
        display: "flex",
      },
      documentWrapper: {
        dispay: "flex",
        flexDirection: "column",
        flex: 1,
      },
      pageWrapper: {
        display: "flex",
        flexDirection: "column",
      },
    };
    return (
      <div className="App">
        {!this.state.user.token ? (
          <div>
            <LoginForm
              password={this.state.password}
              username={this.state.username}
              onChange={this.onChange}
              onSubmit={this.login}
              errorMsg={this.state.errorMsg}
            />
            <Intro />
          </div>
        ) : (
          <div style={styles.pageWrapper}>
            <Header username={this.state.username} logout={this.logout} />
            <div style={styles.dashboardWrapper}>
              <DocumentList
                documents={this.state.documents}
                loadDocument={this.loadDocument}
                createDocument={this.createDocument}
              />
              <div style={styles.documentWrapper}>
                <DocumentViewer
                  document={this.state.currentDocument}
                  updateDocument={this.updateDocument}
                  save={this.saveDocument}
                  compile={this.compileDocument}
                  iframeKey={this.state.iframeKey}
                  iframeUrl={this.getCurrentDocumentPk()}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default App;
