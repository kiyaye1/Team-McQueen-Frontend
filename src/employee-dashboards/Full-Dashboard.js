import DashCard from "../employee-pages/employee-components/DashCard";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import BASE_API_URI from '../config';
import { useAuth } from "../context/AuthContext";

function FullDashboard({employeeRole}) {
    //0 = customer
    //1 = Administrator
    //2 = Customer Service
    //3 = Mechanic
    //4 = Manager
    const [totalEmployeeRecords, setTotalEmployeeRecords] = useState(null);
    const [totalCustomerRecords, setTotalCustomerRecords] = useState(null);
    const [totalNewCustomerRecords, setTotalNewCustomerRecords] = useState(null);
    const [totalRDYCustomerRecords, setTotalRDYCustomerRecords] = useState(null);
    const [totalCarRecords, setTotalCarRecords] = useState(null);
    const [totalStationRecords, setTotalStationRecords] = useState(null);
    const {user} = useAuth()
    console.log(user)
    const role = user.role

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

    useEffect(() => {
      fetch(`${BASE_API_URI}/admindashtotals/customers/new`, {
        method: 'GET',
        credentials: 'include', 
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => response.json())
        .then(data => {
          setTotalNewCustomerRecords(data);
        })
        .catch(error => console.error('Error:', error));
    }, []);

    useEffect(() => {
      fetch(`${BASE_API_URI}/admindashtotals/customers/completed`, {
        method: 'GET',
        credentials: 'include', 
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => response.json())
        .then(data => {
          setTotalRDYCustomerRecords(data);
        })
        .catch(error => console.error('Error:', error));
    }, []);

    useEffect(() => {
      fetch(`${BASE_API_URI}/admindashtotals/cars`, {
        method: 'GET',
        credentials: 'include', 
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => response.json())
        .then(data => {
          setTotalCarRecords(data);
        })
        .catch(error => console.error('Error:', error));
    }, []);

    useEffect(() => {
      fetch(`${BASE_API_URI}/admindashtotals/stations`, {
        method: 'GET',
        credentials: 'include', 
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => response.json())
        .then(data => {
          setTotalStationRecords(data);
        })
        .catch(error => console.error('Error:', error));
    }, []);
    
    if(role === 1) {
      return (
        <div>
          <div class = "mx-16 mt-16 mb-8 text-section-head">Admin Dashboard</div>
          <div class = "mx-16 grid lg:grid-cols-3 md:grid-cols-2 gap-8">
            <Link to = "/customer-approval/1">
              <DashCard
                title = "Customer Approval Requests"
                dataPoints = {[
                  {
                    number: totalRDYCustomerRecords,
                    caption: "Completed"
                  },
                  {
                    number: totalNewCustomerRecords,
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
            <Link to = "/customer-approval/3">
              <DashCard
                title = "Member Information"
                dataPoints = {[
                  {
                    number: totalCustomerRecords,
                    caption: "Customers"
                  }
                ]}
              />
            </Link>
            <Link to = "/employee-management">
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
            <Link to = "/fleet-management">
            <DashCard
                title = "Fleet Management"
                dataPoints = {[
                  {
                    number: totalCarRecords,
                    caption: "Vehicles"
                  },
                  {
                    number: totalStationRecords,
                    caption: "Stations"
                  },
                  {
                    number: "10",
                    caption: "Cars Per Station"
                  }
                ]}
              />
            </Link>
          </div>
        </div>
    
      );
    } else if(role === 2) {
      return (
      <div>
        <div class = "mx-16 mt-16 mb-8 text-section-head">Customer Service Dashboard</div>
        <div class = "mx-16 grid lg:grid-cols-3 md:grid-cols-2 gap-8">
          <Link to = "/customer-approval/1">
                <DashCard
                  title = "Customer Approval Requests"
                  dataPoints = {[
                    {
                      number: totalRDYCustomerRecords,
                      caption: "Completed"
                    },
                    {
                      number: totalNewCustomerRecords,
                      caption: "In-Progress"
                    }
                  ]}
                />
            </Link>
            <Link to = "/customer-approval/3">
              <DashCard
                title = "Member Information"
                dataPoints = {[
                  {
                    number: totalCustomerRecords,
                    caption: "Customers"
                  }
                ]}
              />
            </Link>
            <Link to = "/customer-approval/2">
              <DashCard
                title = "Customer Inquiries"
                dataPoints = {[
                  {
                    number: "5",
                    caption: "Open Inquiries"
                  }
                ]}
              />
            </Link>
        </div>
      </div>
      );
    } else if(role === 3) {
      return (
      <div>
      <div class = "mx-16 mt-16 mb-8 text-section-head">Mechanic Dashboard</div>
        <div class = "mx-16 grid lg:grid-cols-3 md:grid-cols-2 gap-8">
        <Link to = "/fleet-management/2">
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
            </Link>
           
            <Link to = "/fleet-management/2">
            <DashCard
                title = "Fleet Management"
                dataPoints = {[
                  {
                    number: totalCarRecords,
                    caption: "Vehicles"
                  },
                  {
                    number: totalStationRecords,
                    caption: "Stations"
                  },
                  {
                    number: "10",
                    caption: "Cars Per Station"
                  }
                ]}
              />
            </Link>
          </div>
        </div>
      );
    } else if(role == 4) {
      return (
      <div>
      <div class = "mx-16 mt-16 mb-8 text-section-head">Manager Dashboard</div>
        <div class = "mx-16 grid lg:grid-cols-3 md:grid-cols-2 gap-8">
            <Link to = "/employee-management">
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
            <Link to = "/customer-approval/1">
                <DashCard
                  title = "Customer Approval Requests"
                  dataPoints = {[
                    {
                      number: totalRDYCustomerRecords,
                      caption: "Completed"
                    },
                    {
                      number: totalNewCustomerRecords,
                      caption: "In-Progress"
                    }
                  ]}
                />
            </Link>
            <Link to = "/customer-approval/3">
              <DashCard
                title = "Member Information"
                dataPoints = {[
                  {
                    number: totalCustomerRecords,
                    caption: "Customers"
                  }
                ]}
              />
            </Link>
            <Link to = "/customer-approval/2">
              <DashCard
                title = "Customer Inquiries"
                dataPoints = {[
                  {
                    number: "5",
                    caption: "Open Inquiries"
                  }
                ]}
              />
            </Link>
        </div>
       </div>
      );
    }
  } 
  
  export default FullDashboard;