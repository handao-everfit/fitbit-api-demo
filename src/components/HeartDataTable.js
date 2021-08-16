import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function HeartDataTable({ data }) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <h3>Heart Rate Log</h3>
      <Table className={classes.table} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Heart Rate Zone</TableCell>
            {data &&
              data.map((item) => (
                <>
                  <TableCell align='right'>{item.name}</TableCell>
                </>
              ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow key='max'>
            <TableCell component='th' scope='row'>
              max
            </TableCell>
            {data &&
              data.map((item) => (
                <>
                  <TableCell align='right'>{item.max}</TableCell>
                </>
              ))}
          </TableRow>

          <TableRow key='min'>
            <TableCell component='th' scope='row'>
              min
            </TableCell>
            {data &&
              data.map((item) => (
                <>
                  <TableCell align='right'>{item.min}</TableCell>
                </>
              ))}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
