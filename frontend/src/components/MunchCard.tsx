import { useEffect, useState } from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid2 from '@mui/material/Unstable_Grid2';

import { CardActionArea } from '@mui/material';
import { MunchItem } from './MunchItem';

export interface MunchCardProps {
  card: MunchItem
  handleDialogOpen: (item: MunchItem) => void
}

function MunchCard(props: MunchCardProps): React.ReactElement {
  const loadingImage = require("../assets/images/spinning-loading.gif");
  const [image, setImage] = useState(loadingImage);

  useEffect(() => {
    const fetchImage = async () => {
      let response;
      try {
        response = await import(`../assets/images/${props.card.image}`);
        setImage(response.default);
      } catch (err) {
        console.log(err);
        setImage(require("../assets/images/404-error-page-not-found-with-two-men-plugging-in-cords.jpg"))
      }
    }
    fetchImage()
  }, [props.card.image])

  return (
    <Grid2 xs={12} sm={6} md={4} lg={3}>
      <Card sx={{ maxWidth: 345, height: 346 }}>
        <CardActionArea onClick={() => props.handleDialogOpen(props.card)}>
          <CardMedia
            sx={{ height: 140 }}
            image={image}
            title={props.card.name}
          />
          <CardContent>
            <Typography gutterBottom variant="h4" component="div"
              sx={{
                height: 85,
                display: '-webkit-box',
                overflow: 'hidden',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: 2,
              }}
            >
              {props.card.name}
            </Typography>
            <Typography gutterBottom variant="h6" component="div">
              ${props.card.price.toFixed(2)}
            </Typography>
            <Typography gutterBottom variant="h6" component="div"
              sx={{
                display: '-webkit-box',
                overflow: 'hidden',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: 1,
              }}
            >
              {props.card.restaurant.name}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid2>
  );
}

export default MunchCard;
