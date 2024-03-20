import React from "react";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {
  const { id, image, title, category, price } = product;
  const navigate = useNavigate();
  return (
    <li onClick={() => navigate(`/products/${id}`, { state: { product } })}>
      <img src={image} alt={title} />
      <div>
        <h3>{title}</h3>
        <p>{`${price}원`}</p>
      </div>
      <p>{category}</p>
    </li>
  );
}
