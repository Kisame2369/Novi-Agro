import css from "./PartTwo.module.css";

const QUALITIES = [
  { icon: "fas fa-hand-holding-heart", title: <>Quality<br />services</> },
  {
    icon: "fas fa-users-cog",
    iconClassName: css.qualityIconGroup,
    title: <>Skilled<br />Team</>,
  },
];

const BENEFIT_LIST = [
  "Expert team members",
  "Affordable quality services",
  "Professional Farming Services",
];

export default function PartTwo() {
  return (
    <section className={css.benefits}>
      <div className={css.containerFluid}>
        <div className={css.row}>
          <div className={css.left}>
            <div className={css.content}>
              <div className={css.secTitle}>
                <div className={css.secTitleIcon} aria-hidden="true">
                  <svg
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
                      <path d="M58 84 c12 -8 22 -24 22 -34 0 -10 -10 -26 -22 -34 l-22 -16 27 0 c17 0 32 9 43 25 15 23 15 27 0 50 -11 16 -26 25 -43 25 l-27 0 22 -16z" />
                    </g>
                  </svg>
                </div>
                <span className={css.tagline}>Your BENEFITS</span>
                <h2 className={css.title}>Why is mine different from others?</h2>
              </div>

              <p className={css.text}>
                At Novi-Agro, we stand out through our unwavering commitment
                to quality, sustainability, and farmer empowerment. We don't
                just supply products; we build lasting partnerships that help
                your farm thrive.
              </p>

              <div className={css.qualityWrap}>
                {QUALITIES.map((q, i) => (
                  <div className={css.qualityCol} key={i}>
                    <div
                      className={[css.qualityIcon, q.iconClassName]
                        .filter(Boolean)
                        .join(" ")}
                    >
                      <i className={q.icon} />
                    </div>
                    <h4 className={css.qualityTitle}>{q.title}</h4>
                  </div>
                ))}
              </div>

              <p className={css.text}>
                We provide end-to-end support, from consultation to providing
                feed additives suitable for your livestock, ensuring you get
                the most out of every season.
              </p>

              <div className={css.listWrap}>
                <ul className={css.list}>
                  {BENEFIT_LIST.map((item) => (
                    <li key={item}>
                      <span className={css.checkIcon}>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>

                <a href="/events" className={css.btn}>
                  <span>Find out more</span>
                </a>
              </div>
            </div>
          </div>

          <div className={css.right}>
            <div className={css.imageWrap}>
              <div className={css.shapeTop} />
              <img
                loading="lazy"
                className={css.bigImage}
                src="/images/benefits_hero.webp"
                alt="Success in Farming"
              />
              <div className={css.smImage}>
                <img
                  loading="lazy"
                  src="/images/benefits_thumb.webp"
                  alt="Modern Infrastructure"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}