import {
  Button,
  Container,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import React from "react";
import { tpp } from "./Interfaces";

const imgurl =
  "https://images.unsplash.com/photo-1617339648529-76cbe1cea71b?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&ixlib=rb-1.2.1&q=80&w=300";

const useStyles = makeStyles((theme: Theme) => ({
  cardi: {
    display: "flex",
    flexDirection: "column",
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    borderRadius: "10px",
    backgroundColor: "#405B99",
    color: "white",
  },
  cimagewrap: {
    flex: 1,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    borderRadius: "10px",
    // backgroundImage: "https://source.unsplash.com/random/500x500",
    // backgroundSize: "cover",
  },
  textwrap: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    flex: 2,
    "&>*": {
      margin: theme.spacing(0.5),
    },
  },
  wrap: {
    display: "flex",
  },
  user: {
    paddingLeft: theme.spacing(2),
    paddingBottom: theme.spacing(1),
  },
  desc: {
    // display: "flex",
    padding: theme.spacing(2),
    maxWidth: "100%",
    wordWrap: "break-word",
  },
}));

// interface CardiProps {
//   title: string;
//   text: string;
//   imgurl: string;
// }
// const Cardi = ({ title, text, imgurl }: CardiProps) => {
//   const classes = useStyles();
//   return (
//     <div className={classes.cardi}>
//       <div className={classes.cimagewrap}>
//         <img src={imgurl} style={{ height: "40px", width: "40px" }} />
//       </div>
//       <div className={classes.textwrap}>
//         <h3>{title}</h3>
//         <h4>{text}</h4>
//       </div>
//     </div>
//   );
// };

const TagView = ({ title, location, album, desc, imgurl, sstate }: tpp) => {
  const classes = useStyles();
  return (
    <Container>
      <Button
        onClick={() => sstate(-1)}
        style={{
          color: "white",
          border: "1px solid white",
          marginLeft: "1rem",
        }}
      >
        Back
      </Button>
      <div className={classes.cardi}>
        <div className={classes.user}>johnnybravo1</div>
        <div className={classes.wrap}>
          <div className={classes.cimagewrap}>
            <img src={imgurl} style={{ maxWidth: "100%" }} />
          </div>
          <div className={classes.textwrap}>
            <h3>{title}</h3>
            <h4>{location}</h4>
          </div>
        </div>
        <div className={classes.desc}>
          <Typography style={{ maxWidth: "100%", whiteSpace: "normal" }}>
            {desc}
          </Typography>
        </div>
      </div>
    </Container>
  );
};

export { TagView };
