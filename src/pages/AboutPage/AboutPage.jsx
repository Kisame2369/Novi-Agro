import css from "./AboutPage.module.css";

export default function AboutPage() {

    const staffData = [
        { year: "2022", count: 15 },
        { year: "2023", count: 30 },
        { year: "2024", count: 55 },
        { year: "2025", count: 70 },
        { year: "2026", count: 100 }
    ];

    const customerData = [
        { year: "2022", count: 120 },
        { year: "2023", count: 250 },
        { year: "2024", count: 400 },
        { year: "2025", count: 650 },
        { year: "2026", count: 700 }
    ];

    const productHistory = [
        {
            period: "2022",
            title: "Initial Products",
            products: ["Premixes", "Vitamins", "Proteins", "Sorbents", "Raw materials"]
        },
        {
            period: "2023-2024",
            title: "Added Products",
            products: ["Amino Acids", "Enzymes", "Acidifiers", "Emulsifiers"]
        },
        {
            period: "2025-2026",
            title: "Further Expansion",
            products: ["Toxin Binders", "Hepatoprotectors", "Growth Promoters", "Anti-stress products"]
        }
    ];

    const maxCustomers = 700; 

    return (
        <div className={css.container}>
            <div className={css.section}>
                <section>
                    <div className={css.introContent}>
                        <div>
                            <h2 className={css.sectionTitle}>Who We Are</h2>
                            <p className={css.text}>
                                Novi-Agro Ltd is a Nigerian-based company specializing in high-quality animal
                                feed products, including Premixes, Vitamins, Proteins, Sorbents, Raw materials,
                                amino acids, and enzymes.
                            </p>
                            <p className={css.text}>
                                We focus on providing top-notch feed-related products and services to the animal
                                agriculture industry, emphasizing quality, safety, and customer satisfaction.
                            </p>
                        </div>
                        <div className={css.introImage}>
                            <img src="/images/team.jpg" alt="Novi-Agro Team" />
                        </div>
                    </div>
                </section>
            </div>

            <div className={css.section}>
                <h2 className={css.sectionTitle}>Our Journey</h2>
                <p className={css.text}>
                    Novi-Agro commenced operations with a team of 15 staff in 2022.
                    Since then, the organization has experienced significant growth, expanding to 30 staff in 2023, 55 staff in 2024, and 70 staff in 2025. As of 2026, the team has grown close to 100 staff members.
                </p>
                
                <div className={css.staffGrid}>
                    {staffData.map((item, index) => (
                        <div key={index} className={css.staffCard}>
                            <div className={css.yearBadge}>{item.year}</div>
                            <div className={css.staffCount}>{item.count}</div>
                            <div className={css.staffLabel}>Staff Members</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className={css.section}>
                <h2 className={css.sectionTitle}>Customer Growth</h2>
                <p className={css.text}>
                    Novi-Agro has maintained a loyal customer base since 2022, with a growing number of clients consistently
                    purchasing our products over the years. Our customer base has grown steadily:
                </p>

                <div className={css.chartContainer}>
                    {customerData.map((item, index) => (
                        <div key={index} className={css.chartRow}>
                            <div className={css.chartLabel}>{item.year}</div>
                            <div className={css.chartBarArea}>
                                <div
                                    className={css.chartBar}
                                    style={{ width: `${(item.count / maxCustomers) * 100}%` }}
                                >
                                    <span className={css.barValue}>
                                        {item.year === "2026" ? "Over " + item.count : item.count}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className={css.section}>
                <h2 className={css.sectionTitle}>Product History</h2>
                <div className={css.productGrid}>
                    {productHistory.map((period, index) => (
                        <div key={index} className={css.productCard}>
                            <div className={css.periodHeader}>
                                <span className={css.periodYear}>{period.period}</span>
                                <h3 className={css.periodTitle}>{period.title}</h3>
                            </div>
                            <ul className={css.productList}>
                                {period.products.map((product, i) => (
                                    <li key={i} className={css.productItem}>
                                        • {product}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}