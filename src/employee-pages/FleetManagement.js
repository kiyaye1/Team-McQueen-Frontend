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

  const getStations = async () => {
    const data = await axios.get(`${BASE_API_URI}/stations`, {withCredentials:true})
    const stations = data.data
    setStations(stations)
    console.log(stations)
  }

    return (
      <><div class = "m-16">
            <h1 class = "text-section-head">Fleet Management</h1>
            <h2 class = "text-subhead pt-8">Stations</h2>
            <div class = "grid grid-cols-5 gap-2 py-4">
            {stations?.map((data, key) => {
              return (
                <div key = {key}>
                  <p class = "text-card-title">Station {data.stationID}</p>
                  <p>{data.streetAddress}</p>
                  <p>{data.city}, {data.state} {data.zip}</p>
                </div>
              );
            })}
            </div>

            <h2 class = "text-subhead pt-8">Cars</h2>
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
                                <TableCell align = "center">Available / Out of Service</TableCell>
                                <TableCell align = "center"><Button size = "small">Service Log</Button></TableCell>
                                <TableCell align = "center">Fair</TableCell>
                                <TableCell align = "center">{car.lat.toFixed(2)}, {car.lng.toFixed(2)}</TableCell>
                                <TableCell align = "right">Check coord against station?</TableCell>
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