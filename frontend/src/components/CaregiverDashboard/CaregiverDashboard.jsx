import React from 'react'
import Grid from '@mui/material/Grid';
import {ListItem} from '@mui/material';
import {ListItemText} from '@mui/material';
import {ListItemAvatar} from '@mui/material';
import ListSubheader from '@mui/material/ListSubheader';

import {Avatar} from '@mui/material';
import {List}from '@mui/material';
import Typography from '@mui/material/Typography';
import ScrollToBottom from 'react-scroll-to-bottom'

  const event = [{
    Location: 'MIT123',
    Resident: {
        FirstName: 'Farjana',
        LastName: 'Rema',
    },
    ScheduleTime: '9:00 AM',
  },

  {
    Location: 'ST104',
    Resident: {
        FirstName: 'Iresha',
        LastName: 'Mudiyasalage',
    },
    ScheduleTime: '9:30 AM',
  },

  {
    Location: 'MIT344',
    Resident: {
        FirstName: 'Quan',
        LastName: 'Bui',
    },
    ScheduleTime: '9:45 AM',
  },

  {
    Location: 'ED101',
    Resident: {
        FirstName: 'Jay',
        LastName: 'Patel',
    },
    ScheduleTime: '10:00 AM',
  },

];

function CaregiverDashboard(props) {

  return (
    <>
      <Grid container spacing={2} align="center">

      <Grid item xs={12}>
            <ScrollToBottom>
                <List 
                  sx={{ width: '100%', minWidth: 360, bgcolor: 'whitesmoke' }}
                  subheader={
                    <ListSubheader component="div" id="todays-scheduled-tasks">
                      Today's Scheduled Task
                    </ListSubheader>}>
                {event.map(eve => (
                    <>
                     <ListItem button divider >
                        <Grid container>                       
                            <Grid item xs={12} spacing={4} container  direction='row' justifyContent="left" >
                                <Grid item xs={2} sm={2} >
                                    <ListItemAvatar>
                                        <Avatar user={eve.Resident} />
                                    </ListItemAvatar> 
                                </Grid>
                                <Grid item xs={9} sm={9} container  direction='column' justifyContent="left" style={{ marginLeft:'10px'}}> 
                                   <Grid item>
                                        <Typography  variant="h7">
                                            {eve.Resident ? eve.Resident.FirstName : 'Anonymous'}
                                            {' '}
                                            {eve.Resident ? eve.Resident.LastName : 'Anonymous'}
                                        </Typography>  
                                   </Grid>
                                   <Grid item>
                                        <ListItemText
                                            secondary={eve.ScheduleTime}
                                            secondaryTypographyProps={{fontSize: '11px'}} 
                                        />
                                   </Grid>
                                </Grid>                              
                            </Grid>                                                   
                         </Grid>

                     <span className={'MuiLabel-amount'}>{eve.Location}</span>
                     </ListItem>
                    </>
                ))}
                </List>
                </ScrollToBottom>
            </Grid>
      </Grid>
    </>
  )

}

export default CaregiverDashboard