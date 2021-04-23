import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import api from "../../pages/api/mailboxService";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";

// @material-ui/icons

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/nextjs-material-kit/pages/landingPageSections/workStyle.js";

const useStyles = makeStyles(styles);

export default function RejectSection(props) {
  const classes = useStyles();
  const router = useRouter();
  const { token } = router.query;
  const mailInitialState = {
    mailId: "",
    mailBuilding: "",
    mailRoom: "",
    mailItemType: "",
    mailFrom: "",
    mailCode: "",
    mailCommentReason: "",
    mailCommentDetail: "",
  };
  const [mail, setMail] = useState(mailInitialState);

  const getMaill = async () => {
    const res = await api.get(`/mails/getMail/?mailCode=${token}`);
    return res.data.payload;
  };

  useEffect(() => {
    const getAllMailBox = async () => {
      const allMailBox = await getMaill();
      if (allMailBox) setMail(allMailBox[0]);
    };

    getAllMailBox();
  }, []);

  function onChangeForm(e) {
    let id = e.target.id;
    let value = e.target.value;
    console.log(e.target);
    console.log(e.target.id);
    console.log(e.target.value);
    // setMail({ ...mail, [id]: value });
  }

  const updateMailHandler = async (e) => {
    e.preventDefault();
    // console.log(mail);
    const res = await api.put(`/mails/`, mail);
    if (res) {
      Router.push("/mailbox/edit");
    } else {
      alert("error");
    }
  };

  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem cs={12} sm={12} md={8}>
          <h2 className={classes.title}>Work with us</h2>
          <h4 className={classes.description}>
            <code>{token}</code>
            <br />
            <code>{JSON.stringify(mail)}</code>
          </h4>
          <form className={classes.form} onSubmit={updateMailHandler}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <InputLabel id="mailCommentReason">Reason</InputLabel>
                <Select
                  labelid="mailCommentReason"
                  id="mailCommentReason"
                  name="mailCommentReason"
                  value={mail.mailCommentReason}
                  fullWidth
                  onChange={onChangeForm}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </GridItem>
              <TextField
                id="mailCommentDetail"
                label="Multiline"
                multiline
                rows={4}
                fullWidth
                onChange={onChangeForm}
                defaultValue="Default Value"
                variant="outlined"
              />
              <GridItem xs={12} sm={12} md={4} className={classes.textCenter}>
                <Button color="primary">Send Message</Button>
              </GridItem>
            </GridContainer>
          </form>
        </GridItem>
      </GridContainer>
    </div>
  );
}
