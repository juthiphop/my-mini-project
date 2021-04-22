import React, { useEffect, useState } from "react";
import api from "../../../api/mailboxService";
import { useRouter } from "next/router";
import Router from "next/router";
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

export default function Update(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function () {
    setCardAnimation("");
  }, 700);

  const router = useRouter();
  const { token } = router.query;

  const mailInitialState = {
    mailId: "",
    mailBuilding: "",
    mailRoom: "",
    mailItemType: "",
    mailFrom: "",
    mailCode: "",
  };
  const [mail, setMail] = useState(mailInitialState);
  const classes = useStyles();
  const { ...rest } = props;

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
    setMail({ ...mail, [id]: value });
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
    // const req = {
    //   ...mail,
    // };

    // const res = await api.post("/mails", req);
    // setMailBox([...mailBox, res.data]);
    // setMail(mailInitialState);
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
                <form className={classes.form} onSubmit={updateMailHandler}>
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4>Update Mail</h4>
                  </CardHeader>
                  <CardBody>
                    <TextField
                      id="standard-basic"
                      id="mailId"
                      value={mail.mailId}
                      fullWidth
                      aria-readonly
                      disabled
                      onChange={onChangeForm}
                    />
                    <TextField
                      id="standard-basic"
                      label="Building ..."
                      id="mailBuilding"
                      value={mail.mailBuilding}
                      fullWidth
                      onChange={onChangeForm}
                    />
                    <TextField
                      id="standard-basic"
                      label="room ..."
                      id="mailRoom"
                      value={mail.mailRoom}
                      fullWidth
                      onChange={onChangeForm}
                    />
                    <TextField
                      id="standard-basic"
                      label="itemType ..."
                      id="mailItemType"
                      value={mail.mailItemType}
                      fullWidth
                      onChange={onChangeForm}
                    />
                    <TextField
                      id="standard-basic"
                      label="from ..."
                      id="mailFrom"
                      value={mail.mailFrom}
                      fullWidth
                      onChange={onChangeForm}
                    />
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button simple color="primary" size="lg" type="submit">
                      Update Mail Box
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

// const Update = () => {
// const router = useRouter();
// const { token } = router.query;

//   return (
//     <>
//       <h1>Post: {token}</h1>
//       <ul>
//         <li>
//           <Link
// href="/post/[token]/[comment]"
// as={`/post/${token}/first-comment`}
//           >
//             <a>First comment</a>
//           </Link>
//         </li>
//         <li>
//           <Link
//             href="/post/[token]/[comment]"
//             as={`/post/${token}/second-comment`}
//           >
//             <a>Second comment</a>
//           </Link>
//         </li>
//       </ul>
//     </>
//   );
// };

// export default Update;
