import css from "./BlogPost.module.css";
import { PortableText } from '@portabletext/react';

export default function BlogPost({ post }) {
  const {
    title = "",
    mainImage = "",
    publishedAt = new Date().toISOString(),
    body = []
  } = post || {};

  const formattedDate = new Date(publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className={css.blogSection}>
      <div className={css.container}>

        <div className={css.imageWrapper}>
          <img
            loading="lazy"
            className={css.blogImage}
            src={mainImage}
            alt={title}
          />
        </div>

        <h2 className={css.blogTitle}>{title}</h2>

        <span className={css.dateTagline}>{formattedDate}</span>

        <div className={css.blogText}>
          <PortableText value={body} />
        </div>

      </div>
    </article>
  );
}