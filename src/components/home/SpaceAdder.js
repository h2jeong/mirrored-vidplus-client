import React, { Component } from "react";
import { connect } from "react-redux";
import { addSpace } from "../../actions/creators";
import { Input, Button } from "antd";

class SpaceAdder extends Component {
  constructor(props) {
    super(props);
    this.duplicateCheck = this.duplicateCheck.bind(this);
    this.vaildCheck = this.vaildCheck.bind(this);
    this.handleUrlChange = this.handleUrlChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      url: "",
      name: "",
      txtWarning: ""
    };
  }

  // 중복된 이름 추가 체크
  duplicateCheck(name) {
    const { spaces } = this.props;
    let result = true;

    for (let i = 0; i < spaces.length; i++) {
      if (spaces[i].name === name) return false;
    }

    return result;
  }

  // 입력값 유효성 검사
  vaildCheck() {
    let result = true;
    const { url, name } = this.state;
    const nameReg = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|._\-|*]{1,30}$/g;

    if (name === "") {
      this.setState({
        txtWarning: "Workspace 이름을 입력해주세요"
      });
      result = false;
    } else if (!nameReg.test(name)) {
      this.setState({
        name: "",
        txtWarning: "빈칸 없이 텍스트로 입력해주세요"
      });
      result = false;
    } else if (!this.duplicateCheck(name)) {
      alert("이미 등록된 Workspace 이름이 있습니다.");
      this.setState({ name: this.state.spaceName });
      result = false;
    }

    /*
    일반 사이트 정규 표현식
    const urlReg = /(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g;
    적용한 동영상 사이트 정규표현식 [유튜브1, 유튜브2, 비데오, 페이스북, 데일리모션]
    */

    const urlRegs = [
      /https?:\/\/youtu.be\/([a-zA-Z0-9\-_]+)/gi,
      /https?:\/\/www.youtube.com\/watch\?v=([a-zA-Z0-9\-_]+)/gi,
      /(https?:\/\/)?(www\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|)(\d+)(?:|\/\?)/gi,
      /^(?:(?:https?:)?\/\/)?(?:www\.)?facebook\.com\/[a-zA-Z0-9\.]+\/videos\/(?:[a-zA-Z0-9\.]+\/)?([0-9]+)/,
      /^.+dailymotion.com\/(video|hub)\/([^_]+)[^#]*(#video=([^_&]+))?/
    ];

    if (url === "") {
      this.setState({
        txtWarning: "url을 입력해주세요"
      });
      result = false;
    } else if (
      !urlRegs[0].test(url) &&
      !urlRegs[1].test(url) &&
      !urlRegs[2].test(url) &&
      !urlRegs[3].test(url) &&
      !urlRegs[4].test(url)
    ) {
      this.setState({
        txtWarning: "url 형식에 맞게 입력해주세요",
        url: ""
      });
      result = false;
    }

    return result;
  }
  handleUrlChange(e) {
    this.setState({ txtWarning: "", url: e.target.value });
  }
  handleNameChange(e) {
    this.setState({ txtWarning: "", name: e.target.value });
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
            placeholder="Paste video URL (YouTube, Vimeo, Facebook, Dailymotion)"
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
const mapStateToProps = state => {
  return {
    spaces: state.spaces
  };
};
const mapDispatchToProps = dispatch => {
  return {
    addSpace: space => dispatch(addSpace(space))
  };
};
SpaceAdder = connect(
  mapStateToProps,
  mapDispatchToProps
)(SpaceAdder);
export default SpaceAdder;
