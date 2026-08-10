import React from 'react';
import css from "./ServicesPage.module.css";

const SERVICES = [
  {
    tagline: "Livestock Care",
    title: "Additives",
    text: "High-quality, nutritionally balanced feed additives designed to enhance the growth, immunity, and overall health of your livestock.",
    image: "/images/service_additives.webp",
    alt: "Additives",
  },
  {
    tagline: "Farm Solutions",
    title: "Productions",
    text: "Expert formulation, quality assurance, and high-efficiency production of agricultural feed solutions for maximum growth.",
    image: "/images/productions2.webp",
    alt: "Productions",
  },
  {
    tagline: "Expert Advisory",
    title: "Consultancy / Farm Support",
    text: "Professional veterinary advice, farm management audits, and hands-on operational support tailored to your farm.",
    image: "/images/booking_vet1.webp",
    alt: "Consultancy/Farm Support",
  },
  {
    tagline: "Veterinary Health",
    title: "Animal Care",
    text: "Comprehensive livestock health monitoring, preventive healthcare products, and complete farm welfare solutions.",
    image: "/images/gallery_pasture.webp",
    alt: "Animal Care",
  },
  {
    tagline: "Capacity Building",
    title: "Training",
    text: "Empowering farmers and agricultural teams with modern livestock techniques, nutrition education, and best practices.",
    image: "/images/training.webp",
    alt: "Training",
  },
];

export default function ServicesPage() {
  return (
    <section className={css.Section}>
      <div className={css.Container}>
        <div className={css.Header}>
          <h2 className={css.MainTitle}>Our Services</h2>
          <p className={css.SubTitle}>Comprehensive solutions for your livestock and farm</p>
        </div>
        
        <div className={css.Row}>
          {SERVICES.map((service) => (
            <div className={css.Col} key={service.title}>
              <div className={css.Card}>
                <div className={css.ImgWrap}>
                  <img
                    loading="lazy"
                    src={service.image}
                    alt={service.alt}
                    className={css.Img}
                  />
                </div>
                <div className={css.Body}>
                  <span className={css.Tagline}>
                    {service.tagline}
                  </span>
                  <h3 className={css.Title}>{service.title}</h3>
                  <p className={css.Text}>{service.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}