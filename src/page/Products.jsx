import axios from "axios";
import React from "react";
import { Card, Button, Space } from "antd";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const { Meta } = Card;
const fetchProducts = async () => {
  const { data } = await axios.get("http://localhost:3000/products");
  return data;
};

const postProducts = async (newProduct) => {
  return await axios.post("http://localhost:3000/products", newProduct);
};

const Products = () => {
  // Correct query key and function syntax
  const { data, isLoading, error } = useQuery({
    queryKey: ["product"],
    queryFn: fetchProducts,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const addNewProduct = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation(addNewProduct, {
      onSuccess: () => {
        queryClient.invalidateQueries(["product"]);
      },
    });
  };
  const generateRandomId = () => {
    return Math.random().toString(36).substr(2, 9);
  };

  const handleNewProduct = () => {
    mutation.mutate({
      id: generateRandomId(),
      name: "Wireless Charger",
      price: 300,
      image: "./product4.png",
    });
  };

  return (
    <>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {data.map((product) => (
          <Card
            key={product.id}
            hoverable
            style={{
              width: 240,
              borderRadius: "12px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
            cover={
              <img
                alt={product.name}
                src={product.image}
                style={{
                  objectFit: "cover",
                  height: "160px",
                  borderRadius: "12px 12px 0 0",
                }}
              />
            }
          >
            <Meta
              title={
                <div style={{ fontSize: "18px", fontWeight: "bold" }}>
                  {product.name}
                </div>
              }
              description={
                <div
                  style={{
                    color: "#1890ff",
                    fontSize: "16px",
                    fontWeight: "600",
                  }}
                >
                  {product.price}
                </div>
              }
            />
          </Card>
        ))}
      </div>
      <Space wrap>
        <Button type="primary" onClick={handleNewProduct}>
          Add Product
        </Button>
      </Space>
    </>
  );
};

export default Products;
