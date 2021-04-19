import React, { useEffect, useState } from "react";
import Link from "next/link";
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
import Icon from "@material-ui/core/Icon";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";

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

export default function ManageMailSection() {
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

  // const removeMailHandler = async (id) => {
  //   console.log(id);
  // };

  const removeMailHandler = async (id) => {
    await api.delete(`/mails/${id}`);
    const newMailBox = mailBox.filter((res) => {
      return res.id !== id;
    });

    setMailBox(newMailBox);
  };

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
                <StyledTableCell align="left"></StyledTableCell>
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
                    <StyledTableCell align="left">
                      <Link
                        href="/mailbox/update/[token]"
                        as={`/mailbox/update/${row.mailCode}`}
                      >
                        <Button
                          justIcon
                          round
                          color="warning"
                          style={{ marginRight: 10 }}
                          // onClick={() => removeMailHandler(row.id)}
                        >
                          <Icon className={classes.icons}>edit</Icon>
                        </Button>
                      </Link>
                      <Button
                        justIcon
                        round
                        color="danger"
                        onClick={() => removeMailHandler(row.id)}
                      >
                        <Icon className={classes.icons}>delete</Icon>
                      </Button>
                    </StyledTableCell>
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
