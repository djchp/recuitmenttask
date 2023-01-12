import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Products from "../types/Products";

type Props = {
  ppage: number;
  products: Products;
};

const PaginationComponent = ({ products, ppage }: Props) => {
  return (
    <div>
      {Array.isArray(products.data) ? (
        <div>
          {ppage <= 1 ? null : (
            <Link to={`?page=${ppage - 1}`}>
              <Typography>Prev Page</Typography>
            </Link>
          )}
          <Typography>current page: {ppage}</Typography>
          {ppage >= products.total_pages ? null : (
            <Link to={`?page=${ppage + 1}`}>
              <Typography>Next Page</Typography>
            </Link>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default PaginationComponent;
