import React, { Component } from "react";
import { Layout } from "antd";
import "../../styles/Home.css";
import Table from "./Table";
import SearchBox from "./SearchBox";

const { Content } = Layout;

class Home extends Component {
  render() {
    return (
      <Layout>
        <SearchBox />
        <Content
          style={{ margin: "24px", background: "white", padding: "16px 24px" }}
        >
          <Table changeAuthState={this.props.changeAuthState} />
        </Content>
      </Layout>
    );
  }
}

export default Home;
