import axios from "axios";

const getData = async (ppage: number, id: number) => {
  if (id) {
    const data = await axios.get(`https://reqres.in/api/products?id=${id}`);
    const results = data.data;
    return results;
  } else {
    const data = await axios.get(
      `https://reqres.in/api/products?page=${Number(ppage)}&per_page=5`
    );
    const results = data.data;
    return results;
  }
};

export default getData;
