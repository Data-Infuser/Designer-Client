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
import { SubTitle } from "components/typos/Title";
import HelpIcon from "@material-ui/icons/Help";
import SettingsIcon from "@material-ui/icons/Settings";

import MetaRowForm from "./MetaRowForm";
import BorderedTable from "../../components/tables/BorderedTable";
import { PageTitle } from "../../components/typos/Title";

const xsWidth = 767;

const formHeaders = [
  { key: "formHeader1", name: "원본 컬럼명" },
  {
    key: "formHeader2",
    name: "제공 컬럼명",
    tooltip: "활용자에게 제공되는 컬럼 명칭입니다.",
  },
  { key: "formHeader3", name: "컬럼 타입" },
  { key: "formHeader4", name: "최대 길이", tooltip: "정수: 자릿수, 소수: 전체자릿수, 소수점 자릿수" },
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
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
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
  const cols = meta.columns;

  const history = useHistory();

  const classes = useStyles();

  const updateCol = (newCol) => {
    const colIdx = cols.findIndex((el) => el.id == newCol.id);
    cols[colIdx] = newCol;
  };

  const onButtonClick = (e) => {
    console.log(cols);
    // history.push({
    //   pathname: `/metas/${meta.id}/operation/new`,
    //   state: { meta: meta },
    // });
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
                  <MetaRowForm
                    key={`MetaRowForm${idx}`}
                    col={col}
                    updateCol={updateCol}
                    formHeaders={formHeaders}
                    classes={classes}
                  />
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
