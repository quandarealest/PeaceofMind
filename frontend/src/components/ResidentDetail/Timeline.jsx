import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { toast } from 'react-toastify'
import { Stack, TextField, Box } from '@mui/material';
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
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import SendIcon from '@mui/icons-material/Send';
import moment from 'moment'

import { TimelineType } from './ResidentEnum'
import { updateFeed } from '../../features/timeline/timelineSlice'
import Feed from './Feed'
import {
  initiateSocketConnection,
  disconnectSocket,
  socket,
  joinRoom,
  sendFeed
} from '../../socketio.service'

const style2 = {
  marginTop: 1,
  alignItems: 'center'
};

function Timeline(props) {
  const dispatch = useDispatch()
  const { timeline, user } = props
  const [feeds, setFeeds] = useState(timeline.timelineLog)
  const [selectedFile, setSelectedFile] = useState({})
  const [newTimelineValue, setNewTimelineValue] = useState('');
  const [timelineOption, setTimelineOption] = useState(TimelineType[0].value);


  useEffect(() => {
    initiateSocketConnection();
    if (Object.keys(timeline).length !== 0) {
      const { roomId } = timeline
      const { info } = user
      joinRoom({ roomId, senderInfo: { firstName: info.firstName, lastName: info.lastName } })
    }
    return () => {
      disconnectSocket()
    }
  }, [timeline])

  useEffect(() => {
    socket.on('feed', (newFeed) => {
      const { info } = user
      const isSaveDB = true
      setFeeds([...feeds, newFeed])
      dispatch(updateFeed({
        isSaveDB, updatedTimeline: {
          ...timeline,
          timelineLog: newFeed.type === 'txt' ? ([
            ...timeline.timelineLog,
            {
              postedEmployeeId: newFeed.postedEmployeeId,
              firstName: newFeed.firstName,
              lastName: newFeed.lastName,
              type: newFeed.type,
              postedTime: newFeed.postedTime,
              note: newFeed.data
            }
          ]) : ([
            ...timeline.timelineLog,
            {
              postedEmployeeId: newFeed.postedEmployeeId,
              firstName: newFeed.firstName,
              lastName: newFeed.lastName,
              type: newFeed.type,
              postedTime: newFeed.postedTime,
              photo: {
                base64: newFeed.data.value.split(',')[1],
                imageFormat: newFeed.data.value.split(',')[0]
              }
            }
          ])
        }
      }))
    })
  }, [feeds])

  const handleChangeOption = (e) => {
    setTimelineOption(e.target.value);
  };

  const handleUploadImg = (e) => {
    let files = e.target.files;
    let fileReader = new FileReader();
    fileReader.readAsDataURL(files[0]);

    fileReader.onload = (event) => {
      setSelectedFile({
        name: e.target.files[0].name,
        type: e.target.files[0].type,
        value: event.target.result
      })
    }
  }

  const handleSendFeed = (e) => {
    e.preventDefault()
    const isSaveDB = false
    const { info } = user
    const newFeed = {
      roomId: timeline.roomId,
      residentId: timeline.residentId,
      type: timelineOption,
      postedTime: new Date(),
      data: timelineOption === 'txt' ? newTimelineValue : selectedFile,
      postedEmployeeId: user._id,
      firstName: info.firstName,
      lastName: info.lastName
    }
    sendFeed(newFeed, (error) => {
      if (error !== '') {
        toast.error(error)
      } else {
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
        setSelectedFile({})
        setNewTimelineValue('')
        toast.success('Added new timeline')
      }
    })
  }

  return (
    <>
      <Grid container spacing={1} sx={{ justifyContent: 'center' }}>
        <Grid xs={11} container spacing={0.5}>
          <Grid item xs={12}>
            <FormControl size="small" fullWidth>
              <InputLabel id="demo-simple-select-label">Post Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={timelineOption}
                label="Post Type"
                onChange={handleChangeOption}
              >
                {TimelineType.map(opt =>
                  <MenuItem value={opt.value}>{opt.label}</MenuItem>
                )}
              </Select>
            </FormControl>
          </Grid>
          {timelineOption === 'txt' ? (
            <Grid item xs={12}>
              <FormControl fullWidth>
                <TextField
                  id="timeline-text"
                  label="Write something..."
                  multiline
                  rows={2}
                  value={newTimelineValue}
                  onChange={e => setNewTimelineValue(e.target.value)}
                />
              </FormControl>
            </Grid>
          ) : (
              <Grid container sx={style2} >
                <Button component="label" variant="outlined" endIcon={<AddPhotoAlternateIcon />} sx={{ marginLeft: '4px' }}>
                  Upload
                  <input
                    hidden
                    accept="image/*"
                    id="contained-button-file"
                    type="file"
                    onChange={handleUploadImg}
                  />
                </Button>
                {Object.keys(selectedFile).length !== 0 && (
                  <Typography variant="body2">
                    {`${selectedFile.name}`}
                  </Typography>
                )}
              </Grid>
            )}
          <Grid container sx={style2} justifyContent="flex-end">
            <Button
              variant="contained"
              endIcon={<SendIcon />}
              onClick={handleSendFeed}
              disabled={timelineOption === 'txt' ? (newTimelineValue === '') : (Object.keys(selectedFile).length === 0)}
            >
              Share
            </Button>
          </Grid>
        </Grid>
        <Grid xs={12}>
          <Divider variant="middle" >
            <Chip label="Timeline" />
          </Divider>
        </Grid>
        <Grid item xs={12} md={4}>
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
      </Grid>
    </>
  )

}

export default Timeline