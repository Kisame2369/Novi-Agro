
import css from './PartThree.module.css';

export default function PartThree() {
return (
    <section className={css.funfact}>
      <div className={css.containerFluid}>
        <div className={css.row}>
          <div className={css.left}>
            <div className={css.content}>
              <div className={css.secTitle}>
                <div className={css.taglineWrap}>
                  <span className={css.secTitleIcon}>
                    <svg viewBox="0 0 12 10" width="16" height="16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5.8 8.4 c1.2 -.8 2.2 -2.4 2.2 -3.4 0 -1.0 -1.0 -2.6 -2.2 -3.4 l-2.2 -1.6 2.7 0 c1.7 0 3.2 .9 4.3 2.5 1.5 2.3 1.5 2.7 0 5.0 -1.1 1.6 -2.6 2.5 -4.3 2.5 l-2.7 0 2.2 -1.6z"/>
                    </svg>
                  </span>
                  <span className={css.tagline}>OUR FUN FACTS</span>
                </div>
                <h2 className={css.title}>The grass is always <br /> greener on our side</h2>
              </div>
              
              <p className={css.text}>
                We are committed to provide innovative agricultural solutions 
                that enhance animal nutrition, boost farmers' productivity, and promote 
                sustainable food security across Nigeria and beyond.
              </p>
              
              <div className={css.ctaBox}>
                <a href="/contacts" className={css.btn}>
                  Hit us up
                </a>
                <p className={css.ctaText}>Let us know how we can help You!</p>
              </div>
            </div>
          </div>
          <div className={css.right}>
            <div className={css.cardsWrap}>
              <div className={css.card}>
                <div className={css.iconWrapper}>
                  <div className={css.icon}>
                    <span className={css.count}>10</span>
                    <span className={css.suffix}>K</span>
                  </div>
                </div>
                <h3 className={css.cardTitle}>Projects Completed</h3>
                <p className={css.cardText}>Successful agricultural projects delivered</p>
              </div>
              <div className={css.card}>
                <div className={css.iconWrapper}>
                  <div className={css.icon}>
                    <span className={css.count}>2110</span>
                  </div>
                </div>
                <h3 className={css.cardTitle}>Satisfied Customers</h3>
                <p className={css.cardText}>Trusted by farmers and stakeholders</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

