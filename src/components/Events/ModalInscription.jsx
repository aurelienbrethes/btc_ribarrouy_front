import axios from "axios";
import { useState, useContext } from "react";
import Context from "../../contexts/Context";

const ModalInscription = ({
  title,
  description,
  date,
  place,
  setShowModal,
  idEvent,
}) => {
  const {
    cookies,
    setShowModalParticipants,
    setIdEventParticipants,
    setShowModalUpdateEvent,
    setShowModalInscription,
  } = useContext(Context);

  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [licence, setLicence] = useState("");
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState("");
  const [deleteEvent, setDeleteEvent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (lastname + firstname + licence + email + phone + idEvent) {
      axios
        .post(`http://localhost:8000/api/participants`, {
          lastname,
          firstname,
          licence,
          email,
          phone,
          idEvent,
        })
        .then(() => console.log("participant créé"))
        .catch((err) => console.log(err));
    } else {
      console.log("informations incomplètes");
    }
  };

  const handleChildClick = (item) => {
    item.stopPropagation(item);
  };

  const handleChangeModal = () => {
    setShowModalParticipants(true);
    setShowModal(false);
    setIdEventParticipants(idEvent);
  };

  const handleDeleteEvent = (e) => {
    e.preventDefault();
    axios
      .delete(`http://localhost:8000/api/events/${idEvent}`, {
        withCredentials: true,
      })
      .then(() => console.log("Evenement supprimé"))
      .then(() => {
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      });
  };

  const handleUpdateEvent = () => {
    setShowModalUpdateEvent(true);
    setShowModal(false);
    setIdEventParticipants(idEvent);
  };

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
            <input
              type="text"
              id="lastname"
              onChange={(e) => setLastname(e.target.value)}
            />
            <label htmlFor="firstname">Prénom</label>
            <input
              type="text"
              id="firstname"
              onChange={(e) => setFirstname(e.target.value)}
            />
            <label htmlFor="licenceNumber">Numéro de licence</label>
            <input
              type="text"
              id="licenceNumber"
              onChange={(e) => setLicence(e.target.value)}
            />
            <label htmlFor="phone">Téléphone</label>
            <input
              type="number"
              id="phone"
              onChange={(e) => setPhone(e.target.value)}
            />
            <label htmlFor="email">email</label>
            <input
              type="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit" onClick={(e) => handleSubmit(e)}>
              S'inscrire
            </button>
          </form>
        </aside>
      </section>
      <button onClick={() => setShowModal(false)}>Fermer</button>
      {cookies.monCookie && (
        <div>
          <button onClick={() => handleChangeModal()}>Voir les inscrits</button>
          <button onClick={() => handleUpdateEvent()}>Modifier</button>
          <button onClick={() => setDeleteEvent(true)}>Supprimer</button>
          {deleteEvent && (
            <div>
              <p>Êtes-vous sûr de vouloir supprimer cet évènement ?</p>
              <button onClick={(e) => handleDeleteEvent(e)}>Oui</button>
              <button onClick={() => setDeleteEvent(false)}>Non</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ModalInscription;
