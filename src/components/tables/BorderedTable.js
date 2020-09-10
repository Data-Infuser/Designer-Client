import React, { Component } from "react";

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

/**
 * 
 * @param {{container: Component, size: number, headers: string[], rows: Object[]}} props
 */
export default function BorderedTable({ container, size, headers, rows }) {
  const classes = useStyles();

  return (
    <TableContainer component={container}>
      <Table size={size}>
        {headers && (
          <TableHead>
            <TableRow>
              <TableRow selected/>
              {headers.map((header) => {
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
          {rows.map((row) => {
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
