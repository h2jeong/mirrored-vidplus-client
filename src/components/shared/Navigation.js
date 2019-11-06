import React, { Component } from "react";
import { connect } from "react-redux";
import { Layout, Menu, Icon } from "antd";
import { Redirect } from "react-router-dom";
const { Sider } = Layout;

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      iconStyle: {
        fontSize: "30px",
        marginLeft: "-8px",
        marginTop: "5px"
      },
      collapsed: true,
      redirect: { awaiting: false, path: this.props.path }
    };
    this.onCollapse = this.onCollapse.bind(this);
    this.onSelect = this.onSelect.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.path !== this.props.path) {
      this.setState({ redirect: { awaiting: false, path: this.props.path } });
    }
  }

  onCollapse(collapsed) {
    if (collapsed) {
      this.setState({
        iconStyle: {
          ...this.state.iconStyle,
          marginLeft: "-8px",
          marginTop: "5px"
        },
        collapsed
      });
    } else {
      this.setState({
        iconStyle: {
          ...this.state.iconStyle,
          marginLeft: "3px",
          marginTop: "0px"
        },
        collapsed
      });
    }
  }

  onSelect({ item, key }) {
    if (key === "2" && this.props.spaces.length === 0) {
      // Do not allow redirect to workspace page
      alert("You have no active workspaces.");
    } else if (key === "2") {
      this.setState({
        redirect: {
          awaiting: true,
          path: `/spaces/${this.props.spaces[0].name}`
        }
      });
    } else {
      this.setState({ redirect: { awaiting: true, path: item.props.path } });
    }
  }

  render() {
    const menuItemStyle = {
      display: "flex",
      alignItems: "center",
      height: "60px"
    };

    if (this.state.redirect.awaiting) {
      return <Redirect to={this.state.redirect.path}></Redirect>;
    } else {
      let itemKey = "";
      if (this.props.path === "/home") {
        itemKey = "1";
      } else if (this.props.path.startsWith("/spaces")) {
        itemKey = "2";
      }
      return (
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <Menu theme="dark" onSelect={this.onSelect} selectedKeys={[itemKey]}>
            <Menu.Item key="1" style={menuItemStyle} path="/home">
              <Icon type="home" style={this.state.iconStyle} />
              <span style={{ paddingLeft: "3px" }}>Home</span>
            </Menu.Item>
            <Menu.Item key="2" style={menuItemStyle}>
              <Icon type="youtube" style={this.state.iconStyle} />
              <span style={{ paddingLeft: "3px" }}>Workspace</span>
            </Menu.Item>
            <Menu.Item key="3" style={menuItemStyle} path="/user">
              <Icon type="user" style={this.state.iconStyle} />
              <span style={{ paddingLeft: "3px" }}>My Info</span>
            </Menu.Item>
          </Menu>
          <img
            alt=""
            className="nav-logo"
            src={require("../../styles/ci.png")}
          />
        </Sider>
      );
    }
  }
}

const mapStateToProps = state => ({
  spaces: state.spaces
});
Navigation = connect(mapStateToProps)(Navigation);
export default Navigation;
