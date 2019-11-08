import React, { Component } from "react";
import { Modal, Carousel, Row, Col, Input } from "antd";

export default class FindPassword extends Component {
  render() {
    return (
      <Modal
        bodyStyle={{ padding: 0, borderRadius: "2px" }}
        visible={this.props.visible}
        okText="Send"
        onCancel={this.props.toggleModal}
        closable={false}
        maskClosable={false}
        destroyOnClose
        centered
      >
        <Carousel>
          <div>
            <img
              alt=""
              src={require("../../styles/forgotPw.png")}
              style={{ width: "400px", margin: "0 0 20px 45px" }}
            />
            {["USERNAME", "EMAIL"].map(field => (
              <Row>
                <Col className="findpw-label" span={6}>
                  {field}
                </Col>
                <Col span={18}>
                  <Input className="findpw-input" />
                </Col>
              </Row>
            ))}
          </div>
        </Carousel>
      </Modal>
    );
  }
}
