import { useState } from "react";
import { GetServerSideProps } from "next";
import styles from "@/styles/Product.module.css";
import Image from "next/image";
import Link from "next/link";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  imageUrl: string;
}

interface ProductsResponse {
  products: Product[];
  total: number;
}

interface ProductsPageProps {
  initialProducts: Product[];
  categories: string[];
}

export default function ProductsPage({
  initialProducts,
  categories,
}: ProductsPageProps) {
  const [products, setProducts] = useState(initialProducts);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [loading, setLoading] = useState(false);

  const handleFilter = async () => {
    setLoading(true);
    let url = "/api/products?";

    if (selectedCategory) {
      url += `category=${selectedCategory}&`;
    }
    if (priceRange.min) {
      url += `minPrice=${priceRange.min}&`;
    }
    if (priceRange.max) {
      url += `maxPrice=${priceRange.max}&`;
    }

    try {
      const response = await fetch(url);
      const data: ProductsResponse = await response.json();
      setProducts(data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(price);
  };

  return (
    <div className={styles.container}>
      <Link href="/" className={styles.backButton}>
        &larr; Kembali ke Home
      </Link>
      <h1 className={styles.title}>Produk Kami</h1>

      <div className={styles.filters}>
        <div className={styles.filterGroup}>
          <label htmlFor="category">Kategori:</label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Semua Kategori</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label htmlFor="minPrice">Harga Minimum:</label>
          <input
            type="number"
            id="minPrice"
            value={priceRange.min}
            onChange={(e) =>
              setPriceRange({ ...priceRange, min: e.target.value })
            }
            placeholder="Rp 0"
          />
        </div>

        <div className={styles.filterGroup}>
          <label htmlFor="maxPrice">Harga Maksimum:</label>
          <input
            type="number"
            id="maxPrice"
            value={priceRange.max}
            onChange={(e) =>
              setPriceRange({ ...priceRange, max: e.target.value })
            }
            placeholder="Rp 999999999"
          />
        </div>

        <button
          onClick={handleFilter}
          className={styles.filterButton}
          disabled={loading}
        >
          {loading ? "Memuat..." : "Filter"}
        </button>
      </div>

      <div className={styles.grid}>
        {products.map((product) => (
          <div key={product.id} className={styles.card}>
            <div className={styles.imageContainer}>
              <Image src={product.imageUrl} alt={product.name} fill objectFit="cover" />
            </div>
            <div className={styles.cardContent}>
              <h2>{product.name}</h2>
              <p className={styles.description}>{product.description}</p>
              <p className={styles.price}>{formatPrice(product.price)}</p>
              <p className={styles.category}>{product.category}</p>
              <p className={styles.stock}>Stok: {product.stock}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await fetch(`http://localhost:3000/api/products`);
  const data: ProductsResponse = await response.json();

  const categories = Array.from(
    new Set(data.products.map((product) => product.category))
  );

  return {
    props: {
      initialProducts: data.products,
      categories,
    },
  };
};
