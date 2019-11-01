import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { deleteSpace, editSpace } from "../../actions/creators";

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
      spaceName: name
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
    const { space } = this.props;
    const { editMode } = this.state;
    let spaceName = editMode ? (
      <form className="form-editSpaceName">
        <input
          type="text"
          onChange={this.handleNameChange}
          defaultValue={space.name}
        />
        <button type="button" onClick={() => this.handleEdit(space.id)}>
          change
        </button>
      </form>
    ) : (
      <Link to={`/spaces/${space.name}`}>{space.name}</Link>
    );

    return (
      <tr>
        <td>{spaceName}</td>
        <td>{space.id} Notes</td>
        <td>Modified {space.updateAt}</td>
        <td>
          <button type="button" onClick={() => this.handleToggle(space.name)}>
            Edit
          </button>
          <button type="button" onClick={() => this.handleDelete(space.id)}>
            Delete
          </button>
        </td>
      </tr>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteSpace: id => dispatch(deleteSpace(id)),
    editSpace: (name, id) => dispatch(editSpace(name, id))
  };
};
SpaceEntry = connect(
  null,
  mapDispatchToProps
)(SpaceEntry);
export default SpaceEntry;
