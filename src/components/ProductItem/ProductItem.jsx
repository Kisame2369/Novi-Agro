import css from "./ProductItem.module.css";

export default function ProductItem({ product }) {
    return (
        <div className={css.item}>
            <img className={css.image} src={product.img} alt={product.alt} />
            <p className={css.name}>{product.name}</p>
        </div>
    );
}