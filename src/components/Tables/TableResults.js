import React from "react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import { AgGridReact } from "ag-grid-react";
import stockImg from "../../../src/stock-img.png";
import { useHistory } from "react-router-dom";

const TableResults = (props) => {
  const { apiData } = props;
  let history = useHistory();
  const columns = [
    { headerName: "Name", field: "name", sortable: true, filter: true },
    { headerName: "Symbol", field: "symbol", sortable: true, filter: true },
    {
      headerName: "Industry",
      field: "industry",
      sortable: true,
      filter: true,
    },
    // {
    //   headerName: "Timestamp",
    //   field: "timestamp",
    //   sortable: true,
    //   filter: true,
    // },
    // { headerName: "High", field: "high", sortable: true, filter: true },
    // { headerName: "Low", field: "low", sortable: true, filter: true },
    // { headerName: "Volumes", field: "volumes", sortable: true, filter: true },
  ];

  const onCellClicked = (event) => {
    if (!localStorage.getItem("token")) {
      history.push("./members", { symbol: event.data.symbol });
    } else {
      history.push("./listing", { symbol: event.data.symbol });
    }
  };

  return (
    <div>
      <div
        className="ag-theme-balham "
        style={{ height: "600px", width: "600px" }}
      >
        <img src={stockImg} alt="search-img" style={styles.imageStyle} />
        <AgGridReact
          className="tableStocks"
          columnDefs={columns}
          rowSelection="single"
          pagination={true}
          paginationPageSize={50}
          rowData={apiData}
          onRowDoubleClicked={onCellClicked}
        ></AgGridReact>

        <div />
      </div>
    </div>
  );
};

export default TableResults;

const styles = {
  imageStyle: {
    position: "absolute",
    top: "590px",
    left: "1px",
    opacity: "0.6",
    draggable: "false",
    pointerEvents: "none",
    //  pointerevents: "none"
  },
};
