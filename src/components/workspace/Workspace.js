import React, { Component } from "react";
import Title from "./Title";
import VideoPlayer from "./VideoPlayer";
import NoteList from "./NoteList";
import NoteInput from "./NoteInput";
import "../../styles/Workspace.css";
import { connect } from "react-redux";
import { selectSpace, addNotes } from "../../actions/creators";
import { Layout, Row, Col } from "antd";
const { Content } = Layout;

// 들어오는 url (path)에 따라 redux의 current space를 업데이트
function updateCurrSpace(path, props) {
  const currSpace = props.spaces.filter(space => space.name === path)[0];
  if (currSpace) {
    props.selectSpace(currSpace.id); // select the current space
    // 비동기로 처리되는 함수여서 currSpace의 current속성이 바로 true가 안될수도 있다
    props.addNotes(currSpace.id); // 현재 space의 노트를 store로 가져온다
  }
}

class Workspace extends Component {
  constructor(props) {
    super(props);
    const { spaceName } = this.props.match.params;
    // Update the current space (or use {validPath: false} to return 404 page)
    updateCurrSpace.call(this, spaceName, props);
  }

  componentDidUpdate(prevProps) {
    const { spaceName } = this.props.match.params;
    const updateNeeded =
      prevProps.match.params.spaceName !== spaceName ||
      prevProps.spaces.length !== this.props.spaces.length;
    // First conditional determines whether the current space (url) has been changed
    // Second conditional handles async fetching (b/c props.spaces is initially an empty arr)
    if (updateNeeded) {
      updateCurrSpace.call(this, spaceName, this.props);
    }
  }

  render() {
    const currSpace = this.props.spaces.filter(space => space.current)[0];
    // If a space is currently selected (모든 비동기 api호출이 끝난 후)
    if (currSpace) {
      return (
        <Layout style={{ padding: "24px 24px 24px 24px" }}>
          <Content style={{ background: "white", padding: "16px 24px" }}>
            <Title
              spaceName={this.props.match.params.spaceName}
              changeAuthState={this.props.changeAuthState}
            />
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <VideoPlayer currSpace={currSpace} />
                <NoteInput currSpace={currSpace} />
              </Col>
              <Col span={12}>
                <NoteList currSpace={currSpace} />
              </Col>
            </Row>
          </Content>
        </Layout>
      );
    } else {
      // The URL does not correspond to a workspace
      return <div>404: Workspace Not Found</div>;
    }
  }
}

const mapStateToProps = state => ({
  spaces: state.spaces,
  notes: state.notes
});

const mapDispatchToProps = dispatch => ({
  selectSpace: id => dispatch(selectSpace(id)),
  addNotes: spaceId => dispatch(addNotes(spaceId))
});

Workspace = connect(
  mapStateToProps,
  mapDispatchToProps
)(Workspace);
export default Workspace;
