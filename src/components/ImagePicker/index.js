/* eslint-disable no-unused-vars */

import React, { useState } from "react";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { makeStyles } from "@mui/styles";
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import { SvgIcon } from '@mui/material';
import ImageCarousel from "./carrousel";

const useStyles = makeStyles({
  card: {
    borderRadius: 16,
    overflow: "hidden"
  },
  media: {
    height: 200,
    width: 200,
    objectFit: "cover",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
});

// function getBase64(file) {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => resolve(reader.result);
//     reader.onerror = error => reject(error);
//   });
// }

function UploadImage(imageSrc = null) {
  const classes = useStyles();
  // const [selectedFile, setSelectedFile] = useState(null);
  // const [imageSrc, setImageSrc] = useState(null);

  // const handleFileSelect = (event) => {
  //   const file = event.target.files[0];
  //   setSelectedFile(file);
  //   getBase64(file).then((base64) => {
  //     console.debug("file stored", file.name, base64);
  //     setImageSrc(base64);
  //   });
  // };

  return (
    <div>
      {imageSrc ?
        <Card className={classes.card}>
          <CardMedia className={classes.media} image={imageSrc} />
        </Card>
      :
      <Card className={classes.card}>
        <SvgIcon className={classes.media} component={PrecisionManufacturingIcon} />
      </Card>}
    </div>
  );
}

export default UploadImage;
