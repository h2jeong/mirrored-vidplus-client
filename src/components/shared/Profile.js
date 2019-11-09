import React, { Component } from "react";
import { Modal, Input, Row, Col } from "antd";
import api from "../../api";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", email: "" };
    this.state["current password"] = "";
    this.state["new password"] = "";
    this.state["confirm password"] = "";
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
  }

  componentDidMount() {
    // 처음 생성될 때, 이메일이랑 유저 이름만 설정해서 넣어줌
    api("user", "GET")
      .then(res => {
        const { name, email } = res;
        this.setState({ username: name, email });
      })
      .catch(error => alert(error.message));
  }

  componentDidUpdate(prevProps) {
    // If the modal was opened again
    if (!prevProps.visible && this.props.visible) {
      api("user", "GET")
        .then(res => {
          // Clear all fields in the state
          const newState = {};
          const fields = Object.keys(this.state);
          for (const field of fields) {
            newState[field] = "";
          }
          // Reset name & email to the API call result
          const { name, email } = res;
          this.setState({ ...newState, username: name, email });
        })
        .catch(error => alert(error.message));
    }
  }

  onChange(e) {
    // input 필드가 바뀔 때, state도 같이 바꿔준다
    this.setState({ [e.target.dataset.field]: e.target.value });
  }

  onSave() {
    // 저장 버튼이 눌러졌을 때 실행되는 함수
    api("user", "GET")
      .then(res => {
        const email = res.email;
        const password = this.state["current password"];
        // Check if the current password is correct
        return api("user/signin", "POST", { email, password });
      })
      .then(() => {
        const name = this.state.username;
        const email = this.state.email;
        // If new password doesn't exist or is an empty string,
        // Send a PUT request with the current password.
        if (!this.state["new password"]) {
          const password = this.state["current password"];
          return api("user", "PUT", { name, email, password });
        } else {
          // Must validate the new password before PUT request
          const pwValidation = this.validatePassword();
          if (pwValidation.error) {
            // If not properly validated, do not send PUT request & show error
            return Promise.reject(pwValidation.error);
          } else {
            // If the new password is valid and has been confirmed
            const password = this.state["new password"];
            return api("user", "PUT", { name, email, password });
          }
        }
      })
      .then(this.props.closeProfile)
      .catch(error => {
        if (error.status === 401) {
          // Case for sign-in error (POST request body is incorrect)
          alert("current password가 제대로 입력됐는지 확인하세요.");
        } else {
          // Otherwise, error messages come in a fairly intuitive way
          alert(error.message);
        }
      });
  }

  validatePassword() {
    const pwRegex = /^(?=.*[a-zA-Z])(?=.*[~!@#$%^&*_-]).{8,12}$/g;
    const newPw = this.state["new password"];
    const confirm = this.state["confirm password"];
    if (!pwRegex.test(newPw)) {
      // 새로운 비밀번호가 regex 형식을 제대로 따르지 않는다면
      return {
        error: {
          message:
            "새로운 비밀번호를 영문, 숫자, 특수문자 조합 8~12자로 만들어주세요."
        }
      };
    } else if (confirm !== newPw) {
      // 비밀번호 입력값이 일치하지 않으면
      return {
        error: {
          message: "Confirm password가 새로운 비밀번호와 일치하지 않습니다."
        }
      };
    } else {
      return { message: "Successful validation." };
    }
  }

  render() {
    const inputStyle = {
      border: "0px",
      borderBottom: "1px solid rgb(180, 180, 180)",
      borderRadius: "2px"
    };
    const inputFields = Object.keys(this.state);
    return (
      <Modal
        title="Account Setting"
        visible={this.props.visible}
        okText="Save"
        onOk={this.onSave}
        onCancel={this.props.closeProfile}
        closable={false}
        maskClosable={false}
        wrapClassName="profile-modal"
        destroyOnClose
        centered
      >
        {inputFields.map((field, i) => (
          <Row
            style={{
              marginBottom: field === "confirm password" ? "10px" : "25px"
            }}
            key={i}
          >
            <Col className="profile-label" span={10}>
              {field.toUpperCase()}
            </Col>
            <Col span={20}>
              {field === "username" || field === "email" ? (
                <Input
                  style={inputStyle}
                  data-field={field}
                  value={this.state[field]}
                  onChange={this.onChange}
                />
              ) : (
                // Input.Password is not stylable, so specify text security
                <Input
                  style={{ ...inputStyle, WebkitTextSecurity: "disc" }}
                  data-field={field}
                  placeholder={(() => {
                    if (field === "current password") {
                      return "Required to change user info";
                    } else if (field === "new password") {
                      return "Enter new password (if necessary)";
                    } else if (field === "confirm password") {
                      return "Confirm new password";
                    }
                  })()}
                  value={this.state[field]}
                  onChange={this.onChange}
                />
              )}
            </Col>
          </Row>
        ))}
      </Modal>
    );
  }
}
