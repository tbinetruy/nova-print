import React, {Component} from "react";
import {colorList} from "./constants.js";
import {Hover} from "./HOC.js";
import {getThemeColor} from "./helpers.js";
import {Button} from "./UI.js";

const cellStyle = {
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  height: "2rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
};

const ListItem = Hover(props => {
  const styles = {
    cellWrapper: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: (props.active ? 3 : 2) + "rem",
      cursor: "pointer",
      backgroundColor: getThemeColor(props.color, props.isHovered ? 0.2 : 0.1),
      flexDirection: "column",
    },
    cell: cellStyle,
  };
  console.log(props.color, getThemeColor(props.color, 0.1));

  return (
    <div style={styles.cellWrapper}>
      <div onClick={props.loadDocument} style={styles.cell}>
        {props.document ? props.document.title : 0}
      </div>
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
    },
    header: {
      padding: "1rem 0",
      backgroundColor: getThemeColor(props.color, 0.2),
      color: "rgba(74, 74, 74, 0.9)",
      fontWeight: "bold",
    },
    button: {
      ...cellStyle,
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
            color={props.color}
          />
        ))
    : "";

  return (
    <div style={styles.wrapper}>
      <div style={styles.header}>Current Doc</div>
      <Button
        style={cellStyle}
        color={props.color}
        title="Save"
        onClick={props.saveDocument}
      />
      <Button
        style={cellStyle}
        color={props.color}
        title="Compile"
        onClick={props.compileDocument}
      />

      <div style={styles.header}>My Docs</div>
      <div style={styles.listWrapper}>
        {list}
        <Button
          style={cellStyle}
          color={props.color}
          title="+"
          onClick={props.createDocument}
        />
      </div>
    </div>
  );
};

export default DocumentList;
