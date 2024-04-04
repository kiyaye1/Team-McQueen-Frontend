import DashCard from "../employee-pages/employee-components/DashCard";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import BASE_API_URI from "../config";

function Admin() {
  const [totalEmployeeRecords, setTotalEmployeeRecords] = useState(null);
  const [totalCustomerRecords, setTotalCustomerRecords] = useState(null);

  useEffect(() => {
    fetch(`${BASE_API_URI}/admindashtotals/employees`, {
      method: 'GET',
      credentials: 'include', 
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.json())
      .then(data => {
        setTotalEmployeeRecords(data);
      })
      .catch(error => console.error('Error:', error));
  }, []);
  
  useEffect(() => {
    fetch(`${BASE_API_URI}/admindashtotals/customers`, {
      method: 'GET',
      credentials: 'include', 
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.json())
      .then(data => {
        setTotalCustomerRecords(data);
      })
      .catch(error => console.error('Error:', error));
  }, []);

    return (
      <>
      <div class = "mx-16 mt-16 mb-8 text-section-head">
        Admin Dashboard
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
          title = "Business Admin Information"
          dataPoints = {[
            {
              number: "3",
              caption: "Business Admins"
            }
          ]}
        />
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
        <Link to = "/employee-information">
        <DashCard
          title = "Employee Information"
          dataPoints = {[
            {
              number: totalEmployeeRecords,
              caption: "Employees"
            }
          ]}
        />
        </Link>
        <DashCard
          title = "Vehicle Information"
          dataPoints = {[
            {
              number: "40",
              caption: "Total Vehicles"
            },
            {
              number: "32",
              caption: "Available for Use"
            }
          ]}
        />
        <DashCard
          title = "Fleet Management"
          dataPoints = {[
            {
              number: "40",
              caption: "Vehicles"
            },
            {
              number: "4",
              caption: "Stations"
            },
            {
              number: "10",
              caption: "Cars Per Station"
            }
          ]}
        />
      </div>
      </>
  
    );
  }
  
  export default Admin;