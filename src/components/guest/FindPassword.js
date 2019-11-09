import React, { Component } from "react";
import { Modal, Carousel, Row, Col, Input } from "antd";
import api from "../../api";

export default class FindPassword extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", email: "", sent: false };
    this.carousel = React.createRef();
    this.onSend = this.onSend.bind(this);
  }

  componentDidUpdate(prevProps) {
    // Modal을 닫을 때, 모든 input값과 state를 초기화
    if (prevProps.visible && !this.props.visible) {
      this.setState({ username: "", email: "", sent: false });
    }
  }

  onSend() {
    const { username, email } = this.state;
    api("user/passwordSend", "POST", { name: username, email })
      .then(() => {
        this.setState({ sent: true });
        this.carousel.current.next();
      })
      .catch(error => alert(error.message));
  }

  render() {
    // Note: wrapClassName gives the modal container extra styling
    return (
      <Modal
        bodyStyle={{ padding: 0 }}
        visible={this.props.visible}
        okText={this.state.sent ? "Ok" : "Send"}
        onCancel={this.props.toggleModal}
        onOk={this.state.sent ? this.props.toggleModal : this.onSend}
        closable={false}
        maskClosable={false}
        wrapClassName="findpw-modal"
        destroyOnClose
        centered
      >
        <Carousel ref={this.carousel} dots={false}>
          <div>
            <img
              alt=""
              src={require("../../styles/forgotPw.png")}
              style={{ width: "400px", margin: "0 0 20px 45px" }}
            />
            {["username", "email"].map((field, i) => (
              <Row key={i}>
                <Col className="findpw-label" span={6}>
                  {field.toUpperCase()}
                </Col>
                <Col span={18}>
                  <Input
                    value={this.state[field]}
                    onChange={e => this.setState({ [field]: e.target.value })}
                    className="findpw-input"
                  />
                </Col>
              </Row>
            ))}
          </div>
          <div class="email-sent" style={{ position: "relative" }}>
            <h1>Email Sent!</h1>
            <h3>임시 비밀번호가 사용자의 이메일로 전송되었습니다.</h3>
          </div>
        </Carousel>
      </Modal>
    );
  }
}
