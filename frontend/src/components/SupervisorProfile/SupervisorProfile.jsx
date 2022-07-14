import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Tab from '@mui/material/Tab';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import Button from '@mui/material/Button';


const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

const defaultAboutValues = {
    FirstName: "Farjana Bintay",
    LastName: "Kamal",
    ContactNumber: "+18073575092",
};
const defaultAccountInfoValues={
    UserName:"Farjana Rema",
    Email:"farjanarema13@gmail.com",
    Password:"12345",
}

function SupervisorProfile() {
  // For tab
  const [value, setValue] = React.useState('1');

  //For tab panel
  const [AboutformValues, setAboutFormValues] = useState(defaultAboutValues);
  const [AccountInfoformValues, setAccountInfoFormValues] = useState(defaultAccountInfoValues);
  const [btnDisabled, setBtnDisabled] = useState(true)

 //For mobile view
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
// user about
  const handleAboutInputChange = (e) => {
    const { name, value } = e.target;
    setAboutFormValues({
      ...AboutformValues,
      [name]: value,
    });
    setBtnDisabled(false);
    
  };
  const handleAboutSave = (event) => {
    event.preventDefault();
    console.log(AboutformValues);
  };
//user account info
  const handleAccountInfoInputChange = (e) => {
    const { name, value } = e.target;
    setAccountInfoFormValues({
      ...AccountInfoformValues,
      [name]: value,
    });
    setBtnDisabled(false);
    
  };
  const handleAccountInfoChange = (event) => {
    event.preventDefault();
    console.log(AccountInfoformValues);
  };
const mobileMenuId = 'user=profile-avatar';
const renderMobileMenu = (
  
    <Grid 
    anchorEl={mobileMoreAnchorEl}
    id={mobileMenuId}
    open={isMobileMenuOpen}
    onClose={handleMobileMenuClose}
    >
            <ButtonBase sx={{ width: 200, height:200 ,alignItems:'center'}}> 
                        <Img sx={{ width: 100, height:100 ,alignItems:'center'}} alt="profile" src="https://i.pinimg.com/474x/ae/ac/b9/aeacb924abc3e17e184d6d5d7f82dda0.jpg" />
                    </ButtonBase>    
    </Grid>
    
);
   return(
       <>
         <Box sx={{ flexGrow: 1 }}>
            <Paper
                sx={{
                    p:4,
                    margin: 'auto',
                    maxWidth: '1500',
                    maxHeight: '1000',
                    flexGrow: 1, }}
            >
               <Grid container spacing={2}>
               
                    <Grid item >
                        <ButtonBase sx={{ width: 300, height:300 }}> 
                            <Img sx={{ width: 300, height:300 }} alt="profile" src="https://i.pinimg.com/474x/ae/ac/b9/aeacb924abc3e17e184d6d5d7f82dda0.jpg" />
                        </ButtonBase>    
                    </Grid>

                    <Grid item xs={9} container direction="row" spacing={2}> 
                            <Grid item>                          
                            <Typography component="h4" variant="h6">    
                            Farjana Rema
                            </Typography>
                            <Typography component="h4" variant="h8">    
                            Employee ID: 100206108
                            </Typography>                           
                            </Grid>   

                            <Grid item >
                                <Grid item xs={12} >
                                        <TabContext value={value}>
                                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                                                        <Tab label="About" value="1" />
                                                        <Tab label="Account Info" value="2" />
                                                    </TabList>
                                                </Box>
                                                
                                                <TabPanel value="1">
                                                    <form onSubmit={handleAboutSave}> 
                                                            <Grid item container spacing={4}>
                                                                <Grid item xs ={6}>
                                                                    <Typography component="h4" variant="h8" padding={1}>    
                                                                    First Name
                                                                    </Typography>    
                                                                <TextField
                                                                        id="firstName-input"
                                                                        name="FirstName"
                                                                        type="text"
                                                                        value={AboutformValues.FirstName}
                                                                        onChange={handleAboutInputChange}
                                                                        fullWidth
                                                                    />
                                                                </Grid>
                                                                <Grid item xs ={6}>
                                                                    <Typography component="h4" variant="h8" padding={1}>    
                                                                    Last Name
                                                                    </Typography> 
                                                                    <TextField
                                                                        id="LastName-input"
                                                                        name="LastName"
                                                                        type="text"
                                                                        value={AboutformValues.LastName}
                                                                    onChange={handleAboutInputChange}
                                                                    fullWidth
                                                                    />
                                                                    </Grid>
                                                                    <Grid item xs={6}>
                                                                    <Typography component="h4" variant="h8" padding={1}>    
                                                                    Contact number
                                                                    </Typography> 
                                                                    <TextField
                                                                        id="ContactNumber-input"
                                                                        name="ContactNumber"
                                                                    
                                                                        type="text"
                                                                    value={AboutformValues.ContactNumber}
                                                                    onChange={handleAboutInputChange}
                                                                    fullWidth
                                                                    />
                                                                    </Grid>
                                                                    <Grid item xs={12}>
                                                                    <Button variant="contained" color="primary" type='submit' disabled={btnDisabled} fullWidth>
                                                                        Save
                                                                    </Button> 
                                                                    </Grid>
                                                                    
                                                            </Grid>
                                                    </form> 

                                                </TabPanel>
                                                <TabPanel value="2">
                                                    <form onSubmit={handleAccountInfoChange}> 
                                                    <Grid item container spacing={4}>
                                                            <Grid item  xs={6}>
                                                                    <Typography component="h4" variant="h8" padding={1}>    
                                                                    User Name
                                                                    </Typography> 
                                                                    <TextField
                                                                        id="UserName-input"
                                                                        name="UserName"
                                                                        type="text"
                                                                        value={AccountInfoformValues.UserName}
                                                                        onChange={handleAccountInfoInputChange}
                                                                        disabled
                                                                        fullWidth
                                                                    />
                                                                    </Grid>
                                                                    <Grid item xs={6}>
                                                                    <Typography component="h4" variant="h8" padding={1}>    
                                                                    Email
                                                                    </Typography> 
                                                                    <TextField
                                                                        id="email-input"
                                                                        name="Email"
                                                                        type="text"
                                                                        value={AccountInfoformValues.Email}
                                                                        onChange={handleAccountInfoInputChange}
                                                                        fullWidth
                                                                    />
                                                                    </Grid>
                                                                    <Grid item xs={6}>
                                                                    <Typography component="h4" variant="h8" padding={1}>    
                                                                    Password
                                                                    </Typography> 
                                                                    <TextField
                                                                        id="Password-input"
                                                                        name="Password"
                                                                        type="password"
                                                                        value={AccountInfoformValues.Password}
                                                                        onChange={handleAccountInfoChange}
                                                                        fullWidth
                                                                    />
                                                                    </Grid>
                                                                    
                                                                    <Grid item xs={12}>
                                                                    <Button variant="contained" color="primary" type='submit' disabled={btnDisabled} fullWidth>
                                                                        Save
                                                                    </Button> 
                                                                    </Grid>
                                                            </Grid>
                                                    </form>  
                                                </TabPanel>
                                            
                                        </TabContext> 
                                </Grid>
                               
                            
                            </Grid>   
                                            
                   </Grid>            
                </Grid>
            </Paper>
         </Box>
       </>
    )
 
}

export default SupervisorProfile