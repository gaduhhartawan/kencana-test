import { GetServerSideProps } from "next";
import Link from "next/link";
import styles from "@/styles/UserDetail.module.css";

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
  };
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
}

interface UserDetailProps {
  user: User;
}

export default function UserDetail({ user }: UserDetailProps) {
  return (
    <div className={styles.container}>
      <Link href="/" className={styles.backButton}>
        &larr; Kembali ke Daftar
      </Link>
      <div className={styles.card}>
        <h1 className={styles.title}>{user.name}</h1>
        <div className={styles.info}>
          <section>
            <h2>Informasi Kontak</h2>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Telepon:</strong> {user.phone}
            </p>
            <p>
              <strong>Website:</strong> {user.website}
            </p>
          </section>

          <section>
            <h2>Alamat</h2>
            <p>
              {user.address.street}, {user.address.suite}
            </p>
            <p>
              {user.address.city}, {user.address.zipcode}
            </p>
          </section>

          <section>
            <h2>Perusahaan</h2>
            <p>
              <strong>Nama:</strong> {user.company.name}
            </p>
            <p>
              <strong>Slogan:</strong> {user.company.catchPhrase}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  const user = await res.json();

  if (!user.id) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      user,
    },
  };
};
