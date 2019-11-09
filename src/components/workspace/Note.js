import React, { Component } from "react";
import { changeTimestamp, editNote, deleteNote } from "../../actions/creators";
import { connect } from "react-redux";
import { Input, Button, Icon, Tooltip } from "antd";
const { TextArea } = Input;

function checkTimestamp(timestamp) {
  let timestampValid;
  switch (timestamp.length) {
    case 4:
      timestampValid = /\d:[0-5]\d/.test(timestamp);
      break;
    case 5:
      timestampValid = /[0-5]\d:[0-5]\d/.test(timestamp);
      break;
    case 7:
      timestampValid = /\d:[0-5]\d:[0-5]\d/.test(timestamp);
      break;
    default:
      timestampValid = false;
  }
  return timestampValid;
}

class Note extends Component {
  constructor(props) {
    super(props);
    this.toggleTimestamp = this.toggleTimestamp.bind(this);
    this.onContentChange = this.onContentChange.bind(this);
    this.onTimestampChange = this.onTimestampChange.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
    /* If we want to control the TextArea input w/o making cursor jump to the end
    on every change, we need to manage the state internally (passing content from
    redux via props.note.content does not remember cursor position) */
    this.state = {
      content: props.note.content,
      timestamp: props.note.timestamp,
      timeIsEditable: false
    };
  }

  // *Note: componentDidUpdate when switching current space is not needed, b/c the same
  // Note component will never be rendered for diff spaces (as key is a unique note id)

  onContentChange(e) {
    // need to set state separately instead of directly referencing redux
    // store in TextArea because of the bug mentioned in constructor()
    this.setState({ content: e.target.value });
    this.props.editNote({ ...this.props.note, content: e.target.value });
  }

  onTimestampChange(e) {
    this.setState({ timestamp: e.target.value });
  }

  deleteNote() {
    this.props.deleteNote(this.props.note.id);
  }

  toggleTimestamp() {
    let timestamp = this.state.timestamp;
    // If timestamp has just been edited
    if (this.state.timeIsEditable) {
      if (!checkTimestamp(timestamp)) {
        // If edited timestamp is not valid
        return alert(
          "The timestamp format is not valid. Please follow a MM:SS format."
        );
      } else {
        if (timestamp.length > 4) {
          // remove unnecesary 0s
          timestamp = timestamp.replace(/^0:?0?/, "");
        }
        // Update the server / db and make changes in redux
        this.props.editNote({ ...this.props.note, timestamp });
      }
    }
    // Toggle timestamp editor (& update timestamp if unnecessary 0s were removed)
    this.setState({ timeIsEditable: !this.state.timeIsEditable, timestamp });
  }

  render() {
    const { note, changeTimestamp } = this.props;
    return (
      <div className="note-div">
        {this.state.timeIsEditable ? (
          <Input
            className="note-timestamp"
            value={this.state.timestamp}
            onChange={this.onTimestampChange}
            onEnter={this.toggleTimestamp}
          />
        ) : (
          <a href="#" onClick={() => changeTimestamp(note.timestamp)}>
            {note.timestamp}
          </a>
        )}

        <TextArea
          onChange={this.onContentChange}
          value={this.state.content}
          autoSize
        />
        <Tooltip title="Edit Timestamp">
          <Button
            type="button"
            style={{
              marginRight: 0,
              borderRadius: "3px 0px 0px 3px",
              width: "10px"
            }}
            onClick={this.toggleTimestamp}
          >
            {this.state.timeIsEditable ? (
              <Icon type="check" style={{ marginLeft: "-7px" }} />
            ) : (
              <img
                alt=""
                src={require("../../styles/editTime.png")}
                style={{ width: "16px", marginLeft: "-7px", opacity: 0.8 }}
              />
            )}
          </Button>
        </Tooltip>
        <Tooltip title="Delete Note">
          <Button
            type="button"
            style={{
              marginLeft: 0,
              borderRadius: "0px 3px 3px 0px",
              width: "10px"
            }}
            onClick={this.deleteNote}
          >
            <Icon type="delete" style={{ marginLeft: "-7px" }}></Icon>
          </Button>
        </Tooltip>
      </div>
    );
  }
}

const matchDispatchToProps = dispatch => ({
  changeTimestamp: time => dispatch(changeTimestamp(time)),
  deleteNote: id => dispatch(deleteNote(id)),
  editNote: note => dispatch(editNote(note))
});
Note = connect(
  null,
  matchDispatchToProps
)(Note);
export default Note;
