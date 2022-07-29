import { useDispatch } from 'react-redux'
import Grid from '@mui/material/Grid';
import { useState, useEffect } from 'react'
import { Box, CircularProgress } from '@mui/material'
import { Stack, TextField } from '@mui/material';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import Button from '@mui/material/Button';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { List } from '@mui/material';
import moment from 'moment'
import ScrollToBottom from 'react-scroll-to-bottom'

import Feed from '../ResidentDetail/Feed'
import {
  initiateSocketConnection,
  disconnectSocket,
  socket,
  joinRoom,
  sendFeed
} from '../../socketio.service'
import { updateFeed } from '../../features/timeline/timelineSlice'


function ResidentFamilyDashboard(props) {
  const dispatch = useDispatch()
  const { user, isLoading, timeline } = props
  const startDate = new Date()
  startDate.setDate(startDate.getDate() - 7)
  const [selectedStartDate, setStartDate] = useState(startDate);
  const [feeds, setFeeds] = useState(timeline.timelineLog)

  useEffect(() => {
    initiateSocketConnection();
    if (Object.keys(timeline).length !== 0) {
      const { roomId } = timeline
      const { info } = user
      joinRoom({ roomId, senderInfo: { firstName: info.firstName, lastName: info.lastName } })

      socket.on('feed', (newFeed) => {
        const { info } = user
        const isSaveDB = true
        setFeeds([newFeed])
        dispatch(updateFeed({
          isSaveDB, updatedTimeline: {
            ...timeline,
            timelineLog: newFeed.type === 'txt' ? ([
              ...timeline.timelineLog,
              {
                postedEmployeeId: user._id,
                firstName: info.firstName,
                lastName: info.lastName,
                type: newFeed.type,
                postedTime: new Date(),
                note: newFeed.data
              }
            ]) : ([
              ...timeline.timelineLog,
              {
                postedEmployeeId: user._id,
                firstName: info.firstName,
                lastName: info.lastName,
                type: newFeed.type,
                postedTime: new Date(),
                photo: {
                  base64: newFeed.data.value.split(',')[1],
                  imageFormat: newFeed.data.value.split(',')[0]
                }
              }
            ])
          }
        }))
      })
    }
    return () => {
      disconnectSocket()
    }
  }, [timeline])


  const handleDateChange = (newDate) => {
    setStartDate(newDate);
  };
  return (
    <Box sx={{ flexGrow: 1, height: 'calc(100vh - 90px - 32px - 32px - 20px - 32px - 32px)' }}>
      {user.role === 'family' ? (
        <>
          {isLoading ? (
            <Box sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
              <CircularProgress sx={{ marginLeft: "5px" }} size={40} thickness={6} />
            </Box>
          ) : (
              Object.keys(timeline).length !== 0 && (
                <Grid container p={1} spacing={2} align="center">
                  <Grid item xs={12} container direction="row" justifyContent="center">
                    <Grid item xs={6}>
                      <LocalizationProvider dateAdapter={AdapterMoment}>
                        <Stack spacing={3}>
                          <DesktopDatePicker
                            label="Date"
                            // inputFormat="dd-MM-yyyy"
                            value={selectedStartDate}
                            onChange={(newDate) => handleDateChange(newDate)}
                            renderInput={(params) => <TextField sx={{ marginRight: '5px' }} size="small" {...params} />}
                          />
                        </Stack>
                      </LocalizationProvider>
                    </Grid >
                    <Grid item xs={4}>
                      <Button variant="contained" startIcon={<AccessTimeIcon />}>
                        Now
                      </Button>
                    </Grid>
                  </Grid >

                  <Grid item xs={12}>
                    <ScrollToBottom mode='top'>
                      <List>
                        {timeline.timelineLog.length !== 0 ? (
                          <>
                            {[...timeline.timelineLog]
                              .sort((left, right) => moment.utc(right.postedTime).diff(moment.utc(left.postedTime)))
                              .map(feed => {
                                return (
                                  <Feed feed={feed} />
                                )
                              })}
                          </>) : (
                            <>
                              No feed, add new and share!
              </>)}
                      </List>
                    </ScrollToBottom>
                  </Grid>
                </Grid >
              ))}
        </>
      ) : (
          <>Please contact your caregiver for more information</>
        )}
    </Box>
  )
}

export default ResidentFamilyDashboard