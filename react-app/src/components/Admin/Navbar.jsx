import { AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { useState } from 'react';
import { Menu as MenuIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import LogoutIcon from '@mui/icons-material/Logout';



const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  }; 
  const logout = () => {
    window.localStorage.clear();
    window.location.href = '/l';
  };

  return (
    <div>
      <AppBar style={{ background: "#fff" }}>
        <Toolbar>
          <MenuIcon onClick={toggleDrawer} style={{ cursor: 'pointer', color: '#000' }} />
          <Typography  variant="h6"align='left' sx={{ flexGrow: 1,color: '#002f34',fontWeight: 'bold' }}>FROM YOU</Typography>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer} >
        <List>
        
          <ListItem component={Link} to="/adashboard">    
              <DashboardIcon sx={{ marginRight: '10px' }} />
            <ListItemText primary="Dashboard" />
          </ListItem>
        
          <ListItem component={Link} to="/u"> <PersonIcon sx={{ marginRight: '10px' }} />
            <ListItemText primary="Users" />
          </ListItem>
          <ListItem component={Link} to="/p"><ProductionQuantityLimitsIcon  sx={{ marginRight: '10px' }} />
            <ListItemText primary="Products" />
          </ListItem>
          <ListItem  ><LogoutIcon sx={{ marginRight: '10px' }} />
            <ListItemText   onClick={logout} primary="Logout" />
          </ListItem>
         
        </List>
      </Drawer>
    </div>
  );
}

export default Navbar;
