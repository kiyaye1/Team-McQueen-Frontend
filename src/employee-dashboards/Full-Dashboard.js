import DashCard from "../employee-pages/employee-components/DashCard";
import { Link } from "react-router-dom";

function FullDashboard() {
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
              number: "129",
              caption: "Customers"
            }
          ]}
        />
        <Link to = "/employee-management">
        <DashCard
          title = "Employee Information"
          dataPoints = {[
            {
              number: "23",
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
        <Link to = "/fleet-management">
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
        </Link>
      </div>
      </>
  
    );
  }
  
  export default FullDashboard;