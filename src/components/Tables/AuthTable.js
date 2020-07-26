import React, { useEffect } from "react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import { AgGridReact } from "ag-grid-react";
// import stockImg from "../stock-img.png";

const AuthTable = (props) => {
  const { rowData } = props;
  const columns = [
    // Default column data to be displayed in ag-grid component
    {
      headerName: "Date",
      field: "timestamp",
      sortable: true,
      filter: true,
    },
    { headerName: "Name", field: "name", sortable: true, filter: true },
    { headerName: "Industry", field: "industry", sortable: true, filter: true },
    { headerName: "Open", field: "open", sortable: true, filter: true },
    { headerName: "High", field: "high", sortable: true, filter: true },
    { headerName: "Low", field: "low", sortable: true, filter: true },
    { headerName: "Close", field: "close", sortable: true, filter: true },
    { headerName: "Volumes", field: "volumes", sortable: true, filter: true },
  ];

  useEffect(() => {
    // console.log(match);
  }, []);

  return (
    // console.log(rowData),
    <div>
      <div
        className="ag-theme-balham container"
        style={{
          height: "500px",
          width: "900px",
          marginTop: 30,
          position: "absolute",
          left: 110,
        }}
      >
        <AgGridReact
          className="authStocks"
          columnDefs={columns}
          rowSelection="single"
          pagination={true}
          paginationPageSize={50}
          rowData={rowData}
        ></AgGridReact>
        <div />
      </div>
    </div>
  );
};

export default AuthTable;
