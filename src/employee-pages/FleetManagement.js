import * as React from 'react';
import { db } from '../FirebaseConfig'
import { ref, onValue, set } from 'firebase/database'
import { useState, useEffect } from 'react'
import axios from 'axios';
import BASE_API_URI from "../config";
import { 
  Container, 
  Typography, 
  Box, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Button, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  TextField, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem } from '@mui/material';
  import {Dialog} from '@mui/material';
import userEvent from '@testing-library/user-event';
import { useAuth } from '../context/AuthContext';
import dayjs from 'dayjs';



function FleetManagement() {
    const [carLocations, setCarLocations] = useState()
    const [stations, setStations] = useState()
    const [SQLCars, setSQLCars] = useState()
    const [newStationData, setNewStationData] = useState({})
    const [newCarData, setNewCarData] = useState({})
    const [openAdd, setOpenAdd] = useState(false);
    const [nextCarNumber, setNextCarNumber] = useState()
    const [openAddCar, setOpenAddCar] = useState(false)
    const {user} = useAuth()

    // Car states:
    // RDY - Ready 
    // IFR - In for repair
    // OTR - On the Road / Reserved


    // Get cars data from firebase
    useEffect(() => {
      return onValue(ref(db, '/cars/'), querySnapshot => {
        // full data snapshot
        let data = querySnapshot.val()
        console.log(data)
        setCarLocations(data)
        getStations()
        getSQLCars()

        setNextCarNumber(data.length)
      })

    }, [])

    // function nextCar() {
    //   const nextCar = carLocations?.length
    //   setNextCarNumber(nextCar)
    //   return nextCar
    // }

    function getSQLCars() {
      axios.get(`${BASE_API_URI}/cars`, {withCredentials:true})
      .then((response) => {
        console.log(response)
      })
    }

    const getStations = async () => {
      const data = await axios.get(`${BASE_API_URI}/stations`, {withCredentials:true})
      const stations = data.data
      setStations(stations)
      console.log(stations)
    }
    //const stationFields = ['stationID', 'country', 
    //'state', 'county', 'city', 'zip', 'coordinates', 'streetAddress']
    const addStation = () => {
      axios.post(`${BASE_API_URI}/stations`, 
        {
          name: newStationData.name,
          streetAddress: newStationData.streetAddress,
          city: newStationData.city,
          county: newStationData.county,
          state: newStationData.state,
          country: newStationData.country,
          zip: newStationData.zip,
          coordinates: {
            lat: newStationData.lat,
            lng: newStationData.lng
          }
        }, 
        {withCredentials:true})
      .then((response) => {
        alert("New Station - " + newStationData.name + " has been created.")
      })
      .catch((error) => {
        alert(error)
      })
    }

    const addCar = () => {
      const carIDNum = carLocations.length
      //axios request for sql to add car
      axios.post(`${BASE_API_URI}/cars`,
      {
        carID: carIDNum,
        carModelID: 1,
        installDateTime: dayjs().toISOString(),
        statusCode: newCarData.statusCode
      }, 
      {withCredentials:true})
      .then((response) => {
        alert("New Car Created - Car Number" + nextCarNumber)
      })
      .catch((error) => {
        alert(error)
      })

      //add car to firebase
      addCarFirebase(carIDNum)

    }

    function addCarFirebase(carNum) {
      set(ref(db, '/cars/' + carNum), {
        carID: carNum,
        latitute: 43.20663,
        longitude: -77.68602
      })
    }

    //Function to handle form input change
    const handleChangeStation = (e) => {
      setNewStationData({
        ...newStationData,
        [e.target.name]: e.target.value
      });
    };

    //Function to handle close action for dialogs
    const handleClose = () => {
      setOpenAdd(false);
      setOpenAddCar(false)
    };

    const handleAddStation = () => {
      setOpenAdd(true);
      setNewStationData({});
    };

    const handleDeleteStation = () => {
      // delete station
    }

    // add cars to SQL and to Firebase Databases
    const handleAddCar = () => {
          setOpenAddCar(true);
          setNewCarData({})
    };

    const handleChangeCar = (e) => {
      setNewCarData({
        ...newCarData,
        [e.target.name]: e.target.value
      });
    }

    const handleDeleteCar = (e) => {
      // delete car from firebase and sql databases 
    }


  function isCarInStation(lat, lng) {
    //const [currentLoc, setCurrentLoc] = useState("Driving")
    var currentLoc = "Driving"
    for(var i = 0; i < stations?.length; i++) {
        const l = stations[i].coordinates.lat?.toFixed(4)
        const ln = stations[i].coordinates.lng?.toFixed(4)
        if(lat === l && lng === ln) {
          var loc = (i + 1)
          currentLoc = stations[i].name
        }
    }
    return currentLoc
  }


    return (
      <><div class = "mx-16 my-8">
            <h1 class = "text-section-head">Fleet Management</h1>
            <div class = "flex items-center pt-8">
              <h2 class = "text-subhead pr-4">Stations</h2>
              {user.role === 1 && (
                  <Button 
                  variant = 'outlined' 
                  size = "small" 
                  sx = {{color: "#000180", borderColor: "#000180"}}
                  onClick  = {() => handleAddStation()}
                  >
                  Add Station
                  </Button>
                )
              }
            </div>
            <Dialog open={openAdd} onClose={handleClose}>
              <DialogTitle>Add Station</DialogTitle>
              <DialogContent>
                <TextField 
                  autoFocus 
                  margin="dense" 
                  name="name" 
                  label="Station Name" 
                  fullWidth required
                  value={newStationData.name || ''} 
                  onChange={handleChangeStation} />
                <TextField 
                  margin="dense" 
                  name="streetAddress" 
                  label="Street Address" 
                  fullWidth required
                  value={newStationData.streetAddress || ''} 
                  onChange={handleChangeStation} />
                <TextField 
                  margin="dense" 
                  name="city" 
                  label="City" fullWidth required
                  value={newStationData.city || ''} 
                  onChange={handleChangeStation} />
                 <TextField 
                  margin="dense" 
                  name="county" 
                  label="County" fullWidth required
                  value={newStationData.county || ''} 
                  onChange={handleChangeStation} />
                <TextField 
                  margin="dense" 
                  name="state" 
                  label="State" fullWidth required
                  value={newStationData.state || ''} 
                  onChange={handleChangeStation} />
                <TextField 
                  margin="dense" 
                  name="country" 
                  label="Country" fullWidth required
                  value={newStationData.country || ''} 
                  onChange={handleChangeStation} />
                <TextField 
                  margin="dense" 
                  name="zip" 
                  label="Zip Code" fullWidth required
                  value={newStationData.zip || ''} 
                  onChange={handleChangeStation} />
                <TextField 
                  margin="dense" 
                  name="lat" 
                  label="Latitude" fullWidth required
                  value={newStationData.lat || ''} 
                  onChange={handleChangeStation} />
                <TextField 
                  required
                  margin="dense" 
                  name="lng" 
                  label="Longitude" fullWidth 
                  value={newStationData.lng || ''} 
                  onChange={handleChangeStation} />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={() => { addStation(); handleClose();}} color="primary">Add Station</Button>
              </DialogActions>
            </Dialog>
            <div class = "grid grid-cols-2 gap-4 py-4">
            {stations?.map((data, key) => {
              return (
                <div class = "border border-border rounded-xl py-4 px-8" key = {key}>
                  <p class = "text-card-title">{data.name}</p>
                  <p>{data.streetAddress}</p>
                  <p>{data.city}, {data.state} {data.zip}</p>
                  <p>{data.county} County</p>
                  <p>{data.coordinates.lat}, {data.coordinates.lng}</p>
                </div>
              );
            })}
            </div>

            <div class = "flex items-center pt-8">
              <h2 class = "text-subhead pr-4">Cars</h2>
              {user.role === 1 && (
                <Button 
                  variant = 'outlined' 
                  size = "small" 
                  sx = {{color: "#000180", borderColor: "#000180"}}
                  onClick = {() => handleAddCar()}
                >
                  Add Gyrocar
                </Button>
              )}
            </div>
            
            
            <Dialog open = {openAddCar} onClose = {handleClose}>
              <DialogTitle>Add Gyrocar</DialogTitle>
              <DialogContent>
                <p>Car Number: {nextCarNumber}</p>
                <p class = "mb-4">Created at: {dayjs().toString()}</p>
                <FormControl required fullWidth>
                <InputLabel id="status-select">Car Status</InputLabel>
                  <Select
                      labelId = "status-select"
                      name = "statusCode"
                      value = {newCarData.statusCode}
                      label = "State"
                      onChange = {handleChangeCar}
                      required
                  >
                    <MenuItem value = "RDY">Ready to Rent</MenuItem>
                    <MenuItem value = "IFR">Out for Service</MenuItem>
                  </Select>
                </FormControl>

                <FormControl required fullWidth>
                <InputLabel id="station-select">Starting Station</InputLabel>
                  <Select
                      labelId = "station-select"
                      name = "station"
                      value = {newCarData.station}
                      label = "Starting Station"
                      onChange = {handleChangeCar}
                      required
                  >
                    {stations?.map((data, key) => {
                      return (
                        <MenuItem key = {key} value = {data.coordinates}>{data.name}</MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
                
                <DialogActions>
                  <Button onClick = {handleClose}>Cancel</Button>
                  <Button onClick = {() => {addCar(); handleClose()}} color = "primary">Add Station</Button>
                </DialogActions>
              </DialogContent>
            </Dialog>
            
            
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
                                <TableCell align = "center">{car.lat?.toFixed(4)}, {car.lng?.toFixed(4)}</TableCell>
                                <TableCell align = "right">{isCarInStation(car.lat?.toFixed(4), car.lng?.toFixed(4))}</TableCell>
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