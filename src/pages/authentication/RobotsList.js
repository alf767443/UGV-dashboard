import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  card: {
    borderRadius: 16,
    overflow: "hidden",
    height: 200,
    width: 200,
    margin: "0 auto"
  },
  media: {
    height: "100%",
    width: "100%",
    objectFit: "cover"
  },
  addButton: {
    margin: "20px 0"
  }
});

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

function ImageCarousel() {
  const classes = useStyles();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [imageSrcs, setImageSrcs] = useState([]);

  const handleFileSelect = (event) => {
    const files = event.target.files;
    setSelectedFiles([...selectedFiles, ...files]);
    Promise.all([...files].map(getBase64)).then((base64List) => {
      setImageSrcs([...imageSrcs, ...base64List]);
    });
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div>
      <Slider {...settings}>
        {imageSrcs.map((src, index) => (
          <div key={index}>
            <Card className={classes.card}>
              <CardMedia className={classes.media} image={src} />
            </Card>
          </div>
        ))}
      </Slider>
      <Button
        variant="contained"
        component="label"
        startIcon={<CloudUploadIcon />}
        className={classes.addButton}
      >
        Adicionar imagem
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileSelect}
          hidden
        />
      </Button>
    </div>
  );
}

export default ImageCarousel;
