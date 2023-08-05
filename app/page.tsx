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
            <Card product={product} />
          </div>
        ))}
      </div>
    </main>
  );
}
