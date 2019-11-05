import React, { Component } from "react";
import api from "../../api";
import { Button } from "antd";

class SignOut extends Component {
  signOut() {
    api("user/signout", "POST")
      .then(data => {
        console.log("/signout : data::", data);
        this.props.changeAuthState(function() {
          // changeAuthState가 App으로 바인딩이 되어있어서, this가 App을 가리킨다.
          // 따라서 this.props.history.push()를 사용해도 된다.
          this.props.history.push("/signin");
        });
      })
      .catch(error => {
        const { status, message } = error;
        if (status === 406) {
          alert(message);
        } else if (status === 500) {
          alert(message + ". 고객센터로 문의 바랍니다.");
        }
      });
  }

  render() {
    return (
      <Button
        type="button"
        onClick={this.signOut.bind(this)}
        icon="logout"
        style={{ zIndex: "999" }}
      >
        Logout
      </Button>
    );
  }
}

export default SignOut;
