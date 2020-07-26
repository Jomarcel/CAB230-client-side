import React, { useEffect } from "react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import { AgGridReact } from "ag-grid-react";

const MemberTable = (props) => {
  const { rowData } = props;
  // const [symbol, setSymbol] = useState([]);
  const columns = [
    // Default column data to be displayed in ag-grid component
    {
      headerName: "Date",
      field: "timestamp",
      sortable: true,
      filter: true,
    },
    // { headerName: "Symbol", field: "symbol", sortable: true, filter: true },
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
        className="ag-theme-balham "
        style={{ height: "500px", width: "1150px", marginTop: 70 }}
      >
        {/* <img src={stockImg} alt="search-img" style={styles.imageStyle} /> */}

        <AgGridReact
          className="authStocks"
          columnDefs={columns}
          rowSelection="single"
          pagination={true}
          paginationPageSize={50}
          rowData={rowData}
          // onCellClicked={onCellClicked}
        ></AgGridReact>
        <div />
      </div>
    </div>
  );
};

export default MemberTable;

// const styles = {
//   imageStyle: {
//     position: "absolute",
//     top: "590px",
//     left: "1px",
//     opacity: "0.6",
//     draggable: "false",
//     //  pointerevents: "none"
//   },
// };
