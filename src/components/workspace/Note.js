import React, { Component } from "react";
import { changeTimestamp, editNote, deleteNote } from "../../actions/creators";
import { connect } from "react-redux";
import { Input, Button, Icon } from "antd";
const { TextArea } = Input;

class Note extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
    /* If we want to control the TextArea input w/o making cursor jump to the end
    on every change, we need to manage the state internally (passing content from
    redux via props.note.content does not remember cursor position) */
    this.state = { content: props.note.content };
  }

  // *Note: componentDidUpdate when switching current space is not needed, b/c the same
  // Note component will never be rendered for diff spaces (as key is a unique note id)

  onChange(e) {
    // need to set state separately instead of directly referencing redux
    // store in TextArea because of the bug mentioned in constructor()
    this.setState({ content: e.target.value });
    this.props.editNote({ ...this.props.note, content: e.target.value });
  }

  deleteNote() {
    this.props.deleteNote(this.props.note.id);
  }

  render() {
    const { note, changeTimestamp } = this.props;
    return (
      <div className="note-div">
        <a href="#" onClick={() => changeTimestamp(note.timestamp)}>
          {note.timestamp}
        </a>
        <TextArea
          onChange={this.onChange}
          value={this.state.content}
          autoSize
        />
        <Button
          type="button"
          style={{
            marginRight: 0,
            borderRadius: "3px 0px 0px 3px",
            borderRight: 0,
            width: "10px"
          }}
        >
          <img
            alt=""
            src={require("../../styles/editTime.png")}
            style={{ width: "16px", marginLeft: "-7px", opacity: 0.8 }}
          />
        </Button>
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
