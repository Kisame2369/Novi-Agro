import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import css from "./EventsPage.module.css";
import Loader from "../../components/Loader/Loader.jsx";

const PROJECT_ID = import.meta.env.VITE_SANITY_PROJECT_ID;
const DATASET = import.meta.env.VITE_SANITY_DATASET;

const EVENTS_QUERY = encodeURIComponent(`*[_type == "event"] | order(_createdAt desc) {
  _id,
  name,
  description,
  "images": images[]{
    "url": asset->url
  }
}`);

const SANITY_URL = `https://${PROJECT_ID}.api.sanity.io/v2023-05-03/data/query/${DATASET}?query=${EVENTS_QUERY}`;

function Lightbox({ images, startIndex, onClose }) {
    const [current, setCurrent] = useState(startIndex);
    const len = images.length;

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => { document.body.style.overflow = ""; };
    }, []);

    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowLeft") setCurrent((c) => (c - 1 + len) % len);
            if (e.key === "ArrowRight") setCurrent((c) => (c + 1) % len);
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [len, onClose]);

    return (
        <div className={css.overlay} onClick={onClose}>
            <button className={css.closeBtn} onClick={onClose}><X size={24} /></button>

            <div className={css.lightboxContent} onClick={(e) => e.stopPropagation()}>
                <img src={images[current].url} alt="" className={css.lightboxImage} />
                {len > 1 && (
                    <>
                        <button className={`${css.navBtn} ${css.navLeft}`} onClick={() => setCurrent((c) => (c - 1 + len) % len)}>
                            <ChevronLeft size={28} />
                        </button>
                        <button className={`${css.navBtn} ${css.navRight}`} onClick={() => setCurrent((c) => (c + 1) % len)}>
                            <ChevronRight size={28} />
                        </button>
                        <div className={css.lightboxCounter}>{current + 1} / {len}</div>
                    </>
                )}
            </div>
        </div>
    );
}

export default function EventsPage() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [lightbox, setLightbox] = useState(null);

    useEffect(() => {
        fetch(SANITY_URL)
            .then((r) => r.json())
            .then((data) => {
                setEvents(data.result ?? []);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    return (
        <div className={css.container}>
            <h1 className={css.pageTitle}>Events</h1>

            {loading ? (
                <Loader inline />
            ) : events.length === 0 ? (
                <p className={css.empty}>No events yet.</p>
            ) : (
                events.map((event) => (
                    <div key={event._id} className={css.section}>
                        <h2 className={css.sectionTitle}>{event.name}</h2>
                        {event.description && (
                            <p className={css.text}>{event.description}</p>
                        )}
                        {event.images?.length > 0 && (
                            <div className={css.photoGrid}>
                                {event.images.map((img, i) => (
                                    <button
                                        key={i}
                                        className={css.photoItem}
                                        onClick={() => setLightbox({ images: event.images, index: i })}
                                    >
                                        <img src={img.url} alt={`${event.name} ${i + 1}`} />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                ))
            )}

            {lightbox && (
                <Lightbox
                    images={lightbox.images}
                    startIndex={lightbox.index}
                    onClose={() => setLightbox(null)}
                />
            )}
        </div>
    );
}