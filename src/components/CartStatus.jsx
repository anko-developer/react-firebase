import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getCart } from "../api/firebase";
import { useAuthContext } from "../context/AuthContext";

export default function CartStatus() {
  const { uid } = useAuthContext();
  const { data: products } = useQuery({
    queryKey: ["carts"],
    queryFn: () => getCart(uid),
  });
  return <div>{products && <span>{products.length}</span>}</div>;
}
