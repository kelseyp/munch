import { SettingsInputComponent } from "@mui/icons-material";
import { Card, CardContent, CardHeader, CardMedia, Dialog, Typography, DialogTitle, DialogContentText } from "@mui/material";
import * as React from 'react';
import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";

export interface OpeningDialog {
    open: boolean;
    handleDialogClose: () => void;
}

export function OpeningDialog(props: OpeningDialog) {
    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(true);
    }

    useEffect(() => {

    })

    return (
        <Dialog
            open={props.open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"What do you feel like eating?"}
            </DialogTitle>
            <DialogContentText>
                <Typography gutterBottom variant="body1" component="div">
                    Type what you want to eat. It can be an item (hamburger, pizza, etc)
                    or a style of food (mexican, american, chinese, etc) or even a dietary restriction
                    (Low card, vegan, etc) and Munch will tell you what to eat!
                </Typography>
                <SearchBar searchCallback={() => { }} />
            </DialogContentText>
        </Dialog>
    )

}