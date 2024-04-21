import React, { useState, useEffect } from 'react';
import RequestsTable from './RequestsTable'; 
import { Container } from '@mui/material';
import axios from 'axios';
import BASE_API_URI from '../../config';

function ApprovalRequests() {
  const STATUS_NEW_REQUESTS = "PVN"; 
  const STATUS_COMPLETED = "RDY"; 
  const [customerData, setCustomerData] = useState([]);
  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
      const data = await axios.get(`${BASE_API_URI}/customers`, {withCredentials:true})
      setCustomerData(data.data) 
  }

  return (
    <Container className="my-8"> 
      <h1 class="text-section-head pb-8">Customer Approval Requests</h1>
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
    </Container>
  );
}

export default ApprovalRequests;
