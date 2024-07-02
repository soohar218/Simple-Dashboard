import { useState, useMemo } from 'react'
import { Message } from "./App";
import DataTable from 'react-data-table-component';


<DataTable 
            columns={columns} 
            data={datatable}
            fixedHeader
            pagination
            selectableRows/>

function Table() {

    const columns = [
        { name: "Seq #", selector: (row: { seq: string; }) => row.seq },
        { name: "Sender Routing #", selector: (row: { sender_rtn: string; }) => row.sender_rtn },
        { name: "Sender Account #", selector: (row: { sender_an: string; }) => row.sender_an },
        { name: "Receiver Routing #", selector: (row: { receiver_rtn: string; }) => row.receiver_rtn },
        { name: "Receiver Account #", selector: (row: { receiver_an: string; }) => row.receiver_an },
        { name: "Amount", selector: (row: { weight: string; }) => row.weight },
    ];
    }
    return (
        <div>
            <DataTable 
                columns={columns} 
                data={datatable}
                fixedHeader
                pagination
                selectableRows/>
        </div>
    )
    

    // return (
    //     <table className="sortable">
    //     <thead>
    //     <tr>
    //         <th>
    //         <button type="button" 
    //             // className={getClassNamesFor('seq')}
    //             onClick={() => requestSort('seq')}>
    //             Seq #
    //         </button>
    //         </th>
    //         <th>
    //         <button type="button" 
    //             // className={getClassNamesFor('sender_rtn')}
    //             onClick={() => requestSort('sender_rtn')}>
    //             Sender Routing #
    //         </button>
    //         </th>
    //         <th>Sender Account #</th>
    //         <th>Receiver Routing #</th>
    //         <th>Receiver Account #</th>
    //         <th>Amount</th>
    //     </tr>
    //     </thead>
    //     <tbody>
    //     {items?.map(message => {
    //         return(
    //         <tr>
    //         <td>{message.seq}</td>
    //         <td>{message.sender_rtn}</td>
    //         <td>{message.sender_an}</td>
    //         <td>{message.receiver_rtn}</td>
    //         <td>{message.receiver_an}</td>
    //         <td>${message.amount / 100}</td>
    //         </tr>
    //     ); 
    //     })}
    //     </tbody>
    // </table>
    // );
}

// const SortableTable = (msg: any) => {
    console.log(msg)
    
}
    

export default Table;