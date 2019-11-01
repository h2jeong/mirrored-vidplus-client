import React, { Component } from "react";
import { connect } from "react-redux";
import SpaceAdder from "./SpaceAdder";
import SpaceList from "./SpaceList";
import Signout from "../guest/Signout";

class Table extends Component {
  render() {
    const { spaces } = this.props;

    return (
      <div>
        <Signout />
        <h2>My Workspaces</h2>
        <SpaceAdder />
        <SpaceList spaces={spaces} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    spaces: state.spaces
  };
};

Table = connect(mapStateToProps)(Table);
export default Table;
