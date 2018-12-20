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
        {props.document ? props.document.title : 0}
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
    ? props.documents
        .sort(
          (a, b) => a.title.toLocaleLowerCase() > b.title.toLocaleLowerCase(),
        )
        .map((d, i) => (
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

export default DocumentList;
