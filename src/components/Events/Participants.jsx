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
    <div>
      <h1 className="w-full text-center">Participants</h1>
      <section className="flex justify-around w-full my-5 bg-blue-200">
        <h2>{currentEvent.title}</h2>
        <h3>{new Date(currentEvent.date).toLocaleDateString()}</h3>
        <h3>{currentEvent.place}</h3>
      </section>
      <section className="flex mb-8">
        <p className="mr-5">Filtrer par catégorie :</p>
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
        <div key={index} className="flex flex-col w-full my-3 ">
          <h2>{category}</h2>
          <table className="grid grid-cols-9 grid-rows-2" id="table">
            <thead className="col-span-9 col-start-1 row-span-1 row-start-1 bg-red-200 ">
              <tr className="grid grid-cols-9 grid-rows-1">
                <th className="col-span-1 col-start-1 row-span-1 row-start-1">
                  Nom
                </th>
                <th className="col-span-1 col-start-2 row-span-1 row-start-1">
                  Prénom
                </th>
                <th className="col-span-1 col-start-3 row-span-1 row-start-1">
                  Club
                </th>
                <th className="col-span-1 col-start-4 row-span-1 row-start-1">
                  Numéro de licence
                </th>
                <th className="col-span-1 col-start-5 row-span-1 row-start-1">
                  Email
                </th>
                <th className="col-span-1 col-start-6 row-span-1 row-start-1">
                  Téléphone
                </th>
                <th className="col-span-1 col-start-7 row-span-1 row-start-1">
                  Catégorie
                </th>
                <th className="col-span-1 col-start-8 row-span-1 row-start-1">
                  Jour
                </th>
                <th className="col-span-1 col-start-9 row-span-1 row-start-1">
                  Repas
                </th>
              </tr>
            </thead>
            <tbody className="w-auto col-span-9 col-start-1 row-span-1 row-start-2 overflow-auto bg-green-200">
              {participants.length ? (
                participants
                  .filter((participant) => participant.category === category)
                  .map((part, index) => (
                    <tr key={index} className="grid grid-cols-9 grid-rows-1">
                      <td className="w-auto col-span-1 col-start-1 row-span-1 row-start-1 text-center">
                        {part.lastname}
                      </td>
                      <td className="col-span-1 col-start-2 row-span-1 row-start-1 text-center">
                        {part.firstname}
                      </td>
                      <td className="col-span-1 col-start-3 row-span-1 row-start-1 text-center">
                        {part.club}
                      </td>
                      <td className="col-span-1 col-start-4 row-span-1 row-start-1 text-center">
                        {part.licence}
                      </td>
                      <td className="w-auto col-span-1 col-start-5 row-span-1 row-start-1 text-center">
                        {part.email}
                      </td>
                      <td className="col-span-1 col-start-6 row-span-1 row-start-1 text-center">
                        {part.phone}
                      </td>
                      <td className="col-span-1 col-start-7 row-span-1 row-start-1 text-center">
                        {part.category}
                      </td>
                      <td className="col-span-1 col-start-8 row-span-1 row-start-1 text-center">
                        {part.day}
                      </td>
                      <td className="col-span-1 col-start-9 row-span-1 row-start-1 text-center">
                        {part.food}
                      </td>
                    </tr>
                  ))
              ) : (
                <tr>
                  <td id="">
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
