import React from 'react';
import { Typography } from '@material-ui/core';

function TitleTypo(props) {
    return (
        <Typography 
            align={props.align || "left"} 
            variant={props.variant} 
            gutterBottom={props.gutterBottom}>
            {props.text}

            {props.smallText &&
                <small style={{marginLeft: 8}}>
                    {props.smallText}
                </small>
            }
        </Typography>
    )
}

export function PageTitle(props) {
    return <TitleTypo 
                text={props.text}
                smallText={props.smallText}
                variant="h4"
                align={props.align}
                gutterBottom={true}
                />
}

export function SubTitle(props) {
    return <TitleTypo 
                text={props.text}
                smallText={props.smallText}
                variant="h6"
                align={props.align}
                gutterBottom={true}
                />
}