import React, { useState } from "react";
import {
  Container,
  Box,
  Paper,
  Tooltip,
  Button,
  IconButton,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Input,
  InputLabel,
  Checkbox,
  Select,
  MenuItem,
  Typography,
} from "@material-ui/core";
import { display } from "@material-ui/system";
import { useParams, useHistory } from "react-router-dom";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import { PageTitle, SubTitle } from "components/typos/Title";
import BorderedTable from "components/tables/BorderedTable";

import HelpIcon from '@material-ui/icons/Help';
import SettingsIcon from '@material-ui/icons/Settings';

const xsWidth = 767;

const formHeaders = [
  { key: "formHeader1", name: "원본 컬럼명" },
  {
    key: "formHeader2",
    name: "제공 컬럼명",
    tooltip: "활용자에게 제공되는 컬럼 명칭입니다.",
  },
  { key: "formHeader3", name: "컬럼 타입" },
  { key: "formHeader4", name: "최대 길이" },
  { key: "formHeader5", name: "날짜 형식", tooltip: "ex) yyyy-MM-dd HH:mm:ss" },
  { key: "formHeader6", name: "빈값 허용" },
  { key: "formHeader7", name: "검색 설정" },
];

const useStyles = makeStyles((theme) => ({
  flexTableContainer: {
    display: "block",
  },
  flexTable: {
    display: "flex",
    flexFlow: "row wrap",
    borderLeft: "1px solid #ddd",
  },
  flexRow: {
    textAlign: "left",
    width: `calc(100% / ${formHeaders.length})`,
    padding: theme.spacing(2),
    backgroundColor: "#fff",
    borderRight: "solid 1px #ddd",
    borderBottom: "solid 1px #ddd",
    "&.text": {
      display: "flex",
      alignItems: "center",
    },
    "&.header": {
      textAlign: "center",
    },
    "& .form": {
      fontSize: "0.875rem",
    },
  },
  formControl: {
    width: "100%",
  },
  [theme.breakpoints.up("sm")]: {
    formControl: {
      "& .label": {
        display: "none",
      },
      "& .form": {
        marginTop: 0,
      },
      "& .helpText": {
        display: "none",
      },
    },
  },
  [theme.breakpoints.down("sm")]: {
    flexTable: {
      marginBottom: 16,
      boxShadow:
        "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
    },
    flexRow: {
      width: "100%",
      "&.header": {
        display: "none",
        display: "block",
      },
      "&.last": {
        width: "50%",
      },
    },
  },
}));

export function MetaShow(props) {
  const { id } = useParams();
  const metas = useSelector((state) => state.metas.items);
  const meta = metas.find((el) => el.id == id);
  const [cols, setCols] = useState(meta.columns);

  const history = useHistory();

  const classes = useStyles();

  const handleChange = idx => (e) => {
    console.log(e.target.name, e.target.value);
    let newCols = [...cols];
    newCols[idx][e.target.name] = e.target.value;

    setCols(newCols)
  };

  const getType = (val) => {
    switch (val) {
      case "int":
        return "int";
      case "double":
        return "double";
      case "varchar":
        return "text";
      default:
        return "text";
    }
  };

  const onButtonClick = (e) => {
    history.push({
      pathname: `/metas/${meta.id}/operation/new`,
      state: { meta: meta },
    });
  };

  return (
    <Container>
      <PageTitle text="데이터셋 Meta" />

      {meta && (
        <Box>
          <Box className="BottomGutter">
            <Box textAlign="left">
              <SubTitle
                text="데이터 예시"
                smallText="상위 5건의 원본 데이터를 출력합니다."
              />
            </Box>
            <BorderedTable
              container={Paper}
              size="small"
              headers={[
                "BIZRNO",
                "CORP_NM",
                "RPPR_NM",
                "ADDR",
                "TELNO",
                "RMK_TXT",
              ]}
              rows={JSON.parse(meta.samples).items}
            />
          </Box>

          <Box className="BottomGutter">
            <Box textAlign="left">
              <SubTitle
                text="메타데이터 정의"
                smallText="원천 데이터의 컬럼 정보를 정의합니다."
              />
            </Box>

            <Box className={classes.flexTableContainer}>
              <div className={classes.flexTable}>
                {formHeaders.map((header) => {
                  return (
                    <div
                      key={header.key}
                      className={`${classes.flexRow} header`}
                    >
                      {header.name}
                      {header.tooltip && (
                        <Tooltip title={header.tooltip} placement="right">
                          <IconButton size="small">
                            <HelpIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      )}
                    </div>
                  );
                })}
              </div>

              {cols.map((col, idx) => {
                return (
                  <div
                    className={classes.flexTable}
                    key={`meta-sample-meta-row-${col.id}`}
                  >
                    <div className={`${classes.flexRow} text`}>
                      {col.originalColumnName}
                    </div>
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
                          onChange={handleChange(idx)}
                        />
                        <FormHelperText className="helpText">
                          {formHeaders[1].tooltip}
                        </FormHelperText>
                      </FormControl>
                    </div>
                    <div className={classes.flexRow}>
                      <FormControl className={classes.formControl}>
                        <InputLabel
                          id={`label-meta-${col.id}-input-type`}
                          className="label"
                        >
                          {formHeaders[2].name}
                        </InputLabel>
                        <Select
                          labelId={`label-meta-${col.id}-input-type`}
                          id={`meta-${col.id}-input-type`}
                          name="type"
                          value={getType(col.type)}
                          className="form"
                          onChange={handleChange(idx)}
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
                        <InputLabel
                          htmlFor={`meta-${col.id}-input-length`}
                          className="label"
                        >
                          {formHeaders[3].name}
                        </InputLabel>
                        <Input
                          id={`meta-${col.id}-input-length`}
                          value={col.length}
                          name="length"
                          className="form"
                          onChange={handleChange(idx)}
                        />
                      </FormControl>
                    </div>
                    <div className={classes.flexRow}>
                      <FormControl className={classes.formControl}>
                        <InputLabel
                          htmlFor={`meta-${col.id}-input-format`}
                          className="label"
                        >
                          {formHeaders[4].name}
                        </InputLabel>
                        <Input
                          id={`meta-${col.id}-input-format`}
                          value={col.format}
                          name="format"
                          className="form"
                          onChange={handleChange(idx)}
                          disabled={col.type !== "date"}
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
                            onChange={handleChange(idx)}
                            color="primary"
                          />
                        }
                        label={<Typography style={{fontSize: "0.875rem"}}>빈값 허용</Typography>}
                      />
                    </div>
                    <div className={`${classes.flexRow} last`}>
                      <FormControl className={classes.formControl}>
                        <Button
                          variant="outlined"
                          startIcon={<SettingsIcon />}
                          >
                          검색조건
                        </Button>
                        
                      </FormControl>
                    </div>
                  </div>
                );
              })}
            </Box>
          </Box>
          <Box textAlign="right">
            <Button variant="contained" color="primary" onClick={onButtonClick}>
              저장
            </Button>
          </Box>
        </Box>
      )}
    </Container>
  );
}
