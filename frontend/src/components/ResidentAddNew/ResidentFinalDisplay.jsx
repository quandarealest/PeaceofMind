import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  Grid,
  Box,
  ListItem,
  ListItemText,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { formatPhoneNumber, normalizeDate, weightConverter, heightConverter } from '../../common/NormalizingData'
import PoMAvatar from '../PoMAvatar/PoMAvatar'

const cssProps = {
  width: '80px',
  height: '80px'
}

function ResidentFinalDisplay(props) {
  const { createdResident, createdFamily, createdMedical, createdNote } = props
  const { diet, allergy, medication } = createdMedical.specialMedicalRecord
  const { specialNote, dailyNote, privateNote } = createdNote
  const renderLine = (title, data) => {
    return (
      <Grid sx={{ marginBottom: '5px' }} spacing={2} container>
        <Grid item xs={5}>
          <Typography variant="subtitle2">
            {title}:
          </Typography>
        </Grid>
        <Grid item xs={7}>
          <Typography variant="body2">
            {data}
          </Typography>
        </Grid>
      </Grid>
    )
  }

  const renderResidentInfo = () => {
    const renderInfoData = [
      {
        title: 'Name',
        data: `${createdResident.firstName} ${createdResident.lastName}`
      },
      {
        title: 'Gender',
        data: createdResident.gender.toUpperCase()
      },
      {
        title: 'DoB',
        data: normalizeDate(new Date(createdResident.dob))
      },
      {
        title: 'Contact No.',
        data: formatPhoneNumber(createdResident.contactNumber.toString())
      },
      {
        title: 'Resident No.',
        data: createdResident.residentNumber
      },
      {
        title: 'Room No.',
        data: createdResident.roomNumber
      },
    ]
    return (
      <>
        {renderInfoData.map(info => (
          <>
            {renderLine(info.title, info.data)}
          </>
        ))}
      </>
    )
  }

  const renderFamilyInfo = () => {
    const renderInfoData = [
      {
        title: 'Name',
        data: `${createdFamily.firstName} ${createdFamily.lastName}`
      },
      {
        title: 'Contact No.',
        data: formatPhoneNumber(createdFamily.contactNumber.toString())
      },
      {
        title: 'Emergency',
        data: createdFamily.emergencyContact.toString().toUpperCase()
      },
    ]
    return (
      <>
        {renderInfoData.map(info => (
          <>
            {renderLine(info.title, info.data)}
          </>
        ))}
      </>
    )
  }

  const renderNoteInfo = () => {
    return (
      <>
        {(specialNote.length !== 0 || dailyNote.length !== 0 || privateNote !== 0) && (
          <Grid item xs={12}>
            {dailyNote.length !== 0 && (
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>Daily Notes</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {dailyNote.map(el => (
                    <>
                      <ListItem alignItems="flex-start">
                        <ListItemText
                          // primary={el.recordTitle}
                          secondary={
                            <>
                              <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                              >
                                {el.note}
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
            {specialNote.length !== 0 && (
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>Special Notes</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {specialNote.map(el => (
                    <>
                      <ListItem alignItems="flex-start">
                        <ListItemText
                          // primary={el.recordTitle}
                          secondary={
                            <>
                              <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                              >
                                {el.note}
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
            {privateNote.length !== 0 && (
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>Private Notes</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {privateNote.map(el => (
                    <>
                      <ListItem alignItems="flex-start">
                        <ListItemText
                          // primary={el.recordTitle}
                          secondary={
                            <>
                              <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                              >
                                {el.note}
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
      </>
    )
  }

  const renderMedicalInfo = () => {
    const renderInfoData = [
      {
        title: 'Blood Group',
        data: createdMedical.basicMedicalRecord.bloodGroup
      },
      {
        title: 'Weight',
        data: `${createdMedical.basicMedicalRecord.weight} kg (${weightConverter(createdMedical.basicMedicalRecord.weight, 'kg', 'lbs')} lbs)`
      },
      {
        title: 'Height',
        data: `${createdMedical.basicMedicalRecord.height} cm (${heightConverter(parseInt(createdMedical.basicMedicalRecord.height), 'cm', 'feet')} ft)`
      },
    ]
    return (
      <>
        {renderInfoData.map(info => (
          <>
            {renderLine(info.title, info.data)}
          </>
        ))}
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
      </>
    )
  }

  return (
    <Box
      sx={{
        mx: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <PoMAvatar {...cssProps} firstName={createdResident.firstName} lastName={createdResident.lastName} />
      <Typography component="h1" variant="h5">
        {`${createdResident.firstName} ${createdResident.lastName}`}
      </Typography>
      <Accordion sx={{ width: '100%' }} expanded={true}>
        <AccordionSummary
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="subtitle2">Resident Information</Typography>
        </AccordionSummary>
        <Divider />
        <AccordionDetails>
          {renderResidentInfo()}
        </AccordionDetails>
      </Accordion>
      <Accordion sx={{ width: '100%' }} expanded={true}>
        <AccordionSummary
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography variant="subtitle2">Medical Information</Typography>
        </AccordionSummary>
        <Divider />
        <AccordionDetails>
          {renderMedicalInfo()}
        </AccordionDetails>
      </Accordion>
      <Accordion sx={{ width: '100%' }} expanded={true}>
        <AccordionSummary
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="subtitle2">Note Information</Typography>
        </AccordionSummary>
        <Divider />
        <AccordionDetails>
          {renderNoteInfo()}
        </AccordionDetails>
      </Accordion>
      <Accordion sx={{ width: '100%' }} expanded={true}>
        <AccordionSummary
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography variant="subtitle2">Family Information</Typography>
        </AccordionSummary>
        <Divider />
        <AccordionDetails>
          {renderFamilyInfo()}
        </AccordionDetails>
      </Accordion>
    </Box>
  )
}

export default ResidentFinalDisplay
