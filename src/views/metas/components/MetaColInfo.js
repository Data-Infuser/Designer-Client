import React, { useState } from 'react';

import { Accordion, AccordionDetails, AccordionSummary, Chip, Typography, FormControl, InputLabel, Select, MenuItem, Input, FormHelperText, FormControlLabel, Checkbox } from '@material-ui/core';
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
  formWrap: {
    flexWrap: "wrap",
    backgroundColor: "#C8D1E1",
  },
  formControl: {
    width: "100%",
    "&.options": {
      width: "33%",
      marginRight: 0,
    },
  },
}));

const TypeLengthMap = {
  "int": 10,
  "double": "16, 4",
  "text": 255,
}

export function MetaColInfo(props) {
  const classes = useStyles();
  const [col, setCol] = useState({...props.col});
  const formHeaders = props.formHeaders;

  const getType = (val) => {
    switch (val) {
      case "varchar":
        return "text";
      default:
        return val;
    }
  };

  const getTypeLength = (type) => {
    const parsedType = getType(type);
    if (TypeLengthMap[type]) {
      return TypeLengthMap[type];
    }

    return "";
  }

  const getFormat = (type) => {
    switch (type) {
      case "datetime":
        return "yyyy-MM-dd HH:mm:ss";
      case "date":
        return "yyyy-MM-dd";
      case "time":
        return "HH:mm:ss";
      default:
        return "";
    }
  }

  const isDateType = (type) => {
    return ["datetime", "date", "time"].indexOf(type) < 0;
  }

  const handleChange = (e) => {
    const updatedCol = {
      ...col,
      [e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value,
    };

    setCol(updatedCol);
  };

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
      <AccordionDetails className={classes.formWrap}>
        <FormControl className={classes.formControl}>
          <InputLabel
            htmlFor={`meta-${col.id}-input-originName`}
            className="label"
          >
            {formHeaders[0].name}
          </InputLabel>
          <Input
            id={`meta-${col.id}-input-originName`}
            className="form"
            name="originName"
            value={col.originalColumnName}
            disabled={true}
          />
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel
            htmlFor={`meta-${col.id}-input-columnName`}
            className="label"
          >
            {formHeaders[1].name}
          </InputLabel>
          <Input
            id={`meta-${col.id}-input-columnName`}
            className="form"
            name="columnName"
            value={col.columnName}
            onChange={handleChange}
          />
          <FormHelperText className="helpText">
            {formHeaders[1].tooltip}
          </FormHelperText>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel id={`label-meta-${col.id}-input-type`} className="label">
            {formHeaders[2].name}
          </InputLabel>
          <Select
            labelId={`label-meta-${col.id}-input-type`}
            id={`meta-${col.id}-input-type`}
            name="type"
            value={getType(col.type)}
            className="form"
            onChange={handleChange}
          >
            <MenuItem value={"int"}>숫자(정수)</MenuItem>
            <MenuItem value={"double"}>숫자(부동소수)</MenuItem>
            <MenuItem value={"text"}>문자</MenuItem>
            <MenuItem value={"datetime"}>날짜(시간포함)</MenuItem>
            <MenuItem value={"date"}>날짜(시간 미포함)</MenuItem>
            <MenuItem value={"time"}>시간(시간 미포함)</MenuItem>
          </Select>
        </FormControl>

        {isDateType(col.type) ? 
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor={`meta-${col.id}-input-length`} className="label">
              {formHeaders[3].name}
            </InputLabel>
            <Input
              id={`meta-${col.id}-input-length`}
              value={col.length || getTypeLength(col.type)}
              name="length"
              className="form"
              onChange={handleChange}
            />
          </FormControl>
          :
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor={`meta-${col.id}-input-format`} className="label">
              {formHeaders[4].name}
            </InputLabel>
            <Input
              id={`meta-${col.id}-input-format`}
              value={col.format || getFormat(col.type)}
              name="format"
              className="form"
              onChange={handleChange}
            />
            <FormHelperText className="helpText">
              {formHeaders[4].tooltip}
            </FormHelperText>
          </FormControl>
        }

        <FormControlLabel
          className={`${classes.formControl} options`}
          control={
            <Checkbox
              id={`meta-${col.id}-input-nullable`}
              checked={col.isNullable}
              name="isNullable"
              onChange={handleChange}
              color="primary"
            />
          }
          label={
            <Typography style={{ fontSize: "0.875rem" }}>빈값 허용</Typography>
          }
        />
        <FormControlLabel
          className={`${classes.formControl} options`}
          control={
            <Checkbox
              id={`meta-${col.id}-input-unique`}
              checked={col.isUnique}
              name="isUnique"
              onChange={handleChange}
              color="primary"
            />
          }
          label={
            <Typography style={{ fontSize: "0.875rem" }}>고유값</Typography>
          }
        />
        <FormControlLabel
          className={`${classes.formControl} options`}
          control={
            <Checkbox
              id={`meta-${col.id}-input-hidden`}
              checked={col.isHidden}
              name="isHidden"
              onChange={handleChange}
              color="primary"
            />
          }
          label={
            <Typography style={{ fontSize: "0.875rem" }}>숨김(미제공)</Typography>
          }
        />
      </AccordionDetails>
    </Accordion>
  )
}