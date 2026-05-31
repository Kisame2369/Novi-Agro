import { useEffect, useState } from "react";
import { X, ChevronDown } from "lucide-react";
import css from "./ProductModal.module.css";

export default function ProductModal({ product, groupProducts = [], groupImageUrl, onProductChange, onClose }) {
    const [current, setCurrent] = useState(product);
    const [selectOpen, setSelectOpen] = useState(false);

    useEffect(() => {
        setCurrent(product);
    }, [product]);

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => { document.body.style.overflow = "unset"; };
    }, []);

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") {
                if (selectOpen) setSelectOpen(false);
                else onClose();
            }
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [onClose, selectOpen]);

    if (!current) return null;

    const hasVariants = groupProducts.length > 1;

    const displayImage = hasVariants ? groupImageUrl : current.imageUrl;

    const handleVariantSelect = (p) => {
        setCurrent(p);
        onProductChange(p);
        setSelectOpen(false);
    };

    return (
        <div className={css.overlay} onClick={onClose}>
            <div className={css.modal} onClick={(e) => e.stopPropagation()}>
                <button className={css.close} onClick={onClose}>
                    <X size={24} />
                </button>

                <div className={css.content}>
                    <div className={css.imageSection}>
                        {displayImage ? (
                            <img src={displayImage} alt={current.name} className={css.image} />
                        ) : (
                            <div className={css.noImage}>No image</div>
                        )}
                    </div>

                    <div className={css.info}>
                        <div className={css.header}>
                            <span className={css.badge}>{current.group}</span>

                            {hasVariants ? (
                                <div className={css.variantSelectorWrap}>
                                    <button
                                        className={css.variantTrigger}
                                        onClick={() => setSelectOpen((v) => !v)}
                                        aria-haspopup="listbox"
                                        aria-expanded={selectOpen}
                                    >
                                        <span className={css.variantTriggerText}>{current.name}</span>
                                        <ChevronDown
                                            size={18}
                                            className={`${css.chevron} ${selectOpen ? css.chevronOpen : ""}`}
                                        />
                                    </button>

                                    {selectOpen && (
                                        <>
                                            <div
                                                className={css.dropdownBackdrop}
                                                onClick={() => setSelectOpen(false)}
                                            />
                                            <ul className={css.dropdown} role="listbox">
                                                {groupProducts.map((p) => (
                                                    <li
                                                        key={p._id}
                                                        role="option"
                                                        aria-selected={p._id === current._id}
                                                        className={`${css.dropdownItem} ${p._id === current._id ? css.dropdownItemActive : ""}`}
                                                        onClick={() => handleVariantSelect(p)}
                                                    >
                                                        {p.name}
                                                    </li>
                                                ))}
                                            </ul>
                                        </>
                                    )}
                                </div>
                            ) : (
                                <h2 className={css.title}>{current.name}</h2>
                            )}
                        </div>

                        {current.description && (
                            <div className={css.section}>
                                <h3 className={css.sectionTitle}>Description</h3>
                                <p className={css.text}>{current.description}</p>
                            </div>
                        )}

                        {current.composition && (
                            <div className={css.section}>
                                <h3 className={css.sectionTitle}>Composition</h3>
                                <p className={css.text}>{current.composition}</p>
                            </div>
                        )}

                        <div className={css.specs}>
                            {current.dosage && (
                                <div className={css.spec}>
                                    <span className={css.label}>Dosage:</span>
                                    <span className={css.value}>{current.dosage}</span>
                                </div>
                            )}
                            {current.packaging && (
                                <div className={css.spec}>
                                    <span className={css.label}>Packaging:</span>
                                    <span className={css.value}>{current.packaging}</span>
                                </div>
                            )}
                            {current.shelfLife && (
                                <div className={css.spec}>
                                    <span className={css.label}>Shelf Life:</span>
                                    <span className={css.value}>{current.shelfLife}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}