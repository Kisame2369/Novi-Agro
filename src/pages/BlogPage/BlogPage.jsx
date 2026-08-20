import { useState, useEffect } from "react";
import BlogPost from "../../components/BlogPost/BlogPost.jsx";
import css from "./BlogPage.module.css";
import Loader from "../../components/Loader/Loader.jsx";

const PROJECT_ID = import.meta.env.VITE_SANITY_PROJECT_ID;
const DATASET = import.meta.env.VITE_SANITY_DATASET;
const POSTS_PER_PAGE = 3;

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const page = Number(params.get("page")) || 1;
    setCurrentPage(page);

    const fetchData = async () => {
      setIsLoading(true);

      const start = (page - 1) * POSTS_PER_PAGE;
      const end = start + POSTS_PER_PAGE;

      const POSTS_QUERY = encodeURIComponent(`*[_type == "blog"] | order(publishedAt desc) [${start}...${end}] {
        _id,
        title,
        publishedAt,
        body,
        "mainImage": mainImage.asset->url
      }`);

      const COUNT_QUERY = encodeURIComponent(`count(*[_type == "blog"])`);

      const POSTS_URL = `https://${PROJECT_ID}.api.sanity.io/v2023-05-03/data/query/${DATASET}?query=${POSTS_QUERY}`;
      const COUNT_URL = `https://${PROJECT_ID}.api.sanity.io/v2023-05-03/data/query/${DATASET}?query=${COUNT_QUERY}`;

      try {
        const [postsRes, countRes] = await Promise.all([
          fetch(POSTS_URL),
          fetch(COUNT_URL)
        ]);

        const postsData = await postsRes.json();
        const countData = await countRes.json();

        setPosts(postsData.result || []);
        setTotalPages(Math.ceil((countData.result || 0) / POSTS_PER_PAGE));
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <main className={css.blogPageWrapper}>
      <div className={css.pageHeader}>
        <h1 className={css.pageTitle}>Blog</h1>
        <p className={css.pageSubtitle}>
          News, articles and useful materials
        </p>
      </div>

      <div className={css.contentLayout}>
        <section className={css.mainContent}>
          <div className={css.postsContainer}>
            {isLoading ? (
              <Loader />
            ) : posts.length > 0 ? (
              posts.map((post) => (
                <BlogPost key={post._id} post={post} />
              ))
            ) : (
              <h2 className={css.noPosts}>No posts available.</h2>
            )}
          </div>

          {!isLoading && totalPages > 1 && (
            <div className={css.pagination}>
              {currentPage > 1 ? (
                <a href={`?page=${currentPage - 1}`} className={css.pageBtn}>
                  Previous
                </a>
              ) : (
                <span className={`${css.pageBtn} ${css.disabled}`}>Previous</span>
              )}

              <span className={css.pageInfo}>
                Page {currentPage} of {totalPages}
              </span>

              {currentPage < totalPages ? (
                <a href={`?page=${currentPage + 1}`} className={css.pageBtn}>
                  Next
                </a>
              ) : (
                <span className={`${css.pageBtn} ${css.disabled}`}>Next</span>
              )}
            </div>
          )}
        </section>

        <aside className={css.sidebar}>
          <div className={css.authorCard}>
            <h2 className={css.authorSectionTitle}>Author of the Blog</h2>

            <img
              src="/images/Dr.Bayo.jpeg"
              alt="Dr Bayonle Adeogun"
              className={css.authorPhoto}
            />
            <h3 className={css.authorName}>Dr Bayonle Adeogun, Ph.D., RAS</h3>
            <p className={css.authorRole}>Production Manager (Speciality Products)</p>

            <div className={css.authorContacts}>
              <p>
                <strong>Email:</strong>{" "}
                <a href="mailto:adeogunjbayo@gmail.com">adeogunjbayo@gmail.com</a>
              </p>
              <p>
                <strong>Tel / WhatsApp:</strong>{" "}
                <a href="tel:08104149690">08104149690</a>
              </p>
            </div>

            <p className={css.authorBio}>
              Dr Adeogun is an accomplished Animal Scientist and Nutritionist with a B.Sc. in Animal Science, an M.Sc. in Agricultural Biochemistry and Nutrition, and a Ph.D. in Animal Nutrition, with specialization in Nutritional Toxicology.
            </p>
            <p className={css.authorBio}>
              A Registered Animal Scientist and member of several professional bodies, he has over two decades of experience in monogastric animal nutrition, feed formulation, and farm management. His doctoral research and professional interests have focused on mycotoxicology, toxin binders, antioxidants, oxidative stress, hepatic detoxification and protection, and mycotoxin-biotransforming enzymes.
            </p>
            <p className={css.authorBio}>
              He joined Novi-Agro Ltd in June 2022 and currently serves as Production Manager, Specialty Products.
            </p>
          </div>
        </aside>
      </div>
    </main>
  );
}