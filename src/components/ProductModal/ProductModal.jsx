import { useEffect } from "react";
import { X } from "lucide-react";
import css from "./ProductModal.module.css";

export default function ProductModal({ category, selectedProduct, onProductChange, onClose }) {
    const { group, description, imageUrl, groupProducts = [] } = category;

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => { document.body.style.overflow = "unset"; };
    }, []);

    useEffect(() => {
        const handleEsc = (e) => { if (e.key === "Escape") onClose(); };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    const showProduct = !!selectedProduct;

    return (
        <div className={css.overlay} onClick={onClose}>
            <div className={css.modal} onClick={(e) => e.stopPropagation()}>
                <button className={css.close} onClick={onClose}>
                    <X size={24} />
                </button>

                <div className={css.content}>
                    <div className={css.imageSection}>
                        <img
                            key={showProduct ? selectedProduct._id : "cat"}
                            src={showProduct && selectedProduct.imageUrl ? selectedProduct.imageUrl : (imageUrl ?? "")}
                            alt={showProduct ? selectedProduct.name : group}
                            className={css.image}
                        />
                    </div>
                    <div className={css.info}>
                        <div className={css.header}>
                            <span className={css.badge}>{group}</span>
                            {!showProduct && description && (
                                <p className={css.text}>{description}</p>
                            )}

                            {showProduct && (
                                <h2 className={css.productTitle}>{selectedProduct.name}</h2>
                            )}
                        </div>

                        {groupProducts.length > 0 && (
                            <div className={css.section}>
                                <h3 className={css.sectionTitle}>Products</h3>
                                <div className={`${css.bubbleList} ${groupProducts.length > 10 ? css.bubbleListCompact : ""}`}>
                                    {groupProducts.map((p) => {
                                        const isActive = selectedProduct?._id === p._id;
                                        return (
                                            <button
                                                key={p._id}
                                                className={`${css.bubble} ${isActive ? css.bubbleActive : ""}`}
                                                onClick={() => onProductChange(isActive ? null : p)}
                                            >
                                                {p.name}
                                                {isActive && (
                                                    <span className={css.bubbleClose} aria-label="Deselect">
                                                        <X size={16} strokeWidth={3} />
                                                    </span>
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {showProduct && (
                            <div className={css.productDetails}>
                                {selectedProduct.description && (
                                    <div className={css.section}>
                                        <h3 className={css.sectionTitle}>Description</h3>
                                        <p className={css.text}>{selectedProduct.description}</p>
                                    </div>
                                )}

                                {selectedProduct.composition && (
                                    <div className={css.section}>
                                        <h3 className={css.sectionTitle}>Composition</h3>
                                        <p className={css.text}>{selectedProduct.composition}</p>
                                    </div>
                                )}

                                <div className={css.specs}>
                                    {selectedProduct.dosage && (
                                        <div className={css.spec}>
                                            <span className={css.label}>Dosage:</span>
                                            <span className={css.value}>{selectedProduct.dosage}</span>
                                        </div>
                                    )}
                                    {selectedProduct.packaging && (
                                        <div className={css.spec}>
                                            <span className={css.label}>Packaging:</span>
                                            <span className={css.value}>{selectedProduct.packaging}</span>
                                        </div>
                                    )}
                                    {selectedProduct.shelfLife && (
                                        <div className={css.spec}>
                                            <span className={css.label}>Shelf Life:</span>
                                            <span className={css.value}>{selectedProduct.shelfLife}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}