import { useEffect, useState } from "react";
import styles from "./index.module.css";

export default function Notes(){
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState('');
    let notesList = [];

    const clearNewNote = () => {
        setNewNote('');
    }

    const addNewNote = () => {
        alert(newNote);
    }

    useEffect(() => {
    }, [notes]);

    return(<main>
        <h1>Notes</h1>
        <article
            className={`${styles.notes__sect} ${styles.notes}`}
        >
            <section>
                <h2>Nova anotação</h2>
                <input
                    className={`${styles.newnote__inp} ${styles.inp}`}
                    type="text"
                    value={newNote}
                    onChange={e=>setNewNote(e.target.value)}
                />
                <button
                    onClick={clearNewNote}
                    className={`${styles.btn} ${styles.newNote__btn} ${styles.clear__btn}`}
                >
                    Limpar
                </button>
                <button
                    onClick={addNewNote}
                    className={`${styles.btn} ${styles.newNote__btn} ${styles.addNote__btn}`}
                >
                    Adicionar anotação
                </button>
            </section>
            <section>
                <h2>
                    Suas Anotações
                </h2>
                {notesList.length > 0 &&
                (<article>
                </article>)}
                {!notesList.length > 0 &&
                (<article>
                    <h3>Você não possui nenhuma anotação salva.</h3>
                </article>)}
            </section>
        </article>
    </main>)
}