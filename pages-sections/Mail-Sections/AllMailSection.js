import React, { useEffect, useState } from "react";
import api from "../../pages/api/mailboxService";

// @material-ui/core components
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

// core components
import GridContainer from "components/Grid/GridContainer.js";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function AllMailSection() {
  const classes = useStyles();
  const [mailBox, setMailBox] = useState([]);

  const getMaill = async () => {
    const res = await api.get("/mails");
    return res.data;
  };

  useEffect(() => {
    const getAllMailBox = async () => {
      const allMailBox = await getMaill();
      if (allMailBox) setMailBox(allMailBox);
    };

    getAllMailBox();
  }, []);

  return (
    <div className={classes.section}>
      <GridContainer justify="center" style={{ padding: 50 }}>
        <h2 className="{classes.title}" style={{ color: "black" }}>
          Let{"'"}s talk product
        </h2>
        {/* <code style={{ color: "black" }}>{JSON.stringify(mailBox)}</code> */}

        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              {/* <TableRow>
                <StyledTableCell>Dessert (100g serving)</StyledTableCell>
                <StyledTableCell align="left">Calories</StyledTableCell>
                <StyledTableCell align="left">Fat&nbsp;(g)</StyledTableCell>
                <StyledTableCell align="left">Carbs&nbsp;(g)</StyledTableCell>
                <StyledTableCell align="left">
                  Protein&nbsp;(g)
                </StyledTableCell>
              </TableRow> */}
              <TableRow>
                {/* <StyledTableCell>building</StyledTableCell> */}
                <StyledTableCell align="left">room</StyledTableCell>
                <StyledTableCell align="left">itemType</StyledTableCell>
                <StyledTableCell align="left">from</StyledTableCell>
                {/* <StyledTableCell align="left">
                  Protein&nbsp;(g)
                </StyledTableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {/* {rows.map((row) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell component="th" scope="row">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {row.calories}
                  </StyledTableCell>
                  <StyledTableCell align="left">{row.fat}</StyledTableCell>
                  <StyledTableCell align="left">{row.carbs}</StyledTableCell>
                  <StyledTableCell align="left">{row.protein}</StyledTableCell>
                </StyledTableRow>
              ))} */}

              {mailBox
                .map((row) => (
                  <StyledTableRow key={row.id}>
                    <StyledTableCell component="th" scope="row">
                      {row.building} {row.room}
                    </StyledTableCell>
                    {/* <StyledTableCell align="left">{row.room}</StyledTableCell> */}
                    <StyledTableCell align="left">
                      {row.itemType}
                    </StyledTableCell>
                    <StyledTableCell align="left">{row.from}</StyledTableCell>
                    {/* <StyledTableCell align="left">{row.protein}</StyledTableCell> */}
                  </StyledTableRow>
                ))
                .reverse()}
            </TableBody>
          </Table>
        </TableContainer>
      </GridContainer>
    </div>
  );
}
