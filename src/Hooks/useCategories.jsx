import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

export default function useCategories() {
  async function getAllCategory() {
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  }

  let categoryInfo = useQuery({
    queryKey: ["allCategories"],
    queryFn: getAllCategory,
    staleTime: 20000,
    select: (data) => data.data.data,
  });

  return categoryInfo;
}
