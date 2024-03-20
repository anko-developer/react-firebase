import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Button from "../components/ui/Button";
import { addOrupdateToCart } from "../api/firebase";
import { useAuthContext } from "../context/AuthContext";

export default function ProductDetail() {
  const {
    user: { uid },
  } = useAuthContext();
  const {
    state: {
      product: { id, image, title, category, price, options },
    },
  } = useLocation();
  const [selected, setSelected] = useState(options && options[0]);

  const handleSelect = (e) => setSelected(e.target.value);
  const handleClick = (e) => {
    const product = { id, image, title, price, option: selected, quantity: 1 };
    addOrupdateToCart(uid, product);
  };
  return (
    <section>
      <img src={image} alt={title} />
      <h2>{title}</h2>
      <p>{price}</p>
      <p>{category}</p>
      <select onChange={handleSelect} value={selected}>
        {options &&
          options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
      </select>
      <Button text={"장바구니에 추가"} onClick={handleClick} />
    </section>
  );
}
