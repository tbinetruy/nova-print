import React, {Component} from "react";
import {colorList} from "./constants.js";
import {Hover} from "./HOC.js";
import {getThemeColor, copyToClipboard} from "./helpers.js";
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
    try {
      const resp = await new API().createFigure(
        this.props.user.token,
        this.props.currentDocument,
        file,
      );
      await this.props.fetchDocuments();
      console.log(this.props.documents, this.props.currentDocument.pk);
      this.props.updateCurrentDocumentImages(
        this.props.documents.filter(
          d => d.pk == this.props.currentDocument.pk,
        )[0].images,
      );
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    const styles = {
      wrapper: {
        position: "relative",
        height: "2rem",
        overflow: "hidden",
      },
      input: {
        cursor: "pointer",
        opacity: 0,
        position: "absolute",
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
      },
      overlay: {
        zIndex: -1,
        position: "absolute",
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
    };
    const Comp = Hover(({isHovered}) => (
      <div
        style={{
          ...styles.wrapper,
          backgroundColor: `rgba(0, 0, 0, ${isHovered ? 0.3 : 0})`,
        }}>
        <input
          style={styles.input}
          type="file"
          ref={this.fileInput}
          onChange={this.handleSubmit}
        />
        <Button style={styles.overlay} title="Add Figure" />
      </div>
    ));
    return <Comp />;
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
          <span
            key={i}
            style={styles.image}
            onClick={e => copyToClipboard(`[[./${img.image}]]`)}>
            {img.image.replace("figures/", "").substring(0, 10) + "..."}
          </span>
        ))}
        <FileInput
          user={props.user}
          fetchDocuments={props.fetchDocuments}
          currentDocument={props.currentDocument}
          documents={props.documents}
          updateCurrentDocumentImages={props.updateCurrentDocumentImages}
        />
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
            documents={props.documents}
            updateCurrentDocumentImages={props.updateCurrentDocumentImages}
            fetchDocuments={props.fetchDocuments}
            user={props.user}
            active={d.pk == props.currentDocument.pk}
            currentDocument={props.currentDocument}
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
