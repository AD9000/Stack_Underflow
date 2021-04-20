import React, { useContext, useEffect, useState } from "react";
import { LatLngTuple } from "leaflet";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  useMapEvent,
  Pane,
  ZoomControl,
} from "react-leaflet";
import {
  Dialog,
  DialogTitle,
  Typography,
  IconButton,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/styles";
import { AppContext } from "./Context";

const mapStyle = "styles/v1/underflow/cknag3sw245zs17o66pbt4dgj";

// map cannot load without default position
const defaultPosition: LatLngTuple = [-33.86785, 51.20732];

const Animation = () => {
  const { createTag } = useContext(AppContext);
  const map = useMapEvent("click", (e) => {
    if (createTag) {
      return;
    }
    map.setView(e.latlng, map.getZoom(), {
      animate: true,
    });
  });
  return null;
};

interface CreateTagProps {
  setNewMarker: Function;
  setMarkersUpdated: Function;
}
const CreateTag = ({ setMarkersUpdated, setNewMarker }: CreateTagProps) => {
  const { createTag, markers, setMarkers } = useContext(AppContext);
  useEffect(() => {
    console.log("create tag update: ", createTag);
  }, [createTag]);

  const map = useMapEvent("click", (e) => {
    if (!createTag) {
      return;
    }
    const { lat, lng } = e.latlng;
    // setMarkers([...markers, [lat, lng]]);
    setNewMarker([lat, lng]);
    setMarkersUpdated(true);
  });

  return null;
};

const MaxBounds = () => {
  const map = useMapEvent("drag", () => {
    if (!map.options.maxBounds) {
      return;
    }
    map.panInsideBounds(map.options.maxBounds, { animate: false });
  });

  return null;
};

const getPosition = async () => {
  if (!navigator.geolocation) {
    return;
  }
  return new Promise((res: PositionCallback, reject: PositionErrorCallback) =>
    navigator.geolocation.getCurrentPosition(res, reject)
  );
};

const useStyles = makeStyles({
  fullScreen: {
    height: "100%",
  },
});

const MapWrapper = () => {
  const classes = useStyles();
  return (
    <div className={classes.fullScreen}>
      <MapContainer
        className={classes.fullScreen}
        center={defaultPosition}
        zoom={3}
        zoomSnap={0.1}
        zoomControl={false}
        minZoom={3}
        maxBounds={[
          [-110, -200],
          [110, 200],
        ]}
        scrollWheelZoom={true}
        // worldCopyJump={true}
      >
        <Map />
      </MapContainer>
    </div>
  );
};

const useStylesMap = makeStyles({
  buttonText: {
    textTransform: "none",
    fontFamily: "farro",
    margin: "0.5rem",
  },
  btn: {
    textTransform: "none",
    fontFamily: "farro",
    fontSize: "x-large",
    margin: "0.5rem",
  },
  dialog: {
    backgroundColor: "#0f214a",
  },
  dialogTitle: {
    color: "white",
    fontFamily: "farro",
    fontSize: "x-large",
    textAlign: "center",
  },
  input: {
    fontFamily: "farro",
    backgroundColor: "#aad0ff",
  },
  blur: {
    backgroundColor: "rgb(255,255,255,0.3)",
  },
  dialogContent: {
    display: "flex",
    flexDirection: "column",
  },
  horizontalFlex: {
    display: "flex",
    flexDirection: "row",
  },
  text: {
    color: "white",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "auto auto",
  },
  closeBtn: {
    position: "absolute",
    color: "#3481e1",
    top: "0px",
    left: "300px",
  },
});

const Map = () => {
  const map = useMap();
  const [markersUpdated, setMarkersUpdated] = useState(false);
  const [newMarker, setNewMarker] = useState<LatLngTuple | null>(null);
  const [createForm, setCreateForm] = useState(false);
  const { markers, createTag, setCreateTag, setOpen, setTagIndex } = useContext(
    AppContext
  );

  const styles = useStylesMap();

  const handleTagClick = (index: number) => {
    if (createTag) {
      return;
    }
    setTagIndex(index);
    setOpen(true);
  };

  const handleClose = () => {
    setCreateForm(false);
    setNewMarker(null);
    setCreateTag(false);
  };

  useEffect(() => {
    (async () => {
      try {
        const pos = await getPosition();
        if (!pos) {
          return;
        }
        map.setView([pos.coords.latitude, pos.coords.longitude]);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [map]);

  useEffect(() => {
    if (markersUpdated) {
      setCreateForm(true);
    }
  }, [markersUpdated]);

  return (
    <>
      <Pane
        name="map"
        style={{ position: "absolute", zIndex: -10, pointerEvents: "none" }}
      >
        <TileLayer
          // noWrap={true}
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"
          // url={`https://api.mapbox.com/${mapStyle}/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_KEY}`}
          pane="map"
        />
      </Pane>

      <Pane name="markers">
        {markers.map((position, index) => (
          <Marker
            eventHandlers={{ click: () => handleTagClick(index) }}
            key={index}
            position={position}
          ></Marker>
        ))}
        {newMarker && <Marker position={newMarker} />}
      </Pane>
      <Animation />
      <MaxBounds />
      <ZoomControl position="bottomleft" />
      {/* <ZoomCheck /> */}
      <CreateTag
        setMarkersUpdated={setMarkersUpdated}
        setNewMarker={setNewMarker}
      />
      {createForm && (
        <Dialog
          open={createForm}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
          className={styles.blur}
          maxWidth="sm"
          BackdropProps={{ style: { backgroundColor: "transparent" } }}
        >
          <div className={styles.dialog}>
            <DialogTitle id="form-dialog-title">
              <Typography className={styles.dialogTitle}>
                <b>Create A Tag</b>
              </Typography>
              <IconButton
                aria-label="close"
                className={styles.closeBtn}
                onClick={handleClose}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent className={styles.dialogContent}>
              <div className={styles.grid}>
                <h3 className={styles.text}>Location</h3>
                <TextField
                  autoFocus
                  variant="outlined"
                  margin="dense"
                  id="location"
                  InputProps={{ className: styles.input }}
                  placeholder="location"
                  // label={<Typography style={{fontFamily:'farro'}}>Username</Typography>}
                />
                <h3 className={styles.text}>Song</h3>
                <TextField
                  autoFocus
                  variant="outlined"
                  margin="dense"
                  id="song"
                  InputProps={{ className: styles.input }}
                  placeholder="Enter spotify url"
                />
                <h3 className={styles.text}>Title</h3>
                <TextField
                  autoFocus
                  variant="outlined"
                  margin="dense"
                  id="title"
                  InputProps={{ className: styles.input }}
                  placeholder="Enter Tag Title"
                />
                <h3 className={styles.text}>Caption</h3>
                <TextField
                  autoFocus
                  variant="outlined"
                  margin="dense"
                  id="caption"
                  size="medium"
                  InputProps={{ className: styles.input }}
                  placeholder="Enter your caption"
                />
              </div>
            </DialogContent>
            <DialogActions
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <Button
                variant="contained"
                style={{ background: "black" }}
                color="primary"
                className={styles.btn}
              >
                <b style={{ fontSize: "large" }}>Insert Photo</b>
              </Button>
              <Button
                variant="contained"
                style={{ background: "black" }}
                color="primary"
                className={styles.btn}
              >
                <b style={{ fontSize: "large" }}>Next</b>
              </Button>
            </DialogActions>
          </div>
        </Dialog>
      )}
    </>
  );
};

export { MapWrapper };
