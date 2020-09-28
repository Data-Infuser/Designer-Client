import React from 'react';

import { Accordion, AccordionDetails, AccordionSummary, Chip, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',    
  },
  headerWrap: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export function MetaColInfo(props) {
  const classes = useStyles();
  const col = props.col;

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`column${col.id} - ${col.columnName}`}
        id={`column-${col.id}`}        
      >
        <div className={classes.headerWrap}>
          <Typography className={classes.heading}>
            {col.columnName}
          </Typography>
          <div>
            {col.type && 
              <Chip size="small" label={`Type: ${col.type}`} variant="outlined" />
            }
          </div>
        </div>        
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
          sit amet blandit leo lobortis eget.
        </Typography>
      </AccordionDetails>
    </Accordion>
  )
}