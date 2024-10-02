import styles from "@/styles/Article.module.css";
import Link from "next/link";

interface Post {
  id: number;
  title: string;
  body: string;
}

interface ArticleProps {
  posts: Post[];
}

export default function Article({ posts }: ArticleProps) {
  return (
    <div className={styles.container}>
      <Link href="/" className={styles.backButton}>
        &larr; Kembali ke Home
      </Link>
      <h1 className={styles.title}>Daftar Artikel</h1>
      <div className={styles.grid}>
        {posts.map((post) => (
          <article key={post.id} className={styles.card}>
            <h2 className={styles.cardTitle}>{post.title}</h2>
            <p className={styles.cardBody}>{post.body}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await res.json();

  return {
    props: {
      posts,
    },
  };
}
