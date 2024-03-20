import React from "react";
import { addOrupdateToCart, removeFromCart } from "../api/firebase";

export default function CartItem({
  product,
  product: { id, image, option, title, quantity },
  uid,
}) {
  const handleMinus = () => {
    if (quantity < 2) return;
    addOrupdateToCart(uid, { ...product, quantity: quantity - 1 });
  };
  const handlePlus = () =>
    addOrupdateToCart(uid, { ...product, quantity: quantity + 1 });

  const handleDelete = () => removeFromCart(uid, id);

  return (
    <li>
      <img src={image} alt={title} />
      <div>
        <p>{title}</p>
        <p>{option}</p>
        <div>
          <button onClick={handleMinus}>-</button>
          <span>{quantity}</span>
          <button onClick={handlePlus}>+</button>
          <button onClick={handleDelete}>삭제</button>
        </div>
      </div>
    </li>
  );
}
