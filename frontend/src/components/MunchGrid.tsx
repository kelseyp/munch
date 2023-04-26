import Paper from '@mui/material/Paper';
import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid2 from '@mui/material/Unstable_Grid2';

import { MunchItem } from './MunchItem';

export interface MunchGridProps {
  cards: Array<MunchItem>,
  show: string
}

function MunchGrid(props: MunchGridProps): React.ReactElement {
  const [page, setPage] = React.useState(0);
  const [cardsPerPage, setCardsPerPage] = React.useState(10);
  const [cardsPerRow, setCardsPerRow] = React.useState(3);

  return (
    <Paper sx={{ display: props.show}}>
    <Box sx={{flexGrow: 1 }}>
      <Grid2 container spacing={2}>
        {props.cards.map((card: MunchItem) => {
          let imageName = "../images/".concat(card.image) as string;
          console.log("image name: " + imageName)
          let currentImage: any;
          try {
            currentImage = require(imageName);
          } catch (error) {
            currentImage = require("../images/404-error-page-not-found-with-two-men-plugging-in-cords.jpg");
            console.log(error);
          }

          return (
            <Grid2 xs={4}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  sx={{ height: 140 }}
                  image={currentImage}
                  title={card.item_name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {card.item_name}
                  </Typography>
                  <Typography gutterBottom variant="h5" component="div">
                    {card.price}
                  </Typography>
                  <Typography gutterBottom variant="h5" component="div">
                    {card.restaurant_name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {card.description}
                  </Typography>

                </CardContent>
              </Card>
            </Grid2>
          );
        })}
      </Grid2>
    </Box>
    </Paper>
  );
}

export default MunchGrid;