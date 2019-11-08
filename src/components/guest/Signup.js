import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../styles/Guest.css";
import api from "../../api";
import { Icon, Input, Button } from "antd";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.vaildCheck = this.vaildCheck.bind(this);
    this.signUp = this.signUp.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePWChange = this.handlePWChange.bind(this);
    this.handlePW2Change = this.handlePW2Change.bind(this);
    this.state = {
      name: "",
      email: "",
      password: "",
      passwordAgain: "",
      txtWarning: ""
    };
  }

  // authUser() {
  //   api("user", "GET")
  //     .then(data => {
  //       console.log("/user response::", data);
  //       this.setState({ authenticated: true });
  //     })
  //     .catch(error => {
  //       this.setState({ authenticated: false });
  //     });
  // }

  // 유저 입력값 유효성 검사
  vaildCheck() {
    let result = true;
    const { name, email, password, passwordAgain } = this.state;

    const passwordReg = /^(?=.*[a-zA-Z])(?=.*[~!@#$%^&*_-]).{8,12}$/g;
    if (password === "") {
      this.setState({
        txtWarning: "비밀번호를 입력해주세요."
      });
      result = false;
    } else if (!passwordReg.test(password)) {
      this.setState({
        txtWarning: "비밀번호 영문, 숫자, 특수문자 조합 8~12자"
      });
      result = false;
    } else if (passwordAgain === "" || password !== passwordAgain) {
      this.setState({
        txtWarning: "입력한 비밀번호가 같지 않습니다."
      });
      result = false;
    }

    const emailReg = /^([a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+(\.[a-zA-Z0-9]+)+)*$/g;
    if (email === "") {
      this.setState({
        txtWarning: "이메일을 입력해주세요."
      });
      result = false;
    } else if (!emailReg.test(email)) {
      this.setState({
        txtWarning: "이메일 형식에 맞게 입력해주세요."
      });
      result = false;
    }

    const nameReg = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|*]+$/g;
    if (name === "") {
      this.setState({
        txtWarning: "사용자 이름을 입력해주세요."
      });
      result = false;
    } else if (!nameReg.test(name)) {
      this.setState({
        txtWarning: "한글 또는 영어와 숫자로 입력해주세요."
      });
      result = false;
    }
    return result;
  }

  signUp() {
    const { name, email, password } = this.state;

    if (this.vaildCheck()) {
      api("user/signup", "POST", {
        name: name,
        email: email,
        password: password
      })
        .then(data => {
          this.props.history.push("/signin");
        })
        .catch(error => {
          const { status, message } = error;

          if (status === 400) {
            alert(message);
          } else if (status === 409) {
            this.setState({
              txtWarning: message
            });
          } else if (status === 500) {
            this.setState({
              txtWarning: message
            });
            alert("고객센터로 문의 바랍니다.");
          }
        });
    }
  }
  handleNameChange(e) {
    this.setState({ name: e.target.value });
  }
  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }
  handlePWChange(e) {
    this.setState({ password: e.target.value });
  }
  handlePW2Change(e) {
    this.setState({ passwordAgain: e.target.value });
  }

  render() {
    if (this.props.authenticated) {
      this.props.history.push("/home");
    }
    // else {
    //   this.authUser();
    // }
    return (
      <div className="bgGuest">
        <div className="welcomeRight">
          <form className="form-signin">
            <Input
              type="name"
              onChange={this.handleNameChange}
              size="large"
              prefix={
                <Icon
                  type="user"
                  style={{
                    color: " rgba(255, 255, 255, 0.4)"
                  }}
                />
              }
              placeholder="Username"
              required
              autoFocus
            />
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
              autocomplete="off"
              placeholder="Email Address"
              required
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
            <Input
              type="password"
              onChange={this.handlePW2Change}
              size="large"
              prefix={
                <Icon
                  type="lock"
                  style={{ color: " rgba(255, 255, 255, 0.4)" }}
                />
              }
              placeholder="Password Again"
              required
            />
            <Button
              type="primary"
              size="large"
              onClick={this.signUp}
              className="btnSign"
              icon="swap-right"
            >
              Sign up
            </Button>
            <p className="txtWarning">{this.state.txtWarning}</p>
            {/* 회원 가입시 에러 메세지 */}
          </form>
          <div className="social">
            <Button
              size="small"
              icon="google"
              href="http://metawig.com:8080/auth/google"
            >
              Signup with google
            </Button>
            {/* <Button size="small" icon="facebook" href="#">
              Signup with facebook
            </Button> */}
          </div>
          <div className="linkTo">
            <Link to="/signin">{"Signin"}</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Signup;
