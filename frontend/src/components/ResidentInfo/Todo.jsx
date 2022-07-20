import { Grid, } from '@mui/material'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from '@mui/material/Checkbox';
import LabelIcon from '@mui/icons-material/Label';
import React, { Component } from "react";

function Todo() {

  const [checked, setChecked] = React.useState([1]);
  
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
        newChecked.push(value);
    } else {
        newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <>
      <Box>
        <Grid item xs={12} spacing={4} container  direction='row'>
            <Grid item xs={8} sm={8} >
                <Typography component="div" variant="h6">
                    <TaskAltIcon />Today's Task
                </Typography>
            </Grid>
            <Grid item xs={4} sm={4}> 
                {checked}/4 Completed
            </Grid>                              
        </Grid>
        
        <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {[0, 1, 2, 3].map((value) => {
            const labelId = `checkbox-list-secondary-label-${value}`;
            return (
            <ListItem
                key={value}
                secondaryAction={
                <Checkbox
                    edge="end"
                    onChange={handleToggle(value)}
                    checked={checked.indexOf(value) !== -1}
                    inputProps={{ 'aria-labelledby': labelId }}
                />
                }
                disablePadding
            >
                <ListItemButton>
                <ListItemAvatar>
                    <LabelIcon />
                </ListItemAvatar>
                <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
                </ListItemButton>
            </ListItem>
            );
        })}
        </List>
      </Box> 
    </>
  )

}

export default Todo
