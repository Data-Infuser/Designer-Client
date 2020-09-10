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

/**
 * Render h6 Typograpy Component
 * @param {{text: string, smallText: string, align: PropTypes.Alignment}} props 
 */
export function PageTitle({ text, smallText, align }) {
  return (
    <TitleTypo 
      text={text}
      smallText={smallText}
      variant="h4"
      align={align}
      gutterBottom={true}
    />
  )
}

/**
 * Render h6 Typograpy Component
 * @param {{text: string, smallText: string, align: PropTypes.Alignment}} props 
 */
export function SubTitle({ text, smallText, align }) {
  return (
    <TitleTypo 
      text={text}
      smallText={smallText}
      variant="h6"
      align={align}
      gutterBottom={true}
    />
  )
}