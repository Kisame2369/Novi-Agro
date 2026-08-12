import css from "./Our.module.css";

export default function Our() {
    return (
        <section className={css.mvrSection}>
            <div className={css.mvrInner}>
                <h2 className={css.mvrTitle}>About Our Work</h2>

                <div className={css.mvrGrid}>
                    <div className={css.mvrCard}>
                        <div className={css.mvrIconWrap}>
                            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={css.mvrIcon}>
                                <path d="M24 4 L28 16 L40 16 L30 24 L34 36 L24 28 L14 36 L18 24 L8 16 L20 16 Z"
                                    stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <div className={css.mvrCardHeader}>
                            <h3 className={css.mvrCardTitle}>Our Mission</h3>
                        </div>
                        <p className={css.mvrCardText}>
                            To provide innovative agricultural solutions that enhance animal nutrition,
                            boost farmers' productivity, and promote sustainable food security across
                            Nigeria and beyond.
                        </p>
                    </div>

                    <div className={css.mvrCard}>
                        <div className={css.mvrIconWrap}>
                            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={css.mvrIcon}>
                                <path d="M4 24C8 14 16 10 24 10C32 10 40 14 44 24C40 34 32 38 24 38C16 38 8 34 4 24Z"
                                    stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
                                <circle cx="24" cy="24" r="6" stroke="currentColor" strokeWidth="2.5" />
                            </svg>
                        </div>
                        <div className={css.mvrCardHeader}>
                            <h3 className={css.mvrCardTitle}>Our Vision</h3>
                        </div>
                        <p className={css.mvrCardText}>
                            To be the leading agro-allied company, delivering world-class animal health
                            and nutrition products while empowering farmers for sustainable growth and
                            improved livestock performance.
                        </p>
                    </div>

                    <div className={css.mvrCard}>
                        <div className={css.mvrIconWrap}>
                            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={css.mvrIcon}>
                                <path d="M8 36 L16 24 L24 30 L32 16 L40 20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                <circle cx="40" cy="20" r="3" fill="currentColor" />
                                <path d="M8 40 L40 40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
                            </svg>
                        </div>
                        <div className={css.mvrCardHeader}>
                            <h3 className={css.mvrCardTitle}>Our Results</h3>
                        </div>
                        <p className={css.mvrCardText}>
                            Through dedication and innovation, we help farmers improve animal performance,
                            reduce production costs, and achieve measurable success in poultry, cattle,
                            swine, goats, sheep, and fish farming.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}