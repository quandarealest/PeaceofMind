import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import { useDispatch } from 'react-redux'

import { createNewChat } from '../../features/conversation/conversationSlice'
import { generateRandomId } from '../../common/NormalizingData'

export default function NewChatDialog(props) {
  const theme = useTheme();
  const dispatch = useDispatch()
  const { open, onClose, residents, user, chatList } = props
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [selectedUserId, setSelectedUserId] = React.useState('');

  const handleChange = (e) => {
    e.preventDefault()
    setSelectedUserId(e.target.value);
  };

  const handleStartNewChat = (e) => {
    e.preventDefault()
    let roomId = generateRandomId()
    if (chatList.find(chat => chat.roomId === roomId)) {
      while (chatList.find(chat => chat.roomId === roomId)) {
        roomId = generateRandomId()
      }
    }
    if (user.role === 'supervisor') {
      const conversationData = {
        familyMemberId: selectedUserId,
        supervisorId: user._id,
        roomId: roomId.toString()
      }

      dispatch(createNewChat({ conversationData, token: user.token })).then(() => {
        onClose()
      })
    }
    if (user.role === 'family') {
      const conversationData = {
        supervisorId: selectedUserId,
        familyMemberId: user._id,
        roomId: roomId.toString()
      }

      dispatch(createNewChat({ conversationData, token: user.token })).then(() => {
        onClose()
      })

    }
  }

  const handleClose = () => {
    onClose();
  };

  const renderResidentOption = () => {
    const { supervisor } = newFamilyChatOption
    return (
      <MenuItem sx={{ display: 'block' }} value={supervisor.userId}>
        <Typography variant="subtitle2">{`${supervisor.firstName} ${supervisor.lastName}`}</Typography>
      </MenuItem>
    )
  }

  const newSupervisorChatOption = residents.filter(res => {
    if (chatList.find(chat => chat.familyMemberId === res.familyMemberId)) {
      return false
    }
    return true
  })

  let newFamilyChatOption = residents.find(res => res.familyMemberId === user._id) || {}
  if (Object.keys(newFamilyChatOption).length !== 0) {
    newFamilyChatOption = chatList.find(chat => chat.familyMemberId === newFamilyChatOption.familyMemberId) ? {} : newFamilyChatOption
  }

  return (
    <div>
      <Dialog
        // fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          Start a new conversation
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {(user.role === 'supervisor' && newSupervisorChatOption.length !== 0) || (user.role === 'family' && Object.keys(newFamilyChatOption).length !== 0) ? (
              <FormControl sx={{ width: '100%' }}>
                <InputLabel htmlFor="grouped-select">User</InputLabel>
                <Select
                  defaultValue=""
                  id="grouped-select"
                  label="User"
                  onChange={handleChange}>
                  {user.role === 'supervisor' && (
                    newSupervisorChatOption.map(res => {
                      const { family } = res
                      return (
                        <MenuItem sx={{ display: 'block' }} value={family.userId}>
                          <Typography variant="subtitle2">{`${family.firstName} ${family.lastName}`}</Typography>
                          <Typography variant="body2">{`${res.firstName} ${res.lastName} - ${res.residentNumber}`}</Typography>
                        </MenuItem>
                      )
                    })
                  )}
                  {user.role === 'family' && (renderResidentOption())}

                </Select>
              </FormControl>
            ) : (
                <Typography>
                  Currently no one new to create new chat
                </Typography>
              )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button disabled={selectedUserId === ''} onClick={handleStartNewChat}>
            Start
          </Button>
        </DialogActions>
      </Dialog>
    </div >
  );
}