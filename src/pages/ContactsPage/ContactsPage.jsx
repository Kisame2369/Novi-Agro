import css from "./ContactsPage.module.css";
import { MapPin, Phone, Mail, ChevronRight } from "lucide-react";

function InstagramIcon({ size = 24 }) {
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

const getEmbedSrc = (searchQuery) => {
    return `https://maps.google.com/maps?q=${encodeURIComponent(searchQuery)}&t=&z=15&ie=UTF8&iwloc=B&output=embed`;
};

const getMapUrl = (searchQuery) => {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(searchQuery)}`;
};

const offices = [
    {
        region: "South West",
        city: "Ibadan, Oyo State",
        address: "Km 10, Old Lagos Road, New Garage, PODO, Ibadan, Oyo State",
        mapUrl: getMapUrl("New Garage, PODO, Ibadan, Oyo State"),
        mapSrc: getEmbedSrc("New Garage, PODO, Ibadan, Oyo State"),
        color: "#007934",
    },
    {
        region: "Abuja",
        city: "Abuja, FCT",
        address: "83a, John Haruna Street, River Park Estate, Cluster 3, Lugbe, Abuja",
        mapUrl: getMapUrl("83a, John Haruna Street, River Park Estate, Cluster 3, Lugbe, Abuja"),
        mapSrc: getEmbedSrc("83a, John Haruna Street, River Park Estate, Cluster 3, Lugbe, Abuja"),
        color: "#F6B83D",
    },
    {
        region: "North",
        city: "Suleja, Niger State",
        address: "Kaduna - Abuja Road, Suleja, Niger State",
        mapUrl: getMapUrl("Suleja, Niger State, Nigeria"),
        mapSrc: getEmbedSrc("Suleja, Niger State, Nigeria"),
        color: "#1b4d2d",
    },
];

const phones = [
    "+234 901 200 0101",
    "+234 802 568 5012",
    "+234 904 506 7037",
];

export default function ContactsPage() {
    return (
        <div className={css.page}>
            <div className={css.content}>

                <h2 className={css.sectionTitle}>Our Contacts</h2>

                <section className={css.officesSection}>
                    <div className={css.officesGrid}>
                        {offices.map((office) => (
                            <div key={office.region} className={css.officeCard}>
                                <div className={css.officeTag} style={{ backgroundColor: office.color }}>
                                    {office.region}
                                </div>
                                <div className={css.officeMap}>
                                    <iframe
                                        title={`Map ${office.region}`}
                                        src={office.mapSrc}
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0 }}
                                        allowFullScreen=""
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                    />
                                </div>
                                <div className={css.officeBody}>
                                    <p className={css.officeCity}>{office.city}</p>
                                    <div className={css.officeAddressRow}>
                                        <MapPin size={16} className={css.officePin} />
                                        <p className={css.officeAddress}>{office.address}</p>
                                    </div>
                                    <a
                                        href={office.mapUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        className={css.officeLink}
                                    >
                                        Open in Google Maps
                                        <ChevronRight size={16} />
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className={css.detailsSection}>
                    <div className={css.detailsGrid}>

                        <div className={css.detailCard}>
                            <div className={css.detailIcon} style={{ backgroundColor: "#e6f4ec", color: "var(--green)" }}>
                                <Phone size={28} />
                            </div>
                            <h3 className={css.detailTitle}>Phone</h3>
                            <div className={css.detailLines}>
                                {phones.map((p) => (
                                    <a key={p} href={`tel:${p.replace(/\s/g, "")}`} className={css.detailLink}>
                                        {p}
                                    </a>
                                ))}
                            </div>
                        </div>

                        <div className={css.detailCard}>
                            <div className={css.detailIcon} style={{ backgroundColor: "#fff8e6", color: "var(--dark-yellow)" }}>
                                <Mail size={28} />
                            </div>
                            <h3 className={css.detailTitle}>Email</h3>
                            <div className={css.detailLines}>
                                <a href="mailto:officialnoviagro@gmail.com" className={css.detailLink}>
                                    officialnoviagro@gmail.com
                                </a>
                            </div>
                        </div>

                        <div className={css.detailCard}>
                            <div className={css.detailIcon} style={{ backgroundColor: "#fce4ec", color: "#e1306c" }}>
                                <InstagramIcon size={28} />
                            </div>
                            <h3 className={css.detailTitle}>Social Media</h3>
                            <div className={css.detailLines}>
                                <a
                                    href="https://www.instagram.com/novi_agroltd"
                                    target="_blank"
                                    rel="noreferrer"
                                    className={css.detailLink}
                                >
                                    @novi_agroltd
                                </a>
                            </div>
                        </div>

                    </div>
                </section>
            </div>
        </div>
    );
}