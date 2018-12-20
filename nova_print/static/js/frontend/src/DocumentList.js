import React, {Component} from "react";
import {colorList} from "./constants.js";
import {Hover} from "./HOC.js";
import {getThemeColor} from "./helpers.js";
import {Button} from "./UI.js";
import API from "./API.js";

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

class FileInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fileInput = React.createRef();
  }
  async handleSubmit(event) {
    event.preventDefault();
    const file = this.fileInput.current.files[0];
    console.log(file);
    try {
      const resp = await new API().createFigure(this.props.user.token, file);
      const json = await resp.json();
      console.log(json);
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="file" ref={this.fileInput} />
        <button type="submit">uplaod</button>
      </form>
    );
  }
}

const ListItem = Hover(props => {
  const styles = {
    cellWrapper: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: props.active ? "auto" : 2 + "rem",
      cursor: "pointer",
      backgroundColor: getThemeColor(
        props.color,
        props.isHovered ? 0.3 : props.active ? 0.2 : 0.1,
      ),
      flexDirection: "column",
    },
    cell: cellStyle,
    imagesWrapper: {
      display: props.active ? "flex" : "none",
      flexDirection: "column",
      width: "100%",
    },
    image: {
      ...cellStyle,
    },
  };
  console.log(props.color, getThemeColor(props.color, 0.1));

  return (
    <div style={styles.cellWrapper}>
      <div onClick={props.loadDocument} style={styles.cell}>
        {props.document ? props.document.title : 0}
      </div>
      <div style={styles.imagesWrapper}>
        {props.document.images.map((img, i) => (
          <span key={i} style={styles.image}>
            {img.image.replace("figures/", "").substring(0, 10) + "..."}
          </span>
        ))}
        <FileInput user={props.user} />
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
            user={props.user}
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
