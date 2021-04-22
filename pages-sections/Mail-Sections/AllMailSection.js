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

export default function AllMailSection() {
  const classes = useStyles();
  const [mailBox, setMailBox] = useState([]);

  const getMaill = async () => {
    const res = await api.get("/mails/");
    return res.data.payload;
  };

  useEffect(() => {
    const getAllMailBox = async () => {
      const allMailBox = await getMaill();
      if (allMailBox) setMailBox(allMailBox);
    };

    getAllMailBox();
  }, [mailBox]);

  const updateMailHandler = async (e) => {
    // e.preventDefault();
    const mail = {
      mailMasterId: e.mailMasterId,
      mailBuilding: e.mailBuilding,
      mailCode: e.mailCode,
      mailComment: null,
      mailFrom: e.mailFrom,
      mailId: e.mailId,
      mailItemType: e.mailItemType,
      mailRoom: e.mailRoom,
      mailStatus: "Recieve",
    };
    const res = await api.put(`/mails/`, mail);
    if (res) {
      alert("Success");
    } else {
      alert("Error");
    }

    // const res = await api.post("/mails", req);
    // setMailBox([...mailBox, res.data]);
    // setMail(mailInitialState);
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
                <StyledTableCell align="left">create date</StyledTableCell>
                <StyledTableCell align="left">room</StyledTableCell>
                <StyledTableCell align="left">itemType</StyledTableCell>
                <StyledTableCell align="left">from</StyledTableCell>
                <StyledTableCell align="left">Detail</StyledTableCell>
                <StyledTableCell align="left">status</StyledTableCell>
                <StyledTableCell align="left"></StyledTableCell>
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

              {mailBox.map((row) => (
                <StyledTableRow key={row.mailId}>
                  <StyledTableCell align="left">
                    {new Date(row.createDate).toLocaleDateString()}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {row.mailBuilding} {row.mailRoom}
                  </StyledTableCell>
                  {/* <StyledTableCell align="left">{row.room}</StyledTableCell> */}
                  <StyledTableCell align="left">
                    {row.mailItemType}
                  </StyledTableCell>
                  <StyledTableCell align="left">{row.mailFrom}</StyledTableCell>
                  <StyledTableCell align="left">
                    <Button round justIcon color="info">
                      <Icon className={classes.icons}>search</Icon>
                    </Button>
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {row.mailStatus}
                  </StyledTableCell>
                  {row.mailStatus === "New Mail" ? (
                    <StyledTableCell align="center">
                      <Button
                        round
                        color="success"
                        style={{ marginRight: 10 }}
                        onClick={() => updateMailHandler(row)}
                      >
                        <Icon className={classes.icons}>check</Icon> Recieve
                      </Button>
                      <Link
                        href="/mailbox/reject/[token]"
                        as={`/mailbox/reject/${row.mailCode}`}
                      >
                        <Button round color="danger">
                          <Icon className={classes.icons}>cancel</Icon> Reject
                        </Button>
                      </Link>
                    </StyledTableCell>
                  ) : (
                    <StyledTableCell align="center">
                      <Button
                        round
                        justIcon
                        color={
                          row.mailStatus === "Recieve" ? "success" : "danger"
                        }
                      >
                        <Icon className={classes.icons}>
                          {row.mailStatus === "Recieve" ? "check" : "cancel"}
                        </Icon>
                      </Button>
                    </StyledTableCell>
                  )}
                  {/* <StyledTableCell align="left">{row.protein}</StyledTableCell> */}
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </GridContainer>
    </div>
  );
}
