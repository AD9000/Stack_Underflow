import { Container, makeStyles, Theme, Typography } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme: Theme) => ({
  cardi: {
    display: "flex",
    flexDirection: "column",
    margin: theme.spacing(5),
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

const TagView = () => {
  const classes = useStyles();
  return (
    <Container>
      {/* <Cardi
        title={}
        text={""}
        imgurl={"https://source.unsplash.com/random"}
      /> */}
      <div className={classes.cardi}>
        <div className={classes.user}>johnnybravo1</div>
        <div className={classes.wrap}>
          <div className={classes.cimagewrap}>
            <img
              src={"https://source.unsplash.com/random/500x500"}
              style={{ maxWidth: "100%" }}
            />
          </div>
          <div className={classes.textwrap}>
            <h3>Beautiful Experience</h3>
            <h4>Queensland</h4>
          </div>
        </div>
        <div className={classes.desc}>
          <Typography style={{ maxWidth: "100%", whiteSpace: "normal" }}>
            Proud to be from New Zealand! Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Nam at augue sed ex venenatis ornare eu
            et sapien. Curabitur at est quis diam vehicula aliquam. Cras id
            dignissim ante, ac bibendum lacus.
          </Typography>
        </div>
      </div>
    </Container>
  );
};

export { TagView };
