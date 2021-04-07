import { Container, makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles({
  cardi: {
    display: "flex",
  },
  cimagewrap: {
    flex: 1,
  },
  textwrap: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
});

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
        <div className={classes.cimagewrap}>
          <img
            src={"https://source.unsplash.com/random"}
            style={{ height: "40px", width: "40px" }}
          />
        </div>
        <div className={classes.textwrap}>
          <h3>Beautiful Experience</h3>
          <h4>Queensland</h4>
        </div>
      </div>
    </Container>
  );
};

export { TagView };
