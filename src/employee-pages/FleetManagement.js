import * as React from 'react';
import { db } from '../FirebaseConfig'
import { ref, onValue } from 'firebase/database'
import { useState, useEffect } from 'react'
import axios from 'axios';
import { Button } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import BASE_API_URI from "../config";

function FleetManagement() {
  const [carLocations, setCarLocations] = useState()
  const [stations, setStations] = useState()

    // use effect loop to get the data frequently so it can detect when it is changed
  useEffect(() => {
    return onValue(ref(db, '/cars/'), querySnapshot => {
      // full data snapshot
      let data = querySnapshot.val()
      console.log(data)
      setCarLocations(data)
      getStations()
    })
  }, [])


//   switch(startID) {
//     case 1: return "Northwest";
//     case 2: return "Northeast";
//     case 3: return "Center City";
//     case 4: return "Southeast";
//     case 5: return "Airport";
//     default: return "Northwest"
// }

  function isCarInStation(lat, lng) {
    //const [currentLoc, setCurrentLoc] = useState("Driving")
    var currentLoc = "Driving"
    for(var i = 0; i < stations?.length; i++) {
        const l = stations[i].coordinates.lat.toFixed(4)
        const ln = stations[i].coordinates.lng.toFixed(4)
        if(lat === l && lng === ln) {
          var loc = (i + 1)
          currentLoc = getStationName(loc) + " Station"
        }
    }
    return currentLoc
  }

  function getStationName(id) {
    switch(id) {
        case 1: return "Northwest";
        case 2: return "Northeast";
        case 3: return "Center City";
        case 4: return "Southeast";
        case 5: return "Airport";
        default: return "Northwest"
    }
}

  const getStations = async () => {
    const data = await axios.get(`${BASE_API_URI}/stations`, {withCredentials:true})
    const stations = data.data
    setStations(stations)
    console.log(stations)
    console.log(stations.length)
  }

    return (
      <><div class = "mx-16 my-8">
            <h1 class = "text-section-head">Fleet Management</h1>
            <div class = "flex items-center pt-8">
              <h2 class = "text-subhead pr-4">Stations</h2>
              <Button variant = 'outlined' size = "small" sx = {{color: "#000180", borderColor: "#000180"}}>Add Station</Button>
            </div>
            <div class = "grid grid-cols-2 gap-4 py-4">
            {stations?.map((data, key) => {
              return (
                <div class = "border border-border rounded-xl py-4 px-8" key = {key}>
                  <p class = "text-card-title">Station {data.stationID}</p>
                  <p>{data.streetAddress}</p>
                  <p>{data.city}, {data.state} {data.zip}</p>
                </div>
              );
            })}
            </div>

            <div class = "flex items-center pt-8">
              <h2 class = "text-subhead pr-4">Cars</h2>
              <Button variant = 'outlined' size = "small" sx = {{color: "#000180", borderColor: "#000180"}}>Add Cars</Button>
            </div>
            <TableContainer>
            <Table sx={{   }}>
                <TableHead>
                    <TableRow>
                        <TableCell>Car ID</TableCell>
                        <TableCell align = "center">Availability</TableCell>
                        <TableCell align = "center">Service History</TableCell>
                        <TableCell align = "center">Condition</TableCell>
                        <TableCell align = "center">Coordinates</TableCell>
                        <TableCell align="right">Current Station</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {carLocations?.map((car) => {
                        return (
                            <TableRow key = {car.carID}>
                                <TableCell component="th" scope = "row">
                                    {car.carID}
                                </TableCell>
                                <TableCell align = "center">In Service</TableCell>
                                <TableCell align = "center"><Button size = "small">Service Log</Button></TableCell>
                                <TableCell align = "center">Fair</TableCell>
                                <TableCell align = "center">{car.lat.toFixed(4)}, {car.lng.toFixed(4)}</TableCell>
                                <TableCell align = "right">{isCarInStation(car.lat.toFixed(4), car.lng.toFixed(4))}</TableCell>
                            </TableRow>
                        );
                    })}
                  </TableBody>
              </Table>
              </TableContainer>
            
      </div></>
  
    );
  }
  
  export default FleetManagement;