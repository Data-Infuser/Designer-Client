import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Input,
  InputLabel,
  Checkbox,
  Select,
  MenuItem,
  Typography,
} from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';

const TypeLengthMap = {
  "int": 10,
  "double": "16, 4",
  "text": 255,
}

export default function MetaRowForm(props) {
  const [col, setCol] = useState(props.col);
  const formHeaders = props.formHeaders;
  const classes = props.classes;
  const idx = props.idx;

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

  const isDisableDate = (type) => {
    return ["datetime", "date", "time"].indexOf(type) < 0;
  }

  const handleChange = (e) => {
    let value = null;
    switch(e.target.name) {
      case 'nullable':
        value = e.target.checked;
        break;
      default:
        value = e.target.value.trim();
        break;
    }

    const updatedCol = {
      ...col,
      [e.target.name]: value,
    };

    setCol(updatedCol);

    props.updateCol(idx, updatedCol);
  };

  return (
    <div className={classes.flexTable} key={`meta-sample-meta-row-${col.id}`}>
      <div className={`${classes.flexRow} text`}>{col.originalColumnName}</div>
      <div className={classes.flexRow}>
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
      </div>
      <div className={classes.flexRow}>
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
      </div>
      <div className={classes.flexRow}>
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
      </div>
      <div className={classes.flexRow}>
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
            disabled={isDisableDate(col.type)}
          />
          <FormHelperText className="helpText">
            {formHeaders[4].tooltip}
          </FormHelperText>
        </FormControl>
      </div>
      <div className={`${classes.flexRow} last`}>
        <FormControlLabel
          control={
            <Checkbox
              id={`meta-${col.id}-input-nullable`}
              checked={col.nullable}
              name="nullable"
              onChange={handleChange}
              color="primary"
            />
          }
          label={
            <Typography style={{ fontSize: "0.875rem" }}>빈값 허용</Typography>
          }
        />
      </div>
      <div className={`${classes.flexRow} last`}>
        <FormControl className={classes.formControl}>
          <Button variant="outlined" startIcon={<SettingsIcon />}>
            검색조건
          </Button>
        </FormControl>
      </div>
    </div>
  );
}
