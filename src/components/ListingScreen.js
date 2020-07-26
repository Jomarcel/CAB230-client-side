import React, { Component } from "react";
import { FormControl } from "@material-ui/core";
import { loadData } from "../api";
import DateSelector from "./DateSelector";
import AuthTable from "./Tables/AuthTable";
import * as ReactBootstrap from "react-bootstrap";

import ChartJs from "./Chart";
class ListingScreen extends Component {
  state = {
    tempSymbol: "",
    apiData: [],
    apiSymbolsData: [],
    isLoading: false,
  };
  componentDidMount() {
    this.setState({ isLoading: true });
    const { symbol } = this.props.location.state;

    loadData(symbol).then((res) =>
      this.setState({
        apiData: res,
        isLoading: false,
        tempSymbol: symbol,
      })
    );
  }

  handleRowChange = (apiData) => {
    this.setState({ apiData });
  };

  render() {
    if (this.state.isLoading) {
      return (
        <center>
          <ReactBootstrap.Spinner animation="border" />
        </center>
      );
    }
    return (
      <div className="container" style={{ position: "relative" }}>
        <DateSelector
          symbol={this.state.tempSymbol}
          rowData={this.handleRowChange}
        ></DateSelector>
        {
          <div
            style={{
              position: "absolute",
              top: 150,
              left: 50,
              color: "lightBlue",
            }}
          >
            <h1>{`Symbol: ${this.state.tempSymbol}`}</h1>
          </div>
        }

        <ChartJs chartData={this.state.apiData}></ChartJs>

        <FormControl>
          <AuthTable rowData={this.state.apiData}></AuthTable>
        </FormControl>
      </div>
    );
  }
}

export default ListingScreen;
