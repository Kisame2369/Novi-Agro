import css from "./ProductItem.module.css";

export default function ProductItem({ product, onClick }) {
    return (
        <button className={css.item} onClick={() => onClick(product)}>
            <div className={css.imageWrapper}>
                <img
                    className={css.image}
                    src={product.imageUrl || ""}
                    alt={product.name}
                />
            </div>
            <p className={css.name}>{product.name}</p>
        </button>
    );
}