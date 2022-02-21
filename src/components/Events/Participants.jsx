import axios from "axios";
import Context from "../../contexts/Context";
import { useContext, useEffect } from "react";

const Participants = () => {
  const { idEventParticipants, setParticipants, participants } =
    useContext(Context);

  useEffect(() => {
    axios
      .get(
        `http://localhost:8000/api/participants/event/${idEventParticipants}`
      )
      .then((res) => setParticipants(res.data))
      .catch((err) => console.log(err));
  }, [idEventParticipants]);

  function downloadCSVFile(csv, filename) {
    const csv_file = new Blob([csv], { type: "text/csv" });
    const download_link = document.createElement("a");

    download_link.download = filename;

    download_link.href = window.URL.createObjectURL(csv_file);

    download_link.style.display = "none";

    document.body.appendChild(download_link);

    download_link.click();
  }

  function htmlToCSV(html, filename) {
    let data = [];
    let rows = document.querySelectorAll("table tr");

    for (let i = 0; i < rows.length; i++) {
      var row = [],
        cols = rows[i].querySelectorAll("td, th");

      for (let j = 0; j < cols.length; j++) {
        row.push(cols[j].innerText);
      }

      data.push(row.join(","));
    }
    downloadCSVFile(data.join("\n"), filename);
  }

  return (
    <div className="participant">
      <h1>Participants</h1>
      <table id="table">
        <thead className="participant__header">
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
            participants.map((part, index) => (
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
              <td>Cet évènement n'a pas encore d'inscrits</td>
            </tr>
          )}
        </tbody>
      </table>
      <button onClick={() => htmlToCSV()}>Export</button>
    </div>
  );
};

export default Participants;
