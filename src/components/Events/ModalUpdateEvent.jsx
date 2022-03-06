import { useState, useContext } from "react";
import axios from "axios";
import Context from "../../contexts/Context";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ModalUpdateEvent = () => {
  const { setShowModalUpdateEvent, showModalUpdateEvent, idEventParticipants } =
    useContext(Context);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [place, setPlace] = useState("");
  const [date, setDate] = useState("");

  const handleUpdateEvent = (event) => {
    event.preventDefault();
    if (title && description && place && date) {
      axios
        .put(
          `http://localhost:8000/api/events/${idEventParticipants}`,
          { title, description, place, date },
          { withCredentials: true }
        )
        .then((res) => res.data)
        .then(() => {
          toast.success("Votre évènement a bien été modifié !");
          setShowModalUpdateEvent(false);
        })
        .catch((err) => console.log(err));
    } else {
      toast.error("Informations manquantes");
    }
  };

  const handleChildClick = (item) => {
    item.stopPropagation(item);
  };

  const handleParentsClick = () => {
    setShowModalUpdateEvent(false);
  };

  return (
    <div
      className={showModalUpdateEvent ? "modalBack" : "displayNone"}
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
        <button type="submit" onClick={(e) => handleUpdateEvent(e)}>
          Modifier
        </button>
      </form>
    </div>
  );
};

export default ModalUpdateEvent;
