import React, { Component } from "react";
import { connect } from "react-redux";
import SpaceEntry from "./SpaceEntry";

class SpaceList extends Component {
  render() {
    const { searchTerm, spaces } = this.props;
    const spaceList = spaces
      .filter(
        space => space.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
      )
      .map(space => <SpaceEntry space={space} key={space.id} />);

    return (
      <div>
        <table width="100%" className="tblSpaces">
          {/* <caption>Work Spaces</caption> */}
          <colgroup>
            <col width="45%" />
            <col width="15%" />
            <col width="25%" />
            <col width="" />
          </colgroup>
          <tbody>{spaceList}</tbody>
        </table>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    searchTerm: state.searchTerm,
    spaces: state.spaces
  };
};
SpaceList = connect(mapStateToProps)(SpaceList);
export default SpaceList;
