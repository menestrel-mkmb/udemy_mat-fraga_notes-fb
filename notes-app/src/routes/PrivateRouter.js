import { useState, useEffect } from "react";

import { firebaseAuth } from "../services/firebaseConnection";
import { onAuthStateChanged } from "firebase/auth";
import { Navigate } from "react-router-dom";

export default function PrivateRouter({ children }){
    const [loading, setLoading] = useState(true);
    const [signed, setSigned] = useState(false);

    useEffect(()=> {
        async function checklogin(){
            const unsub = onAuthStateChanged(firebaseAuth, (user) => {
                if(user){
                    const userData = {
                        uid: user.uid,
                        email: user.email
                    }

                    localStorage.setItem("@detailUser", JSON.stringify(userData));

                    setLoading(false);
                    setSigned(true);
                } else {
                    setLoading(false);
                    setSigned(false);
                }
            });
        }
        checklogin();
    },[]);

    if(loading) return(<div>Carregando...</div>);

    if(!signed) return (<Navigate to="/" />);
    return(<>
        { children }
    </>)
}