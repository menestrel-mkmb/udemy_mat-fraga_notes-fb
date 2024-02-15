import { useEffect, useState } from "react";
import styles from "./index.module.css";

import { firebaseAuth, firebaseDb } from "../../services/firebaseConnection";
import { signOut } from "firebase/auth";
import { addDoc, collection, deleteDoc, getDocs, updateDoc } from "firebase/firestore";

export default function Notes(){
    const [notes, setNotes] = useState('');
    const [newNote, setNewNote] = useState('');
    let notesList = ['essa é uma nota de exemplo', 'essa é outra nota'];
    const [userEmail,setUserEmail] = useState('');
    const [userUid,setUserUid] = useState('');

    const clearNewNote = (e) => {
        e.preventDefault();
        setNewNote('');
    }

    const addNewNote = async (e) => {
        e.preventDefault();
        if(newNote === '') return;

        await addDoc(collection(firebaseDb, "tarefas"), {
            tarefa: newNote,
            created: new Date(),
            userUid: userUid
        })
        .then((value)=>{
            console.log(value);
            setNewNote('');
        })
        .catch((reason)=>{
            console.log(reason);
        })
    }

    const editNote = (e, index) => {
        e.preventDefault();
        setNewNote(notesList[index]);
    }

    const deleteNote = (e,index) => {
        alert(index);
        const resultNotesList = notesList.splice(index,1);
    }

    useEffect(()=> {
        const user = localStorage.getItem("@detailUser");
        const parsedUser = JSON.parse(user);
        setUserEmail(parsedUser.email);
        setUserUid(parsedUser.uid);
    }, []);

    useEffect(() => {
    }, [notes]);

    return(
    <main
        className={`${styles.main} ${styles.main__sect}`}
    >
        <section className={`${styles.head__sect}`}>
            <h1 className={`${styles.main__title}`}>
                Lista de Tarefas
            </h1>

            <span className={`${styles.logged__txt}`}>
                Você está logado como <strong>{userEmail}</strong>. </span>
            <span className={`${styles.logged__txt}`}>
                 Não é você?
                <button className={`${styles.logout__btn}`}
                    onClick={e=>signOut(firebaseAuth)}
                >
                    Sair
                </button>
            </span>
        </section>
        <article
            className={`${styles.notes__artc} ${styles.allNotes}`}
        >
            <form
                className={`${styles.newNote__form} ${styles.newNote}`}
                onSubmit={addNewNote}
            >
                <h2>Nova anotação</h2>
                <input
                    className={`${styles.newNote__inp} ${styles.inp}`}
                    type="text"
                    value={newNote}
                    onChange={e=>setNewNote(e.target.value)}
                />
                <section className={`${styles.btns__sect}`}>
                    <button
                        onClick={clearNewNote}
                        className={`${styles.btn} ${styles.newNote__btn} ${styles.clear__btn}
                        ${styles.note__btn}`}
                        type="reset"
                    >
                        Limpar
                    </button>
                    <button
                        className={`${styles.btn} ${styles.newNote__btn} ${styles.addNote__btn}
                        ${styles.note__btn} ${styles.feature__btn}`}
                        type="submit"
                    >
                        Adicionar anotação
                    </button>
                </section>
            </form>
            <section className={`${styles.notes__sect} ${styles.notes}`}>
                <h2 className={`${styles.notes__title}`}>
                    Suas Anotações
                </h2>
                {notesList.length > 0 &&
                (<article className={`${styles.notesList__artc} ${styles.notesList}`}>
                    {notesList.map( (note,index) => (
                        <section key={index}
                            className={`${styles.note} ${styles.note}${index}`}
                        >
                            <p
                                className={`${styles.note__txt}`}
                            >
                                {note}
                            </p>
                            <section className={`${styles.btns__sect}`}>
                                <button
                                    className={`${styles.noteDelete__btn} ${styles.note__btn}
                                    ${styles.btn}`}
                                    onClick={e=>editNote(e,index)}
                                >
                                    Editar
                                </button>
                                <button
                                    className={`${styles.noteDelete__btn} ${styles.note__btn}
                                    ${styles.btn} ${styles.feature__btn}`}
                                    onClick={e=>deleteNote(e,index)}
                                >
                                    Concluir
                                </button>
                            </section>
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