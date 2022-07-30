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
import ListSubheader from '@mui/material/ListSubheader';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';

export default function NewChatDialog(props) {
  const { open, onClose, residents } = props
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [selectedUserId, setSelectedUserId] = React.useState('');

  const handleChange = (e) => {
    e.preventDefault()
    setSelectedUserId(e.target.value);
  };


  const handleClose = () => {
    onClose();
  };

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
            {residents.length !== 0 ? (
              <FormControl sx={{ width: '100%' }}>
                <InputLabel htmlFor="grouped-select">User</InputLabel>
                <Select
                  // value={selectedUserId}
                  defaultValue=""
                  id="grouped-select"
                  label="User"
                  onChange={handleChange}>
                  {residents.map(res => {
                    const { family } = res
                    return (
                      <MenuItem sx={{ display: 'block' }} value={family.userId}>
                        <Typography variant="subtitle2">{`${family.firstName} ${family.lastName}`}</Typography>
                        <Typography variant="body2">{`${res.firstName} ${res.lastName} - ${res.residentNumber}`}</Typography>
                      </MenuItem>
                    )
                  })}

                </Select>
              </FormControl>
            ) : (
                <Typography>
                  Cannot fetch user list
                </Typography>
              )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            Start
          </Button>
        </DialogActions>
      </Dialog>
    </div >
  );
}