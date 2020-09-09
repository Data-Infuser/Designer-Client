import React from 'react';
import { 
  Container, Box,
  TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, Table, 
  Button, 
  FormControl, FormControlLabel, FormHelperText, Input, InputLabel, Checkbox, 
} from '@material-ui/core';
import { display } from '@material-ui/system';
import { useParams, useHistory } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { PageTitle, SubTitle } from 'components/typos/Title';
import BorderedTable from 'components/tables/BorderedTable';

const xsWidth = 767;

const formHeaders = [
  "원본 컬럼명", "활용자 제공 컬럼명", "컬럼 타입", 
  "최대 길이", "날짜 형식", "빈값 허용", "검색 설정", 
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
    '&.header': {
      textAlign: "center",
    },
  },
  formControl: {
    width: '100%',
  },
  [theme.breakpoints.up('sm')]: {
    formControl: {
      '& .label': {
        display: "none",
      },
      '& .form': {
        marginTop: 0,
      },
      '& .helpText': {
        display: "none",
      }
    },
  },
  [theme.breakpoints.down('sm')]: {
    flexTable: {
      marginBottom: 16,
      boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
    },
    flexRow: {
      width: '100%',
      '&.header': {
        display: 'none',
        display: 'block',
      },
      '&.last': {
        width: '50%',
      }
    }
  },
}));

export function MetaShow(props) {
  const { id } = useParams();
  const metas = useSelector(state => state.metas.items);
  const meta = metas.find(el => el.id == id)
  const history = useHistory();

  const classes = useStyles();

  const handleChange = (e) => {

  }

  const onButtonClick = (e) => {
    history.push({ pathname: `/metas/${meta.id}/service`, state: {meta: meta}})
  }

  return (
    <Container>
      <PageTitle text="데이터셋 Meta" />
      
      {meta &&
        <Box>
          <Box className="BottomGutter">
            <Box textAlign="left">
              <SubTitle text="데이터 예시" smallText="상위 5건의 원본 데이터를 출력합니다." />
            </Box>
            <BorderedTable
              container={Paper}
              size="small"
              headers={['BIZRNO', 'CORP_NM', 'RPPR_NM', 'ADDR', 'TELNO', 'RMK_TXT']}
              rows={JSON.parse(meta.samples).items} />
          </Box>

          <Box className="BottomGutter">
            <Box textAlign="left">
              <SubTitle text="메타데이터 정의" smallText="원천 데이터의 컬럼 정보를 정의합니다." />
            </Box>

            <Box className={classes.flexTableContainer}>
              <div className={classes.flexTable}>
                {formHeaders.map(header => {
                  return <div key={header} className={`${classes.flexRow} header`}>{header}</div>
                })}
              </div>

              {meta.columns.map(row => {
                return(
                  <div className={classes.flexTable} key={`meta-sample-meta-row-${row.id}`}>
                    <div className={classes.flexRow}>{row.originalColumnName}</div>
                    <div className={classes.flexRow}>
                      <FormControl className={classes.formControl}>
                        <InputLabel htmlFor={`meta-${row.id}-input-columnName`}
                          className="label">
                          {formHeaders[1]}
                        </InputLabel>
                        <Input id={`meta-${row.id}-input-columnName`}
                          className="form"
                          value={row.columnName} />
                        <FormHelperText className="helpText">
                          활용자에게 제공되는 컬럼 명칭입니다.
                        </FormHelperText>
                      </FormControl>
                    </div>
                    <div className={classes.flexRow}>
                      <FormControl className={classes.formControl}>
                        <InputLabel htmlFor={`meta-${row.id}-input-type`}
                          className="label">
                          {formHeaders[2]}
                        </InputLabel>
                        <Input id={`meta-${row.id}-input-type`} 
                          value={row.type} 
                          className="form"
                          onChange={handleChange} />
                      </FormControl>
                    </div>
                    <div className={classes.flexRow}>
                      <FormControl className={classes.formControl}>
                        <InputLabel htmlFor={`meta-${row.id}-input-length`}
                          className="label">
                          {formHeaders[3]}
                        </InputLabel>
                        <Input id={`meta-${row.id}-input-length`} 
                          value={row.length}
                          className="form"
                          onChange={handleChange} />
                      </FormControl>
                    </div>
                    <div className={classes.flexRow}>
                      <FormControl className={classes.formControl}>
                        <InputLabel htmlFor={`meta-${row.id}-input-format`}
                          className="label">
                            {formHeaders[4]}
                          </InputLabel>
                        <Input id={`meta-${row.id}-input-format`} 
                          value={row.format} 
                          className="form"
                          onChange={handleChange} 
                          disabled={row.type !== 'date'}/>
                      </FormControl>
                    </div>
                    <div className={`${classes.flexRow} last`}>
                      <FormControlLabel 
                        control={
                          <Checkbox id={`meta-${row.id}-input-nullable`} 
                            checked={row.nullable} 
                            onChange={handleChange} 
                            color="primary"/>
                        }
                        label="빈값 허용" />                      
                    </div>
                    <div className={`${classes.flexRow} last`}>
                      <FormControl className={classes.formControl}>
                        검색조건
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
      }
      
    </Container>
  )
}