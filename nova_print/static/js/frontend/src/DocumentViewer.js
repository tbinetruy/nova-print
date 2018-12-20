import React from "react";
import {colorList} from "./constants.js";

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
      height: "calc(100vh - 11rem)",
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
          src={
            `${
              window.origin.includes("127.0.0.1") ? "http://127.0.0.1:8000" : ""
            }/static/` +
            props.iframeUrl +
            ".pdf"
          }
        />
      </div>
    </div>
  );
};

export default DocumentViewer;
