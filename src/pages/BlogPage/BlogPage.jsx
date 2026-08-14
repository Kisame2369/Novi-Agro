import { useState, useEffect } from "react";
import BlogPost from "../../components/BlogPost/BlogPost.jsx";
import css from "./BlogPage.module.css";

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

    <div className={css.postsContainer}>
      {isLoading ? (
        <h2 className={css.noPosts}>Loading...</h2>
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
  </main>
);
}