import { useState, useEffect } from "react";
import ProductItem from "../../components/ProductItem/ProductItem.jsx";
import ProductModal from "../../components/ProductModal/ProductModal.jsx";
import css from "./ProductsPage.module.css";
import Loader from "../../components/Loader/Loader.jsx";

const PROJECT_ID = "8e6hfi9b";
const DATASET = "production";

const PRODUCTS_QUERY = encodeURIComponent(`*[_type == "product"] | order(group asc, name asc) {
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

const PRODUCT_LIST_QUERY = encodeURIComponent(`*[_type == "productList"] | order(group asc, name asc) {
  _id,
  name,
  group,
  description,
  composition,
  dosage,
  packaging,
  shelfLife
}`);

const SANITY_URL = `https://${PROJECT_ID}.api.sanity.io/v2023-05-03/data/query/${DATASET}`;

const VARIANT_GROUPS = ["Concentrates", "Amino Acids", "Animal Proteins", "Premixes"];

export default function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [productListItems, setProductListItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [groupProducts, setGroupProducts] = useState([]);
    const [groupImageUrl, setGroupImageUrl] = useState(null);

    useEffect(() => {
        Promise.all([
            fetch(`${SANITY_URL}?query=${PRODUCTS_QUERY}`).then(r => r.json()),
            fetch(`${SANITY_URL}?query=${PRODUCT_LIST_QUERY}`).then(r => r.json()),
        ]).then(([productsData, listData]) => {
            setProducts(productsData.result ?? []);
            setProductListItems(listData.result ?? []);
            setLoading(false);
        }).catch(() => setLoading(false));
    }, []);

    const categories = [...new Set(products.map(p => p.group))].sort();

    const handleCategoryChange = (category) => {
        setSelectedCategories(prev =>
            prev.includes(category)
                ? prev.filter(c => c !== category)
                : [...prev, category]
        );
    };

    const handleProductClick = (product) => {
        if (VARIANT_GROUPS.includes(product.group)) {
            const variants = productListItems.filter(p => p.group === product.group);
            setGroupProducts(variants);
            setGroupImageUrl(product.imageUrl ?? null);
            const matched = variants.find(p => p.name === product.name) ?? variants[0] ?? product;
            setSelectedProduct(matched);
        } else {
            setGroupProducts([]);
            setGroupImageUrl(null);
            setSelectedProduct(product);
        }
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
                            <Loader inline />
                        ) : (
                            <ul className={css.productList}>
                                {filteredProducts.map((product) => (
                                    <li key={product._id} className={css.productItem}>
                                        <ProductItem
                                            product={product}
                                            onClick={handleProductClick}
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
                    groupProducts={groupProducts}
                    groupImageUrl={groupImageUrl}
                    onProductChange={setSelectedProduct}
                    onClose={() => {
                        setSelectedProduct(null);
                        setGroupProducts([]);
                        setGroupImageUrl(null);
                    }}
                />
            )}
        </>
    );
}