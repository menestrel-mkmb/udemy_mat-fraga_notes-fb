import { useState } from "react";
import styles from "./index.module.css";
import { Link, useNavigate } from "react-router-dom";

import { firebaseAuth } from "../../services/firebaseConnection";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Home(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [login, setLogin] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        if(email !== '' && password !== ''){
            await signInWithEmailAndPassword(firebaseAuth, email, password)
            .then((value) => {
                console.log(value);
                setLogin(true);
                navigate('/notes', { replace: true });
            })
            .catch((reason) => {
                console.log(reason);
            });
        }
    }

    return(
    <main className={`${styles.main__sect} ${styles.main}`}>
        <h1 className={styles.main__title}>Lista de tarefas</h1>
        <span className={styles.main__desc}>Gerencia sua agenda de forma fácil.</span>

        { !login &&
        (<article>
            <h2 className={`${styles.main__subtitle}`}>Entrar</h2>
            <form className={styles.login__form} onSubmit={handleLogin}>
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
                Entrar
            </button>
        </form>
        <section className={`${styles.register__sect}`}>
            <span className={`${styles.register__span}`}>Não tem uma conta ainda? </span>
            <Link className={`${styles.register__link} ${styles.elegant__link}`} to="/register">Registrar</Link>
        </section>
        </article>)}
        { login && (<article>
            <p>Você logou como {email}.
            Se você não for redirecionado logo, pode 
            <Link to="/notes">clicar aqui</Link>
            para ir para suas anotações</p>
        </article>)}
    </main>
    )
}