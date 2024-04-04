import DashCard from "../employee-pages/employee-components/DashCard";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from 'react';

function Mechanic() {
      return (
      <>
      <div class = "mx-16 mt-16 mb-8 text-section-head">
        Mechanic Dashboard
      </div>
      <div class = "mx-16 grid lg:grid-cols-3 md:grid-cols-2 gap-8">
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
  
  export default Mechanic;