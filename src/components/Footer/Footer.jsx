import { NavLink } from "react-router-dom";
import css from "./Footer.module.css";

function InstagramIcon({ size = 20 }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
        </svg>
    );
}

const offices = [
    {
        label: "Km 10, Old Lagos Road, New Garage, PODO, Ibadan, Oyo State",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=New+Garage+PODO+Ibadan+Oyo+State",
    },
    {
        label: "83a, John Haruna Street, River Park Estate, Cluster 3, Lugbe, Abuja",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=83a+John+Haruna+Street+River+Park+Estate+Lugbe+Abuja",
    },
    {
        label: "Kaduna - Abuja Road, Suleja, Niger State",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Suleja+Niger+State+Nigeria",
    },
];

export default function Footer() {
    return (
        <footer className={css.footer}>
            <div className={css.inner}>
                <div className={css.brand}>
                    <NavLink to="/">
                        <img src="/logo.png" alt="Novi Agro Logo" className={css.logo} />
                    </NavLink>
                    <p className={css.tagline}>Quality feed — Healthy life</p>
                </div>

                <nav className={css.nav}>
                    <p className={css.navTitle}>Navigation</p>
                    <NavLink to="/aboutus" className={css.link}>About Us</NavLink>
                    <NavLink to="/products" className={css.link}>Products</NavLink>
                    <NavLink to="/contacts" className={css.link}>Contacts</NavLink>
                </nav>

                <div className={css.contacts}>
                    <p className={css.navTitle}>Contacts</p>
                    <a href="tel:+2349012000101" className={css.link}>+234 901 200 0101</a>
                    <a href="tel:+2348025685012" className={css.link}>+234 802 568 5012</a>
                    <a href="tel:+2349045067037" className={css.link}>+234 904 506 7037</a>
                    <a href="mailto:officialnoviagro@gmail.com" className={css.link}>officialnoviagro@gmail.com</a>
                    <a href="https://www.instagram.com/novi_agroltd" target="_blank" rel="noreferrer" className={css.social}>
                        <InstagramIcon size={18} />
                        @novi_agroltd
                    </a>
                </div>

                <div className={css.addresses}>
                    <p className={css.navTitle}>Our Offices</p>
                    {offices.map((o) => (
                        <a key={o.mapUrl} href={o.mapUrl} target="_blank" rel="noreferrer" className={css.addressLink}>
                            {o.label}
                        </a>
                    ))}
                </div>
            </div>

            <div className={css.bottom}>
                <p>© {new Date().getFullYear()} Novi-Agro Ltd. All rights reserved.</p>
            </div>
        </footer>
    );
}