import * as React from 'react';
import { Grid, } from '@mui/material'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';

import { weightConverter, heightConverter } from '../../common/NormalizingData'

const style1 = {
  marginBottom: 2,
};

const style2 = {
  marginTop: 1,
};

function Medical(props) {
  const { basicMedicalRecord } = props
  const medicalInfo = {
    BloodGroup: 'A',
    Weight: '62 KG',
    Height: '175 CM',
    Medication: 'this person is not using any medication',
    Allergies: 'allergic to fish',
    Diet: 'n/a',
    SpecialNote: 'please be careful of his hip',
  };

  const [value, setValue] = React.useState(medicalInfo);

  const handleChange = (event) => {
    setValue(event.target.value);
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
        <Grid sx={style2} container spacing={2}>
          <Grid item xs={6} md={4}>
            <TextField
              id="Medication"
              label="Medication"
              multiline
              rows={4}
              defaultValue={value.Medication}
              disabled
            />
          </Grid>
          <Grid item xs={6} md={4}>
            <TextField
              id="Allergies"
              label="Allergies"
              multiline
              rows={4}
              defaultValue={value.Allergies}
              disabled
            />
          </Grid>
          <Grid item xs={6} md={4}>
            <TextField
              id="Diet"
              label="Diet"
              multiline
              rows={4}
              defaultValue={value.Diet}
              disabled
            />
          </Grid>
          <Grid item xs={6} md={4}>
            <TextField
              id="SpecialNote"
              label="SpecialNote"
              multiline
              rows={4}
              defaultValue={value.SpecialNote}
              disabled
            />
          </Grid>
        </Grid>

      </Box>
    </>
  )

}

export default Medical
