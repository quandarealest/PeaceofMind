import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { toast } from 'react-toastify'
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AlertDialog(props) {
  const { open, handleClickCloseEmergencyDialog } = props
  const handleCallEmergencyUnit = () => {
    handleClickCloseEmergencyDialog()
    toast.warn('The Emergency Team is on their way!')
  }
  return (
    <Dialog
      open={open}
      onClose={handleClickCloseEmergencyDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        ⚠️ Emergency Help Needed?
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Call Respond Unit by clicking the 'Call Emergency Unit' button. Please remain calm and stay at the position till the team get there.
          </DialogContentText>
      </DialogContent>
      <DialogActions>
        {/* <Button onClick={handleClickCloseEmergencyDialog}>Cancel</Button> */}
        <Button color="error" onClick={handleCallEmergencyUnit} autoFocus>
          Call Emergency Unit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
