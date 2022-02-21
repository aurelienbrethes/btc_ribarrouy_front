import axios from "axios";
import { useState, useContext } from "react";
import Context from "../../contexts/Context";

const foodArray = [];

for (let i = 0; i < 30; i++) {
  foodArray.push(i);
}

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
  } = useContext(Context);

  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [licence, setLicence] = useState("");
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState("");
  const [club, setClub] = useState("");
  const [category, setCategory] = useState("");
  const [food, setFood] = useState(0);
  const [day, setDay] = useState(0);
  const [deleteEvent, setDeleteEvent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      lastname &&
      firstname &&
      licence &&
      phone &&
      email &&
      club &&
      category &&
      food &&
      day
    ) {
      axios
        .post(`http://localhost:8000/api/participants`, {
          lastname,
          firstname,
          licence,
          email,
          phone,
          club,
          category,
          food,
          idEvent,
          day,
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
    <div className="modalInscription" onClick={(e) => handleChildClick(e)}>
      <section>
        <aside className="modalInscription__left">
          <h2>{title}</h2>
          <p>{date}</p>
          <p>{place}</p>
          <p>{description}</p>
        </aside>
        <aside className="modalInscription__right">
          <form action="submit">
            <h2>Inscriptions :</h2>
            <div>
              <label htmlFor="lastname">Nom</label>
              <input
                type="text"
                id="lastname"
                onChange={(e) => setLastname(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="firstname">Prénom</label>
              <input
                type="text"
                id="firstname"
                onChange={(e) => setFirstname(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="club">Club</label>
              <input
                type="club"
                id="club"
                onChange={(e) => setClub(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="licenceNumber">Numéro de licence</label>
              <input
                type="text"
                id="licenceNumber"
                onChange={(e) => setLicence(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="phone">Tél.</label>
              <input
                className="modalinscription__right-tel"
                type="text"
                id="phone"
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email">email</label>
              <input
                type="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="category">Catégorie</label>
              <select
                name="category"
                id="category"
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="1ère Serie">1ère Série</option>
                <option value="2ème Serie">2ème Série</option>
                <option value="3ème Serie">3ème Série</option>
                <option value="4ème Serie">4ème Série</option>
                <option value="vétéran">Vétéran</option>
                <option value="super vétéran">Super Vétéran</option>
                <option value="master">Master</option>
                <option value="handisport">Handisport</option>
                <option value="dame">Dame</option>
                <option value="junior">Junior</option>
                <option value="cadet">Cadet</option>
              </select>
            </div>
            <div>
              <label htmlFor="day">Jour</label>
              <select
                name="day"
                id="day"
                onChange={(e) => setDay(e.target.value)}
              >
                <option value="1">1</option>
                <option value="2">2</option>
              </select>
            </div>
            <div>
              <label htmlFor="food">Repas</label>
              <select
                name="food"
                id="food"
                onChange={(e) => setFood(e.target.value)}
              >
                {foodArray.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" onClick={(e) => handleSubmit(e)}>
              S'inscrire
            </button>
          </form>
        </aside>
      </section>
      {cookies.monCookie ? (
        <div className="modalInscription__bottom">
          <div>
            <button onClick={() => handleChangeModal()}>
              Voir les inscrits
            </button>
            <button onClick={() => handleUpdateEvent()}>Modifier</button>
            <button onClick={() => setDeleteEvent(true)}>Supprimer</button>
            <button onClick={() => setShowModal(false)}>Fermer</button>
          </div>
          {deleteEvent && (
            <div>
              <p>Êtes-vous sûr de vouloir supprimer cet évènement ?</p>
              <button onClick={(e) => handleDeleteEvent(e)}>Oui</button>
              <button onClick={() => setDeleteEvent(false)}>Non</button>
            </div>
          )}
        </div>
      ) : (
        <button
          className="modalInscription__closeButton"
          onClick={() => setShowModal(false)}
        >
          Fermer
        </button>
      )}
    </div>
  );
};

export default ModalInscription;
