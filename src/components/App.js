import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import "../styles/App.css";
import "antd/dist/antd.css";
import { Layout } from "antd";
import { connect } from "react-redux";
import Workspace from "./workspace/Workspace";
import Signin from "./guest/Signin";
import Signup from "./guest/Signup";
import Home from "./home/Home";
import Navigation from "./shared/Navigation";
import { ADD_SPACES, ADD_NOTES, REMOVE_ERROR } from "../actions/types";
import api from "../api";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { initialRender: true, authenticated: false };
    this.changeAuthState = this.changeAuthState.bind(this);
  }

  changeAuthState(callback) {
    // 만약 인증이 안되어있지만 방금 로그인을 했다면, setState 이후 인증된
    // 상태로 바뀔 것이기 때문에 note와 spaces를 끌어온다
    if (!this.state.authenticated) {
      this.props.addSpaces();
    }
    this.setState({ authenticated: !this.state.authenticated }, callback);
  }

  componentDidMount() {
    api("user", "GET")
      .then(() => {
        // 접속할 때부터 인증이 되어있다면, 바로 note와 spaces를 끌어온다
        this.props.addSpaces();
        this.setState({ initialRender: false, authenticated: true });
      })
      .catch(() => {
        this.setState({ initialRender: false, authenticated: false });
      });
  }

  render() {
    let renderPage;
    if (this.state.initialRender) {
      // 처음에 (인증 확인이 되기 전에)는 아무것도 렌더링 하지 않는다
      renderPage = () => null;
    } else if (!this.state.authenticated) {
      // 만약 /user로 요청을 날려서 에러가 뜨면 (인증 X), /signin으로 돌려보냄
      renderPage = () => <Redirect to="/signin" />;
    } else {
      // 인증이 되어있으니, /home이나 /spaces를 띄워줘도 됨
      renderPage = props => (
        <Layout style={{ minHeight: "100vh" }}>
          <Navigation path={props.location.pathname} />
          <Switch>
            <Route
              path="/home"
              exact
              render={props => (
                // Signout버튼을 위해 changeAuthState를 prop으로 넘겨준다
                <Home {...props} changeAuthState={this.changeAuthState} />
              )}
            />
            <Route
              path="/spaces/:spaceName"
              render={props => (
                // Signout버튼을 위해 changeAuthState를 prop으로 넘겨준다
                <Workspace {...props} changeAuthState={this.changeAuthState} />
              )}
            />
          </Switch>
        </Layout>
      );
    }

    return (
      <Router>
        {this.props.errors.forEach((error, index) => {
          alert(error.message);
          this.props.removeError(index);
        })}
        <Switch>
          {/* redirect to /home on base URL or /spaces */}
          <Route exact path="/(|spaces)">
            <Redirect to="/home" />
          </Route>
          {/* this.state.authenticated === true면, Signup이나 Signin 컴포넌트에서 바로 /home으로 넘겨줌 */}
          <Route
            path="/signup"
            render={props => (
              <Signup {...props} authenticated={this.state.authenticated} />
            )}
          />
          <Route
            path="/signin"
            render={props => (
              <Signin
                {...props}
                changeAuthState={this.changeAuthState}
                authenticated={this.state.authenticated}
              />
            )}
          />
          {/* (인증 여부에 따라) renderPage로 인해 /signin으로 redirect되거나, /home 또는 /spaces가 뜸 */}
          <Route path="/(home|spaces)/" render={renderPage} />
          <Route>404: No Match</Route>
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors
});
const mapDispatchToProps = dispatch => ({
  removeError: index => dispatch({ type: REMOVE_ERROR, index }),
  addSpaces: () => dispatch({ type: ADD_SPACES }),
  addNotes: () => dispatch({ type: ADD_NOTES })
});

App = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
export default App;
