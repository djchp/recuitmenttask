import { Divider } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import Modal from "@mui/material/Modal";
import Pagination from "@mui/material/Pagination";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/system";
import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";
import { useQueryClient } from "react-query";
import { useSearchParams, Link, useNavigate } from "react-router-dom";

import "./App.css";

type Product = {
  color: string;
  id: number;
  name: string;
  pantone_value: string;
  year: number;
};
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

function App() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [modalData, setModalData] = useState<Product>({color: '', id: 0, name: '', pantone_value: '', year: 0});
  
  const queryClient = useQueryClient();
  const [params, setParams] = useSearchParams();
  const ppage = parseInt(params.get("page")!) || 1;
  const id = parseInt(params.get("id")!);
  const [filterValue, setFilterValue] = useState(id);
  const fetchData = async (ppage: number, id: number) => {
    if (id) {
      const data = await axios.get(`https://reqres.in/api/products?id=${id}`);
      const results = data.data;
      console.log(results);
      return results;
    } else {
      const data = await axios.get(
        `https://reqres.in/api/products?page=${Number(ppage)}&per_page=5`
      );
      const results = data.data;
      console.log(results);
      return results;
    }
  };
  const {
    status,
    error,
    data: products,
    refetch,
  } = useQuery({
    queryKey: ["products", { ppage }],
    queryFn: () => fetchData(ppage, filterValue),
    keepPreviousData: true,
  });
  const navigate = useNavigate();
  if (status === "loading") {
    return <Divider>Loading</Divider>;
  }
  if (status === "error") {
    return <Divider>faled to fetch</Divider>;
  }
  return (
    <>
      <Stack direction="column" alignItems="center">
        <TextField
          id="filter_by_number"
          type="number"
          label="filter_by_id"
          value={filterValue}
          onChange={(e) => {
            setFilterValue(Number(e.target.value))
          }}
          
        ></TextField>
        {/* <Link to={`?id=${filterValue}`}>filter</Link> */}
          <button onClick={() => {
            navigate(`?id=${filterValue}`)
            refetch()
          }}>filter</button>
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
        {ppage <= 1 ? null : <Link to={`?page=${ppage - 1}`}>Prev Page</Link>}
        <p>current page: {ppage}</p>
        {ppage >= 3 ? null : <Link to={`?page=${ppage + 1}`}>Next Page</Link>}
      </Stack>

      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography>id: {modalData.id}</Typography>
          <Typography>name: {modalData.name}</Typography>
          <Typography>color: {modalData.color}</Typography>
          <Typography>year: {modalData.year}</Typography>
          <Typography>pantone_value: {modalData.pantone_value}</Typography>
        </Box>
      </Modal>
    </>
  );
}

export default App;
