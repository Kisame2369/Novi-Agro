import css from "./Header.module.css"
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [menuOpen]);

    const closeMenu = () => setMenuOpen(false);

    return (
        <div className={css.header}>
            <nav className={css.navbar}>
                <div className={css.navInner}>

                    <NavLink to="/" onClick={closeMenu} className={css.logoLink}>
                        <img src="/logo.png" alt="Novi Agro Logo" className={css.logo} />
                    </NavLink>

                    <button
                        className={`${css.burger} ${menuOpen ? css.burgerOpen : ""}`}
                        onClick={() => setMenuOpen(prev => !prev)}
                        aria-label="Toggle menu"
                        aria-expanded={menuOpen}
                    >
                        <span />
                        <span />
                        <span />
                    </button>

                    <div className={`${css.navLinks} ${menuOpen ? css.navLinksOpen : ""}`}>
                        <div className={css.navLeft}>
                            <NavLink to="/aboutus" end onClick={closeMenu} className={({ isActive }) => isActive ? `${css.link} ${css.active}` : css.link}>
                                About Us
                            </NavLink>
                            <NavLink to="/products" end onClick={closeMenu} className={({ isActive }) => isActive ? `${css.link} ${css.active}` : css.link}>
                                Products
                            </NavLink>
                        </div>

                        <div className={css.navRight}>
                            <NavLink to="/events" end onClick={closeMenu} className={({ isActive }) => isActive ? `${css.link} ${css.active}` : css.link}>
                                Events
                            </NavLink>
                            <NavLink to="/contacts" end onClick={closeMenu} className={({ isActive }) => isActive ? `${css.link} ${css.active}` : css.link}>
                                Contacts
                            </NavLink>
                        </div>
                    </div>

                </div>
            </nav>
        </div>
    );
}