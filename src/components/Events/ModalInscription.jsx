import axios from "axios";
import { useState, useContext } from "react";
import Context from "../../contexts/Context";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const { cookies, setIdEventParticipants, setShowModalUpdateEvent } =
    useContext(Context);

  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [licence, setLicence] = useState("");
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState("");
  const [club, setClub] = useState("");
  const [category, setCategory] = useState("1ère Série");
  const [food, setFood] = useState(1);
  const [day, setDay] = useState(1);
  const [deleteEvent, setDeleteEvent] = useState(false);

  let navigate = useNavigate();

  // Submit the inscription

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
        .then(() => {
          toast.success("Inscription réussie !");
        })
        .then(() => navigate("/participants"))
        .catch((err) => console.log(err));
    } else {
      toast.error("Informations incomplètes");
    }
  };

  // Modal background

  const handleChildClick = (item) => {
    item.stopPropagation(item);
  };

  // delete Event

  const handleDeleteEvent = (e) => {
    e.preventDefault();
    axios
      .delete(`http://localhost:8000/api/events/${idEvent}`, {
        withCredentials: true,
      })
      .then(() => {
        toast.success("Evènement supprimé avec succès");
        setShowModal(false);
        setDeleteEvent(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Un problème s'est produit");
      });
  };

  // Update Evant

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
                defaultValue={"1ère Série"}
                name="category"
                id="category"
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="1ère Série">1ère Série</option>
                <option value="2ème Série">2ème Série</option>
                <option value="3ème Série">3ème Série</option>
                <option value="4ème Série">4ème Série</option>
                <option value="Vétéran">Vétéran</option>
                <option value="Super Vétéran">Super Vétéran</option>
                <option value="Master">Master</option>
                <option value="Handisport">Handisport</option>
                <option value="Dame">Dame</option>
                <option value="Junior">Junior</option>
                <option value="Cadet">Cadet</option>
              </select>
            </div>
            <div>
              <label htmlFor="day">Jour</label>
              <select
                defaultValue={"1"}
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
                defaultValue={1}
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
        <div className="modalInscription__bottomConnected">
          <div>
            <button>
              <Link to="/participants">
                <p>Voir les participants</p>
              </Link>
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
        <div className="modalInscription__bottomDisconnected">
          <button>
            <Link to="/participants">
              <p>Voir les participants</p>
            </Link>
          </button>
          <button
            className="modalInscription__closeButton"
            onClick={() => setShowModal(false)}
          >
            Fermer
          </button>
        </div>
      )}
    </div>
  );
};

export default ModalInscription;
