import React from 'react'
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
import SettingsIcon from '@mui/icons-material/Settings';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import Typography from '@mui/material/Typography';
import { isMobile } from 'react-device-detect';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import "./sidebar.css";


function Header() {

  // const classes = useStyles()
  const drawerWidth = 300;
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth)
  const [drawerAnchorEl, setDrawerAnchorEl] = useState(null)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const isDrawerOpen = Boolean(drawerAnchorEl)

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleDrawerMenuClose = () => {
    setDrawerAnchorEl(null)
  }

  const handleDrawerMenuOpen = (event) => {
    setDrawerAnchorEl(event.currentTarget)
  }

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

  //Side bar
  const drawerMenuId = 'primary-drawer-menu';
  const renderSideBar = (
    <>
      <Box sx={{ display: { xs: 'flex', md: 'flex' } }}>
        <Drawer
          sx={{
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant="persistent"
          anchor="left"
          anchorEl={drawerAnchorEl}
          id={drawerMenuId}
          open={isDrawerOpen}
          onClose={handleDrawerMenuClose}
        >
          <Box p={2} textAlign='center' role='presentation'>
            <Typography variant='h6' component='div'>
              <div className="sidebar">
                <div className="sidebarWrapper">
                  <div className="sidebarMenu">
                    <div className="sidebarTop">
                      <h3 className="sidebarTitle">Dashboard</h3>
                      <ArrowCircleLeftOutlinedIcon className="sidebarArrow"
                        onClick={handleDrawerMenuClose} />
                    </div>
                    <ul className="sidebarList">
                      <li className="sidebarListItem">
                        <IconButton size="small" aria-label="show employees" color="inherit">
                          {/* Badge is use for new notification alert */}
                          <Badge>
                            <PeopleAltIcon className="sidebarIcon" />
                          </Badge>
                        </IconButton>
                        <p>Employees</p>
                      </li>
                      <li className="sidebarListItem">
                        <IconButton size="small" aria-label="show residents" color="inherit">
                          {/* Badge is use for new notification alert */}
                          <Badge>
                            <HomeIcon className="sidebarIcon" />
                          </Badge>
                        </IconButton>
                        <p>Residents</p>
                      </li>
                      <li className="sidebarListItem">
                        {/* <MailIcon className="sidebarIcon" />
                        Messages */}
                        <IconButton size="small" aria-label="show 4 new mails" color="inherit">
                          <Badge badgeContent={4} color="error">
                            <MailIcon className="sidebarIcon" />
                          </Badge>
                        </IconButton>
                        <p>Messages</p>
                      </li>
                      <li className="sidebarListItem">
                        <IconButton size="small" aria-label="show 17 new notification" color="inherit">
                          <Badge badgeContent={17} color="error">
                            <NotificationsIcon className="sidebarIcon" />
                          </Badge>
                        </IconButton>
                        <p>Notification</p>
                      </li>
                      <li className="sidebarListItem">
                        <IconButton size="small" aria-label="setting" color="inherit">
                          <Badge>
                            <SettingsIcon className="sidebarIcon" />
                          </Badge>
                        </IconButton>
                        <p>Settings</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </Typography>
          </Box>
        </Drawer>
      </Box>
    </>
  );
  return (
    <div>
      <header className='header'>
        <ThemeProvider theme={theme}>
          <AppBar color="primary" sx={{ position: "unset" }}>
            <Container maxWidth="xl">
              <Toolbar>
                {renderSideBar}
                {isDrawerOpen ?
                  null :
                  <>
                    <Box sx={{ display: { xs: 'flex', md: 'flex' } }}
                    >
                      <>
                        <IconButton
                          size='large'
                          edge='start'
                          color='inherit'
                          aria-label='drawer'
                          onClick={handleDrawerMenuOpen}
                          aria-controls={drawerMenuId}
                        >
                          <MenuIcon />
                        </IconButton>
                      </>
                    </Box>
                  </>
                }

                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' } }}>
                  <img src="/images/logo-banner-white.png" alt="logo" />
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
