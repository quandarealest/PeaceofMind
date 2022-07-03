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
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../../features/auth/authSlice'

// const useStyles = makeStyles({
//   header: {
//     position: "unset"
//   }
// })

function Header() {
  // const classes = useStyles()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

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

  return (
    <div>
      <header className='header'>
        <ThemeProvider theme={theme}>
          <AppBar color="primary" sx={{ position: "unset" }}>
            <Container maxWidth="xl">
              <Toolbar>
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
