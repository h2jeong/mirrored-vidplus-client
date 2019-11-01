import React, { Component } from "react";
import { connect } from "react-redux";
import { addSpace } from "../../actions/creators";

class SpaceAdder extends Component {
  constructor(props) {
    super(props);
    this.vaildCheck = this.vaildCheck.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleUrlChange = this.handleUrlChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      maxId: 1,
      url: "",
      name: ""
    };
  }

  vaildCheck() {
    let result = true;
    const { url, name } = this.state;
    const txtWarning = document.getElementById("txtWarning");
    txtWarning.style.display = "none";

    const nameReg = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|._\-|*]{2,30}$/g;
    if (name === "") {
      txtWarning.style.display = "block";
      txtWarning.innerHTML = "Workspace 이름을 입력해주세요";
      result = false;
    } else if (!nameReg.test(name)) {
      txtWarning.style.display = "block";
      txtWarning.innerHTML = "2자 이상 빈칸 없이 텍스트로 입력해주세요";
      this.setState({ name: "" });
      result = false;
    }

    //const urlReg = /(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g;
    const youTubeRegs = [
      /https?:\/\/youtu.be\/([a-zA-Z0-9\-_]+)/gi,
      /https?:\/\/www.youtube.com\/watch\?v=([a-zA-Z0-9\-_]+)/gi
    ];

    if (url === "") {
      txtWarning.style.display = "block";
      txtWarning.innerHTML = "url을 입력해주세요";
      result = false;
    } else if (!youTubeRegs[0].test(url) && !youTubeRegs[1].test(url)) {
      txtWarning.style.display = "block";
      txtWarning.innerHTML = "url 형식에 맞게 입력해주세요";
      this.setState({ url: "" });
      result = false;
    }
    console.log("validate::", result);
    return result;
  }
  handleUrlChange(e) {
    this.setState({ url: e.target.value });
  }
  handleNameChange(e) {
    this.setState({ name: e.target.value });
  }
  handleSubmit(e) {
    e.preventDefault();
    if (this.vaildCheck()) {
      const { maxId, url, name } = this.state;
      const space = { id: maxId + 1, url, name };

      const { addSpace } = this.props;
      addSpace(space);

      this.setState({ maxId: space.id, url: "", name: "" });
    }
  }

  render() {
    return (
      <div>
        <form className="form-spaceAdd" onSubmit={this.handleSubmit}>
          <input
            type="text"
            id="inputUrl"
            value={this.state.url}
            onChange={this.handleUrlChange}
            placeholder="paste your url"
          />
          <input
            type="text"
            id="inputName"
            value={this.state.name}
            onChange={this.handleNameChange}
            placeholder="write space name! ex) abc.1_가-ABC"
          />
          <button type="submit">+</button>
        </form>
        <p id="txtWarning"></p>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    addSpace: space => dispatch(addSpace(space))
  };
};
SpaceAdder = connect(
  null,
  mapDispatchToProps
)(SpaceAdder);
export default SpaceAdder;
