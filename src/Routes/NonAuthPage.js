import React, { Component } from "react";
import { FormControl } from "@material-ui/core";
import { fetchSymbols } from "../api";
import MemberTable from "../components/Tables/MemberTable";
import * as ReactBootstrap from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
// import { useHistory } from "react-router-dom";

// import ChartJs from "";
class NonAuthPage extends Component {
  state = {
    tempSymbol: "",
    apiData: [],
    apiSymbolsData: [],
    isLoading: false,
  };
  componentDidMount() {
    this.setState({ isLoading: true });
    const { symbol } = this.props.location.state;

    fetchSymbols(symbol).then((res) =>
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
      <div className="container" style={{}}>
        {
          <div
            style={{
              position: "absolute",
              top: 150,
              left: 70,
            }}
          >
            <h1
              style={{ marginLeft: 100, color: "lightBlue" }}
              role="button"
            >{`Symbol: ${this.state.tempSymbol}`}</h1>

            <p style={{ marginLeft: 100, color: "red" }}>
              <FontAwesomeIcon
                icon={faLock}
                style={{
                  position: "relative",
                  left: 0,
                  top: 1,
                  color: "orange",
                  marginRight: 10,
                }}
              />
              Login to access stock history
            </p>
          </div>
        }

        <FormControl style={{ marginTop: 130 }}>
          <MemberTable rowData={this.state.apiData}></MemberTable>
        </FormControl>
      </div>
    );
  }
}

export default NonAuthPage;
