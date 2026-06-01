import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Loader from "../../components/Loader/Loader.jsx";

import css from "./MainPage.module.css";

const PROJECT_ID = import.meta.env.VITE_SANITY_PROJECT_ID;
const DATASET = import.meta.env.VITE_SANITY_DATASET;
const NEW_PRODUCT_QUERY = encodeURIComponent(`*[_type == "newProduct"][0] {
  name,
  group,
  "imageUrl": image.asset->url,
  description
}`);
const SANITY_URL = `https://${PROJECT_ID}.api.sanity.io/v2023-05-03/data/query/${DATASET}?query=${NEW_PRODUCT_QUERY}`;

export default function MainPage() {
    const [newProduct, setNewProduct] = useState(null);
    const [newProductLoading, setNewProductLoading] = useState(true);

    useEffect(() => {
        fetch(SANITY_URL)
            .then(r => r.json())
            .then(data => {
                setNewProduct(data.result ?? null);
                setNewProductLoading(false);
            })
            .catch(() => setNewProductLoading(false));
    }, []);

    return (
        <div>
            <div className={css.sliderContainer}>
                <video
                    className={css.heroVideo}
                    src="/videos/hero.mp4"
                    poster="/videos/hero.jpg"
                    autoPlay
                    loop
                    muted
                    playsInline
                />

                <div className={css.overlay}>
                    <h1>Quality feed - Healthy life</h1>
                    <p>The best feed for your animals</p>
                    <NavLink to="/products" end className={css.button}>
                        Our products
                    </NavLink>
                </div>
            </div>

            {newProductLoading ? (
                <Loader inline />
            ) : newProduct ? (
                <section className={css.newProductSection}>
                    <div className={css.newProductInner}>
                        <div className={css.newProductBadge}>
                            <span>New Arrival</span>
                        </div>
                        <div className={css.newProductContent}>
                            <div className={css.newProductText}>
                                <p className={css.newProductLabel}>Featured Product</p>
                                <h2 className={css.newProductTitle}>{newProduct.name}</h2>
                                {newProduct.group && (
                                    <p className={css.newProductSubtitle}>{newProduct.group}</p>
                                )}
                                {newProduct.description && (
                                    <p className={css.newProductDescription}>{newProduct.description}</p>
                                )}
                                <NavLink to="/products" className={css.newProductBtn}>
                                    Explore Product
                                </NavLink>
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

            <section className={css.mvrSection}>
                <div className={css.mvrInner}>
                    <div className={css.mvrHeader}>
                        <span className={css.mvrTagline}>About Our Work</span>
                        <h2 className={css.mvrTitle}>Supporting Farmers Every Day</h2>
                    </div>

                    <div className={css.mvrGrid}>
                        <div className={css.mvrCard}>
                            <div className={css.mvrIconWrap}>
                                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={css.mvrIcon}>
                                    <path d="M24 4 L28 16 L40 16 L30 24 L34 36 L24 28 L14 36 L18 24 L8 16 L20 16 Z"
                                        stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <h3 className={css.mvrCardTitle}>Our Mission</h3>
                            <div className={css.mvrDivider}></div>
                            <p className={css.mvrCardText}>
                                To provide innovative agricultural solutions that enhance animal nutrition,
                                boost farmers' productivity, and promote sustainable food security across
                                Nigeria and beyond.
                            </p>
                        </div>

                        <div className={css.mvrCard}>
                            <div className={css.mvrIconWrap}>
                                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={css.mvrIcon}>
                                    <path d="M4 24C8 14 16 10 24 10C32 10 40 14 44 24C40 34 32 38 24 38C16 38 8 34 4 24Z"
                                        stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
                                    <circle cx="24" cy="24" r="6" stroke="currentColor" strokeWidth="2.5" />
                                </svg>
                            </div>
                            <h3 className={css.mvrCardTitle}>Our Vision</h3>
                            <div className={css.mvrDivider}></div>
                            <p className={css.mvrCardText}>
                                To be the leading agro-allied company, delivering world-class animal health
                                and nutrition products while empowering farmers for sustainable growth and
                                improved livestock performance.
                            </p>
                        </div>

                        <div className={css.mvrCard}>
                            <div className={css.mvrIconWrap}>
                                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={css.mvrIcon}>
                                    <path d="M8 36 L16 24 L24 30 L32 16 L40 20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <circle cx="40" cy="20" r="3" fill="currentColor" />
                                    <path d="M8 40 L40 40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
                                </svg>
                            </div>
                            <h3 className={css.mvrCardTitle}>Our Results</h3>
                            <div className={css.mvrDivider}></div>
                            <p className={css.mvrCardText}>
                                Through dedication and innovation, we help farmers improve animal performance,
                                reduce production costs, and achieve measurable success in poultry, cattle,
                                swine, goats, sheep, and fish farming.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}