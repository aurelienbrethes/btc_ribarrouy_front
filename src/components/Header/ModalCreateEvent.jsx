import { useState } from "react";
import axios from 'axios';

const ModalCreacteEvent = ({setShowModalCreateEvent, showModalCreateEvent}) => {

    const [titre, settitre] = useState ("");
    const [description, setDescription] = useState("");
    const [lieu, setlieu] = useState ("");
    const [date, setdate] = useState("");

    const handleCreateEvent = (event) => {
        event.preventDefault()
        axios.post(`http://localhost:8000/api/events`, {titre, description, date, lieu}, { withCredentials: true } )
        .then((res) => res.data)
        .then(() => {
            console.log("Votre évènement a bien été créé");
            setTimeout(() => {
                window.location.reload();
            }, 1500);
        })
        .catch((err) => console.log(err));
    }

    const handleChildClick = (item) => {
        item.stopPropagation(item);
    };

    const handleParentsClick = () => {
        setShowModalCreateEvent(false)
    };

    return (
        <div className={showModalCreateEvent ? "modalBack" : "displayNone"} onClick={() => handleParentsClick() }>
            <form className="modalBack__modal" onClick={(e) => handleChildClick(e)}>
                <label htmlFor="titre">Titre</label>
                <input type="text" onChange={(e) => settitre(e.target.value)}/>
                <label htmlFor="description">Description</label>
                <input type="text" onChange={(e) => setDescription(e.target.value)} />
                <label htmlFor="lieu">Lieu</label>
                <input type="text" onChange={(e) => setlieu(e.target.value)}/>
                <label htmlFor="date">Date</label>
                <input type="date" onChange={(e) => setdate(e.target.value)} />
                <button type="submit" onClick={(e) => handleCreateEvent(e)}>Envoyer</button>
            </form>
        </div>
    )
}

export default ModalCreacteEvent;