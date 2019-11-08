import React, { Component } from "react";
import { Modal } from "antd";

export default class FindPassword extends Component {
  render() {
    return (
      <Modal
        visible={this.props.visible}
        onCancel={this.props.toggleModal}
        okText="Send"
        closable={false}
        maskClosable={false}
        destroyOnClose
        centered
      ></Modal>
    );
  }
}
