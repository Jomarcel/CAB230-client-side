import React, { Component } from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";
import TableResults from "../components/Tables/TableResults";
import { fetchApiData, baseApiData } from "../api";
import * as ReactBootstrap from "react-bootstrap";

class Search extends Component {
  state = {
    query: "",
    error: true,
    industryError: "",
    apiData: [],
    isLoading: false,
  };
  componentDidMount() {
    this.setState({ isLoading: true });
    baseApiData()
      .then((res) =>
        this.setState({
          apiData: res,
          isLoading: false,
        })
      )
      .catch((err) => console.log(err));
  }
  onTextChange = (e) => {
    const val = e.target.value;
    this.setState({ [e.target.name]: val }, () => {
      fetchApiData(val)
        .then((res) =>
          this.setState({
            apiData: res,
            industryError: "",
            error: false,
          })
        )
        .catch(() => {
          this.setState({
            industryError: "Industry sector not found",
            error: true,
          });
        });
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
  };
  validateInput() {
    if (this.state.symbolError.length) {
      return (
        <div style={styles.endpointOneStyle}>{this.state.symbolError}</div>
      );
    }
  }

  validateIndustry() {
    if (this.state.industryError.length) {
      return (
        <div style={styles.endpointOneStyle}>{this.state.industryError}</div>
      );
    }
  }

  render() {
    const { apiData } = this.state;
    // console.log(apiData);
    if (this.state.isLoading) {
      return <ReactBootstrap.Spinner animation="border" />;
    }
    return (
      <div>
        <Form>
          <FormGroup>
            <Label>Search For Stocks By Indsutry</Label>
            <Input
              name="query"
              type="text"
              placeholder="Search Industry"
              onChange={this.onTextChange}
              // value={this.state.searchText}
              onSubmit={this.onSubmit}
            />
            {this.validateIndustry()}
          </FormGroup>
        </Form>
        <br></br>
        {/* <DateSelector /> */}
        <TableResults apiData={apiData}></TableResults>
        <br />
        <br />
      </div>
    );
  }
}
export default Search;
const styles = {
  endpointOneStyle: {
    color: "red",
    fontSize: 12,
  },
};
