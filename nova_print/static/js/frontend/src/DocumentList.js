import React, {Component} from "react";
import {Hover} from "./HOC.js";
import {colorList} from "./constants.js";

function hexToRgb(hex) {
  console.log(hex);
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

function getThemeColor(hex, opacity, inverse = false) {
  const {r, g, b} = hexToRgb(hex);
  let rgb = `rgba(${r},${g},${b},${opacity})`;
  if (inverse) {
    rgb = `rgba(${255 - r},${255 - g},${255 - b},${opacity})`;
  }
  return rgb;
}

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

const Button = Hover(props => {
  const buttonStyle = {
    ...cellStyle,
    backgroundColor: getThemeColor(
      props.color,
      props.isHovered ? 0.7 : 0,
      true,
    ),
    width: "100%",
    cursor: "pointer",
  };
  return (
    <div style={buttonStyle} onClick={props.onClick}>
      {props.title}
    </div>
  );
});

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
      <Button color={props.color} title="Save" onClick={props.saveDocument} />
      <Button
        color={props.color}
        title="Compile"
        onClick={props.compileDocument}
      />

      <div style={styles.header}>My Docs</div>
      <div style={styles.listWrapper}>
        {list}
        <Button color={props.color} title="+" onClick={props.createDocument} />
      </div>
    </div>
  );
};

export default DocumentList;
