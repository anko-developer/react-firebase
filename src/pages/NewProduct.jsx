import React, { useState } from "react";
import Button from "../components/ui/Button";
import { uploadImage } from "../api/uploader";
import { addNewProduct } from "../api/firebase";

export default function NewProduct() {
  const [product, setProduct] = useState({});
  const [file, setFile] = useState();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setFile(files && files[0]);
      return;
    }
    setProduct((product) => ({ ...product, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    uploadImage(file).then((url) => {
      addNewProduct(product, url);
    });
  };
  return (
    <section>
      {file && <img src={URL.createObjectURL(file)} alt="local file" />}
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          name="file"
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="title"
          value={product.title ?? ""}
          onChange={handleChange}
          placeholder="제품명"
          required
        />
        <input
          type="number"
          name="price"
          value={product.price ?? ""}
          onChange={handleChange}
          placeholder="가격"
        />
        <input
          type="text"
          name="category"
          value={product.category ?? ""}
          onChange={handleChange}
          placeholder="카테고리"
        />
        <input
          type="text"
          name="description"
          value={product.description ?? ""}
          onChange={handleChange}
          placeholder="제품 설명"
        />
        <input
          type="text"
          name="options"
          value={product.options ?? ""}
          onChange={handleChange}
          placeholder="옵션들(콤마(,)로 구분)"
        />
        <Button text={"제품 등록하기"} />
      </form>
    </section>
  );
}
