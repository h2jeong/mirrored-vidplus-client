import React, { Component } from "react";
import { connect } from "react-redux";
import { addSpaces, searchSpace } from "../../actions/creators";
import { Input } from "antd";
const { Search } = Input;

class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      searchTerm: ""
    };
  }
  handleChange(e) {
    this.setState({ searchTerm: e.target.value });
  }

  handleSearch(value) {
    const { addSpaces, searchSpace } = this.props;

    if (value) {
      searchSpace(value);
      this.setState({
        searchTerm: ""
      });
    } else {
      addSpaces();
    }
  }

  render() {
    return (
      <div className="searchBox">
        <Search
          size="large"
          onSearch={value => this.handleSearch(value)}
          onChange={this.handleChange}
          placeholder="Search Space Name Here..."
          value={this.state.searchTerm}
        />
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    searchSpace: searchTerm => dispatch(searchSpace(searchTerm)),
    addSpaces: () => dispatch(addSpaces())
  };
};
SearchBox = connect(
  null,
  mapDispatchToProps
)(SearchBox);
export default SearchBox;
