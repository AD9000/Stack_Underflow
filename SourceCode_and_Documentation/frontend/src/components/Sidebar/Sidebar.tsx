import React, { useContext, useEffect } from "react";
import clsx from "clsx";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { TagList } from "../Tag/TagList";
import { AppContext } from "context/AppContext";
import { Button } from "@material-ui/core";

const drawerWidth = 540;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      height: "60%",
      position: "absolute",
      width: drawerWidth,
      flexShrink: 1,
      whiteSpace: "nowrap",
      overflow: "hidden",
      "&>*": {
        display: "flex",
        height: "50%",
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

/**
 * Renders the sidebar on the dashboard which opens, closes
 * and displays the taglist
 * @returns JSX.Element: The sidebar
 */
const Sidebar = () => {
  const classes = useStyles();
  const { open, setOpen, tagIndex, setTagIndex } = useContext(AppContext);

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
      <div
        style={{
          cursor: "pointer",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            flex: 1,
          }}
          onClick={toggleDrawer}
        >
          <IconButton style={{ color: "white" }}>
            {open ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        {open && tagIndex >= 0 && (
          <Button
            onClick={() => setTagIndex(-1)}
            style={{
              margin: "1rem",
              height: "50%",
              color: "white",
              border: "1px solid white",
              marginLeft: "1rem",
            }}
          >
            Back
          </Button>
        )}
      </div>
      {open ? <TagList /> : <div style={{ flex: 1, cursor: "pointer" }}></div>}
    </Drawer>
  );
};

export { Sidebar };
