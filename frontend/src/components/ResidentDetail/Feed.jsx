import Grid from '@mui/material/Grid';
import { ListItem } from '@mui/material';
import { ListItemText } from '@mui/material';
import { ListItemAvatar } from '@mui/material';
import Paper from '@mui/material/Paper';
import { Avatar } from '@mui/material';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

import { normalizeDate } from '../../common/NormalizingData'

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

function Feed(props) {
  const { feed } = props
  return (
    <ListItem>
      <Item sx={{ width: '100%' }}>
        <Grid container>
          <Grid item xs={12} spacing={4} container direction='row' justifyContent="left" >
            <Grid item xs={1} sm={1} >
              <ListItemAvatar>
                <Avatar />
              </ListItemAvatar>
            </Grid>
            <Grid item xs={10} sm={10} container direction='column' justifyContent="left" style={{ marginLeft: '10px' }}>
              <Grid item>
                <Typography variant="h7">
                  {`${feed.firstName} ${feed.lastName}`}
                </Typography>
              </Grid>
              <Grid item>
                <ListItemText
                  secondary={normalizeDate(new Date(feed.postedTime))}
                  secondaryTypographyProps={{ fontSize: '11px' }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} justifyContent="center" >
            <>
              {feed.type === 'txt' ?
                (
                  <Typography component="h2" variant="h7" fullwidth sx={{ padding: 1.5 }}>
                    {feed.note}
                  </Typography>
                ) :
                (
                  <Img sx={{ width: '90%', height: '80%', padding: 1.5 }} alt="TimelineImage" src={`${feed.photo.imageFormat},${feed.photo.base64}`} />
                )
              }
            </>
          </Grid>
        </Grid>
      </Item>
    </ListItem>
  )
}

export default Feed
