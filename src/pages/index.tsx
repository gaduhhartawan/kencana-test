import Link from "next/link";
import styles from "@/styles/Home.module.css";

interface User {
  id: number;
  name: string;
  email: string;
  company: {
    name: string;
  };
}

interface HomeProps {
  users: User[];
}

export default function Home({ users }: HomeProps) {
  return (
    <div>
      <nav className={styles.navbar}>
        <div className={styles.navbarContent}>
          <Link href="/" className={styles.logo}>
            MyCompany
          </Link>
          <div className={styles.navLinks}>
            <Link href="/article" className={styles.navLink}>
              Article
            </Link>
            <Link href="/product" className={styles.navLink}>
              Product
            </Link>
            <Link href="/register" className={styles.navLink}>
              Register
            </Link>
          </div>
        </div>
      </nav>

      <div className={styles.container}>
        <h1 className={styles.title}>Daftar Pengguna</h1>
        <div className={styles.grid}>
          {users.map((user) => (
            <Link
              href={`/users/${user.id}`}
              key={user.id}
              className={styles.card}
            >
              <h2>{user.name}</h2>
              <p>Email: {user.email}</p>
              <p>Perusahaan: {user.company.name}</p>
              <span className={styles.viewMore}>Lihat Detail &rarr;</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await res.json();

  return {
    props: {
      users,
    },
  };
}
