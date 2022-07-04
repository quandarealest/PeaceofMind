import React from 'react'
import { styled, useTheme } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import { AppBar, Toolbar, Button, ThemeProvider, Container, Box } from '@mui/material'
import { theme } from '../../theme/CustomizedTheme'
import MailIcon from '@mui/icons-material/Mail'
import NotificationsIcon from '@mui/icons-material/Notifications'
import MoreIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import './Header.css'
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../../features/auth/authSlice'
import { FiSettings } from 'react-icons/fi';
import { BsMessenger,BsBell,BsPersonLinesFill,BsPeopleFill } from "react-icons/bs";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import MessageIcon from '@mui/icons-material/Message';
import SettingsIcon from '@mui/icons-material/Settings';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import Typography from '@mui/material/Typography';
import {isMobile} from 'react-device-detect';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import "./sidebar.css";
// const useStyles = makeStyles({
//   header: {
//     position: "unset"
//   }
// })

function Header() {
  
  // const classes = useStyles()
  const drawerWidth = 300;
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth)
  const [isDrawerOpen, setIsDrawerOpen]= useState(true)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [mobileMoreAnchorE2, setMobileMoreAnchorE2] = React.useState(null);
  const isMobileMenuOpen1=Boolean(mobileMoreAnchorE2);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const handleMobiledrawerClose = () => {
    setIsDrawerOpen(false);
  };
  const handleMobileMenuClose1 = () => {
    setMobileMoreAnchorE2(null);
  };

  const handleMobileMenuOpen1 = (event) => {
    setMobileMoreAnchorE2(event.currentTarget);
  };
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

  const onNavigateLogin = () => {
    navigate('/login')
  }

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem>
        <Button color="inherit">
          My Profile
        </Button>

      </MenuItem>
      <MenuItem>
        <Button color="inherit" onClick={onLogout}>
          Sign Out
        </Button>
      </MenuItem>
    </Menu>
  );
  
  //side bar
  const mobilehamburgerId = 'primary-search-account-hamburger-mobile';
  const renderMobileHamburger = (
     <Menu
      anchorEl={mobileMoreAnchorE2}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      id={mobilehamburgerId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      open={isMobileMenuOpen1}
      onClose={handleMobileMenuClose1}
    >
      <MenuItem>
      <PeopleAltIcon size="large" />
                  Employees       
      </MenuItem>
      <MenuItem>
      <HomeIcon size="large"/>
                 Residents
      </MenuItem>
      <MenuItem>
      <MessageIcon size="large"/>  
                 Messages
      </MenuItem>
      <MenuItem>
      <NotificationsIcon />  
                 Notification
      </MenuItem>
      <MenuItem>
      <SettingsIcon />  
                Setting
      </MenuItem>
    </Menu>
  );
  const Sidebar=(
    <> 
  <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
  <Drawer
    sx={{
      width: drawerWidth,
      flexShrink: 0,
      '& .MuiDrawer-paper': {
        width: drawerWidth,
        boxSizing: 'border-box',
      },
    }}
    variant="persistent"
    anchor="left"
    open={isDrawerOpen}
    onClose={()=>setIsDrawerOpen(false)}
    >
    <Box p={2}  textAlign='center' role='presentation'>
      <Typography variant='h6' component='div'>
      <div className="sidebar">
        <div className="sidebarWrapper">
           <div className="sidebarMenu">

             <div className="sidebarTop">
                <h3 className="sidebarTitle" >Dashboard</h3>
                  <ArrowCircleLeftOutlinedIcon  className="sidebarArrow"
                  onClick={()=>setIsDrawerOpen(false)} />
             </div>

              
              <ul className="sidebarList">
                 <li className="sidebarListItem">
                 <PeopleAltIcon className="sidebarIcon" />
                  Employees
                 </li>
                 <li className="sidebarListItem">
                 <HomeIcon className="sidebarIcon" />
                 Residents
                 </li>
                 <li className="sidebarListItem">
                 <MessageIcon className="sidebarIcon"/>  
                 Messages
                 </li>
                 <li className="sidebarListItem">
                 <NotificationsIcon className="sidebarIcon" />  
                 Notification
                 </li>
                 <li className="sidebarListItem">
                  <SettingsIcon className="sidebarIcon"/> 
                 Settings
                 </li>
              </ul>
           </div>
        </div>   
    </div>
      </Typography>
    </Box>
    </Drawer>
    </Box>
    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                  <IconButton
                    size="large"
                    aria-label="show menu"
                    aria-controls={mobilehamburgerId}
                    aria-haspopup="true"
                    onClick={handleMobileMenuOpen1}
                    color="inherit"
                  >
                  <MenuIcon />
                  </IconButton>
                  {handleMobiledrawerClose}
                  </Box>
                  {renderMobileHamburger}
    </>
  );
  return (
    <div>
      <header className='header'>
        <ThemeProvider theme={theme}>  
          <AppBar color="primary" sx={{ position: "unset" }}>
            <Container maxWidth="xl">        
             <Toolbar>
              {user ?   <>
                 {isMobile? 
                 null  :
                 <> 
                   {Sidebar}
                 </>   
                 }
                 </> : (
                   null
                  )}
                {isDrawerOpen?
                    null:
                      <>
                      {isMobile?
                      null
                      :
                     <Box sx={{  display: { xs: 'none', md: 'flex' } }
                     }
                     >
                      <>
                          <IconButton
                        size='large'
                        edge='start'
                        color='inherit'
                        aria-label='logo'
                        onClick={()=>setIsDrawerOpen(true)}
                        >
                        <MenuIcon/>
                        </IconButton>
                        </>
                     </Box> 
                    }
                       </>
                      } 
  
               <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' } }}>
                      <img src="/images/logo-banner-white.png" />
               </Box> 
                
                {user ? (
                  <>
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                      <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                        <Badge badgeContent={4} color="error">
                          <MailIcon />
                        </Badge>
                      </IconButton>
                      <IconButton
                        size="large"
                        aria-label="show 17 new notifications"
                        color="inherit"
                      >
                        <Badge badgeContent={17} color="error">
                          <NotificationsIcon />
                        </Badge>
                      </IconButton>
                      <Button color="inherit">
                        My Profile
                        </Button>
                      <Button color="inherit" onClick={onLogout}>
                        Sign Out
                        </Button>
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                      <IconButton
                        size="large"
                        aria-label="show more"
                        aria-controls={mobileMenuId}
                        aria-haspopup="true"
                        onClick={handleMobileMenuOpen}
                        color="inherit"
                      >
                        <MoreIcon />
                      </IconButton>
                    </Box>
                    {renderMobileMenu}
                  </>
                ) : (
                    <>
                      <Button color="inherit" onClick={onNavigateLogin}>
                        Login
                      </Button>
                    </>
                  )}
              </Toolbar>
            </Container>
          </AppBar>
         
        </ThemeProvider>
      </header >
    </div >
  )
}

export default Header
