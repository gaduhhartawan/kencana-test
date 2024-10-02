import { NextApiRequest, NextApiResponse } from "next";
import productsData from "@/data/products.json";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const { category, minPrice, maxPrice } = req.query;

    let filteredProducts = [...productsData.products];

    if (category) {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === category
      );
    }

    if (minPrice) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price >= Number(minPrice)
      );
    }
    if (maxPrice) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price <= Number(maxPrice)
      );
    }

    res.status(200).json({
      products: filteredProducts,
      total_data: filteredProducts.length,
    });
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
