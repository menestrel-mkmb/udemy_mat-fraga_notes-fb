import { useState } from "react";
import "./index.module.css";

export default function Home(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    return(
    <main className="home-container">
        <h1>Lista de tarefas</h1>
        <span>Gerencia sua agenda de forma fácil.</span>

        <form>
            <section>
                <label>
                    e-mail:
                </label>
                <input
                    type="email"
                    placeholder="Digite seu e-mail"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
            </section>
            <section>
                <label>
                    senha:
                </label>
                <input
                    type="password"
                    placeholder="Digite sua senha"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <button
                    type="submit"
                >
                    Entrar
                </button>
            </section>
        </form>
    </main>
    )
}