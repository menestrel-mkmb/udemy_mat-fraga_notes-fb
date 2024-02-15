import { useState } from "react";
import styles from "./index.module.css";
import { Link, useNavigate } from "react-router-dom";

import { firebaseAuth } from "../../services/firebaseConnection";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function Register(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [registered, setRegistered] = useState(false);

    const navigate = useNavigate();

    const signUp = (e) => {
        e.preventDefault();

        if(email !== '' && password !== ''){
            createUserWithEmailAndPassword(firebaseAuth, email, password)
            .then((value) => {
                console.log("Cadastrado com sucesso");
                console.log(value);
            })
            .catch((reason) => {
                console.log("Erro ao cadastrar");
                console.log(reason);
            });
            setRegistered(true);
            navigate("/", { replace: true });
        }
    }

    return(
        <main className={styles.main__sect}>
            <h1 className={styles.main__title}>Lista de tarefas</h1>
            <span className={styles.main__desc}>Crie já sua conta e comece a organizar sua vida</span>

            {!registered && 
            (<article>
                <h2 className={`${styles.main__subtitle}`}>Register</h2>
                <form className={styles.register__form} onSubmit={signUp}>
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
                    className={`${styles.login__btn} ${styles.btn}`}
                    type="submit"
                >
                    Cadastrar
                </button>
                </form>
                <section className={`${styles.login__sect}`}>
                    <span className={`${styles.login__span}`}>Já possui uma conta? </span>
                    <Link className={`${styles.login__link} ${styles.elegant__link}`} to="/">Entrar</Link>
                </section>
            </article>)}
            {registered && 
            (<article>
                <h3>Você será redirecionado para o login</h3>
                <span>caso isso não aconteça, você pode <Link className={`${styles.elegant__link}`} to="/">clicar aqui</Link></span>
            </article>)}
        </main>
    )
}