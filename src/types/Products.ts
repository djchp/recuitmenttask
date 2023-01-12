import Product from "../types/Product";



type Products = {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: {
    color: string;
    id: number;
    name: string;
    pantone_value: string;
    year: number;
  };
};


export type ProductsOne = {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
    data: {
      color: string;
      id: number;
      name: string;
      pantone_value: string;
      year: number;
    };
  };
export default Products;
