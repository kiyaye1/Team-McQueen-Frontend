import React from 'react';
import RequestsTable from './RequestsTable'; 

function ApprovalRequests({ customerData }) {
  const STATUS_NEW_REQUESTS = "PVN"; 
  const STATUS_COMPLETED = "RDY"; 

  return (
    <div>
      {/*<h1>New Requests</h1>*/}
      <RequestsTable
        customerData={customerData}
        statusFilter={STATUS_NEW_REQUESTS}
        tableTitle="New Requests"
      />
      {/*<h1>Completed Requests</h1>*/}
      <RequestsTable
        customerData={customerData}
        statusFilter={STATUS_COMPLETED}
        tableTitle="Completed Requests"
      />
    </div>
  );
}

export default ApprovalRequests;
