import styled from "styled-components";
import ImageCarousel from "../components/ImageCarousel";
import ImageOverlay from "../components/ImageOverlay";
import ProductInfo from "../components/ProductInfo";
import { productImages, productThumbnails } from "../assets/imagedata";
import { useGlobalContext } from "../context/context";
import { data } from "../utils/data";
import { useEffect } from "react";
import axios from "axios";
import { axiosInstance } from "../utils/axios";
import { useState } from "react";
const Product = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProduk = async () => {
      try {
        const res = await axiosInstance.get("/api/product");

        setProducts(res.data?.data);
        console.log(products);
      } catch (error) {
        console.log(error);
        return error;
      }
    };

    getProduk();

    return () => {};
  }, []);

  return (
    <ProductWrapper>
      <ImageCarousel
        productImages={productImages}
        productThumbnails={productThumbnails}
      />
      {products.length === 0 ? (
        <p>mmk</p>
      ) : (
        products.map((item) => {
          return <ProductInfo key={item?.id} {...item} />;
        })
      )}
    </ProductWrapper>
  );
};

const ProductWrapper = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media only screen and (min-width: 768px) {
    margin-top: 5rem;
  }

  @media only screen and (min-width: 1000px) {
    margin-top: 9rem;
    gap: 5rem;
    display: grid;
    grid-template-columns: 44.5rem 44.5rem;
  }

  @media only screen and (min-width: 1200px) {
    gap: 11rem;
  }
`;

export default Product;
