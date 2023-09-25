import { useState } from "react";
import { useTable, useSortBy, usePagination } from "react-table";

import { data } from "./assets/data.json";

const columns = [
  {
    Header: "ID",
    accessor: "id",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Gender",
    accessor: "gender",
  },
  {
    Header: "Salary",
    accessor: "salary",
  },
];
const App = () => {
  const [addValue, setAddValue] = useState(false);
  // console.log(addValue);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    gender: "",
    salary: "",
  });
  const [tableData, setTableData] = useState(data);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    state: { pageIndex },
    pageCount,
    gotoPage,
  } = useTable(
    { columns, data: tableData, initialState: { pageSize: 5 } },
    useSortBy,
    usePagination
  );

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleAddRow = () => {
    const newData = [...tableData, formData];
    setTableData(newData);
    setFormData({
      id: "",
      name: "",
      gender: "",
      salary: "",
    });
  };

  return (
    <div className="container">
      {addValue == true ? (
        <div className="form">
          <div className="close">
            <h1
              onClick={() => {
                setAddValue(false);
              }}
            >
              &times;
            </h1>
          </div>
          <input
            type="text"
            name="id"
            placeholder="ID"
            value={formData.id}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="gender"
            placeholder="Gender"
            value={formData.gender}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="salary"
            placeholder="Salary"
            value={formData.salary}
            onChange={handleInputChange}
          />
          <button
            className="btnaddrow"
            onClick={() => {
              setAddValue(false);
              handleAddRow();
            }}
          >
            Add Row
          </button>
        </div>
      ) : (
        ""
      )}
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((hg) => (
            <tr {...hg.getHeaderGroupProps()}>
              {hg.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  {column.isSorted && (
                    <span>{column.isSortedDesc ? " ⬇️" : " ⬆️"}</span>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);

            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div
        className="buttons
      "
      >
        <button
          className="btn"
          disabled={pageIndex == 0}
          onClick={() => gotoPage(0)}
        >
          first
        </button>
        <button disabled={!canPreviousPage} onClick={previousPage}>
          ◀️ Prev
        </button>
        <span>
          {pageIndex + 1} of {pageCount}
        </span>
        <button disabled={!canNextPage} onClick={nextPage}>
          Next ▶️{" "}
        </button>
        <button
          disabled={pageIndex == pageCount - 1}
          className="btn"
          onClick={() => gotoPage(pageCount - 1)}
        >
          last
        </button>
        <button
          disabled={addValue}
          className="btnvalueupdate"
          onClick={() => setAddValue(true)}
        >
          Add New
        </button>{" "}
      </div>
      <div></div>
    </div>
  );
};

export default App;
