import DashCard from "../employee-pages/employee-components/DashCard";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import BASE_API_URI from "../config";

function CustomerService() {
  const [totalCustomerRecords, setTotalCustomerRecords] = useState(null);

  useEffect(() => {
    fetch(`${BASE_API_URI}/admindashtotals/customers`)
    .then(response => response.json())
      .then(data => {
        setTotalCustomerRecords(data);
      })
      .catch(error => console.error('Error:', error));
  }, []);

    return (
      <>
      <div class = "mx-16 mt-16 mb-8 text-section-head">
        Customer Service Dashboard
      </div>
      <div class = "mx-16 grid lg:grid-cols-3 md:grid-cols-2 gap-8">
        
        <Link to = "/customer-approval">
          <DashCard
            title = "Customer Approval Requests"
            dataPoints = {[
              {
                number: "47",
                caption: "New Tickets"
              },
              {
                number: "10",
                caption: "In-Progress"
              }
            ]}
          />
        </Link>
        <DashCard
          title = "Service Requests"
          dataPoints = {[
            {
              number: "11",
              caption: "New Tickets"
            },
            {
              number: "8",
              caption: "In-Progress"
            }
          ]}
        />
        <DashCard
          title = "Customer Information"
          dataPoints = {[
            {
              number: totalCustomerRecords,
              caption: "Customers"
            }
          ]}
        />
      </div>
      </>
  
    );
  }
  
  export default CustomerService;