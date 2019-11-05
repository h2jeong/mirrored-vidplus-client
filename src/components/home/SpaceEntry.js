import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { deleteSpace, editSpace } from "../../actions/creators";
import { Input, Button } from "antd";

const ButtonGroup = Button.Group;

class SpaceEntry extends Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.validateName = this.validateName.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.state = {
      editMode: false,
      spaceName: ""
    };
  }

  handleDelete(id) {
    const { deleteSpace } = this.props;
    deleteSpace(id);
  }
  handleToggle(name) {
    this.setState({
      editMode: !this.state.editMode,
      spaceName: name,
      getNotes: 0
    });
  }
  validateName(name) {
    let result = true;
    const nameReg = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|._\-|*]{2,30}$/g;

    if (name === "") {
      alert("Workspace 이름을 입력해주세요");
      result = false;
    } else if (!nameReg.test(name)) {
      alert("2자 이상 빈칸 없이 텍스트로 입력해주세요");
      this.setState({ name: this.state.spaceName });
      result = false;
    }
    return result;
  }
  handleNameChange(e) {
    if (!this.validateName(e.target.value)) {
      e.target.value = this.state.spaceName;
    } else {
      this.setState({ spaceName: e.target.value });
    }
  }
  handleEdit(id) {
    const { spaceName } = this.state;
    const { editSpace } = this.props;
    editSpace(spaceName, id);
    this.setState({
      editMode: false,
      spaceName: ""
    });
  }

  render() {
    const { space, notes } = this.props;
    const getNotes = notes.filter(note => space.id === note.space_id);
    const { editMode } = this.state;
    let spaceName = editMode ? (
      <form className="formEditSpaceName">
        <Input
          style={{ width: "80%" }}
          type="text"
          onChange={this.handleNameChange}
          defaultValue={space.name}
        />
        <Button
          type="button"
          size="small"
          onClick={() => this.handleEdit(space.id)}
          icon="check"
          shape="circle"
        />
      </form>
    ) : (
      <Link to={`/spaces/${space.name}`}>{space.name}</Link>
    );

    return (
      <tr>
        <td>{spaceName}</td>
        <td>{getNotes.length} Notes</td>
        <td className="modifiedTime">Modified: {space.updatedAt}</td>
        <td className="btnArea">
          <ButtonGroup>
            <Button
              type="button"
              size="large"
              onClick={() => this.handleToggle(space.name)}
              icon="edit"
            />
            <Button
              type="button"
              size="large"
              onClick={() => this.handleDelete(space.id)}
              icon="delete"
            />
          </ButtonGroup>
        </td>
      </tr>
    );
  }
}
const mapStateToProps = state => {
  return {
    notes: state.notes
  };
};
const mapDispatchToProps = dispatch => {
  return {
    deleteSpace: id => dispatch(deleteSpace(id)),
    editSpace: (name, id) => dispatch(editSpace(name, id))
  };
};
SpaceEntry = connect(
  mapStateToProps,
  mapDispatchToProps
)(SpaceEntry);
export default SpaceEntry;
