"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Card from "@/shared/card";

export default function Home() {
  const [allProducts, setAllProducts] = useState([]);
  useEffect(() => {
    const fetchStoreProducts = async () => {
      const res = await axios.get("https://fakestoreapi.com/products");
      setAllProducts(res?.data);
    };
    fetchStoreProducts();
  }, []);

  const handleBuy = async (product: any) => {
    console.log("hello world", product);
    const payload = {
      return_url: process.env.NEXT_PUBLIC_SUCCESS_URL,
      website_url: process.env.NEXT_PUBLIC_WEBSITE_URL,
      amount: parseInt(product.price) * 100,
      purchase_order_id: "test12",
      purchase_order_name: "test",
      customer_info: {
        name: "Ashim Upadhaya",
        email: "example@gmail.com",
        phone: "9811496763",
      },
    };

    const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}`, payload);
    if (response) {
      window.location.href = `${response?.data?.data?.payment_url}`;
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h2 className="text-2xl">Khalti Integration into React/Next.js App Tutorial</h2>
      <hr className="bg-white w-full" />
      <div className="flex flex-wrap">
        {allProducts?.map((product: any) => (
          <div
            className="card-wrap w-1/3 p-4 flex flex-col justify-center"
            key={product.title}
          >
            <Card product={product} onhandleBuy={handleBuy} />
          </div>
        ))}
      </div>
    </main>
  );
}
