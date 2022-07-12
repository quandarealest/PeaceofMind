import * as React from 'react';
import Typography from '@mui/material/Typography';

function Title(props) {
  return (
    <Typography marginBottom="0" component="h2" variant="h6" color="primary" gutterBottom>
      {props.children}
    </Typography>
  );
}

export default Title;