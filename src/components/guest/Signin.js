import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../styles/Guest.css";
import api from "../../api";
import { Icon, Input, Button } from "antd";
import FindPassword from "./FindPassword";

class Signin extends Component {
  constructor(props) {
    super(props);
    this.signIn = this.signIn.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePWChange = this.handlePWChange.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.state = {
      email: "",
      password: "",
      txtWarning: "",
      showModal: false
    };
  }

  signIn() {
    const { email, password } = this.state;

    if (email === "") {
      this.setState({
        txtWarning: "이메일을 입력해주세요."
      });
      return;
    }
    if (password === "") {
      this.setState({
        txtWarning: "비밀번호를 입력해주세요"
      });
      return;
    }

    api("user/signin", "POST", { email, password })
      .then(data => {
        this.props.changeAuthState(() => this.props.history.push("/home"));
      })
      .catch(error => {
        const { status, message } = error;

        if (status === 400) {
          alert(message);
        } else if (status === 500) {
          this.setState({ txtWarning: message });
          alert("고객센터로 문의 바랍니다.");
        } else {
          this.setState({ txtWarning: message });
        }
      });
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }
  handlePWChange(e) {
    this.setState({ password: e.target.value });
  }

  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  render() {
    if (this.props.authenticated) {
      this.props.history.push("/home");
    }

    return (
      <div className="bgGuest">
        <FindPassword
          visible={this.state.showModal}
          toggleModal={this.toggleModal}
        />
        <div className="welcomeRight">
          <form className="form-signin">
            <Input
              type="email"
              onChange={this.handleEmailChange}
              size="large"
              prefix={
                <Icon
                  type="mail"
                  style={{ color: " rgba(255, 255, 255, 0.4)" }}
                />
              }
              placeholder="Email address"
              required
              autoFocus
            />
            <Input
              type="password"
              onChange={this.handlePWChange}
              size="large"
              prefix={
                <Icon
                  type="lock"
                  style={{ color: " rgba(255, 255, 255, 0.4)" }}
                />
              }
              placeholder="Password"
              required
            />
            <Button
              type="primary"
              size="large"
              onClick={this.signIn}
              className="btnSign"
              icon="login"
            >
              Sign in
            </Button>
            <p className="txtWarning">{this.state.txtWarning}</p>
          </form>
          {/* 쇼설 로그인 영역 */}
          <div className="social">
            <Button
              size="small"
              icon="google"
              href="http://metawig.com:8080/auth/google"
            >
              Sign in with Google
            </Button>
            {/* <Button size="small" icon="facebook" href="#">
              Signin with facebook
            </Button> */}
          </div>
          <div className="linkTo">
            <Link to="/signin" onClick={this.toggleModal}>
              Forgot Password?
            </Link>
            <Link to="/signup" style={{ position: "absolute", right: 0 }}>
              Sign up
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Signin;
