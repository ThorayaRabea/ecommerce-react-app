import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

export default function useProducts() {
  async function getProducts() {
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }

  let productsInfo = useQuery({
    queryKey: ["recentProducts"],
    queryFn: getProducts,
    staleTime: 20000,
    select: (data) => data.data.data,
  });

  return productsInfo;
}
