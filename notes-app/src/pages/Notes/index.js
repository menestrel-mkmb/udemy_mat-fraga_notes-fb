import { useEffect, useState } from "react";
import styles from "./index.module.css";

export default function Notes(){
    const [notes, setNotes] = useState('');
    const [newNote, setNewNote] = useState('');
    let notesList = ['essa é uma nota de exemplo', 'essa é outra nota'];

    const clearNewNote = () => {
        setNewNote('');
    }

    const addNewNote = () => {
        alert(newNote);
    }

    const deleteNote = (index) => {
        const resultNotesList = notesList.splice(index,1);
    }

    useEffect(() => {
    }, [notes]);

    return(
    <main
        className={`${styles.main} ${styles.main__sect}`}
    >
        <h1 className={`${styles.main__title}`}>Lista de Tarefas</h1>
        <article
            className={`${styles.notes__sect} ${styles.notes}`}
        >
            <section
                className={`${styles.newNote__sect} ${styles.newNote}`}
            >
                <h2>Nova anotação</h2>
                <input
                    className={`${styles.newnote__inp} ${styles.inp}`}
                    type="text"
                    value={newNote}
                    onChange={e=>setNewNote(e.target.value)}
                />
                <section className={`${styles.btns__sect}`}>
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
            </section>
            <section>
                <h2>
                    Suas Anotações
                </h2>
                {notesList.length > 0 &&
                (<article>
                    {notesList.map( (note,index) => (
                        <section key={index}
                            className={`${styles.note} ${styles.note}${index}`}
                        >
                            <p
                                className={`${styles.note__txt}`}
                            >
                                {note}
                            </p>
                            <button
                                className={`${styles.noteDelete__btn}`}
                                onClick={e=>deleteNote(index)}
                            >
                                X
                            </button>
                        </section>
                    ))}
                </article>)}
                {!notesList.length > 0 &&
                (<article>
                    <h3>Você não possui nenhuma anotação salva.</h3>
                </article>)}
            </section>
        </article>
    </main>)
}