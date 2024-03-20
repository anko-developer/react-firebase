import React, { useState } from "react";
import Button from "../components/ui/Button";
import { uploadImage } from "../api/uploader";
import { addNewProduct } from "../api/firebase";

export default function NewProduct() {
  const [product, setProduct] = useState({});
  const [isUploading, setIsUploading] = useState(false);
  const [file, setFile] = useState();
  const [success, setSuccess] = useState();

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
    setIsUploading(true);
    uploadImage(file)
      .then((url) => {
        addNewProduct(product, url).then(() => {
          setSuccess("성공적으로 제품이 추가되었습니다.");
          setTimeout(() => {
            setSuccess(null);
          }, 4000);
        });
      })
      .finally(() => setIsUploading(false));
  };
  return (
    <section>
      <h2>새로운 제품 등록</h2>
      {success && <p>등록에 성공하였습니다!</p>}
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
        <Button
          disabled={isUploading}
          text={isUploading ? "업로드중" : "제품 등록하기"}
        />
      </form>
    </section>
  );
}
