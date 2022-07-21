import * as React from 'react'
import { Grid } from '@mui/material'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography';
import Tab from '@mui/material/Tab';
import ListAltIcon from '@mui/icons-material/ListAlt';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import CommentIcon from '@mui/icons-material/Comment';
import ViewTimelineIcon from '@mui/icons-material/ViewTimeline';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Todo from './Todo'
import Medical from './Medical'
import Note from './Note'
import Timeline from './Timeline'

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

const event = [{
  FirstName: 'Quan',
  LastName: 'Bui',
  Gender: 'Female',
  Age: '50',
}];

function ResidentInfo(props) {

  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box>
        <Grid>
          {event.map(eve => (
            <Card variant="outlined" sx={{ display: 'flex' }}>
              <CardMedia
                component="img"
                sx={{ width: 100, height: 100 }}
                image="http://www.goodmorningimagesdownload.com/wp-content/uploads/2021/07/love-Latest-Beautiful-Simple-Whatsapp-Dp-Profile-Images-photo-300x300.gif"
                alt="Profile Picture"
              />
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                  <Typography component="div" variant="h5">
                    {eve.FirstName}{' '}{eve.LastName}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    {eve.Gender}, {eve.Age} years old
              </Typography>
                </CardContent>
              </Box>
            </Card>
          ))}
          <TabContext value={value} color="default">
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab icon={<ListAltIcon />} label="Todo" value="1" />
                <Tab icon={<MedicalInformationIcon />} label="Medical" value="2" />
                <Tab icon={<CommentIcon />} label="Note" value="3" />
                <Tab icon={<ViewTimelineIcon />} label="Timeline" value="4" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <Todo />
            </TabPanel>
            <TabPanel value="2">
              <Medical />
            </TabPanel>
            <TabPanel value="3">
              <Note />
            </TabPanel>
            <TabPanel value="4">
              <Timeline />
            </TabPanel>
          </TabContext>
        </Grid>
      </Box>
    </>
  )

}

export default ResidentInfo