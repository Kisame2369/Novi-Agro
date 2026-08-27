import { NavLink } from "react-router-dom";
import css from "./Footer.module.css";

function InstagramIcon({ size = 18 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TikTokIcon({ size = 18 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.88 2.89 2.89 0 0 1-2.89-2.88 2.89 2.89 0 0 1 2.89-2.88c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3 15.67 6.34 6.34 0 0 0 9.34 22a6.34 6.34 0 0 0 6.34-6.33V9.18a8.16 8.16 0 0 0 4.91 1.63V7.37c-.35 0-.7-.23-1-.68z" />
    </svg>
  );
}

const offices = [
  {
    label: "Km 10, Old Lagos Road, New Garage, PODO, Ibadan, Oyo State",
    mapUrl: "https://maps.app.goo.gl/yBwtZmSqiU578F8M8",
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
          <a href="mailto:noviagrosalesdept@gmail.com" className={css.link}>
            noviagrosalesdept@gmail.com
          </a>
        </div>

        <div className={css.socials}>
          <p className={css.navTitle}>Social Media</p>
          <a
            href="https://www.instagram.com/noviagro_ltd?utm_source=ig_web_button_share_sheet&igsi=ZDNlZDc0MzIxNw=="
            target="_blank"
            rel="noreferrer"
            className={css.socialLink}
          >
            <InstagramIcon size={18} />
            @noviagro_ltd
          </a>
          <a
            href="https://www.tiktok.com/@noviagro3?is_from_webapp=1&sender_device=pc"
            target="_blank"
            rel="noreferrer"
            className={css.socialLink}
          >
            <TikTokIcon size={18} />
            @noviagro3
          </a>
        </div>

        <div className={css.addresses}>
          <p className={css.navTitle}>Our Offices</p>
          {offices.map((o) => (
            <a
              key={o.mapUrl}
              href={o.mapUrl}
              target="_blank"
              rel="noreferrer"
              className={css.addressLink}
            >
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