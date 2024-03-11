import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import { TabList } from '@mui/lab';
import TabContext from '@mui/lab/TabContext';
import {TabPanel} from '@mui/lab';
import ApprovalRequests from '../employee-components/ApprovalRequests';
import MembersInfo from '../employee-components/MembersInfo'
import CustomerInquiries from '../employee-components/CustomerInquiries'


function CustomerServiceFunctions() {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    return (
      <><div className="Homepage">
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="lab API tabs example">
                    <Tab label="Approval Requests" value="1" />
                    <Tab label="Customer Inquiries" value="2" />
                    <Tab label="Members Info" value="3" />
                </TabList>
                </Box>
                <TabPanel value="1"><ApprovalRequests/></TabPanel>
                <TabPanel value="2"><CustomerInquiries/></TabPanel>
                <TabPanel value="3"><MembersInfo/></TabPanel>
            </TabContext>
        </Box>
      </div></>
  
    );
  }
  
  export default CustomerServiceFunctions;