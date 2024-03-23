import React from 'react';
import CreateAccount from './CreateAccount';
import { Container, Grid, Typography } from '@mui/material';

const Layout = ({ children }) => {
    return (
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h2" align="center">
              
            </Typography>
          </Grid>
          {children}
          {/* Add CreateAccount section */}
          <CreateAccount />
        </Grid>
      </Container>
    );
  };
  

export default Layout;
