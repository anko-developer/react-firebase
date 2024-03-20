import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getProducts } from "../api/firebase";
import ProductCard from "./ProductCard";

export default function Products() {
  const {
    isLoading,
    error,
    data: products,
  } = useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts(),
  });
  return (
    <>
      {isLoading && <p>로딩중...</p>}
      {error && <p>에러...</p>}
      <ul>
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </ul>
    </>
  );
}
