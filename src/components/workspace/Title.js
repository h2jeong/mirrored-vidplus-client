import React, { Component } from "react";
import Signout from "../shared/Signout";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Typography, Select, Col, PageHeader, Button } from "antd";
import { Link } from "react-router-dom";
import api from "../../api";
const { Option } = Select;
const Heading = Typography.Title;

class Title extends Component {
  constructor(props) {
    super(props);
    this.state = { shouldRedirect: false };
    this.onSpaceChange = this.onSpaceChange.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.spaceName !== this.props.spaceName) {
      // Right after redirection to a new space
      this.setState({ shouldRedirect: false });
    }
  }

  onSpaceChange(spaceName) {
    // Redirect when a different space has been selected
    if (spaceName !== this.props.spaceName) {
      this.setState({
        shouldRedirect: true,
        path: spaceName
      });
    }
  }

  render() {
    if (this.state.shouldRedirect) {
      // Should redirect to the new given path
      return <Redirect to={`/spaces/${this.state.path}`} />;
    } else {
      const routes = [
        { path: "/home", name: "Home" },
        { path: `/spaces/${this.props.spaceName}`, name: "Workspaces" }
      ];
      const itemRender = route => <Link to={route.path}>{route.name}</Link>;

      return (
        <div style={{ position: "relative" }}>
          <div style={{ position: "absolute", right: "0" }}>
            <Button
              onClick={() => {
                api("auth/docs", "POST", this.props.currSpace)
                  .then(
                    () => (window.location = "http://localhost:5000/auth/docs")
                  )
                  .catch(err => alert(err.message));
              }}
              style={{ zIndex: 999 }}
            >
              Export Doc
            </Button>
            <Signout changeAuthState={this.props.changeAuthState} />
          </div>
          <PageHeader breadcrumb={{ itemRender, routes }}>
            <Col style={{ display: "inline-block", width: "170px" }}>
              <Heading level={2}>Workspace:</Heading>
            </Col>
            <Col className="workspace-select-div">
              <Select
                value={this.props.spaceName}
                onSelect={this.onSpaceChange}
                style={{ width: "100%" }}
              >
                {this.props.spaces.map(space => (
                  <Option value={space.name} key={space.id}>
                    {space.name}
                  </Option>
                ))}
              </Select>
            </Col>
          </PageHeader>
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  spaces: state.spaces
});

Title = connect(mapStateToProps)(Title);
export default Title;
