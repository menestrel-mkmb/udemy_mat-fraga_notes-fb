import { useEffect, useState } from "react";
import styles from "./index.module.css";

import { firebaseAuth, firebaseDb } from "../../services/firebaseConnection";
import { signOut } from "firebase/auth";
import { addDoc, collection, doc, onSnapshot, orderBy, query, deleteDoc, updateDoc } from "firebase/firestore";

export default function Notes(){
    const [notesList, setNotesList] = useState([]);
    const [idList, setIdList] = useState([]);
    const [newNote, setNewNote] = useState('');
    const [userEmail,setUserEmail] = useState('');
    const [userUid,setUserUid] = useState('');
    const [loading, setLoading] = useState(true);
    const [toEdit, setToEdit] = useState(false);
    const [editId, setEditId] = useState('');

    const clearNewNote = (e) => {
        e.preventDefault();
        setNewNote('');
        setToEdit(false);
    }

    const addNewNote = async (e) => {
        e.preventDefault();
        if(newNote === '') return;

        const collectionTarefas = collection(firebaseDb, `tarefas-${userUid}`);

        await addDoc(collectionTarefas, {
            tarefa: newNote,
            created: new Date(),
            userUid: userUid
        })
        .then(() => {
            setNewNote('');
        })
        .catch((reason)=>{
            console.log(reason);
        })
    }

    const editNote = (e, index) => {
        e.preventDefault();

        setNewNote(notesList[index]);
        setEditId(idList[index]);
        setToEdit(true);
    }

    const sendEditedNote = async () => {
        const docToEdit = doc(firebaseDb, `tarefas-${userUid}`, editId);

        await updateDoc(docToEdit, {
            tarefa: newNote
        })
        .then( () => {
            setNewNote('');
            setToEdit(false);
        })
        .catch( (reason) => {
            console.log(reason);
        });
        
    }

    const deleteNote = async (e,index) => {
        e.preventDefault();
        const docUid = idList[index];
        const docToDelete = doc(firebaseDb, `tarefas-${userUid}`, docUid);

        await deleteDoc(docToDelete)
        .catch( (reason) => {
            console.log(reason);
        });
    }

    useEffect(()=> {
        const user = localStorage.getItem("@detailUser");
        const parsedUser = JSON.parse(user);
        setUserEmail(parsedUser.email);
        setUserUid(parsedUser.uid);

        if(userUid !== ''){
            const tarefaRef = collection(firebaseDb,`tarefas-${userUid}`);
            const q = query(tarefaRef,
                        orderBy("created", "desc"));
            onSnapshot(q, (snapshot) => {
                let listId = [];
                let list = [];
                snapshot.forEach((doc) => {
                    list.push(doc.data().tarefa);
                    listId.push(doc.id);
                });
                setNotesList(list);
                setIdList(listId);
            });

            if(loading) setLoading(false);
        }
    }, [idList, loading, notesList, userUid]);

    if(loading) return(
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
                    className={`${styles.newNote__inp} ${styles.inp} ${styles.fullwtopborder}`}
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
                <h3>Carregando...</h3>
            </section>
        </article>
    </main>
    )

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
                //onSubmit={addNewNote}
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
                        className={`${styles.btn} ${styles.newNote__btn} ${styles.clear__btn}
                        ${styles.note__btn}`}
                        onClick={clearNewNote}
                        type="reset"
                    >
                        {toEdit ? "Cancelar editar" : "Limpar"}
                    </button>
                    <button
                        className={`${styles.btn} ${styles.newNote__btn} ${styles.addNote__btn}
                        ${styles.note__btn} ${styles.feature__btn}`}
                        type={toEdit ? "button" : "submit"}
                        onClick={toEdit ? sendEditedNote : addNewNote}
                    >
                        {toEdit ? "Editar" : "Adicionar"} anotação
                    </button>
                </section>
            </form>
            <section className={`${styles.notes__sect} ${styles.notes}`}>
                <h2 className={`${styles.notes__title}`}>
                    Suas Anotações
                </h2>
                {notesList.length > 0 &&
                (<article className={`${styles.notesList__artc} ${styles.notesList}`}>
                    {notesList.map( (note, index) => (
                        <section key={index}
                            className={`${styles.note} ${styles.note}${index}`}
                        >
                            <p
                                className={`${styles.note__txt}`}
                            >
                                {note}
                            </p>
                            <section className={`${styles.btns__sect}`}>
                                {!toEdit && (
                                <button
                                    className={`${styles.noteDelete__btn} ${styles.note__btn}
                                    ${styles.btn}`}
                                    onClick={e=>editNote(e, index)}
                                >
                                    Editar
                                </button>
                                )}
                                <button
                                    className={`${styles.noteDelete__btn} ${styles.note__btn}
                                    ${styles.btn} ${styles.feature__btn}`}
                                    onClick={e=>deleteNote(e, index)}
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