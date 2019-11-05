import React, { Component } from "react";
import { connect } from "react-redux";
import { addSpace } from "../../actions/creators";
import { Input, Button } from "antd";

class SpaceAdder extends Component {
  constructor(props) {
    super(props);
    this.vaildCheck = this.vaildCheck.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleUrlChange = this.handleUrlChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      url: "",
      name: "",
      txtWarning: ""
    };
  }

  vaildCheck() {
    let result = true;
    const { url, name } = this.state;

    const nameReg = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|._\-|*]{2,30}$/g;
    if (name === "") {
      this.setState({
        txtWarning: "Workspace 이름을 입력해주세요"
      });
      result = false;
    } else if (!nameReg.test(name)) {
      this.setState({
        txtWarning: "2자 이상 빈칸 없이 텍스트로 입력해주세요",
        name: ""
      });
      result = false;
    }

    //const urlReg = /(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g;
    const urlRegs = [
      /https?:\/\/youtu.be\/([a-zA-Z0-9\-_]+)/gi,
      /https?:\/\/www.youtube.com\/watch\?v=([a-zA-Z0-9\-_]+)/gi,
      /(https?:\/\/)?(www\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|)(\d+)(?:|\/\?)/gi
    ];

    if (url === "") {
      this.setState({
        txtWarning: "url을 입력해주세요"
      });
      result = false;
    } else if (
      !urlRegs[0].test(url) &&
      !urlRegs[1].test(url) &&
      !urlRegs[2].test(url)
    ) {
      this.setState({
        txtWarning: "url 형식에 맞게 입력해주세요",
        url: ""
      });
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
      const { url, name } = this.state;
      const space = { url, name };

      const { addSpace } = this.props;
      addSpace(space);

      this.setState({ url: "", name: "" });
    }
  }

  render() {
    return (
      <div>
        <form
          layout="inline"
          onSubmit={this.handleSubmit}
          className="formSpaceAdd"
        >
          <Input
            type="text"
            size="large"
            value={this.state.url}
            onChange={this.handleUrlChange}
            placeholder="Paste your URL"
          />

          <Input
            type="text"
            size="large"
            value={this.state.name}
            onChange={this.handleNameChange}
            placeholder="Space Name!  ex)abc.1_가-ABC"
          />

          <Button
            type="primary"
            shape="circle"
            icon="plus"
            htmlType="submit"
            size="large"
          />
        </form>
        <p className="txtWarning">{this.state.txtWarning}</p>
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
