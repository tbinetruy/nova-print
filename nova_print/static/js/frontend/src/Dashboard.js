import React, {Component} from "react";
import {Hover} from "./HOC.js";
import {colorList} from "./constants.js";

const ListItem = Hover(props => {
  const cell = {
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    height: "2rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  };
  const styles = {
    cellWrapper: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: (props.active ? 6 : 2) + "rem",
      cursor: "pointer",
      backgroundColor: `rgba(0, 0, 0, ${
        props.isHovered ? 0.2 : props.active ? 0.1 : 0
      })`,
      flexDirection: "column",
    },
    cell,
    active: {
      backgroundColor: "rgba(0, 0, 0, 0.1)",
    },
    button: {
      ...cell,
      display: props.active ? cell.display : "none",
    },
  };

  const Button = Hover(props => {
    const buttonStyle = {
      ...styles.button,
      backgroundColor: `rgba(255, 255, 255, ${props.isHovered ? 0.2 : 0})`,
      width: "100%",
    };
    return (
      <div style={buttonStyle} onClick={props.onClick}>
        {props.title}
      </div>
    );
  });

  return (
    <div style={styles.cellWrapper}>
      <div onClick={props.loadDocument} style={styles.cell}>
        {props.document.title}
      </div>
      <Button title="Save" onClick={props.save} />
      <Button title="Compile" onClick={props.compile} />
    </div>
  );
});

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
    ? props.documents.map((d, i) => (
        <ListItem
          active={d.pk == props.currentDocument.pk}
          document={d}
          key={i}
          loadDocument={() => props.loadDocument(i)}
          save={props.saveDocument}
          compile={props.compileDocument}
        />
      ))
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

export {DocumentList, DocumentViewer, Header};
