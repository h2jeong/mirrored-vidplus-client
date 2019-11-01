import React, { Component } from "react";
import { Link } from "react-router-dom";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.vaildCheck = this.vaildCheck.bind(this);
    this.signUp = this.signUp.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePWChange = this.handlePWChange.bind(this);
    this.state = {
      name: "",
      email: "",
      password: ""
    };
  }

  vaildCheck() {
    let result = true;

    const { name, email, password } = this.state;
    const txtWarning = document.getElementById("txtWarning");
    txtWarning.style.display = "none";

    const passwordReg = /^(?=.*[a-zA-Z])(?=.*[~!@#$%^&*_-]).{8,12}$/g;
    if (password === "") {
      txtWarning.style.display = "block";
      txtWarning.innerHTML = "비밀번호를 입력해주세요.";
      result = false;
    } else if (!passwordReg.test(password)) {
      txtWarning.style.display = "block";
      txtWarning.innerHTML = "비밀번호 영문, 숫자, 특수문자 조합 8~12자";
      result = false;
    }

    const emailReg = /^([a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+(\.[a-zA-Z0-9]+)+)*$/g;
    if (email === "") {
      txtWarning.style.display = "block";
      txtWarning.innerHTML = "이메일을 입력해주세요";
      result = false;
    } else if (!emailReg.test(email)) {
      txtWarning.style.display = "block";
      txtWarning.innerHTML = "이메일 형식에 맞게 입력해주세요";
      result = false;
    }

    const nameReg = /^[가-힣]{2,10}$/g;
    if (name === "") {
      txtWarning.style.display = "block";
      txtWarning.innerHTML = "이름을 입력해주세요";
      result = false;
    } else if (!nameReg.test(name)) {
      txtWarning.style.display = "block";
      txtWarning.innerHTML = "한글로 입력해주세요";
      result = false;
    }
    return result;
  }

  signUp() {
    const { name, email, password } = this.state;
    if (this.vaildCheck()) {
      // this.props.history.push("/signin");

      fetch("/user/signup", {
        name: name,
        email: email,
        password: password
      })
        .then(response => {
          if (response.status === 201) {
            response.json();
          } else if (response.status === 500) {
            alert("왜 가입이 안될까요?");
            console.log("signup 500::", response.statusText);
          }
        })
        .then(data => {
          console.log("/user/signup response::", data);
          this.props.history.push("/signin");
        })
        .catch(error => console.log(error));
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

  render() {
    return (
      <div>
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
          <button type="button" onClick={this.signUp}>
            Sign up
          </button>
          <p id="txtWarning"></p>
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
