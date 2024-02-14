import { useState } from "react";
import styles from "./index.module.css";

export default function Home(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return(
    <main className={`${styles.main__sect} ${styles.main}`}>
        <h1 className={styles.main__title}>Lista de tarefas</h1>
        <span className={styles.main__desc}>Gerencia sua agenda de forma fácil.</span>

        <form className={styles.login__form}>
            <section className={`${styles.inpt__sect} ${styles.email__sect}`}>
                <label className={`${styles.inp__lbl} ${styles.email__lbl}`}>
                    e-mail:
                </label>
                <input
                    className={`${styles.inp} ${styles.email__inp}`}
                    type="email"
                    placeholder="Digite seu e-mail"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
            </section>
            <section className={`${styles.inpt__sect} ${styles.password__sect}`}>
                <label className={`${styles.inp__lbl} ${styles.password__lbl}`}>
                    senha:
                </label>
                <input
                    className={`${styles.inp} ${styles.password__inp}`}
                    autoComplete="false"
                    type="password"
                    placeholder="Digite sua senha"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
            </section>
            <button
                type="submit"
            >
                Entrar
            </button>
        </form>
    </main>
    )
}