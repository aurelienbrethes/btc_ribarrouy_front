import { useEffect, useState } from "react";
import axios from 'axios';

const ModalConnect = ({setModalConnect, modalConnect}) => {

    const [login, setLogin] = useState (false);

    console.log(login);

    useEffect(() => {
        login && axios.post(`http://localhost:8000/api/auth/login`)
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
    }, [login]);

    const handleChildClick = (item) => {
        item.stopPropagation(item);
    };

    const handleParentsClick = () => {
        setModalConnect(false)
    };

    return (
        <div className={modalConnect ? "modalBack" : "displayNone"} onClick={() => handleParentsClick() }>
            <div className="modalBack__modal" onClick={(e) => handleChildClick(e)}>
                <label htmlFor="email">Email</label>
                <input type="email" />
                <label htmlFor="password">Mot de passe</label>
                <input type="text" />
                <button type="submit" onClick={() => setLogin(true)}>Se connecter</button>
            </div>
        </div>
    )
}

export default ModalConnect;