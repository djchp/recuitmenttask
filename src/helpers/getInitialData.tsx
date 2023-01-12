import axios from "axios";
import React from "react";

const getInitialData = async() => {
  const data = await axios.get(`https://reqres.in/api/products?per_page=5`);
  const results = data.data;
  return;
  results;
};

export default getInitialData;
