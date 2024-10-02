import { useState } from "react";
import styles from "@/styles/Register.module.css";
import Link from "next/link";

interface FormData {
  name: string;
  email: string;
  password: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
}

export default function Register() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submittedData, setSubmittedData] = useState<FormData | null>(null);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Nama harus diisi";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email harus diisi";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Format email tidak valid";
    }

    if (!formData.password) {
      newErrors.password = "Password harus diisi";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password minimal 6 karakter";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      setSubmittedData(formData);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Daftar Akun</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Nama</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? styles.errorInput : ""}
          />
          {errors.name && <span className={styles.error}>{errors.name}</span>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? styles.errorInput : ""}
          />
          {errors.email && <span className={styles.error}>{errors.email}</span>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={errors.password ? styles.errorInput : ""}
          />
          {errors.password && (
            <span className={styles.error}>{errors.password}</span>
          )}
        </div>

        <button type="submit" className={styles.button}>
          Daftar
        </button>
      </form>

      {submittedData && (
        <div className={styles.submittedData}>
          <h2>Data yang Dikirim:</h2>
          <div className={styles.dataItem}>
            <strong>Nama:</strong> {submittedData.name}
          </div>
          <div className={styles.dataItem}>
            <strong>Email:</strong> {submittedData.email}
          </div>
          <div className={styles.dataItem}>
            <strong>Password:</strong>{" "}
            {submittedData.password.replace(/./g, "*")}
          </div>

          <Link href="/">
            <button className={styles.button}>Pergi ke Home</button>
          </Link>
        </div>
      )}
    </div>
  );
}
