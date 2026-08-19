import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader.jsx";
import PartOne from "../../components/PartOne/PartOne.jsx";
import PartTwo from "../../components/PartTwo/PartTwo.jsx";
import PartThree from "../../components/PartThree/PartThree.jsx";

import css from "./MainPage.module.css";


const PROJECT_ID = import.meta.env.VITE_SANITY_PROJECT_ID;
const DATASET = import.meta.env.VITE_SANITY_DATASET;
const NEW_PRODUCT_QUERY = encodeURIComponent(`*[_type == "newProduct"][0] {
  name,
  group,
  "imageUrl": image.asset->url,
  description,
  composition,
  dosage,
  packaging,
  shelfLife
}`);
const SANITY_URL = `https://${PROJECT_ID}.api.sanity.io/v2023-05-03/data/query/${DATASET}?query=${NEW_PRODUCT_QUERY}`;

export default function MainPage() {
    const [newProduct, setNewProduct] = useState(null);
    const [newProductLoading, setNewProductLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(SANITY_URL)
            .then(r => r.json())
            .then(data => {
                setNewProduct(data.result ?? null);
                setNewProductLoading(false);
            })
            .catch(() => setNewProductLoading(false));
    }, []);

    const handleExplore = (e) => {
        e.preventDefault();
        navigate("/products");
    };

    return (
        <div>
            <div className={css.sliderContainer}>
                <video
                    className={css.heroVideo}
                    src="/videos/top.mp4"
                    poster="/videos/top.webp"
                    autoPlay
                    loop
                    muted
                    playsInline
                />

                <div className={css.overlay}>
                    <h1>Quality feed - Healthy life</h1>
                    <p>The best feed for your animals</p>
                    <NavLink to="/products" end className={css.button} onClick={handleExplore}>
                        Our products
                    </NavLink>
                </div>
            </div>
            <PartOne />
            <PartTwo />
            <PartThree />  
            {newProductLoading ? (
                <Loader inline />
            ) : newProduct ? (
                <section id="new-product-section" className={css.newProductSection}>
                    <div className={css.newProductInner}>
                        <div className={css.newProductContent}>
                            <div className={css.newProductText}>
                                <div className={css.newProductBadge}>
                                    <span>New Arrival</span>
                                </div>
                                {newProduct.group && (
                                    <p className={css.newProductLabel}>{newProduct.group}</p>
                                )}
                                <h2 className={css.newProductTitle}>{newProduct.name}</h2>
                                {newProduct.description && (
                                    <p className={css.newProductDescription}>{newProduct.description}</p>
                                )}
                                {(newProduct.dosage || newProduct.packaging || newProduct.shelfLife) && (
                                    <div className={css.newProductSpecs}>
                                        {newProduct.dosage && (
                                            <div className={css.newProductSpec}>
                                                <span className={css.specLabel}>Dosage</span>
                                                <span className={css.specValue}>{newProduct.dosage}</span>
                                            </div>
                                        )}
                                        {newProduct.packaging && (
                                            <div className={css.newProductSpec}>
                                                <span className={css.specLabel}>Packaging</span>
                                                <span className={css.specValue}>{newProduct.packaging}</span>
                                            </div>
                                        )}
                                        {newProduct.shelfLife && (
                                            <div className={css.newProductSpec}>
                                                <span className={css.specLabel}>Shelf Life</span>
                                                <span className={css.specValue}>{newProduct.shelfLife}</span>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {newProduct.composition && (
                                    <div className={css.newProductComposition}>
                                        <span className={css.compositionLabel}>Composition</span>
                                        <p className={css.compositionText}>{newProduct.composition}</p>
                                    </div>
                                )}

                                <button className={css.newProductBtn} onClick={handleExplore}>
                                    Explore more
                                </button>
                            </div>
                            <div className={css.newProductImageWrap}>
                                <div className={css.newProductImageBg}></div>
                                {newProduct.imageUrl && (
                                    <img
                                        src={newProduct.imageUrl}
                                        alt={newProduct.name}
                                        className={css.newProductImage}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            ) : null}          
            {newProduct && (
                <button
                    className={css.newArrivalFab}
                    onClick={() =>
                        document.getElementById("new-product-section")?.scrollIntoView({ behavior: "smooth" })
                    }
                >
                    New<br />Arrival
                </button>
            )}
        </div>
    );
}