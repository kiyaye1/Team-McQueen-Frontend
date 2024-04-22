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
    const [totalNewServiceRequestRecords, setTotalNewServiceRequestRecords] = useState(null);
    const [totalInProgressServiceRequestRecords, setTotalInProgressServiceRequestRecords] = useState(null);
    const [totalCompletedServiceRequestRecords, setTotalCompletedServiceRequestRecords] = useState(null);
    const [totalNewInquiryRecords, setTotalNewInquiryRecords] = useState(null);
    const [totalInProgressInquiryRecords, setTotalInProgressInquiryRecords] = useState(null);
    const [totalCompletedInquiryRecords, setTotalCompletedInquiryRecords] = useState(null);

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

    useEffect(() => {
      fetch(`${BASE_API_URI}/admindashtotals/service-requests/new`, {
        method: 'GET',
        credentials: 'include', 
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => response.json())
        .then(data => {
          setTotalNewServiceRequestRecords(data);
        })
        .catch(error => console.error('Error:', error));
    }, []);

    useEffect(() => {
      fetch(`${BASE_API_URI}/admindashtotals/service-requests/in-progress`, {
        method: 'GET',
        credentials: 'include', 
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => response.json())
        .then(data => {
          setTotalInProgressServiceRequestRecords(data);
        })
        .catch(error => console.error('Error:', error));
    }, []);

    useEffect(() => {
      fetch(`${BASE_API_URI}/admindashtotals/service-requests/completed`, {
        method: 'GET',
        credentials: 'include', 
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => response.json())
        .then(data => {
          setTotalCompletedServiceRequestRecords(data);
        })
        .catch(error => console.error('Error:', error));
    }, []);

    useEffect(() => {
      fetch(`${BASE_API_URI}/admindashtotals/customer-inquiries/new`, {
        method: 'GET',
        credentials: 'include', 
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => response.json())
        .then(data => {
          setTotalNewInquiryRecords(data);
        })
        .catch(error => console.error('Error:', error));
    }, []);

    useEffect(() => {
      fetch(`${BASE_API_URI}/admindashtotals/customer-inquiries/in-progress`, {
        method: 'GET',
        credentials: 'include', 
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => response.json())
        .then(data => {
          setTotalInProgressInquiryRecords(data);
        })
        .catch(error => console.error('Error:', error));
    }, []);

    useEffect(() => {
      fetch(`${BASE_API_URI}/admindashtotals/customer-inquiries/completed`, {
        method: 'GET',
        credentials: 'include', 
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => response.json())
        .then(data => {
          setTotalCompletedInquiryRecords(data);
        })
        .catch(error => console.error('Error:', error));
    }, []);
    
    if(role === 1) {
      return (
        <div>
          <div class = "mx-16 mt-16 mb-8 text-section-head">Admin Dashboard</div>
          <div class = "mx-16 grid lg:grid-cols-3 md:grid-cols-2 gap-8">
            <Link to = "/customer-approvals">
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
            <Link to = "/customer-inquiries">
              <DashCard
                title = "Customer Inquiries"
                dataPoints = {[
                  {
                    number: totalNewInquiryRecords,
                    caption: "New Inquiries"
                  },
                  {
                    number: totalInProgressInquiryRecords,
                    caption: "In-Progress"
                  },
                  {
                    number: totalCompletedInquiryRecords,
                    caption: "Completed"
                  }
                ]}
              />
              </Link>
             <Link to = "/service-requests">
              <DashCard
                title = "Service Requests"
                dataPoints = {[
                  {
                    number: totalNewServiceRequestRecords,
                    caption: "New Tickets"
                  },
                  {
                    number: totalInProgressServiceRequestRecords,
                    caption: "In-Progress"
                  },
                  {
                    number: totalCompletedServiceRequestRecords,
                    caption: "Completed"
                  }
                ]}
              />

             </Link>
            <Link to = "/members-info">
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
          <Link to = "/customer-approvals">
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
            <Link to = "/members-info">
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
            <Link to = "/customer-inquiries">
              <DashCard
                title = "Customer Inquiries"
                dataPoints = {[
                  {
                    number: totalNewInquiryRecords,
                    caption: "New Inquiries"
                  },
                  {
                    number: totalInProgressInquiryRecords,
                    caption: "In-Progress"
                  },
                  {
                    number: totalCompletedInquiryRecords,
                    caption: "Completed"
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
        <Link to = "/service-requests">
          <DashCard
              title = "Service Requests"
              dataPoints = {[
                {
                  number: totalNewServiceRequestRecords,
                  caption: "New Tickets"
                },
                {
                  number: totalInProgressServiceRequestRecords,
                  caption: "In-Progress"
                },
                {
                  number: totalCompletedServiceRequestRecords,
                  caption: "Completed"
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
            <Link to = "/customer-approvals">
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
            <Link to = "/members-info">
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
            <Link to = "/customer-inquiries">
              <DashCard
                title = "Customer Inquiries"
                dataPoints = {[
                  {
                    number: totalNewInquiryRecords,
                    caption: "New Inquiries"
                  },
                  {
                    number: totalInProgressInquiryRecords,
                    caption: "In-Progress"
                  },
                  {
                    number: totalCompletedInquiryRecords,
                    caption: "Completed"
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