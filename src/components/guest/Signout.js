import React, { Component } from "react";

class SignOut extends Component {
  signOut() {
    fetch("/user/signout")
      .then(response => {
        if (response.status === 200) {
          response.json();
        } else if (response.status === 500) {
          alert("왜 로그아웃이 안될까요?" + response.statusText);
          console.log("signup 500::", response.statusText);
        }
      })
      .then(data => {
        console.log("/signout : data::", data);
        // console.log(this.props, this.props.history);
        this.props.history.push("/signin");
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <button
        type="button"
        onClick={this.signOut.bind(this)}
        style={{ float: "right" }}
      >
        Sign Out
      </button>
    );
  }
}

export default SignOut;
