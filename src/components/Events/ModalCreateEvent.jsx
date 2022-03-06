import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";

const ModalCreacteEvent = ({
  setShowModalCreateEvent,
  showModalCreateEvent,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [place, setPlace] = useState("");
  const [date, setDate] = useState("");

  let navigate = useNavigate();

  const handleCreateEvent = (event) => {
    event.preventDefault();
    if (title && description && place && date) {
      axios
        .post(
          `http://localhost:8000/api/events`,
          { title, description, date, place },
          { withCredentials: true }
        )
        .then(() => {
          toast.success("Votre évènement a bien été créé");
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      toast.error("Informations manquantes");
    }
  };

  const handleChildClick = (item) => {
    item.stopPropagation(item);
  };

  const handleParentsClick = () => {
    setShowModalCreateEvent(false);
  };

  return (
    <div
      className={showModalCreateEvent ? "modalBack" : "displayNone"}
      onClick={() => handleParentsClick()}
    >
      <form className="modalBack__modal" onClick={(e) => handleChildClick(e)}>
        <label htmlFor="title">Titre</label>
        <input type="text" onChange={(e) => setTitle(e.target.value)} />
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          id="description"
          cols="50"
          rows="10"
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <label htmlFor="place">Lieu</label>
        <input type="text" onChange={(e) => setPlace(e.target.value)} />
        <label htmlFor="date">Date</label>
        <input type="date" onChange={(e) => setDate(e.target.value)} />
        <button type="submit" onClick={(e) => handleCreateEvent(e)}>
          Envoyer
        </button>
      </form>
    </div>
  );
};

export default ModalCreacteEvent;
