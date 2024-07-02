import useSWR from 'swr'
import { useTable, Column, useSortBy, usePagination } from "react-table";
import './App.css'
import AddTransfer from './AddMessage';

export interface Message { // seq, sender_rtn, sender_an, receiver_rtn, receiver_an, amount
  seq: string;
  sender_rtn: string;
  sender_an: string;
  receiver_rtn: string;
  receiver_an: string;
  amount: number;
}

// preparing columns for table
const columns : Column<Message>[] = [
  { Header: "Seq #", accessor: "seq" },
  { Header: "Sender Routing #", accessor: "sender_rtn" },
  { Header: "Sender Account #", accessor: "sender_an" },
  { Header: "Receiver Routing #", accessor: "receiver_rtn" },
  { Header: "Receiver Account #", accessor: "receiver_an" },
  { Header: "Amount (cents)", accessor: "amount" },
];

// API ENDPOINT 
export const ENDPOINT = "http://localhost:8080";
const fetcher = (url: string) =>
  fetch(`${ENDPOINT}/${url}`).then((r) => r.json());

// var to validate fetch data
let data_display: Message[] = []

function App() {

  // fetch data from GET endpoints
  const { data : tabledata, mutate : mutatetable } = useSWR<Message[]>('messages', fetcher)
  const { data : recentdata } = useSWR<Message>('messages/last', fetcher)

  // to not pass in undefined vals to components and table until data correctly fetched
  if (tabledata != undefined) {
    data_display = tabledata
  }

  // table preparation
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
    state:{pageIndex},
    pageCount
  } = useTable<Message>({ columns, data: data_display }, useSortBy, usePagination);

  return (
    <div>
      <h2>Pillar Bank Wire Dashboard</h2>
      <div className="dashboard">

        <div className="data-container">

          <table {...getTableProps()}>
            <thead>
              {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => ( 
                    <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                      {column.render("Header")}
                      <span>
                        {" "}
                        {column.isSorted
                          ? column.isSortedDesc
                            ? " 🔽"
                            : " 🔼"
                          : ""}{" "}
                      </span>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row, i) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map(cell => {
                      return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="pagination">
            <button disabled={!canPreviousPage} onClick={previousPage}>Prev</button>
            <span>{pageIndex + 1} of {pageCount}</span>
            <button disabled={!canNextPage} onClick={nextPage}>Next</button>
          </div>

        </div>
        <div className="vertical-display">

          <div className="recent-activity">
          <h4>Most Recent Activity: Seq #{recentdata?.seq}</h4>
          <p>Sender Routing #: {recentdata?.sender_rtn}<br/>
          Sender Account #: {recentdata?.sender_an}<br/>
          Receiver Routing #: {recentdata?.receiver_rtn}<br/>
          Receiver Account #: {recentdata?.receiver_an}<br/>
          Amount: ${recentdata?.amount / 100}</p>
          </div>

          <AddTransfer mutate={mutatetable} />

        </div>

      </div>

    </div>

  )

  
}

export default App
