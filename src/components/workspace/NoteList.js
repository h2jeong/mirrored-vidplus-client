import React from "react";
import { connect } from "react-redux";
import { Scrollbars } from "react-custom-scrollbars";
import Note from "./Note";

let NoteList = function(props) {
  const sortedNotes = props.notes.sort(
    (a, b) => a.timestamp.split(":").join("") - b.timestamp.split(":").join("")
  );
  return (
    <Scrollbars
      style={{ height: "calc(100vh - 200px)", minHeight: "200px" }}
      autoHide
    >
      {// If key!==note.id, the note going into each Note component will change on diff updates,
      // giving unmatching state.content / timestamp values to the Note component
      sortedNotes.map(note => (
        <Note note={note} currSpace={props.currSpace} key={note.id} />
      ))}
    </Scrollbars>
  );
};

const mapStateToProps = state => ({
  notes: state.notes
});

NoteList = connect(mapStateToProps)(NoteList);
export default NoteList;
