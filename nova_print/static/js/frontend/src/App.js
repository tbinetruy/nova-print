import React, {Component} from "react";
import "./App.css";
import API from "./API.js";
import {Intro, LoginForm} from "./Home.js";
import {DocumentList, DocumentViewer, Header} from "./Dashboard.js";

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
                currentDocument={this.state.currentDocument}
                saveDocument={this.saveDocument}
                compileDocument={this.compileDocument}
              />
              <div style={styles.documentWrapper}>
                <DocumentViewer
                  document={this.state.currentDocument}
                  updateDocument={this.updateDocument}
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
