import { Divider } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/system";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useSearchParams, useNavigate } from "react-router-dom";
import getData from "./helpers/getData";
import "./App.css";
import TableComponent from "./components/TableComponent";
import PaginationComponent from "./components/PaginationComponent";
import getMax from "./helpers/getMax";

function App() {
  const [params, setParams] = useSearchParams();
  const ppage = parseInt(params.get("page")!) || 1;
  const id = parseInt(params.get("id")!);
  const [filterValue, setFilterValue] = useState(id);
  const [max, setMax] = useState<number>();
  const [maxPage, setMaxPage] = useState<number>();
  const navigate = useNavigate();
  const {
    status,
    data: products,
    refetch,
  } = useQuery({
    queryKey: ["products", { ppage }, { id }],
    queryFn: () => getData(ppage, filterValue),
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    const get = async () => {
      const maxes = await getMax();
      if (maxes.total) {
        setMax(maxes.total);
      }
      if (maxes.total_pages) {
        setMaxPage(maxes.total_pages);
      }
    };
    get();
  }, []);

  if (status === "loading") {
    return (
      <Divider>
        <Typography>Loading</Typography>
      </Divider>
    );
  }
  if (status === "error") {
    return (
      <Divider>
        <Divider>
          <Typography>Item with this id does not exist</Typography>
          <Button
            variant="contained"
            onClick={() => {
              navigate("/");
              navigate(0);
            }}
          >
            return{" "}
          </Button>
        </Divider>
      </Divider>
    );
  }
  console.log(max);
  return (
    <>
      <Stack direction="column" alignItems="center">
        <TextField
          id="filter_by_number"
          type="number"
          label="filter_by_id"
          InputProps={{
            inputProps: { min: 0, max: max },
          }}
          value={filterValue}
          onChange={(e) => {
            setFilterValue(Number(e.target.value));
          }}
        ></TextField>
        <Stack direction="row" gap={3} pt={2}>
          <Button
            variant="contained"
            onClick={() => {
              navigate(`?id=${filterValue}`);
              refetch();
            }}
          >
            filter
          </Button>
          <Button
            color="error"
            variant="contained"
            onClick={() => {
              navigate("/");
              navigate(0);
            }}
          >
            reset
          </Button>
        </Stack>

        <TableComponent products={products} />
        <PaginationComponent products={products} ppage={ppage} pagemax={maxPage!}/>
      </Stack>
    </>
  );
}

export default App;
