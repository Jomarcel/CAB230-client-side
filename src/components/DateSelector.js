import React, { useState } from "react";
import DatePicker from "react-datepicker";
import * as moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { loadData } from "../api";

const DateSelector = ({ symbol, rowData }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (date) => {
    setStartDate(date);
  };

  const handleEndDate = (date) => {
    setEndDate(date);
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();
    stockListsData()
      .then((res) => {
        rowData(res);
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage(
          "No entries available for query symbol for supplied date range"
        );
      });
  };
  const showErrorMessage = () => {
    if (errorMessage.length) {
      return <div style={styles.errorStyle}>{errorMessage}</div>;
    }
  };
  const clearSearch = () => {
    setEndDate(null);
    setStartDate(null);
    loadData(symbol)
      .then((res) => {
        rowData(res);
      })
      .catch((error) => console.log(error));
  };
  // function to to add seperators to large numbers
  const thousands_separators = (num) => {
    var num_parts = num.toString().split(".");
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return num_parts.join(".");
  };

  const stockListsData = async () => {
    const URL = "http://131.181.190.87:3000/stocks/";
    var formattedStartDate = moment.utc(startDate).format("YYYY-MM-DD");
    var formattedEndDate = moment.utc(endDate).format("YYYY-MM-DD");
    const token = JSON.parse(localStorage.getItem("token"));
    const headers = {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    };

    const response = await fetch(
      `${URL}authed/${symbol}?from=${formattedStartDate}&to=${
        endDate === null ? "" : formattedEndDate
      }`,
      {
        headers,
      }
    )
      .then((res) => res.json())
      .then((res) =>
        res.map((stock) => {
          setErrorMessage("");
          return {
            name: stock.name,
            symbol: stock.symbol,
            industry: stock.industry,
            timestamp: moment(stock.timestamp).format("l").toString(),
            high: `${stock.high}`,
            low: `${stock.low}`,
            volumes: thousands_separators(stock.volumes),
            open: `${stock.open}`,
            close: `${stock.close}`,
          };
        })
      );
    return response;
  };

  return (
    <div className="center">
      <br></br>
      <form onSubmit={onFormSubmit}>
        <div className="form-group" style={{}}>
          <DatePicker
            selected={startDate}
            onChange={handleChange}
            dateFormat="MMMM d, yyyy"
            className="form-control"
            placeholderText="Start"
          />
          <br></br>
          <DatePicker
            placeholderText="End"
            selected={endDate}
            onChange={handleEndDate}
            dateFormat="MMMM d, yyyy"
            className="form-control"
            style={{}}
          />
        </div>
        <button
          style={{
            marginBottom: 20,
            marginRight: 10,
            textDecoration: "none",
          }}
          className="btn btn-primary"
        >
          Choose Date
        </button>
        <button
          style={{ marginBottom: 20 }}
          className="btn btn-info"
          onClick={clearSearch}
        >
          Clear
        </button>
        {showErrorMessage()}
      </form>
    </div>
  );
};

export default DateSelector;

const styles = {
  errorStyle: {
    color: "red",
    fontSize: 12,
  },
};
