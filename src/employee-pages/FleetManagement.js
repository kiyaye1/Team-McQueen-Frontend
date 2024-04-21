import * as React from 'react';
import { db } from '../FirebaseConfig'
import { ref, onValue, set, remove } from 'firebase/database'
import { useState, useEffect, useMemo } from 'react'
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
import DeleteIcon from '@mui/icons-material/Delete';

function FleetManagement() {
  const [carLocations, setCarLocations] = useState({})
  const [stations, setStations] = useState([])
  const [SQLCars, setSQLCars] = useState([])
  const [newStationData, setNewStationData] = useState({
    name: "",
    streetAddress: "",
    city: "",
    county: "",
    state: "",
    country: "",
    zip: "",
    lat: "",
    lng:""
  })
  const [newCarData, setNewCarData] = useState({})
  const [openAdd, setOpenAdd] = useState(false);
  const [openAddCar, setOpenAddCar] = useState(false)
  const {user} = useAuth()

  const [numberStations, setNumberStations] = useState(5)
  const [numberCars, setNumberCars] = useState(40)

  const {...requiredInputs} = newStationData
   
  const canSubmit = [...Object.values(requiredInputs)].every(Boolean)

    // Car states:
    // RDY - Ready 
    // IFR - In for repair
    // OTR - On the Road / Reserved

  const [cars, setCars] = useState([]);
  const [displayedCars, setDisplayedCars] = useState([]);
  const [orderBy, setOrderBy] = useState('carID');
  const [order, setOrder] = useState('asc');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState('');

    // Get cars data from firebase
  useEffect(() => {
    return onValue(ref(db, '/cars/'), querySnapshot => {
      // full data snapshot
      let data = querySnapshot.val()
      setCarLocations(data || {})
    })

  }, [])

  useEffect(() => {
    const fetchStations = async () => {
        const response = await axios.get(`${BASE_API_URI}/stations`, {withCredentials: true});
        setStations(response.data || []);
    };
    const fetchCars = async () => {
        const response = await axios.get(`${BASE_API_URI}/cars`, {withCredentials: true});
        setSQLCars(response.data || []);
        setCars(response.data || []);
        setPage(1);
        applyFilters();
    };
    fetchStations();
    fetchCars();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [cars, page, limit, order, orderBy, search]);

  const applyFilters = () => {
    let filtered = cars.filter(car =>
      car.carID.toString().includes(search) ||
      car.statusCode.toLowerCase().includes(search.toLowerCase())
    );

    filtered = filtered.sort((a, b) => {
      const valueA = a[orderBy];
      const valueB = b[orderBy];
      if (valueA < valueB) return order === 'asc' ? -1 : 1;
      if (valueA > valueB) return order === 'asc' ? 1 : -1;
      return 0;
    });

    const startIndex = (page - 1) * limit;
    const paginatedItems = filtered.slice(startIndex, startIndex + limit);
    setDisplayedCars(paginatedItems);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeOrderBy = (event) => {
    setOrderBy(event.target.value);
    setPage(1);
  };

  const handleChangeOrder = () => {
    setOrder(order === 'asc' ? 'desc' : 'asc');
    setPage(1);
  };
 
  const addStation = () => {
    if(canSubmit) {
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
      setNumberStations(numberStations + 1)
    })
    .catch((error) => {
      alert(error)
    })
  } else {
      alert("Could not add station - please fill out all required fields. ")
        handleAddStation()
  }
    }

    const addCar = () => {
      const d = dayjs()
      const dateTime = d.toISOString()
      console.log(dateTime)
      //axios request for sql to add car
      axios.post(`${BASE_API_URI}/cars`,
      {
        carModelID: 1,
        installDatetime: dateTime,
        statusCode: newCarData.statusCode
      }, 
      {withCredentials:true})
      .then((response) => {
        alert(response)
        console.log(response)
        addCarFirebase(response.data.carID)
        setNumberCars(numberCars + 1)
      })
      .catch((error) => {
        alert(error)
      })

    }

    function addCarFirebase(id) {
      set(ref(db, '/cars/' + id), {
        carID: id,
        lat: 43.20663,
        lng: -77.68602
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
      setNewStationData({
        name: "",
        streetAddress: "",
        city: "",
        county: "",
        state: "",
        country: "",
        zip: "",
        lat: "",
        lng:""
      });
    };

    function deleteStation(id) {
      axios.delete(`${BASE_API_URI}/stations/${id}`, {withCredentials: true})
      .then((response) => {
        alert("This station has been deleted.")
        setNumberStations(numberStations - 1)
      })
      .catch((error) => {
        alert(error)
      })
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

    function deleteCar(id) {
      // delete from sql database
      axios.delete(`${BASE_API_URI}/cars/${id}`, {withCredentials: true})
      .then((response) => {
        alert("Car Number " + id + " was deleted.")
        setNumberCars(numberCars - 1)

        // remove from firebase if successfully removed from SQL
        remove(ref(db, `/cars/${id}`))
      })
      .catch((error) =>  {
        alert("This car could not be deleted yet because it has future reservations associated with it.")
      })
    }

  function getCarLocation(id) {
    for(var i = 0; i < carLocations?.length; i++) {
      if(id === carLocations[i]?.carID) {
        return String(carLocations[i].lat + ", " + carLocations[i].lng)
      }
    }
  }

    return (
      <><div class = "mx-16 my-16">
            <h1 class = "text-section-head">Fleet Management</h1>
            <div class = "flex items-center pt-8">
              <h2 class = "text-subhead pr-4">Stations</h2>
              {user.role === 1 && (
                  <Button 
                  variant = 'outlined' 
                  size = "small" 
                  sx = {{color: "#000180", borderColor: "#000180"}}
                  onClick  = {() => handleAddStation()}
                  >Add Station</Button>
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
                <Button disabled = {!canSubmit} onClick={() => { addStation(); handleClose();}} color="primary">Add Station</Button>
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
                  <Button 
                    variant = "outlined" 
                    size = "small" 
                    onClick = {() => deleteStation(data.stationID)}
                    sx = {{color: "red", borderColor: "red"}}
                    >Delete</Button>
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
                    <MenuItem value = "Good Condition - Rentable">Ready to Rent</MenuItem>
                    <MenuItem value = "In for repair">Out for Service</MenuItem>
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
            
            <Box display="flex" justifyContent="space-between" marginBottom={2} sx={{marginTop: '2em'}}>
            <div style={{ display: 'flex', gap: '20px' }}>
              <TextField 
                  label="Search by ID, or Availability" 
                  value={search} 
                  onChange={handleSearchChange}
                  style={{ width: '225px' }} 
              />
              <FormControl>
                <Select value={orderBy} onChange={handleChangeOrderBy} style={{ width: '190px' }}>
                  <MenuItem value="carID">Sort By Car ID</MenuItem>
                  <MenuItem value="statusCode">Sort By Availability</MenuItem>
                </Select>
              </FormControl>
              <Button variant="outlined" onClick={handleChangeOrder}>
                  {order === 'asc' ? 'Sort Descending' : 'Sort Ascending'}
              </Button>
              </div>
            </Box>

            <TableContainer>
            <Table sx={{   }}>
                <TableHead class = "table-head">
                    <TableRow>
                        <TableCell sx={{fontWeight: "bold", fontSize: "1em"}}>Car ID</TableCell>
                        <TableCell align = "center" sx={{fontWeight: "bold", fontSize: "1em"}}>Availability</TableCell>
                        <TableCell align = "center" sx={{fontWeight: "bold", fontSize: "1em"}}>Service History</TableCell>
                        <TableCell align = "center" sx={{fontWeight: "bold", fontSize: "1em"}}>Current Location</TableCell>
                        <TableCell align = "center" sx={{fontWeight: "bold", fontSize: "1em"}}>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {displayedCars.map((car) => {
                        return (
                            <TableRow key = {car.carID} class = "tr">
                                <TableCell component="th" scope = "row">
                                    {car.carID}
                                </TableCell>
                                <TableCell align = "center">{car.statusCode}</TableCell>
                                <TableCell align = "center"><Button size = "small">Service Log</Button></TableCell>
                                <TableCell align = "center">{getCarLocation(car.carID)}</TableCell>
                                <TableCell align = "center"><Button onClick = {() => deleteCar(car.carID)}><DeleteIcon color="error"/></Button></TableCell>
                            </TableRow>
                        );
                    })}
                  </TableBody>
              </Table>
              </TableContainer>
              <Box display="flex" justifyContent="center" mt={2}>
        <Button onClick={() => handleChangePage(page - 1)} disabled={page === 1}>Previous</Button>
        <Button onClick={() => handleChangePage(page + 1)} disabled={page * limit >= cars.length}>Next</Button>
      </Box>
      </div></>
  
    );
  }
  
  export default FleetManagement;