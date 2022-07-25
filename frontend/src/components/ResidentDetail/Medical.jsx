import * as React from 'react';
import { Grid, } from '@mui/material'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ListItem from '@mui/material/ListItem';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import { weightConverter, heightConverter } from '../../common/NormalizingData'

const style1 = {
  marginBottom: 2,
};

const style2 = {
  marginTop: 1,
};

function Medical(props) {
  const { basicMedicalRecord, specialMedicalRecord } = props

  const [openDropdown, setOpenDropdown] = React.useState([]);

  const handleOpenDropdown = (dropdownValue) => {
    if (openDropdown.find(element => element === dropdownValue)) {
      setOpenDropdown([
        openDropdown.filter(element => element !== dropdownValue)
      ])
    } else {
      setOpenDropdown([
        ...openDropdown,
        dropdownValue
      ])
    }
  };

  return (

    <>
      <Box component="form" noValidate autoComplete="off">
        <Grid sx={style1} container spacing={2}>
          <Grid item xs={6} md={4}>
            <Typography component="h6" variant="button" fullWidth>
              {basicMedicalRecord === null ? (
                <>
                  Height: N/A
                </>
              ) : (
                  <>
                    Height: {basicMedicalRecord.height} cm ({heightConverter(parseInt(basicMedicalRecord.height), 'cm', 'feet')} ft)
                </>
                )}
            </Typography>
          </Grid>
          <Grid item xs={6} md={4}>
            <Typography component="h6" variant="button" fullWidth>
              {basicMedicalRecord === null ? (
                <>
                  Weight: N/A
                </>
              ) : (
                  <>
                    Weight: {basicMedicalRecord.weight} kg ({weightConverter(parseInt(basicMedicalRecord.weight), 'kg', 'lbs')} lbs)
                </>
                )}
            </Typography>
          </Grid>
          <Grid item xs={6} md={4}>
            <Typography component="h6" variant="button" fullWidth>
              {basicMedicalRecord === null ? (
                <>
                  Blood Group: N/A
                </>
              ) : (
                  <>
                    Blood Group: {basicMedicalRecord.bloodGroup}
                  </>
                )}
            </Typography>
          </Grid>
        </Grid>
        <Divider light />
        <List
          sx={{ width: '100%', bgcolor: 'background.paper' }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              Medical Records
            </ListSubheader>
          }
        >
          {Object.keys(specialMedicalRecord).length !== 0 ? (
            <>
              {specialMedicalRecord.medicals.map(rec => {
                const { recordType, records } = rec
                return (
                  <>
                    <ListItemButton onClick={() => handleOpenDropdown(recordType)}>
                      <ListItemIcon>
                        <MedicalServicesIcon />
                      </ListItemIcon>
                      <ListItemText primary={recordType} />
                      {openDropdown.find(el => el === recordType) ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={openDropdown.find(el => el === recordType)} timeout="auto" unmountOnExit>
                      {records.map(el => (
                        <ListItem alignItems="flex-start">
                          <ListItemText
                            primary={el.recordTitle}
                            secondary={
                              <React.Fragment>
                                <Typography
                                  sx={{ display: 'inline' }}
                                  component="span"
                                  variant="body2"
                                  color="text.primary"
                                >
                                  {el.recordDescription}
                                </Typography>
                                {/* {" — Wish I could come, but I'm out of town this…"} */}
                              </React.Fragment>
                            }
                          />
                        </ListItem>
                      ))}
                    </Collapse>
                  </>
                )
              })}
            </>
          ) : (
              <Typography>
                No Medical Records
              </Typography>
            )}
        </List>
      </Box>
    </>
  )

}

export default Medical
