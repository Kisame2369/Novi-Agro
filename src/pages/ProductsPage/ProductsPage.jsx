import productsData from "../../products-data/products.json";
import { useState } from "react";
import ProductItem from "../../components/ProductItem/ProductItem.jsx";
import css from "./ProductsPage.module.css";

export default function ProductsPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategories, setSelectedCategories] = useState([]);

    const categories = [...new Set(productsData.products.map(p => p.group))];

    const handleCategoryChange = (category) => {
        setSelectedCategories(prev => 
            prev.includes(category)
                ? prev.filter(c => c !== category)
                : [...prev, category]
        );
    };


    const filteredProducts = productsData.products.filter(product => {
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

                        <ul className={css.productList}>
                            {filteredProducts.map((product) => (
                                <li key={product.id} className={css.productItem}>
                                    <ProductItem product={product} />
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};