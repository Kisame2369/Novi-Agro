import { useState, useEffect } from "react";
import ProductModal from "../../components/ProductModal/ProductModal.jsx";
import css from "./ProductsPage.module.css";
import Loader from "../../components/Loader/Loader.jsx";

const PROJECT_ID = import.meta.env.VITE_SANITY_PROJECT_ID;
const DATASET = import.meta.env.VITE_SANITY_DATASET;
const SANITY_URL = `https://${PROJECT_ID}.api.sanity.io/v2023-05-03/data/query/${DATASET}`;

const CATEGORIES_QUERY = encodeURIComponent(`*[_type == "productCategory"] | order(group asc) {
  _id,
  group,
  description,
  "imageUrl": image.asset->url
}`);

const PRODUCTS_QUERY = encodeURIComponent(`*[_type == "product"] | order(name asc) {
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

export default function ProductsPage() {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedGroups, setSelectedGroups] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        Promise.all([
            fetch(`${SANITY_URL}?query=${CATEGORIES_QUERY}`).then(r => r.json()),
            fetch(`${SANITY_URL}?query=${PRODUCTS_QUERY}`).then(r => r.json()),
        ]).then(([catData, prodData]) => {
            setCategories(catData.result ?? []);
            setProducts(prodData.result ?? []);
            setLoading(false);
        }).catch(() => setLoading(false));
    }, []);

    const allGroups = [...new Set(categories.map(c => c.group))].sort();

    const handleGroupToggle = (group) => {
        setSelectedGroups(prev =>
            prev.includes(group) ? prev.filter(g => g !== group) : [...prev, group]
        );
    };

    const filteredCategories = categories.filter(cat => {
        const matchesSearch = cat.group.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = selectedGroups.length === 0 || selectedGroups.includes(cat.group);
        return matchesSearch && matchesFilter;
    });

    const handleCategoryClick = (category) => {
        const groupProducts = products.filter(p => p.group === category.group);
        setSelectedCategory({ ...category, groupProducts });
        setSelectedProduct(null);
    };

    return (
        <>
            <p className={css.title}>Our Products</p>
            <div className={css.container}>
                <div className={css.wrapper}>
                    <div className={css.leftSection}>
                        <p className={css.filtersTitle}>Filters</p>
                        <div className={css.categoryFilters}>
                            {allGroups.map(group => (
                                <label className={css.categoryLabel} key={group}>
                                    <input
                                        className={css.categoryCheckbox}
                                        type="checkbox"
                                        checked={selectedGroups.includes(group)}
                                        onChange={() => handleGroupToggle(group)}
                                    />
                                    {group}
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className={css.rightSection}>
                        <input
                            className={css.searchInput}
                            type="text"
                            placeholder="Search categories..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />

                        {loading ? (
                            <Loader inline />
                        ) : (
                            <ul className={css.categoryGrid}>
                                {filteredCategories.map((cat) => (
                                    <li key={cat._id}>
                                        <button
                                            className={css.categoryCard}
                                            onClick={() => handleCategoryClick(cat)}
                                        >
                                            <div className={css.imageWrapper}>
                                                {cat.imageUrl ? (
                                                    <img src={cat.imageUrl} alt={cat.group} className={css.image} />
                                                ) : (
                                                    <div className={css.noImage} />
                                                )}
                                            </div>
                                            <p className={css.categoryName}>{cat.group}</p>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>

            {selectedCategory && (
                <ProductModal
                    category={selectedCategory}
                    selectedProduct={selectedProduct}
                    onProductChange={setSelectedProduct}
                    onClose={() => {
                        setSelectedCategory(null);
                        setSelectedProduct(null);
                    }}
                />
            )}
        </>
    );
}