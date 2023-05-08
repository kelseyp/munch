import { Card, CardContent, CardHeader, CardMedia, Dialog, Typography } from "@mui/material";

import { useEffect, useState } from "react";
import { MunchItem } from './MunchItem';

export interface ItemDetailDialogProps {
  open: boolean;
  selectedItem: MunchItem;
  handleDialogClose: () => void;
}

export function ItemDetailDialog(props: ItemDetailDialogProps) {
  const loadingImage = require("../assets/images/spinning-loading.gif");
  const [image, setImage] = useState(loadingImage);

  useEffect(() => {
    const fetchImage = async () => {
      let response;
      try {
        response = await import(`../assets/images/${props.selectedItem.image}`);
        setImage(response.default);
      } catch (err) {
        console.log(err);
        setImage(require("../assets/images/404-error-page-not-found-with-two-men-plugging-in-cords.jpg"))
      }
    }
    fetchImage()
  }, [props.selectedItem.image])

  return (
    <Dialog onClose={props.handleDialogClose} open={props.open}>
      <Card sx={{ width: 500 }}>
        <CardHeader
          title={props.selectedItem.name}
          subheader={`$${props.selectedItem.price.toFixed(2)}`}
        />
        <CardMedia
          sx={{ height: 300 }}
          image={image}
          title={props.selectedItem.name}
        />
        <CardContent>
          <Typography variant="subtitle1" color="text.secondary">
            {props.selectedItem.description}
          </Typography>
          <Typography gutterBottom variant="body1" component="div">
            {props.selectedItem.restaurant.name}
          </Typography>
          <Typography gutterBottom variant="body2" component="div">
          {props.selectedItem.restaurant.address}
          </Typography>
        </CardContent>
      </Card>
    </Dialog>
  );
}