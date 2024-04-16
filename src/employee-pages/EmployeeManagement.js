import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, FormControl,
  InputLabel, Select, MenuItem
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import '../App.css';
import BASE_API_URI from '../config';
import { useAuth } from '../context/AuthContext';

function EmployeeFunction() {
  const [employees, setEmployees] = useState([]);
  const [displayedEmployees, setDisplayedEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [formData, setFormData] = useState({});
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [orderBy, setOrderBy] = useState('employeeID');
  const [order, setOrder] = useState('asc');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteEmployeeId, setDeleteEmployeeId] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(`${BASE_API_URI}/employees`, { withCredentials: true });
      setEmployees(response.data);
      setPage(1);
      applyFilters();
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  useEffect(() => {
    applyFilters();
  }, [employees, page, limit, order, orderBy, search]);

  const applyFilters = () => {
    let filtered = employees.filter(employee =>
      employee.employeeID.includes(search) ||
      employee.firstName.toLowerCase().includes(search.toLowerCase()) ||
      employee.lastName.toLowerCase().includes(search.toLowerCase()) ||
      employee.roleName.toLowerCase().includes(search.toLowerCase()) ||
      employee.employeeStatus.toLowerCase().includes(search.toLowerCase())
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
    setDisplayedEmployees(paginatedItems);
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
    setPage(1); // Reset to first page when sort order changes
  };

  const handleChangeOrder = () => {
    setOrder(order === 'asc' ? 'desc' : 'asc');
    setPage(1); // Reset to first page when order changes
  };

  const handleDialogClose = () => {
    setOpenAdd(false);
    setOpenEdit(false);
    setDeleteDialogOpen(false);
  };

  const handleAddEmployee = () => {
    setOpenAdd(true);
    setFormData({});
    setEditingEmployee(null);
  };

  const handleEditEmployee = employee => {
    setOpenEdit(true);
    setFormData(employee);
    setEditingEmployee(employee);
  };

  const handleDeleteEmployee = async () => {
    try {
      axios.delete(`${BASE_API_URI}/employees/${deleteEmployeeId}`, { withCredentials: true })
      alert("Employee deleted successfully");
      fetchEmployees();
      handleDialogClose();
    } catch (error) {
      console.error('Error deleting employee:', error);
      alert("Failed to delete employee. Check console for details.");
    }
  };

  const handleSubmit = async () => {
    try {
      if (editingEmployee!=null) {
        axios({
          method: 'put',
          url: `${BASE_API_URI}/employees/${formData.employeeID}`,
          data: formData,
          withCredentials: true,
      })
      alert("Employee updated successfully");
      } else {
        axios({
          method: 'post',
          url: `${BASE_API_URI}/employees`,
          data: formData,
          withCredentials: true,
      })
      alert("Employee added successfully");
      } 
      fetchEmployees();
      handleDialogClose();
    } catch (error) {
      console.error('Error adding/editing employee:', error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (user.role === 1) { // admin role
    return (
      <Container className="my-8">
        <h1 class = "text-section-head pb-8">
      Employee Info
      </h1>
      <Box display="flex" justifyContent="space-between" marginBottom={2}>
      <div style={{ display: 'flex', gap: '20px' }}>
          <TextField
            label="Search by Number, Name, Type, or Status"
            value={search}
            onChange={handleSearchChange}
            style={{ width: '350px' }}
          />
          <FormControl style={{ minWidth: 120 }}>
            <InputLabel>Sort By</InputLabel>
            <Select
              value={orderBy}
              onChange={handleChangeOrderBy}
              label="Sort By"
            >
              <MenuItem value="employeeID">Employee Number</MenuItem>
              <MenuItem value="firstName">First Name</MenuItem>
              <MenuItem value="lastName">Last Name</MenuItem>
              <MenuItem value="roleName">Role</MenuItem>
              <MenuItem value="employeeStatus">Status</MenuItem>
            </Select>
          </FormControl>
          <Button variant="outlined" onClick={handleChangeOrder}>
            {order === 'asc' ? 'Sort Ascending' : 'Sort Descending'}
          </Button>
          </div>
          <Button variant="contained" sx = {{backgroundColor: "#000180"}} onClick={handleAddEmployee}>
            Add Employee
          </Button>
        </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead class = "table-head">
              <TableRow>
                <TableCell sx={{fontWeight: "bold", fontSize: "1em"}}>Employee Number</TableCell>
                <TableCell sx={{fontWeight: "bold", fontSize: "1em"}}>Full Name</TableCell>
                <TableCell sx={{fontWeight: "bold", fontSize: "1em"}}>Role</TableCell>
                <TableCell sx={{fontWeight: "bold", fontSize: "1em"}}>Status</TableCell>
                <TableCell sx={{fontWeight: "bold", fontSize: "1em"}}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {displayedEmployees.map((employee) => (
                <TableRow key={employee.employeeID} class = "tr">
                  <TableCell>{employee.employeeID}</TableCell>
                  <TableCell>{`${employee.firstName} ${employee.lastName}`}</TableCell>
                  <TableCell>{employee.roleName}</TableCell>
                  <TableCell>{employee.employeeStatus}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleEditEmployee(employee)}><EditIcon sx={{color: "#000180"}} /></Button>
                    <Button onClick={() => {
                      setDeleteDialogOpen(true);
                      setDeleteEmployeeId(employee.employeeID);
                    }} color="error"><DeleteIcon /></Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box display="flex" justifyContent="center" mt={2}>
          <Button onClick={() => handleChangePage(page - 1)} disabled={page === 1}>Previous</Button>
          <Button onClick={() => handleChangePage(page + 1)} disabled={page * limit >= employees.length}>Next</Button>
        </Box>
        {/* Dialogs for Add/Edit/Delete Employees */}
        {/* Add Dialog */}
        <Dialog open={openAdd} onClose={handleDialogClose}>
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
            <Button onClick={handleDialogClose}>Cancel</Button>
            <Button onClick={() => { handleSubmit(); handleDialogClose(); }} sx={{color: "#000180"}}>Add</Button>
          </DialogActions>
        </Dialog>
        {/* Edit Dialog */}
        <Dialog open={openEdit} onClose={handleDialogClose}>
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
            <Button onClick={handleDialogClose}>Cancel</Button>
            <Button onClick={() => { handleSubmit(); handleDialogClose(); }} sx={{color: "#000180"}}>Update</Button>
          </DialogActions>
        </Dialog>
        {/* Delete Confirmation Dialog */}
        <Dialog open={deleteDialogOpen} onClose={handleDialogClose}>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            <Typography>Are you sure you want to delete this employee?</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose}>Cancel</Button>
            <Button onClick={() => { handleDeleteEmployee(); handleDialogClose(); }} color="error">Delete</Button>
          </DialogActions>
        </Dialog>
      </Container>
    );
  } else if (user.role === 4) { // manager role
    return (
      <Container className="my-8">
        <h1 class = "text-section-head pb-8">
      Employee Info
      </h1>
      <Box display="flex" justifyContent="space-between" marginBottom={2}>
      <div style={{ display: 'flex', gap: '20px' }}>
          <TextField
            label="Search by Number, Name, Type, or Status"
            value={search}
            onChange={handleSearchChange}
            style={{ width: '350px' }}
          />
          <FormControl style={{ minWidth: 120 }}>
            <InputLabel>Sort By</InputLabel>
            <Select
              value={orderBy}
              onChange={handleChangeOrderBy}
              label="Sort By"
            >
              <MenuItem value="employeeID">Employee Number</MenuItem>
              <MenuItem value="firstName">First Name</MenuItem>
              <MenuItem value="lastName">Last Name</MenuItem>
              <MenuItem value="roleName">Role</MenuItem>
              <MenuItem value="employeeStatus">Status</MenuItem>
            </Select>
          </FormControl>
          <Button variant="outlined" onClick={handleChangeOrder}>
            {order === 'asc' ? 'Sort Ascending' : 'Sort Descending'}
          </Button>
          </div>
        </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead class = "table-head">
              <TableRow>
                <TableCell sx={{fontWeight: "bold", fontSize: "1em"}}>Employee Number</TableCell>
                <TableCell sx={{fontWeight: "bold", fontSize: "1em"}}>Full Name</TableCell>
                <TableCell sx={{fontWeight: "bold", fontSize: "1em"}}>Role</TableCell>
                <TableCell sx={{fontWeight: "bold", fontSize: "1em"}}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {displayedEmployees.map((employee) => (
                <TableRow key={employee.employeeID} class = "tr">
                  <TableCell>{employee.employeeID}</TableCell>
                  <TableCell>{`${employee.firstName} ${employee.lastName}`}</TableCell>
                  <TableCell>{employee.roleName}</TableCell>
                  <TableCell>{employee.employeeStatus}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box display="flex" justifyContent="center" mt={2}>
          <Button onClick={() => handleChangePage(page - 1)} disabled={page === 1}>Previous</Button>
          <Button onClick={() => handleChangePage(page + 1)} disabled={page * limit >= employees.length}>Next</Button>
        </Box>
      </Container>
    );
  }
}

export default EmployeeFunction;
