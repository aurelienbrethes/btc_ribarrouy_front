import axios from "axios";
import { useState, useContext } from "react";
import Context from '../../contexts/Context';


const ModalInscription = ({title, description, date, place, setShowModal, idEvent}) => {

    const { cookies, setShowModalParticipants, setIdEventParticipants } = useContext(Context);

    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [licence, setLicence] = useState('');
    const [tel, setTel] = useState();
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (
            nom + prenom + licence + email + tel + idEvent
        ){
            axios.post(`http://localhost:8000/api/participants`, {
                nom,
                prenom,
                licence,
                email,
                tel,
                idEvent
            })
            .then(() => console.log("participant créé"))
            .catch((err) => console.log(err));
        } else {
            console.log("informations incomplètes")
        }        
    }

    // const handleParentsClick = () => {
    //     setShowModalCreateEvent(false)
    // };

    const handleChildClick = (item) => {
        item.stopPropagation(item);
    };

    const handleChangeModal = () => {
        setShowModalParticipants(true);
        setShowModal(false);
        setIdEventParticipants(idEvent);
    }

    return (
            <div className="modal" onClick={(e) => handleChildClick(e)}>
                <section>
                    <aside>
                        <h2>{title}</h2>
                        <p>{date}</p>
                        <p>{place}</p>
                        <p>{description}</p>
                    </aside>
                    <aside>
                        <form action="submit">
                            <h2>Inscriptions :</h2>
                            <label htmlFor="lastname">Nom</label>
                            <input type="text" id="lastname" onChange={(e) => setNom(e.target.value)} />
                            <label htmlFor="firstname">Prénom</label>
                            <input type="text" id="firstname" onChange={(e) => setPrenom(e.target.value)}/>
                            <label htmlFor="licenceNumber">Numéro de licence</label>
                            <input type="text" id="licenceNumber"  onChange={(e) => setLicence(e.target.value)} />
                            <label htmlFor="phone">Téléphone</label>
                            <input type="number" id="phone"  onChange={(e) => setTel(e.target.value)} />
                            <label htmlFor="email">email</label>
                            <input type="email" id="email"  onChange={(e) => setEmail(e.target.value)} />
                            <button type="submit" onClick={(e) => handleSubmit(e)}>S'inscrire</button>
                        </form>
                    </aside>
                </section>
                <button onClick={() => setShowModal(false)}>Fermer</button>
                {cookies.monCookie &&
                    <button onClick={() => handleChangeModal()}>Voir les inscrits</button>         
                }
            </div>
    )
}

export default ModalInscription;