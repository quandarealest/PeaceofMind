import Grid from '@mui/material/Grid';
import { ListItem } from '@mui/material';
import { ListItemText } from '@mui/material';
import { ListItemAvatar } from '@mui/material';
import Paper from '@mui/material/Paper';
import { Avatar } from '@mui/material';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

import { normalizeDate } from '../../common/NormalizingData'
import PoMAvatar from '../PoMAvatar/PoMAvatar'

const Img = styled('img')({
  maxWidth: '100%',
  height: 'auto',
});

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

function Feed(props) {
  const { feed } = props
  const cssProps = {
    height: '50px',
    width: '50px'
  }
  return (
    <ListItem>
      <Item sx={{ width: '100%' }}>
        <Grid container>
          <Grid item xs={12} spacing={4} sx={{ display: 'flex' }} justifyContent="left" >
            <Grid item xs={2} >
              <ListItemAvatar sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <PoMAvatar {...cssProps} firstName={feed.firstName} lastName={feed.lastName} />
              </ListItemAvatar>
            </Grid>
            <Grid item xs={10} sm={10} container direction='column' justifyContent="left" style={{ marginLeft: '10px' }}>
              <Grid item>
                <Typography variant="subtitle2">
                  {`${feed.firstName} ${feed.lastName}`}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="caption">
                  {normalizeDate(new Date(feed.postedTime))}
                </Typography>
              </Grid>
              {feed.type === 'txt' && (
                <ListItemText
                  primary={feed.note}
                ></ListItemText>
              )}
            </Grid>
          </Grid>
          {feed.type === 'img' && (
            <Grid item xs={12} justifyContent="center" >
              <Img alt="TimelineImage" src={`${feed.photo.imageFormat},${feed.photo.base64}`} />
            </Grid>
          )}
        </Grid>
      </Item>
    </ListItem>
  )
}

export default Feed
