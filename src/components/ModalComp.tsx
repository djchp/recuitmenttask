import { Box, Typography } from "@mui/material";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import Product from "../types/Product";


const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

type Props = {
  open: boolean
  handleClose: VoidFunction
  modalData: Product
}

const ModalComp = ({open, handleClose,modalData}: Props) => {
  return (
    <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography>id: {modalData.id}</Typography>
          <Typography>name: {modalData.name}</Typography>
          <Typography>color: {modalData.color}</Typography>
          <Typography>year: {modalData.year}</Typography>
          <Typography>pantone_value: {modalData.pantone_value}</Typography>
        </Box>
      </Modal>
  )
}

export default ModalComp