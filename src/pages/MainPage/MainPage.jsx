import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import Loader from "../../components/Loader/Loader.jsx";
import PartOne from "../../components/PartOne/PartOne.jsx";
import PartTwo from "../../components/PartTwo/PartTwo.jsx";
import PartThree from "../../components/PartThree/PartThree.jsx";

import "swiper/css";
import "swiper/css/pagination";
import css from "./MainPage.module.css";

const PROJECT_ID = import.meta.env.VITE_SANITY_PROJECT_ID;
const DATASET = import.meta.env.VITE_SANITY_DATASET;

const NEW_PRODUCTS_QUERY = encodeURIComponent(`*[_type == "newProduct"] {
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
const SANITY_URL = `https://${PROJECT_ID}.api.sanity.io/v2023-05-03/data/query/${DATASET}?query=${NEW_PRODUCTS_QUERY}`;

export default function MainPage() {
  const [newProducts, setNewProducts] = useState([]);
  const [newProductsLoading, setNewProductsLoading] = useState(true);
  const [swiperInstance, setSwiperInstance] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(SANITY_URL)
      .then((r) => r.json())
      .then((data) => {
        setNewProducts(data.result ?? []);
        setNewProductsLoading(false);
      })
      .catch(() => setNewProductsLoading(false));
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
          <NavLink
            to="/products"
            end
            className={css.button}
            onClick={handleExplore}
          >
            Our products
          </NavLink>
        </div>
      </div>

      <PartOne />
      <PartTwo />
      <PartThree />

      {newProductsLoading ? (
        <Loader inline />
      ) : newProducts.length > 0 ? (
        <section id="new-product-section" className={css.newProductSection}>
          <div className={css.newProductInner}>
            <div className={css.productsContainer}>
              {newProducts.length > 1 && (
                <button
                  type="button"
                  className={`${css.customArrow} ${css.customArrowPrev}`}
                  aria-label="Previous product"
                  onClick={() => swiperInstance?.slidePrev()}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15 6L9 12L15 18"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              )}

              <Swiper
                loop={true}
                modules={[Pagination]}
                onSwiper={setSwiperInstance}
                pagination={{
                  clickable: true,
                  bulletClass: css.newProductDot,
                  bulletActiveClass: css.newProductDotActive,
                }}
                speed={500}
                slidesPerView={1}
                className={css.newProductSwiper}
              >
                {newProducts.map((product) => (
                  <SwiperSlide key={product._id || product.name}>
                    <div className={css.newProductContent}>
                      <div className={css.newProductText}>
                        <div className={css.newProductBadge}>
                          <span>New Arrival</span>
                        </div>
                        {product.group && (
                          <p className={css.newProductLabel}>{product.group}</p>
                        )}
                        <h2 className={css.newProductTitle}>{product.name}</h2>
                        {product.description && (
                          <p className={css.newProductDescription}>
                            {product.description}
                          </p>
                        )}
                        {(product.dosage ||
                          product.packaging ||
                          product.shelfLife) && (
                          <div className={css.newProductSpecs}>
                            {product.dosage && (
                              <div className={css.newProductSpec}>
                                <span className={css.specLabel}>Dosage</span>
                                <span className={css.specValue}>
                                  {product.dosage}
                                </span>
                              </div>
                            )}
                            {product.packaging && (
                              <div className={css.newProductSpec}>
                                <span className={css.specLabel}>Packaging</span>
                                <span className={css.specValue}>
                                  {product.packaging}
                                </span>
                              </div>
                            )}
                            {product.shelfLife && (
                              <div className={css.newProductSpec}>
                                <span className={css.specLabel}>
                                  Shelf Life
                                </span>
                                <span className={css.specValue}>
                                  {product.shelfLife}
                                </span>
                              </div>
                            )}
                          </div>
                        )}

                        {product.composition && (
                          <div className={css.newProductComposition}>
                            <span className={css.compositionLabel}>
                              Composition
                            </span>
                            <p className={css.compositionText}>
                              {product.composition}
                            </p>
                          </div>
                        )}

                        <button
                          type="button"
                          className={css.newProductBtn}
                          onClick={handleExplore}
                        >
                          Explore more
                        </button>
                      </div>
                      <div className={css.newProductImageWrap}>
                        <div className={css.newProductImageBg}></div>
                        {product.imageUrl && (
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            className={css.newProductImage}
                          />
                        )}
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {newProducts.length > 1 && (
                <button
                  type="button"
                  className={`${css.customArrow} ${css.customArrowNext}`}
                  aria-label="Next product"
                  onClick={() => swiperInstance?.slideNext()}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 6L15 12L9 18"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </section>
      ) : null}

      {newProducts.length > 0 && (
        <button
          type="button"
          className={css.newArrivalFab}
          onClick={() =>
            document
              .getElementById("new-product-section")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        >
          New
          <br />
          Arrivals
        </button>
      )}
    </div>
  );
}