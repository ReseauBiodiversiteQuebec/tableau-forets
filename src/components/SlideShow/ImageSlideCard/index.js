import React, { useState } from "react";
import Card from "@mui/material/Card";
//import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import { NoImageBox } from "../ImageBox";
import "./ImageSlideCard.css";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import Backdrop from "@mui/material/Backdrop";
//import Tooltip from "@mui/material/Tooltip";
//import { useTranslation } from "react-i18next";

const Detail = ({ lgn = "fr.", vernacular = "" }) => {
  return (
    <div className="card-detail">
      <div className="card-detail-top card-text-bold">{vernacular}</div>{" "}
      <div>{lgn}</div>
    </div>
  );
};

export default function ImageSlideCard({ image, card }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  //const { t } = useTranslation();

  let styleBigImg = {};
  let aspectRatio = 0;

  if (image) {
    styleBigImg = {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      height: "auto",
      width: "auto",
      maxWidth: "90%",
      maxHeight: "90%",
      bgcolor: "background.paper",
      border: "2px solid #000",
      boxShadow: 24,
      zIndex: 9999999999999,
      background: `url(${image.url})`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundSize: "cover",
    };

    aspectRatio = image.width / image.height;
    if (aspectRatio <= 1) {
      let h = 90 * aspectRatio;
      styleBigImg.width = h + "vh";
      styleBigImg.height = "90vh";
    } else {
      let w = 90 * aspectRatio;
      styleBigImg.width = "90vw";
      styleBigImg.height = w + "vw";
    }
  }
  return (
    <Card sx={{ width: 200, height: "215px" }}>
      <div style={{ position: "relative" }}>
        <div style={{ position: "relative" }}>
          {" "}
          {image !== undefined ? (
            <div style={{ height: "100px", width: "100%" }}>
              <img
                style={{ height: "100%", width: "100%", objectFit: "cover" }}
                src={image.thumburl}
                alt={image.name}
              />
            </div>
          ) : (
            <NoImageBox height={"100px"} />
          )}
          <div
            style={{
              position: "absolute",
              bottom: "5px",
              right: "5px",
              width: "100%",
              height: "100%",
            }}
          >
            <IconButton
              onClick={handleOpen}
              style={{
                width: "100%",
                height: "100%",
                background: "transparent",
              }}
            />

            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
              style={{ zIndex: 9999999999999 }}
            >
              <Fade in={open}>
                <Box sx={styleBigImg}></Box>
              </Fade>
            </Modal>
          </div>
        </div>

        <div className={"card-content-top text-primary-dark-green"}>
          <div className={"card-info"} style={{ flex: 1 }}>
            <div className={"card-title-info"}>
              {card.valid_scientific_name}
            </div>
            <div className={"card-obs-info"}>{`${card.qc_status_fr}`}</div>
          </div>
        </div>
        <div className={"card-content-bottom text-primary-dark-green"}>
          <Detail lgn={"fr."} vernacular={`${card.vernacular_fr}`} />
          <Detail lgn={"en."} vernacular={`${card.vernacular_en}`} />
        </div>
      </div>
    </Card>
  );
}
