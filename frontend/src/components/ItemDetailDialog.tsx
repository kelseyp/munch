import { Dialog, DialogTitle } from "@mui/material";

import { MunchItem } from './MunchItem';

export interface ItemDetailDialogProps {
    open: boolean;
    selectedItem: MunchItem;
    handleDialogClose: () => void;
  }
  
export function ItemDetailDialog(props: ItemDetailDialogProps) {  
    return (
      <Dialog  onClose={props.handleDialogClose} open={props.open}>
        <DialogTitle>{props.selectedItem.item_name} Details</DialogTitle>
      </Dialog>
    );
  }