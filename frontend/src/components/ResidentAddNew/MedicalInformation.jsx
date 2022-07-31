import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

import * as React from 'react';

export default function MedicalInformation () {
    return (
        <>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            fullWidth
            id="BloodGroup"
            label="Blood Group"
            name="BloodGroup"
            autoComplete="BloodGroup"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField

            fullWidth
            id="Weight"
            label="Weight"
            name="Weight"
            autoComplete="Weight"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField

            fullWidth
            id="Height"
            label="Height"
            name="Height"
            autoComplete="Height"
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            multiline
            rows={4}
            maxRows={Infinity}
            required
            fullWidth


            id="Medication"
            label="Medication"
            name="Medication"
            autoComplete="Medication"
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField

            multiline
            rows={4}
            maxRows={Infinity}
            fullWidth
            id="Allergies"
            label="Allergies"
            name="Allergies"
            autoComplete="Allergies"
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField

            multiline
            rows={4}
            maxRows={Infinity}
            fullWidth
            id="Diet"
            label="Diet"
            name="Diet"
            autoComplete="Diet"
          />
        </Grid>
       
    </>
    );
  }
