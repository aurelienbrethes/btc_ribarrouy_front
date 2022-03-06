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
  const [sortParticipants, setSortParticipants] = useState("");

  // function downloadCSVFile(csv, filename) {
  //   const csv_file = new Blob([csv], { type: "text/csv" });
  //   const download_link = document.createElement("a");

  //   download_link.download = filename;

  //   download_link.href = window.URL.createObjectURL(csv_file);

  //   download_link.style.display = "none";

  //   document.body.appendChild(download_link);

  //   download_link.click();
  // }

  // function htmlToCSV(html, filename) {
  //   let data = [];
  //   let rows = document.querySelectorAll("table tr");

  //   for (let i = 0; i < rows.length; i++) {
  //     var row = [],
  //       cols = rows[i].querySelectorAll("td, th");

  //     for (let j = 0; j < cols.length; j++) {
  //       row.push(cols[j].innerText);
  //     }

  //     data.push(row.join(","));
  //   }
  //   downloadCSVFile(data.join("\n"), filename);

  // }

  return (
    <div className="participant">
      <h1>Participants</h1>
      <section className="participant__header">
        <h2>{currentEvent.title}</h2>
        <h3>{new Date(currentEvent.date).toLocaleDateString()}</h3>
        <h3>{currentEvent.place}</h3>
      </section>
      {/* <section>
        <select
          name="sort"
          id="sort"
          onChange={(e) => setSortParticipants(e.target.value)}
        >
          <option value="category">Catégorie</option>
          <option value="day">Jour</option>
          <option value="club">Club</option>
          <option value="lastname">Nom</option>
        </select>
      </section> */}

      {categories.map((category, index) => (
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
                  <td>
                    Cet évènement n'a pas encore d'inscrits dans cette catégorie
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ))}

      {/* <button onClick={() => htmlToCSV()}>Export</button> */}
    </div>
  );
};

export default Participants;
