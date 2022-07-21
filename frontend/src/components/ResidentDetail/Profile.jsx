import { Grid, } from '@mui/material'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

function Profile() {

  return (
    <>
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={3} direction="row">
            <Typography color="inherit">
              <Img sx={{ width: 100, height: 100, alignItems: 'center' }} alt="profile" src="http://www.goodmorningimagesdownload.com/wp-content/uploads/2021/07/love-Latest-Beautiful-Simple-Whatsapp-Dp-Profile-Images-photo-300x300.gif" />
            </Typography>
          </Grid>
          <Grid item xs={6} direction="row">
            <Grid item>
              <Typography component="h4" variant="h6">
                Quan Bui
                </Typography>
              <Typography component="h4" variant="h8">
                Gender: Female
                </Typography>
              <Typography component="h4" variant="h8">
                Age: 50
                </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  )

}

export default Profile
