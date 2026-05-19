import { useState, useEffect } from "react";
import ProductItem from "../../components/ProductItem/ProductItem.jsx";
import ProductModal from "../ProductPage/ProductPage.jsx";
import css from "./ProductsPage.module.css";

const PROJECT_ID = "8e6hfi9b";
const DATASET = "production";
const QUERY = encodeURIComponent(`*[_type == "product"] | order(group asc, name asc) {
  _id,
  name,
  group,
  "imageUrl": image.asset->url,
  description,
  composition,
  dosage,
  packaging,
  shelfLife
}`);
const SANITY_URL = `https://${PROJECT_ID}.api.sanity.io/v2023-05-03/data/query/${DATASET}?query=${QUERY}`;

export default function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        fetch(SANITY_URL)
            .then(res => res.json())
            .then(data => {
                setProducts(data.result ?? []);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const categories = [...new Set(products.map(p => p.group))].sort();

    const handleCategoryChange = (category) => {
        setSelectedCategories(prev =>
            prev.includes(category)
                ? prev.filter(c => c !== category)
                : [...prev, category]
        );
    };

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.group);
        return matchesSearch && matchesCategory;
    });

    return (
        <>
            <p className={css.title}>Our Products</p>
            <div className={css.container}>
                <div className={css.wrapper}>
                    <div className={css.leftSection}>
                        <p className={css.filtersTitle}>Filters</p>
                        <div className={css.categoryFilters}>
                            {categories.map(category => (
                                <label className={css.categoryLabel} key={category}>
                                    <input
                                        className={css.categoryCheckbox}
                                        type="checkbox"
                                        checked={selectedCategories.includes(category)}
                                        onChange={() => handleCategoryChange(category)}
                                    />
                                    {category}
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className={css.rightSection}>
                        <input
                            className={css.searchInput}
                            type="text"
                            placeholder="Search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />

                        {loading ? (
                            <p style={{ color: "var(--green)", fontSize: 18 }}>Loading...</p>
                        ) : (
                            <ul className={css.productList}>
                                {filteredProducts.map((product) => (
                                    <li key={product._id} className={css.productItem}>
                                        <ProductItem 
                                            product={product}
                                            onClick={setSelectedProduct}
                                        />
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>

            {selectedProduct && (
                <ProductModal 
                    product={selectedProduct} 
                    onClose={() => setSelectedProduct(null)} 
                />
            )}
        </>
    );
}