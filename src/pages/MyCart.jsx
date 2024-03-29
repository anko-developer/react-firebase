import React from "react";
import { getCart } from "../api/firebase";
import { useAuthContext } from "../context/AuthContext";
import CartItem from "../components/CartItem";
import { useQuery } from "@tanstack/react-query";
import PriceCard from "../components/PriceCard";

const SHIPPING = 3000;
export default function MyCart() {
  const { uid } = useAuthContext();
  const { isLoading, data: products } = useQuery({
    queryKey: ["carts"],
    queryFn: () => getCart(uid),
  });
  if (isLoading) return <p>Loading...</p>;
  const hasProducts = products && products.length > 0;
  const totalPrice =
    products &&
    products.reduce(
      (prev, current) => prev + parseInt(current.price) * current.quantity,
      0
    );
  return (
    <section>
      <p>내 장바구니</p>
      {!hasProducts && <p>장바구니에 상품이 없습니다.</p>}
      {hasProducts && (
        <>
          <ul>
            {products &&
              products.map((product) => (
                <CartItem key={product.id} product={product} uid={uid} />
              ))}
          </ul>
          <div>
            <PriceCard text="상품 총액" price={totalPrice} />
            <span> + </span>
            <PriceCard text="배송비" price={SHIPPING} />
            <span> = </span>
            <PriceCard text="총가격" price={totalPrice + SHIPPING} />
          </div>
        </>
      )}
    </section>
  );
}
