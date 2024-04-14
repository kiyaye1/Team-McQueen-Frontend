import BASE_API_URI from "../../config";
import axios from 'axios'
import { useEffect } from "react";
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody} from "@mui/material"

function CustomerInquiries() {

    useEffect(() => {
      console.log("use Effect")
      axios.get(`${BASE_API_URI}/contacts/getCustomerContacts`, {useCredentials: true})
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.log(error)
      })
    }, [])

    const data = [
      {
        type: "General Feedback",
        ticketNumber: 1242,
        createdDatetime: "Sept 4th, 2023",
        status: 1,
        description: "Customer service description. I need help reserving a car, the website is unclear."
      },
      {
        type: "General Feedback",
        ticketNumber: 1242,
        createdDatetime: "Sept 4th, 2023",
        status: 1,
        description: "Customer service description. I need help reserving a car, the website is unclear."
      },
      {
        type: "General Feedback",
        ticketNumber: 1242,
        createdDatetime: "Sept 4th, 2023",
        status: 1,
        description: "Customer service description. I need help reserving a car, the website is unclear."
      }
    ]

    return (

      <><div class = "mx-16">
      <h1 class = "text-subhead">New Inquiries</h1>
      <TableContainer component = {Paper}  class = "my-4">
          <Table sx={{   }}>
              <TableHead class = "table-head">
                  <TableRow>
                      <TableCell align = "left">Reason</TableCell>
                      <TableCell align = "left">Ticket Number</TableCell>
                      <TableCell align = "left">Date Created</TableCell>
                      <TableCell align = "left">Status</TableCell>
                  </TableRow>
              </TableHead>
              <TableBody>
                  {data.map((row) => {
                      return (
                          <TableRow key = {row.ticketNumber}>
                              <TableCell align = "left" component="th" scope = "row">
                                  {row.type}
                              </TableCell>
                              <TableCell align = "left">{row.ticketNumber}</TableCell>
                              <TableCell align = "left">{row.createdDatetime}</TableCell>
                              <TableCell align = "left">{row.status}</TableCell>
                          </TableRow>
                    );
                  })}
              </TableBody>
          </Table>
      </TableContainer>

      </div></>

  
    );
  }
  
  export default CustomerInquiries;