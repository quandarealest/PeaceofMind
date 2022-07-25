import moment from 'moment'
import { useState } from 'react'
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
import PoMAvatar from '../PoMAvatar/PoMAvatar'
import ScrollToBottom from 'react-scroll-to-bottom'

import './Medical.css'


function ResidentInfo(props) {
  const { detail } = props
  const [tab, setTab] = useState('1');

  const onChangeTab = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <>
      {(Object.keys(detail).length !== 0) && (
        <ScrollToBottom className="specialMedical">
          <Box>
            <Grid>
              <Card variant="outlined" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <PoMAvatar sx={{ width: '70px', height: '70px' }} firstName={detail.firstName} lastName={detail.lastName} />
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h5">
                      {detail.firstName}{' '}{detail.lastName}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                      {detail.gender[0].toUpperCase() + detail.gender.substring(1)}, {moment().diff(detail.dob, 'years')} years old
                  </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                      Resident ID: {detail.residentNumber}
                    </Typography>
                  </CardContent>
                </Box>
              </Card>
              <TabContext value={tab} color="default">
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <TabList onChange={onChangeTab} aria-label="Resident Detail Tab">
                    <Tab sx={{ flexGrow: 1 }} icon={<ListAltIcon />} label="Todo" value="1" />
                    <Tab sx={{ flexGrow: 1 }} icon={<MedicalInformationIcon />} label="Medical" value="2" />
                    <Tab sx={{ flexGrow: 1 }} icon={<CommentIcon />} label="Note" value="3" />
                    <Tab sx={{ flexGrow: 1 }} icon={<ViewTimelineIcon />} label="Timeline" value="4" />
                  </TabList>
                </Box>
                <TabPanel sx={{ padding: '24px 0' }} value="1">
                  <Todo />
                </TabPanel>
                <TabPanel sx={{ padding: '24px 0' }} value="2">
                  <Medical basicMedicalRecord={detail.basicMedicalRecord} specialMedicalRecord={detail.specialMedicalRecord} />
                </TabPanel>
                <TabPanel sx={{ padding: '24px 0' }} value="3">
                  <Note />
                </TabPanel>
                <TabPanel sx={{ padding: '24px 0' }} value="4">
                  <Timeline />
                </TabPanel>
              </TabContext>
            </Grid>
          </Box>
        </ScrollToBottom>
      )}
    </>
  )

}

export default ResidentInfo