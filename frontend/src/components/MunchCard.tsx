import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid2 from '@mui/material/Unstable_Grid2';
import { MunchItem } from './MunchItem';

export interface MunchCardProps {
  card: MunchItem
}

function MunchCard(props: MunchCardProps): React.ReactElement {
  let imageName = "../images/".concat(props.card.image) as string;
  console.log("image name: " + imageName)
  let currentImage: any;
  try {
    currentImage = require(imageName);
  } catch (error) {
    currentImage = require("../images/404-error-page-not-found-with-two-men-plugging-in-cords.jpg");
    console.log(error);
  }
  return (
    <Grid2 xs={12} sm={6} md={4} lg={3}>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          sx={{ height: 140 }}
          image={currentImage}
          title={props.card.item_name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.card.item_name}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            {props.card.price}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            {props.card.restaurant_name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.card.description}
          </Typography>

        </CardContent>
      </Card>
    </Grid2>
  );
}

export default MunchCard;
