import { TailSpin } from "react-loader-spinner";
import css from "./Loader.module.css";

export default function Loader({ inline = false }) {
    return (
        <div className={inline ? css.wrapperInline : css.wrapper}>
            <TailSpin
                height="60"
                width="60"
                color="#1b4d2d"
                ariaLabel="loading"
                visible={true}
            />
        </div>
    );
}