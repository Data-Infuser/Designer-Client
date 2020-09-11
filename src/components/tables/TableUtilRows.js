import React from 'react';
import { TableRow, TableCell, CircularProgress } from '@material-ui/core';

/**
 * 
 * @param props
 * @param {number} props.colSpan 차지하는 Column의 개수
 * @param {string} props.text Row에 들어갈 텍스트
 */
export function TableEmptyRow({ colSpan = 1, text = "Empty Row" }) {
  return (
    <TableRow>
      <TableCell colSpan={colSpan} align="center">
        {text}
      </TableCell>
    </TableRow>
  )
}

/**
 * 
 * @param {{colSpan: number}} props 
 */
export function TableLodingProgress({ colSpan }) {
  return (
    <TableRow>
      <TableCell colSpan={colSpan} align="center">
        <CircularProgress/>
      </TableCell>
    </TableRow>
  )
}