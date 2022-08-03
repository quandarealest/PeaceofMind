import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import {
  FormControl,
  Typography,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  ListItem,
  ListItemText,
  Divider
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function MedicalInformation(props) {
  const { createdMedical, handleChangeBasicMedicalValue, handleAddMedicalRecord } = props
  const { basicMedicalRecord, specialMedicalRecord } = createdMedical
  const { diet, allergy, medication } = specialMedicalRecord
  const [dietRecord, setDietRecord] = useState({
    recordTitle: '',
    recordDescription: ''
  })
  const [allergyRecord, setAllergyRecord] = useState({
    recordTitle: '',
    recordDescription: ''
  })
  const [medicationRecord, setMedicationRecord] = useState({
    recordTitle: '',
    recordDescription: ''
  })

  const handleAddNewSpecialMedical = (e, type) => {
    e.preventDefault()
    if (type === 'medication') {
      handleAddMedicalRecord(medicationRecord, type)
      setMedicationRecord({
        recordTitle: '',
        recordDescription: ''
      })
    } else if (type === 'allergy') {
      handleAddMedicalRecord(allergyRecord, type)
      setAllergyRecord({
        recordTitle: '',
        recordDescription: ''
      })
    } else {
      handleAddMedicalRecord(dietRecord, type)
      setDietRecord({
        recordTitle: '',
        recordDescription: ''
      })
    }
  }

  return (
    <>
      <Grid item xs={12} sm={4}>
        <FormControl fullWidth >
          <InputLabel id="bloodGroupLabel">Blood Group *</InputLabel>
          <Select
            required
            labelId="bloodGroupLabel"
            id="bloodGroup"
            name="bloodGroup"
            label="Blood Group *"
            value={basicMedicalRecord.bloodGroup}
            onChange={e => handleChangeBasicMedicalValue({
              ...createdMedical.basicMedicalRecord,
              [e.target.name]: e.target.value
            })}
          >
            <MenuItem value='A'>A</MenuItem>
            <MenuItem value='B'>B</MenuItem>
            <MenuItem value='O'>O</MenuItem>
            <MenuItem value='AB'>AB</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          required
          fullWidth
          id="weight"
          label="Weight"
          name="weight"
          value={basicMedicalRecord.weight}
          onChange={e => handleChangeBasicMedicalValue({
            ...createdMedical.basicMedicalRecord,
            [e.target.name]: e.target.value
          })}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          required
          fullWidth
          id="height"
          label="Height"
          name="height"
          value={basicMedicalRecord.height}
          onChange={e => handleChangeBasicMedicalValue({
            ...createdMedical.basicMedicalRecord,
            [e.target.name]: e.target.value
          })}
        />
      </Grid>
      {(diet.length !== 0 || allergy.length !== 0 || medication !== 0) && (
        <Grid item xs={12}>
          {diet.length !== 0 && (
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Diet Information</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {diet.map(el => (
                  <>
                    <ListItem alignItems="flex-start">
                      <ListItemText
                        primary={el.recordTitle}
                        secondary={
                          <>
                            <Typography
                              sx={{ display: 'inline' }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              {el.recordDescription}
                            </Typography>
                          </>
                        }
                      />
                    </ListItem>
                    <Divider />
                  </>
                ))}
              </AccordionDetails>
            </Accordion>
          )}
          {allergy.length !== 0 && (
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Allergy Information</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {allergy.map(el => (
                  <>
                    <ListItem alignItems="flex-start">
                      <ListItemText
                        primary={el.recordTitle}
                        secondary={
                          <>
                            <Typography
                              sx={{ display: 'inline' }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              {el.recordDescription}
                            </Typography>
                          </>
                        }
                      />
                    </ListItem>
                    <Divider />
                  </>
                ))}
              </AccordionDetails>
            </Accordion>
          )}
          {medication.length !== 0 && (
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Medication Information</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {medication.map(el => (
                  <>
                    <ListItem alignItems="flex-start">
                      <ListItemText
                        primary={el.recordTitle}
                        secondary={
                          <>
                            <Typography
                              sx={{ display: 'inline' }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              {el.recordDescription}
                            </Typography>
                          </>
                        }
                      />
                    </ListItem>
                    <Divider />
                  </>
                ))}
              </AccordionDetails>
            </Accordion>
          )}
        </Grid>
      )}
      <Grid item xs={12} sm={12}>
        <Typography component="h4" variant="h6">
          Medication Information:
        </Typography>
      </Grid>
      <Grid item xs={12} sm={12}>
        <TextField
          fullWidth
          id="recordTitle"
          label="Medication Title"
          name="recordTitle"
          value={medicationRecord.recordTitle}
          onChange={e => setMedicationRecord({
            ...medicationRecord,
            [e.target.name]: e.target.value
          })}
        />
      </Grid>
      <Grid item xs={12} sm={12}>
        <TextField
          multiline
          rows={2}
          maxRows={Infinity}
          fullWidth
          id="recordDescription"
          label="Medication Description"
          name="recordDescription"
          value={medicationRecord.recordDescription}
          onChange={e => setMedicationRecord({
            ...medicationRecord,
            [e.target.name]: e.target.value
          })}
        />
      </Grid>
      <Grid item xs={12} sm={12}>
        <Button
          disabled={Object.values(medicationRecord).find(el => el === '') === ''}
          fullWidth
          variant="contained"
          onClick={(e) => handleAddNewSpecialMedical(e, 'medication')}>
          Add
        </Button>
      </Grid>
      <Grid item xs={12} sm={12}>
        <Typography component="h4" variant="h6">
          Allergy Information:
        </Typography>
      </Grid>
      <Grid item xs={12} sm={12}>
        <TextField
          fullWidth
          id="recordTitle"
          label="Allergy Title"
          name="recordTitle"
          value={allergyRecord.recordTitle}
          onChange={e => setAllergyRecord({
            ...allergyRecord,
            [e.target.name]: e.target.value
          })}
        />
      </Grid>
      <Grid item xs={12} sm={12}>
        <TextField
          multiline
          rows={2}
          maxRows={Infinity}
          fullWidth
          id="recordDescription"
          label="Allergy Description"
          name="recordDescription"
          value={allergyRecord.recordDescription}
          onChange={e => setAllergyRecord({
            ...allergyRecord,
            [e.target.name]: e.target.value
          })}
        />
      </Grid>
      <Grid item xs={12} sm={12}>
        <Button
          disabled={Object.values(allergyRecord).find(el => el === '') === ''}
          fullWidth
          variant="contained"
          onClick={(e) => handleAddNewSpecialMedical(e, 'allergy')}>
          Add
        </Button>
      </Grid>
      <Grid item xs={12} sm={12}>
        <Typography component="h4" variant="h6">
          Diet Information:
        </Typography>
      </Grid>
      <Grid item xs={12} sm={12}>
        <TextField
          fullWidth
          id="recordTitle"
          label="Diet Title"
          name="recordTitle"
          value={dietRecord.recordTitle}
          onChange={e => setDietRecord({
            ...dietRecord,
            [e.target.name]: e.target.value
          })}
        />
      </Grid>
      <Grid item xs={12} sm={12}>
        <TextField
          multiline
          rows={2}
          maxRows={Infinity}
          fullWidth
          id="recordDescription"
          label="Diet Description"
          name="recordDescription"
          value={dietRecord.recordDescription}
          onChange={e => setDietRecord({
            ...dietRecord,
            [e.target.name]: e.target.value
          })}
        />
      </Grid>
      <Grid item xs={12} sm={12}>
        <Button
          disabled={Object.values(dietRecord).find(el => el === '') === ''}
          fullWidth
          variant="contained"
          onClick={e => handleAddNewSpecialMedical(e, 'diet')}>
          Add
        </Button>
      </Grid>
    </>
  );
}
