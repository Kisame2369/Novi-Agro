import css from "./Header.module.css"
import { NavLink } from "react-router-dom";
 
export default function Header() {
    return (
        <div className={css.header}>
            <nav className={css.navbar}>
                <div className={css.navLinks}>
 
                    <NavLink
                        to="/aboutus"
                        end
                        className={({ isActive }) =>
                            isActive ? `${css.link} ${css.active}` : css.link
                        }
                    >
                        About Us
                    </NavLink>
 
                    <NavLink
                        to="/products"
                        end
                        className={({ isActive }) =>
                            isActive ? `${css.link} ${css.active}` : css.link
                        }
                    >
                        Products
                    </NavLink>
 
                    <NavLink to="/">
                        <img src="/logo.png" alt="Novi Agro Logo" className={css.logo} />
                    </NavLink>
 
                    <NavLink
                        to="/events"
                        end
                        className={({ isActive }) =>
                            isActive ? `${css.link} ${css.active}` : css.link
                        }
                    >
                        Events
                    </NavLink>
                    
                    <NavLink
                        to="/contacts"
                        end
                        className={({ isActive }) =>
                            isActive ? `${css.link} ${css.active}` : css.link
                        }
                    >
                        Contacts
                    </NavLink>
                </div>
            </nav>
        </div>
    );
}