import { useEffect } from "react";
import { X } from "lucide-react";
import css from "./ProductPage.module.css";

export default function ProductModal({ product, onClose }) {
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "unset";
        };
    }, []);

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    if (!product) return null;

    return (
        <div className={css.overlay} onClick={onClose}>
            <div className={css.modal} onClick={(e) => e.stopPropagation()}>
                <button className={css.close} onClick={onClose}>
                    <X size={24} />
                </button>

                <div className={css.content}>
                    <div className={css.imageSection}>
                        {product.imageUrl ? (
                            <img src={product.imageUrl} alt={product.name} className={css.image} />
                        ) : (
                            <div className={css.noImage}>No image</div>
                        )}
                    </div>

                    <div className={css.info}>
                        <div className={css.header}>
                            <span className={css.badge}>{product.group}</span>
                            <h2 className={css.title}>{product.name}</h2>
                        </div>

                        {product.description && (
                            <div className={css.section}>
                                <h3 className={css.sectionTitle}>Description</h3>
                                <p className={css.text}>{product.description}</p>
                            </div>
                        )}

                        {product.composition && (
                            <div className={css.section}>
                                <h3 className={css.sectionTitle}>Composition</h3>
                                <p className={css.text}>{product.composition}</p>
                            </div>
                        )}

                        <div className={css.specs}>
                            {product.dosage && (
                                <div className={css.spec}>
                                    <span className={css.label}>Dosage:</span>
                                    <span className={css.value}>{product.dosage}</span>
                                </div>
                            )}
                            {product.packaging && (
                                <div className={css.spec}>
                                    <span className={css.label}>Packaging:</span>
                                    <span className={css.value}>{product.packaging}</span>
                                </div>
                            )}
                            {product.shelfLife && (
                                <div className={css.spec}>
                                    <span className={css.label}>Shelf Life:</span>
                                    <span className={css.value}>{product.shelfLife}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}