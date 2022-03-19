import axios from "axios";
import Context from "../../contexts/Context";
import { useContext, useEffect, useState } from "react";

const categories = [
  "1ère Série",
  "2ème Série",
  "3ème Série",
  "4ème Série",
  "Vétéran",
  "Super Vétéran",
  "Master",
  "Handisport",
  "Dame",
  "Junior",
  "Cadet",
];

const Participants = () => {
  const { idEventParticipants, setParticipants, participants, events } =
    useContext(Context);

  const [categoryToDisplay, setCategoryToDisplay] = useState("all");

  const handleChangeCategory = (category) => {
    setCategoryToDisplay(category);
  };

  useEffect(() => {
    axios
      .get(
        `http://localhost:8000/api/participants/event/${idEventParticipants}`
      )
      .then((res) => {
        setParticipants(res.data);
        setCurrentEvent(
          events.find((event) => event.id === idEventParticipants)
        );
      })
      .catch((err) => console.log(err));
  }, [idEventParticipants]);

  const [currentEvent, setCurrentEvent] = useState([]);

  return (
    <div className="participant">
      <h1>Participants</h1>
      <section className="participant__header">
        <h2>{currentEvent.title}</h2>
        <h3>{new Date(currentEvent.date).toLocaleDateString()}</h3>
        <h3>{currentEvent.place}</h3>
      </section>
      <section className="participant__filter">
        <p className="participant__filter-title">Filtrer par catégorie :</p>
        <select
          className="participant__filter-select"
          onChange={(e) => handleChangeCategory(e.target.value)}
          name="sortParticipants"
          id="sortParticipants"
        >
          <option value="all" onClick={() => setCategoryToDisplay("all")}>
            Toutes
          </option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </section>
      {(categoryToDisplay === "all"
        ? categories
        : categories.filter((category) => category === categoryToDisplay)
      ).map((category, index) => (
        <div key={index} className="participant__main">
          <h2>{category}</h2>
          <table id="table">
            <thead className="participant__main-table">
              <tr>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Club</th>
                <th>Numéro de licence</th>
                <th>Email</th>
                <th>Téléphone</th>
                <th>Catégorie</th>
                <th>Jour</th>
                <th>Repas</th>
              </tr>
            </thead>
            <tbody>
              {participants.length ? (
                participants
                  .filter((participant) => participant.category === category)
                  .map((part, index) => (
                    <tr key={index}>
                      <td>{part.lastname}</td>
                      <td>{part.firstname}</td>
                      <td>{part.club}</td>
                      <td>{part.licence}</td>
                      <td>{part.email}</td>
                      <td>{part.phone}</td>
                      <td>{part.category}</td>
                      <td>{part.day}</td>
                      <td>{part.food}</td>
                    </tr>
                  ))
              ) : (
                <tr>
                  <td id="emptyEvent">
                    Cet évènement n'a pas encore d'inscrits dans cette catégorie
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default Participants;
