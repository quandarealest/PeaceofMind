import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const style1 = {
    marginBottom: 2,
  };

function Note() {

    const noteData = [{
        label: 'my first note',
        PostedTime: '2019-03-11T12:34:56.000Z',
        type:true,
    },
    {
        label: 'note number 1',
        PostedTime: '2019-06-11T14:34:56.000Z',
        type:false
    },
    {
        label: 'latest note',
        PostedTime: '2019-04-11T12:34:56.000Z',
        type:true,
    },
    ];

    const [value, setValue] = React.useState('');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth sx={style1}>
        <InputLabel id="demo-simple-select-label">Note Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={10}>Daily Note</MenuItem>
          <MenuItem value={20}>Special Note</MenuItem>
          <MenuItem value={30}>Other Note</MenuItem>
        </Select>
      </FormControl>
            <>
                <Card>
                    <CardContent>
                        <Typography gutterBottom variant="h7" component="div">
                            note 1
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                        Lizards are a widespread group of squamate reptiles, with over 6,000
                        species, ranging across all continents except Antarctica
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Edit</Button>
                        <Button size="small">Delete</Button>
                    </CardActions>
                </Card>
            </>
    </Box>
    </>
  )

}

export default Note
