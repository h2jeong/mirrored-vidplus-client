import React from "react";
import { Layout, Button } from "antd";
const { Content } = Layout;

export default function Error(props) {
  return (
    <Layout style={{ padding: "24px 24px 24px 24px" }}>
      <Content
        style={{
          background: "white",
          padding: "16px 24px",
          textAlign: "center",
          overflow: "hidden"
        }}
      >
        <div className="error-img">
          <img alt="" src={require("../../styles/404.png")} />
        </div>
        <div className="error-button">
          <Button
            icon="rollback"
            size="large"
            onClick={() => props.history.push("/home")}
          >
            Back to Home
          </Button>
        </div>
      </Content>
    </Layout>
  );
}
