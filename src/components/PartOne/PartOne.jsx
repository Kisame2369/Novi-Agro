import css from "./PartOne.module.css";

const features = [
  "Feed Additives at its best",
  "Professional consultancy service for all your farming business",
  "For the customer's choice, there are many variations of Novi Agro's products available",
];

export default function PartOne() {
  return (
    <section className={css.aboutOne}>
      <div className={css.container}>
        <div className={css.row}>
          <div className={css.colImage}>
            <div className={css.aboutOneImage}>

              <div className={css.shapeTop}></div>
              
              <div className={css.imgPopup}>
                <img
                  loading="lazy"
                  className={css.bigImage}
                  src="/images/about_main.webp"
                  alt="Novi Agro Nig. Ltd"
                />
              </div>

              <div className={css.smImage}>
                <div className={css.imgPopup}>
                  <img loading="lazy" src="/images/about_thumbnail.webp" alt="Novi Agro Nig. Ltd" />
                </div>
              </div>

              <div className={css.shapeBottom}></div>
            </div>
          </div>


          <div className={css.colContent}>
            <div className={css.aboutOneContent}>
              <div className={css.secTitle}>
                <div className={css.secTitleImg}>
                  <svg
                    aria-hidden="true"
                    role="presentation"
                    version="1.0"
                    xmlns="http://www.w3.org/2000/svg"
                    direction="rtl"
                    width="12pt"
                    height="10pt"
                    viewBox="0 0 12.000000 10.000000"
                    preserveAspectRatio="xMidYMid meet"
                  >
                    <g
                      transform="translate(0.000000,10.000000) scale(0.100000,-0.100000)"
                      stroke="none"
                    >
                      <path
                        d="M58 84 c12 -8 22 -24 22 -34 0 -10 -10 -26 -22 -34 l-22 -16 27 0
                           c17 0 32 9 43 25 15 23 15 27 0 50 -11 16 -26 25 -43 25 l-27 0 22 -16z"
                      />
                    </g>
                  </svg>
                </div>
                <span className={css.secTitleTagline}>
                  Novi Agro Nig. Ltd
                </span>
                <h2 className={css.secTitleTitle}>
                  Brings your farming business to life
                </h2>
              </div>

              <p className={css.aboutText}>
                At Novi Agro Nig. Ltd, we are committed to revolutionizing
                Nigeria&apos;s agricultural landscape. With a focus on
                sustainable practices and innovation, we offer a comprehensive
                range of high-quality livestock feed additives tailored to
                meet the specific nutritional needs of various animals,
                including poultry, fish, goats, and cattle. Our products are
                formulated with premium ingredients to ensure optimal growth,
                health, and productivity for your farm.
              </p>

              <div className={css.qualityWrap}>
                <h4 className={css.qualityTitle}>
                  Quality <br /> farming services
                </h4>
                <div className={css.pricesBox}>
                  <strong className={css.priceNumber}>2K</strong>
                  <span className={css.priceText}>Satisfied customers</span>
                </div>
              </div>

              <ul className={css.featureList}>
                {features.map((feature, index) => (
                  <li key={index}>
                    <i className={css.checkIcon}>✓</i>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
