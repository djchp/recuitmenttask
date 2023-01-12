import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useState } from "react";
import Product from "../types/Product";
import Products, {ProductsOne} from "../types/Products";
import ModalComp from "./ModalComp";

type Props = {
    products: Products
}

const TableComponent = ({products}: Props) => {
  const [modalData, setModalData] = useState<Product>({
    color: "",
    id: 0,
    name: "",
    pantone_value: "",
    year: 0,
  });
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
    
    <Table sx={{ width: "60%" }}>
      <TableHead>
        <TableRow>
          <TableCell>id</TableCell>
          <TableCell>name</TableCell>
          <TableCell>year</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {Array.isArray(products.data) ? (
          products?.data.map((product: Product, id: number) => (
            <>
              <TableRow
                key={id}
                sx={{
                  bgcolor: `${product.color}`,
                  marginY: 2,
                  cursor: "pointer",
                }}
                onClick={() => {
                  setModalData({
                    id: product.id,
                    name: product.name,
                    year: product.year,
                    pantone_value: product.pantone_value,
                    color: product.color,
                  });
                  handleOpen();
                }}
              >
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.year}</TableCell>
              </TableRow>
            </>
          ))
        ) : (
          <TableRow
            sx={{
              bgcolor: `${products.data.color}`,
              marginY: 2,
              cursor: "pointer",
            }}
            onClick={() => {
              setModalData({
                id: products.data.id,
                name: products.data.name,
                year: products.data.year,
                pantone_value: products.data.pantone_value,
                color: products.data.color,
              });
              handleOpen();
            }}
          >
            <TableCell>{products.data.id}</TableCell>
            <TableCell>{products.data.name}</TableCell>
            <TableCell>{products.data.year}</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
    <ModalComp open={open} handleClose={handleClose} modalData={modalData}/>
    </>
  );
};

export default TableComponent;
