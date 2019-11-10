import React, { Component } from "react";
import { connect } from "react-redux";
import { addNote } from "../../actions/creators";
import { Row, Col, Input, Button } from "antd";
const { TextArea } = Input;

function secondsToTimeStamp(currTime) {
  let minutes = Math.floor(currTime / 60);
  let hours;
  if (minutes >= 60) {
    hours = Math.floor(minutes / 60);
    minutes = ("0" + (minutes % 60)).slice(-2);
  }
  // prepending zero to single digit seconds (match timestamp format)
  let seconds = ("0" + Math.round(currTime % 60)).slice(-2);
  return `${hours ? hours + ":" : ""}${minutes}:${seconds}`;
}

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

class NoteInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      space_id: props.currSpace.id,
      content: "",
      timestamp: ""
    };
    this.onEnter = this.onEnter.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currSpace !== this.props.currSpace) {
      // Change the id of the NoteInput when currSpace changes
      this.setState({ space_id: this.props.currSpace.id });
    } else if (prevProps.notes.length !== this.props.notes.length) {
      // After new note has been updated in db & entered in store
      this.setState({ content: "" });
    }
  }

  onEnter(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      let timestamp;
      // if timestamp was manually entered by the user
      if (this.state.timestamp !== "") {
        timestamp = this.state.timestamp;
        if (!checkTimestamp(timestamp))
          return alert(
            "The timestamp format is not valid. Please follow a MM:SS format."
          );
        if (timestamp.length > 4) {
          timestamp = timestamp.replace(/^(?:0:0)|^(?:0:)|^0/, ""); // remove unnecesary 0s
        }
      } else {
        timestamp = secondsToTimeStamp(this.props.currTime);
      }
      const content = this.state.content.trim(); // remove \n from final enter
      // addNote (id field not needed b/c response from db will automatically create it)
      this.props.addNote({ ...this.state, content, timestamp });
    }
  }

  render() {
    const timestamp = secondsToTimeStamp(this.props.currTime);
    return (
      <Row>
        <TextArea
          value={this.state.content}
          onChange={e => this.setState({ content: e.target.value })}
          onKeyUp={this.onEnter}
          placeholder="Add note..."
          style={{ marginTop: "10px", fontSize: "16px" }}
          autoSize={{ minRows: 2 }}
        />
        <Row>
          <Col span={12}>
            <Input
              placeholder={`Set note timestamp... (Default: ${timestamp})`}
              style={{ marginTop: "10px", width: "100%" }}
              onChange={e => this.setState({ timestamp: e.target.value })}
            />
          </Col>
          <Col span={12} style={{ textAlign: "right" }}>
            <Button
              size="large"
              icon="form"
              style={{
                margin: "10px 0 0 10px",
                maxWidth: "calc(100% - 10px)",
                overflow: "hidden"
              }}
              onClick={() => this.onEnter({ key: "Enter" })}
            >
              Add Note
            </Button>
          </Col>
        </Row>
      </Row>
    );
  }
}

const matchStateToProps = state => ({
  notes: state.notes,
  currTime: state.currTime
});

const matchDispatchToProps = dispatch => ({
  addNote: note => dispatch(addNote(note))
});
NoteInput = connect(
  matchStateToProps,
  matchDispatchToProps
)(NoteInput);
export default NoteInput;
