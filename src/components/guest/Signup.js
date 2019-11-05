import React, { Component } from "react";
import { Link } from "react-router-dom";
import api from "../../api";
import "../../styles/Guest.css";

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
        txtWarning: "이메일을 입력해주세요"
      });
      result = false;
    } else if (!emailReg.test(email)) {
      this.setState({
        txtWarning: "이메일 형식에 맞게 입력해주세요"
      });
      result = false;
    }

    const nameReg = /^[가-힣]{2,10}$/g;
    if (name === "") {
      this.setState({
        txtWarning: "이름을 입력해주세요"
      });
      result = false;
    } else if (!nameReg.test(name)) {
      this.setState({
        txtWarning: "한글로 입력해주세요"
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
          console.log("/user/signup response::", data);
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
        <form className="form-signin">
          <h2>Sign Up</h2>
          <label for="inputName">Name</label>
          <input
            type="name"
            onChange={this.handleNameChange}
            id="inputName"
            maxlength="10"
            placeholder="이름"
            required
            autoFocus
          />
          <label for="inputEmail">Email</label>
          <input
            type="email"
            onChange={this.handleEmailChange}
            id="inputEmail"
            autocomplete="off"
            placeholder="이메일"
            required
          />
          <label for="inputPassword">Password</label>
          <input
            type="password"
            onChange={this.handlePWChange}
            id="inputPassword"
            maxlength="12"
            placeholder="비밀번호 영문, 숫자, 특수문자 조합 8~12자"
            required
          />
          <label for="inputPassword">Password Again</label>
          <input
            type="password"
            onChange={this.handlePW2Change}
            id="inputPassword2"
            maxlength="12"
            placeholder="비밀번호 다시 입력"
            required
          />
          <button type="button" onClick={this.signUp}>
            Sign up
          </button>
          <p id="txtWarning">{this.state.txtWarning}</p>
          {/* 회원 가입시 에러 메세지 */}
        </form>
        <div>
          <Link to="/signin">{"Signin"}</Link>
        </div>
      </div>
    );
  }
}

export default Signup;
