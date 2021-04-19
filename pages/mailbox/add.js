import React, { useEffect, useState } from "react";
import api from "../api/mailboxService";
import uuid from "uuid/dist/v4";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
// @material-ui/icons
import People from "@material-ui/icons/People";
import TextField from "@material-ui/core/TextField";
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";

import styles from "assets/jss/nextjs-material-kit/pages/loginPage.js";

import image from "assets/img/bg7.jpg";

const useStyles = makeStyles(styles);

export default function Add(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function () {
    setCardAnimation("");
  }, 700);

  const mailInitialState = {
    id: "",
    building: "",
    room: "",
    itemType: "",
    from: "",
  };
  const [mail, setMail] = useState(mailInitialState);
  const classes = useStyles();
  const { ...rest } = props;
  const [mailBox, setMailBox] = useState([]);
  let idMail = mailBox.length + 1;

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

  function onChangeForm(e) {
    let id = e.target.id;
    let value = e.target.value;
    let mailCode = uuid();
    setMail({ ...mail, id: idMail, [id]: value, mailCode: mailCode });
  }

  const addMailHandler = async (e) => {
    e.preventDefault();
    const req = {
      ...mail,
    };

    const res = await api.post("/mails", req);
    setMailBox([...mailBox, res.data]);
    setMail(mailInitialState);
  };
  return (
    <div>
      <Header
        absolute
        color="transparent"
        brand="NextJS Material Kit"
        rightLinks={<HeaderLinks />}
        {...rest}
      />
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center",
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={6} md={4}>
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form} onSubmit={addMailHandler}>
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4>Add Mail</h4>
                  </CardHeader>
                  <CardBody>
                    <TextField
                      id="standard-basic"
                      id="id"
                      value={mail.id}
                      fullWidth
                      aria-readonly
                      disabled
                      onChange={onChangeForm}
                    />
                    <TextField
                      id="standard-basic"
                      label="Building ..."
                      id="building"
                      value={mail.building}
                      fullWidth
                      onChange={onChangeForm}
                    />
                    <TextField
                      id="standard-basic"
                      label="room ..."
                      id="room"
                      value={mail.room}
                      fullWidth
                      onChange={onChangeForm}
                    />
                    <TextField
                      id="standard-basic"
                      label="itemType ..."
                      id="itemType"
                      value={mail.itemType}
                      fullWidth
                      onChange={onChangeForm}
                    />
                    <TextField
                      id="standard-basic"
                      label="from ..."
                      id="from"
                      value={mail.from}
                      fullWidth
                      onChange={onChangeForm}
                    />
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button simple color="primary" size="lg" type="submit">
                      Add Mail Box
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        <Footer whiteFont />
      </div>
    </div>
  );
}
