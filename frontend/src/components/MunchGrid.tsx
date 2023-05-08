import React from 'react';

import Box from '@mui/material/Box';
import Grid2 from '@mui/material/Unstable_Grid2';

import MunchCard from './MunchCard';
import { MunchItem } from './MunchItem';

export interface MunchGridProps {
  cards: Array<MunchItem>,
  show: string
  handleDialogOpen: (item: MunchItem) => void
}

function MunchGrid(props: MunchGridProps): React.ReactElement {
  return (
    <Box sx={{ display: props.show, flexGrow: 1 }}>
      <Grid2 container spacing={2}>
        {props.cards.map((card: MunchItem) => {
          return <MunchCard key={card.name} card={card} handleDialogOpen={props.handleDialogOpen} />;
        })}
      </Grid2>
    </Box>
  );
}

export default MunchGrid;
