import React from "react";
import Jumbotron from "./Jumbotron";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import Search from "./Search";

const Home = () => {
  return (
    <div>
      <Jumbotron
        style={{
          backgroundColor: "#44014C",
          width: "300px",
          minHeight: "200px",
        }}
      />
      {/* <div style={styles.heading}>
        <h1>Stocks</h1>
        <p>Learn more about the stock market with TUQ today.</p>
      </div> */}
      <div style={styles.container}>
        <Search></Search>
      </div>
    </div>
  );
};

export default Home;

const styles = {
  container: {
    // width: 80,
    padding: 0,
    margin: 0,
    listStyle: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // background: "#f0e68c",
  },
  heading: {
    // width: 80,
    padding: 0,
    margin: 0,
    listStyle: "none",
    display: "flex",
    // alignItems: "center",
    justifyContent: "center",
    // background: "#f0e68c",
  },
};
