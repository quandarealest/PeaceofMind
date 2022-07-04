import * as React from 'react';
import { FiSettings } from 'react-icons/fi';
import { BsMessenger,BsBell,BsPersonLinesFill,BsPeopleFill } from "react-icons/bs";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import "./sidebar.css";
export const Sidebar = () => {
  const drawerWidth = 300;
  const [isDrawerOpen, setIsDrawerOpen]= useState(true)
  return (
    <> 
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
    <Box p={2} width='${drawerWidth}px' textAlign='center' role='presentation'>
      <Typography variant='h6' component='div'>
      <div className="sidebar">
        <div className="sidebarWrapper">
           <div className="sidebarMenu">
              <h3 className="sidebarTitle">Dashboard</h3>
              <ArrowCircleLeftOutlinedIcon
               onClick={()=>setIsDrawerOpen(false)} />
              <ul className="sidebarList">
                 <li className="sidebarListItem">
                 <PeopleAltOutlinedIcon className="sidebarIcon" />
                  Employees
                 </li>
                 <li className="sidebarListItem">
                 <HomeOutlinedIcon className="sidebarIcon" />
                 Residents
                 </li>
                 <li className="sidebarListItem">
                 <MessageOutlinedIcon className="sidebarIcon"/>  
                 Messages
                 </li>
                 <li className="sidebarListItem">
                 <BsBell className="sidebarIcon" />  
                 Notification
                 </li>
                 <li className="sidebarListItem">
                  <FiSettings className="sidebarIcon"/> 
                 Settings
                 </li>
              </ul>
           </div>
        </div>
    
    </div>
      </Typography>
    </Box>
    </Drawer>
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
   
  )
}
