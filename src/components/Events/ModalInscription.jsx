import axios from "axios";
import { useState, useContext } from "react";
import CustomButton from "../UI/CustomButton";
import H2 from "../UI/H2";

import Context from "../../contexts/Context";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const foodArray = [];

for (let i = 0; i < 30; i++) {
  foodArray.push(i);
}

const ModalInscription = ({
  showModal,
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

  // Update Event

  const handleUpdateEvent = () => {
    setShowModalUpdateEvent(true);
    setShowModal(false);
    setIdEventParticipants(idEvent);
  };

  return (
    <div
      className={
        showModal
          ? " inset-0 flex justify-center fixed bg-yellow-300"
          : "hidden"
      }
      onClick={() => setShowModal(false)}
    >
      <div
        className="flex flex-col items-center p-6 mt-20 overflow-auto lg:mt-36 bg-zinc-200"
        onClick={(e) => handleChildClick(e)}
      >
        <section className="flex flex-col bg-red-100 md:flex-row">
          <aside className="flex flex-col items-start justify-around mt-2 md:px-3 h-5/6">
            <H2>{title}</H2>
            <p className="my-2">{date}</p>
            <p className="my-2">{place}</p>
            <p className="my-2">{description}</p>
          </aside>
          <aside className="mx-3 my-5">
            <form action="submit flex flex-col items-center">
              <h2>Inscriptions :</h2>
              <div className="flex justify-between my-2">
                <label htmlFor="lastname">Nom</label>
                <input
                  type="text"
                  id="lastname"
                  onChange={(e) => setLastname(e.target.value)}
                />
              </div>
              <div className="flex justify-between my-2">
                <label htmlFor="firstname">Prénom</label>
                <input
                  type="text"
                  id="firstname"
                  onChange={(e) => setFirstname(e.target.value)}
                />
              </div>
              <div className="flex justify-between my-2">
                <label htmlFor="club">Club</label>
                <input
                  type="club"
                  id="club"
                  onChange={(e) => setClub(e.target.value)}
                />
              </div>
              <div className="flex justify-between my-2">
                <label htmlFor="licenceNumber">Numéro de licence</label>
                <input
                  type="text"
                  id="licenceNumber"
                  onChange={(e) => setLicence(e.target.value)}
                />
              </div>
              <div className="flex justify-between my-2">
                <label htmlFor="phone">Tél.</label>
                <input
                  type="text"
                  id="phone"
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="flex justify-between my-2">
                <label htmlFor="email">email</label>
                <input
                  type="email"
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex justify-between my-2">
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
              <div className="flex justify-between my-2">
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
              <div className="flex justify-between my-2">
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
                <CustomButton>S'inscrire</CustomButton>
              </button>
            </form>
          </aside>
        </section>
        {cookies.monCookie ? (
          <div className="w-full ">
            <div className="flex flex-col justify-between md:flex-row">
              <div className="flex flex-col">
                <CustomButton>
                  <Link to="/participants">
                    <p>Voir les participants</p>
                  </Link>
                </CustomButton>
                <button onClick={() => handleUpdateEvent()}>
                  <CustomButton>Modifier</CustomButton>
                </button>
              </div>
              <div className="flex flex-col">
                <button onClick={() => setDeleteEvent(true)}>
                  <CustomButton>Supprimer</CustomButton>
                </button>
                {deleteEvent && (
                  <div className="w-full bg-red-200 ">
                    <p className="w-full text-center">
                      Êtes-vous sûr de vouloir supprimer cet évènement ?
                    </p>
                    <div className="flex justify-around">
                      <button onClick={(e) => handleDeleteEvent(e)}>Oui</button>
                      <button onClick={() => setDeleteEvent(false)}>Non</button>
                    </div>
                  </div>
                )}
                <button onClick={() => setShowModal(false)}>
                  <CustomButton>Fermer</CustomButton>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <button>
              <Link to="/participants">
                <p>Voir les participants</p>
              </Link>
            </button>
            <button onClick={() => setShowModal(false)}>Fermer</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModalInscription;
