import React, {Component} from "react";
import {Hover} from "./HOC.js";
import {colorList} from "./constants.js";

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

export {DocumentList, DocumentViewer, Header};
