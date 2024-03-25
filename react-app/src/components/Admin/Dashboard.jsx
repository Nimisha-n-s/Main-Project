import React from 'react';
import {Box, Grid,Card, CardContent,Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';


const Dashboard = () => {
  return (
    <div style={{padding:"100px"}}>
       <Navbar/>
        <Box component='span'  sx={{ display:'flex', transform: 'scale(0.9)',gap: '100px'}}>
       

<Card sx={{ minWidth: 300 }}>
  <CardContent>
    <Typography sx={{ fontSize: 30 }} color="text.secondary" gutterBottom>
      TOTAL USERS
    </Typography>
    <Typography variant="h5">10</Typography>
  </CardContent>
  <Grid container justifyContent="flex-end" alignItems="center">
    <Grid item><Link to={"/m"}  >
      <PersonIcon sx={{ fontSize: 40, color: '#000' }} /></Link>
    </Grid>
  </Grid>
</Card>

        <Card sx={{ minWidth: 300 }}>
      <CardContent>
        <Typography sx={{ fontSize: 30 }} color="text.secondary" gutterBottom>
          TOTAL PRODUCTS
        </Typography>
        <Typography variant="h5">20</Typography>
       
        </CardContent >
        <Grid container justifyContent="flex-end" alignItems="center">
    <Grid item> <Link to={"/b"} >
    <ProductionQuantityLimitsIcon  sx={{ fontSize: 40 }}  style={{ color: '#000' }}/> </Link>
    </Grid>
  </Grid>
        </Card>
        </Box>
      
      
    </div>
  );
}

export default Dashboard;
