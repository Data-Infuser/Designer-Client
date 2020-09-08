import React from 'react';
import { Typography } from '@material-ui/core';

export function PageTitle(props) {
    return (
        <Typography variant="h4" gutterTop gutterBottom>
            {props.text}
        </Typography>
    )
}