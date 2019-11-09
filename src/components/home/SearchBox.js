import React, { Component } from "react";
import { connect } from "react-redux";
import { searchSpace } from "../../actions/creators";
import { Input } from "antd";
const { Search } = Input;

class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    const { searchSpace } = this.props;
    searchSpace(e.target.value);
  }

  render() {
    return (
      <div className="searchBox">
        <Search
          size="large"
          onChange={this.handleChange}
          placeholder="Search Space Name Here..."
        />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    searchTerm: state.searchTerm
  };
};
const mapDispatchToProps = dispatch => {
  return {
    searchSpace: searchTerm => dispatch(searchSpace(searchTerm))
  };
};
SearchBox = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBox);
export default SearchBox;
