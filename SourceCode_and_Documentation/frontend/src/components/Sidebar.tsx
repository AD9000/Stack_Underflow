import React, { useContext, useEffect } from "react";
import clsx from "clsx";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
// import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { TagList } from "./TagList";
import { AppContext } from "./Context";

const drawerWidth = 540;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuButton: {
      marginRight: 36,
    },
    hide: {
      display: "none",
    },
    drawer: {
      height: "60%",
      position: "absolute",
      width: drawerWidth,
      flexShrink: 1,
      whiteSpace: "nowrap",
      overflow: "hidden",
      "&>*": {
        display: "flex",
        height: "58%",
        borderRadius: "10px 0px 0px 10px",
        top: 220,
        backgroundColor: "#0D204B",
      },
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: "hidden",
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9) + 1,
      },
    },
    toolbar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  })
);

const Sidebar = () => {
  const classes = useStyles();
  const { open, setOpen, setTagIndex } = useContext(AppContext);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const openDrawer = () => {
    if (!open) {
      setOpen(true);
    }
  };

  useEffect(() => {
    if (!open) {
      setTagIndex(-1);
    }
  }, [open, setTagIndex]);

  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        }),
      }}
      anchor="right"
      onClick={openDrawer}
    >
      <div style={{ cursor: "pointer" }} onClick={toggleDrawer}>
        <IconButton style={{ color: "white" }}>
          {open ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </div>
      {/* <Divider /> {// add divider here, make part above highlighted on hover } */}
      {open ? <TagList /> : <div style={{ flex: 1, cursor: "pointer" }}></div>}
    </Drawer>
  );
};

export { Sidebar };
