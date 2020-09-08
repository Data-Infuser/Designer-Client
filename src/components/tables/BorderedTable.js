import React from "react";

import {
  Paper,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Table,
} from "@material-ui/core";

import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  borderedCell: {
    borderRight: "1px solid #ddd",
  }
}));

export default function BorderedTable(props) {
  const classes = useStyles();

  return (
    <TableContainer component={props.container}>
      <Table size={props.size}>
        {props.headers && (
          <TableHead>
            <TableRow>
              {props.headers.map((header) => {
                return (
                  <TableCell key={`table-header-cell-${header}`} className={classes.borderedCell}>
                    {header}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
        )}

        <TableBody>
          {props.rows.map((row) => {
            return (
              <TableRow key={`table-row-${row[0]}`}>
                {row.map((col) => {
                  return (
                    <TableCell className={classes.borderedCell} key={`table-cell-${col}`}>
                      {col}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
