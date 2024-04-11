import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import '../App.css';
import BASE_API_URI from '../config';

function EmployeeFunction() {
  //State hooks for managing component state
  const [employees, setEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [formData, setFormData] = useState({});
  const [orderBy, setOrderBy] = useState('employeeID');
  const [order, setOrder] = useState('asc');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteEmployeeId, setDeleteEmployeeId] = useState(null);

  //Effect hook to fetch employees data when page, orderBy, order, limit, or search changes
  useEffect(() => {
    fetchEmployees();
  }, [page, orderBy, order, limit, search]);

  //Function to fetch employees data from server
  const fetchEmployees = async () => {
    try {
      const response = await axios.get(`${BASE_API_URI}/employees?page=${page}&search=${search}&limit=${limit}&orderBy=${orderBy}&order=${order}`, { withCredentials: true });
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  //Function to handle delete action
  const handleDelete = async (employeeID) => {
    setDeleteDialogOpen(true);
    setDeleteEmployeeId(employeeID);
  };

  //Function to confirm delete action
  const confirmDelete = async () => {
    try {
      await axios.delete(`${BASE_API_URI}/employees/${deleteEmployeeId}`, { withCredentials: true });
      fetchEmployees();
      setDeleteDialogOpen(false);
      setDeleteEmployeeId(null);
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  //Function to confirm delete action
  const handleAdd = () => {
    setOpenAdd(true);
    setFormData({});
    setEditingEmployee(null);
  };

  //Function to handle edit action
  const handleEdit = (employee) => {
    setFormData({ ...employee });
    setEditingEmployee(employee);
    setOpenEdit(true);
  };

  //Function to handle close action for dialogs
  const handleClose = () => {
    setOpenEdit(false);
    setOpenAdd(false);
    setDeleteDialogOpen(false);
  };

  //Function to handle form input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  //Function to handle form submission
  const handleSubmit = async () => {
    try {
      if (editingEmployee!=null) {
        axios({
          method: 'put',
          url: `${BASE_API_URI}/employees/${formData.employeeID}`,
          data: formData,
          withCredentials: true,
      })
      } else {
        axios({
          method: 'post',
          url: `${BASE_API_URI}/employees`,
          data: formData,
          withCredentials: true,
      })
      } 
      fetchEmployees();
      handleClose();
    } catch (error) {
      console.error('Error adding/editing employee:', error);
    }
  };

  //Function to change order (ascending or descending)
  const handleChangeOrder = () => {
    setOrder(order === 'asc' ? 'desc' : 'asc');
  };

  //Function to change order by field
  const handleChangeOrderBy = (newOrderBy) => {
    setOrderBy(newOrderBy);
  };

  //Function to change current page
  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  //Function to handle search input change
  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  //JSX rendering
  return (
    <Container className="my-8">
      {/* Title */}
      <Typography variant="h4" align="left" gutterBottom class="table-title">
      Employee Info
      </Typography>
      {/* Search and Sort options */}
      <Box display="flex" justifyContent="space-between" marginBottom={2}>
      <div className="flex space-x-4">
        {/* Search input */}
        <TextField
          label="Search"
          value={search}
          onChange={handleChangeSearch}
        />
        {/* Sort By dropdown */}
        <FormControl>
          <InputLabel>Sort By</InputLabel>
          <Select
            label="Sort By"
            value={orderBy}
            onChange={(e) => handleChangeOrderBy(e.target.value)}
          >
            <MenuItem value="employeeID">Employee Number</MenuItem>
            <MenuItem value="firstName">First Name</MenuItem>
            <MenuItem value="lastName">Last Name</MenuItem>
            <MenuItem value="roleName">Employee Type</MenuItem>
            <MenuItem value="employeeStatus">Employee Status</MenuItem>
          </Select>
        </FormControl>
        {/* Order button */}
        <Button onClick={handleChangeOrder} class = "add-emp">
          {order === 'asc' ? 'Ascending' : 'Descending'} 
        </Button>
        </div>
        {/* Add Employee button */}
        <Button variant="contained" onClick={() => handleAdd()} class = "add-emp">
          Add Employee
        </Button>
      </Box> 
      {/* Delete confirmation dialog */}     
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography variant="body1">Are you sure you want to delete this employee?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={() => { confirmDelete(); handleClose();}} color="error">Delete</Button>
        </DialogActions>
      </Dialog>
      {/* Table displaying employee data */}
      <TableContainer component={Paper} className="my-5">
        <Table>
          <TableHead class = "table-head">
            <TableRow>
              <TableCell>Employee Number</TableCell>
              <TableCell>Full Name</TableCell>
              <TableCell>Employee Type</TableCell>
              <TableCell>Employee Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Mapping through employees to display each row */}
            {employees.map((employee) => (
              <TableRow key={employee.employeeID} class = "tr">
                <TableCell>{employee.employeeID}</TableCell>
                <TableCell>{`${employee.firstName} ${employee.lastName}`}</TableCell>
                <TableCell>{employee.roleName}</TableCell>
                <TableCell>{employee.employeeStatus}</TableCell>
                <TableCell>
                  {/* Edit button */}
                  <Button onClick={() => handleEdit(employee)}><EditIcon sx={{color: "#000180"}} /></Button>
                  {/* Delete button */}
                  <Button onClick={() => handleDelete(employee.employeeID)}><DeleteIcon color="error" /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>          
        </Table>        
      </TableContainer>
      <Dialog open={openAdd} onClose={handleClose}>
        {/* Dialog for adding a new employee */}
        <DialogTitle>Add Employee</DialogTitle>
        <DialogContent>
          {/* Input fields for employee details */}
          <TextField autoFocus margin="dense" name="add_employeeID" label="Employee Number" fullWidth value={formData.add_employeeID || ''} onChange={handleChange} required />
          <TextField margin="dense" name="add_employee_firstName" label="First Name" fullWidth value={formData.add_employee_firstName || ''} onChange={handleChange} required/>
          <TextField margin="dense" name="add_employee_lastName" label="Last Name" fullWidth value={formData.add_employee_lastName || ''} onChange={handleChange} required />
          <TextField margin="dense" name="add_employee_mi" label="Middle Initial" fullWidth value={formData.add_employee_mi || ''} onChange={handleChange} />
          <TextField margin="dense" name="add_employee_suffix" label="Suffix" fullWidth value={formData.add_employee_suffix || ''} onChange={handleChange} />
          <TextField margin="dense" name="add_employee_title" label="Title" fullWidth value={formData.add_employee_title || ''} onChange={handleChange} required />          
          <TextField margin="dense" name="add_employee_emailAddress" label="Email Address" fullWidth value={formData.add_employee_emailAddress || ''} onChange={handleChange} required />
          <TextField margin="dense" name="add_employee_password" label="Password" fullWidth value={formData.add_employee_password || ''} onChange={handleChange} required/>
          <TextField margin="dense" name="add_employee_roleID" label="RoleID (1-Admin 2-Customer Service 3-Mechanic 4-Manager)" fullWidth value={formData.add_employee_roleID || ''} onChange={handleChange} required/>
          <TextField margin="dense" name="add_employee_status" label="Status (Active / Terminated) " fullWidth value={formData.add_employee_status || ''} onChange={handleChange} />
        </DialogContent>
        <DialogActions>
          {/* Buttons for canceling or adding the employee */}
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => { handleSubmit(); handleClose();}} color="primary">Add</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openEdit} onClose={handleClose}>
        {/* Dialog for editing an employee */}
        <DialogTitle>Edit Employee</DialogTitle>
        <DialogContent>
          {/* Input fields for employee details */}
          <TextField autoFocus margin="dense" name="employeeID" label="Employee Number" fullWidth value={formData.employeeID || ''} onChange={handleChange} />
          <TextField margin="dense" name="firstName" label="First Name" fullWidth value={formData.firstName || ''} onChange={handleChange} />
          <TextField margin="dense" name="lastName" label="Last Name" fullWidth value={formData.lastName || ''} onChange={handleChange} />
          <TextField margin="dense" name="middleInitial" label="Middle Initial" fullWidth value={formData.middleInitial || ''} onChange={handleChange} />
          <TextField margin="dense" name="suffix" label="Suffix" fullWidth value={formData.suffix || ''} onChange={handleChange} />
          <TextField margin="dense" name="title" label="Title" fullWidth value={formData.title || ''} onChange={handleChange} />          
          <TextField margin="dense" name="emailAddress" label="Email Address" fullWidth value={formData.emailAddress || ''} onChange={handleChange}/>
          <TextField margin="dense" name="employee_password" label="Password" fullWidth value={formData.employee_password || ''} onChange={handleChange} />
          <TextField margin="dense" name="roleID" label="RoleID (1-Admin 2-Customer Service 3-Mechanic 4-Manager)" fullWidth value={formData.roleID || ''} onChange={handleChange} />
          <TextField margin="dense" name="employeeStatus" label="Status (Active / Terminated) " fullWidth value={formData.employeeStatus || ''} onChange={handleChange} />
        </DialogContent>
        <DialogActions>
          {/* Buttons for canceling or editing the employee */}
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => { handleSubmit(); handleClose();}} color="primary">Update</Button>
        </DialogActions>
      </Dialog>
      {/* Button for navigating to the previous page */}
      <Button onClick={() => handleChangePage(page - 1)} class ="button-paginate-prev">Previous</Button>
      {/* Button for navigating to the next page */}
      <Button onClick={() => handleChangePage(page + 1)} class ="button-paginate-next">Next</Button>
    </Container>    
  );
}

export default EmployeeFunction;


