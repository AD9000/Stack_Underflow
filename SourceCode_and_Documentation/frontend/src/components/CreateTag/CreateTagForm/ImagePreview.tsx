import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  text: {
    color: "white",
  },
});

export interface DisplayImageProps {
  setImage: Function;
  setImageUrl: Function;
}

/**
 * Allows user to upload an image and preview it before it can be
 * sent to the backend
 * @param props: DisplayImageProps: state for passing it to the
 * backend using the form
 * @returns
 */
const ImageUpload = ({ setImage, setImageUrl }: DisplayImageProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const classes = useStyles();
  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setPreview(URL.createObjectURL(img));
      setImage(event.target.files[0]);
      setImageUrl(URL.createObjectURL(img));
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <h3 className={classes.text}>Image</h3>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "1rem",
          paddingLeft: "3.5rem",
        }}
      >
        {preview && <img src={preview} style={{ maxHeight: "100px" }} />}
        <input
          className={classes.text}
          type="file"
          name="myImage"
          onChange={handleImageChange}
        />
      </div>
    </div>
  );
};
export { ImageUpload };
