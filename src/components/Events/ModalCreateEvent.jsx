import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import CustomButton from "../UI/CustomButton";

import "react-toastify/dist/ReactToastify.css";

const ModalCreacteEvent = ({
  setShowModalCreateEvent,
  showModalCreateEvent,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [place, setPlace] = useState("");
  const [date, setDate] = useState("");

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
          setShowModalCreateEvent(false);
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
      className={
        showModalCreateEvent
          ? "flex flex-col justify-around items-center inset-0 fixed overflow-auto bg-yellow-200"
          : "hidden"
      }
      onClick={() => handleParentsClick()}
    >
      <form
        className="absolute flex flex-col items-center justify-around w-5/6 bg-gray-300 h-5/6 "
        onClick={(e) => handleChildClick(e)}
      >
        <label className="my-3" htmlFor="title">
          Titre
        </label>
        <input type="text" onChange={(e) => setTitle(e.target.value)} />
        <label className="my-3" htmlFor="description">
          Description
        </label>
        <textarea
          name="description"
          id="description"
          cols="30"
          rows="10"
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <label className="my-3" htmlFor="place">
          Lieu
        </label>
        <input type="text" onChange={(e) => setPlace(e.target.value)} />
        <label className="my-3" htmlFor="date">
          Date
        </label>
        <input type="date" onChange={(e) => setDate(e.target.value)} />
        <button
          className="my-3"
          type="submit"
          onClick={(e) => handleCreateEvent(e)}
        >
          <CustomButton>Envoyer</CustomButton>
        </button>
        <button onClick={() => setShowModalCreateEvent(false)}>
          <CustomButton>Fermer</CustomButton>
        </button>
      </form>
    </div>
  );
};

export default ModalCreacteEvent;
