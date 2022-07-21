import React from 'react'
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { useState } from 'react'
import { Stack, TextField } from '@mui/material';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { ListItem } from '@mui/material';
import { ListItemText } from '@mui/material';
import { ListItemAvatar } from '@mui/material';
import { Avatar } from '@mui/material';
import { List } from '@mui/material';
import Typography from '@mui/material/Typography';
import ScrollToBottom from 'react-scroll-to-bottom'
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

const Task = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
});

const event = [{
    label: 'John had a great session of Cardio today. He does enjoy doing that',
    PostedTime: '2019-03-11T12:34:56.000Z',
    Employee: {
        FirstName: 'Farjana',
    },
    type: true,
},


{
    label: 'https://www.homecareassistancewinnipeg.ca/wp-content/uploads/2022/02/Planning-for-Long-Term-Senior-Home-Care.jpg',
    PostedTime: '2019-06-11T14:34:56.000Z',
    Employee: {
        FirstName: 'Quan',
    },
    type: false
},
{
    label: 'Hello Jennifer, I LOVE YOU...I miss you Queen',
    PostedTime: '2019-04-11T12:34:56.000Z',
    Employee: {
        FirstName: 'Jennifer',
    },
    type: true,
},
{
    label: 'https://homecarehospitalbeds.com/wp-content/uploads/2022/02/What_Is_Assisted_Living-1024x680-1.jpeg',
    PostedTime: '2019-08-11T12:34:56.000Z',
    Employee: {
        FirstName: 'Jenish',
    },
    type: false,
},
{
    label: 'Sunday funday for us. John likes walking in the garden during the sunny day',
    PostedTime: '2019-05-11T11:34:56.000Z',
    Employee: {
        FirstName: 'Iresha',
    },
    type: true,
},
{
    label: 'John likes sleeping alot. He enjoys sleeping fron 2-3pm',
    PostedTime: '2019-07-11T12:34:56.000Z',
    Employee: {
        FirstName: 'JenniferQuan',
    },
    type: true,
},

];

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
}));

const style1 = {
    marginBottom: 2,
};

const style2 = {
    marginTop: 1,
};

function Timeline(props) {

    const [value, setValue] = React.useState('');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <Grid container spacing={1} align="center">
                <Grid xs={12} container spacing={0.5} sx={style1}>
                    <Grid item xs={4} md={2}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Content</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={value}
                                label="Age"
                                onChange={handleChange}
                            >
                                <MenuItem value={10}>Text</MenuItem>
                                <MenuItem value={20}>Photo</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={8} md={4}>
                        <FormControl fullWidth>
                            <TextField
                                id="timeline-text"
                                label="Write Text"
                                multiline
                                rows={4}
                                defaultValue=''
                            />
                        </FormControl>
                    </Grid>
                    <Grid container sx={style2} justifyContent="flex-end">
                        <Button variant="contained" endIcon={<SendIcon />}>
                            Share
            </Button>
                    </Grid>
                </Grid>
                <Divider style={{ width: '100%' }} >
                    <Chip label="Timeline" />
                </Divider>
                <Grid item xs={12}>
                    <ScrollToBottom>
                        <List>
                            {event.map(eve => (
                                <>
                                    <ListItem>
                                        <Item>
                                            <Grid container>
                                                <Grid item xs={12} spacing={4} container direction='row' justifyContent="left" >
                                                    <Grid item xs={1} sm={1} >
                                                        <ListItemAvatar>
                                                            <Avatar user={eve.Employee} />
                                                        </ListItemAvatar>
                                                    </Grid>
                                                    <Grid item xs={10} sm={10} container direction='column' justifyContent="left" style={{ marginLeft: '10px' }}>
                                                        <Grid item>
                                                            <Typography variant="h7">
                                                                {eve.Employee ? eve.Employee.FirstName : 'Anonymous'}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item>
                                                            <ListItemText
                                                                secondary={new Date(eve.PostedTime).toLocaleString()}
                                                                secondaryTypographyProps={{ fontSize: '11px' }}
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={12} justifyContent="center" >
                                                    <>
                                                        <Typography component="h2" variant="h7" fullwidth sx={{ padding: 1.5 }}>
                                                            {eve.label}
                                                        </Typography>
                                                    </>
                                                </Grid>
                                            </Grid>
                                        </Item>
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

export default Timeline