import React, { Component } from "react";
import { Link } from "react-router-dom";
import api from "../../api";
import { Icon, Input, Button } from "antd";

class Signin extends Component {
  constructor(props) {
    super(props);
    this.signIn = this.signIn.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePWChange = this.handlePWChange.bind(this);
    this.ggSignIn = this.ggSignIn.bind(this);
    this.state = {
      email: "",
      password: "",
      txtWarning: ""
    };
  }

  signIn() {
    // alert("Email : " + this.state.email + " Password : ", this.state.password);
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
        } else if (status === 401) {
          this.setState({ txtWarning: message });
        } else if (status === 500) {
          this.setState({ txtWarning: message });
          alert("고객센터로 문의 바랍니다.");
        }
      });
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }
  handlePWChange(e) {
    this.setState({ password: e.target.value });
  }

  ggSignIn() {
    api("/auth/google", "POST")
      .then(data => {
        this.props.changAuthState(() => this.props.history.push("/home"));
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    // const { from } = location.state || { from: { pathname: "/" } };
    // if (isSignedIn) return <Redirect to={from} />;
    if (this.props.authenticated) {
      this.props.history.push("/home");
    }
    return (
      <div className="bgGuest">
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
          <Button ghost size="small" onClick={this.ggSignIn} icon="google">
            Account Sign In
          </Button>
        </form>
        <a href="http://metawig.com:8080/auth/google">Oauth</a>
        <div className="linkTo">
          <Link to="/signup">{"Signup"}</Link>
        </div>
      </div>
    );
  }
}

export default Signin;
