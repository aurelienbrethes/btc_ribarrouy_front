import axios from "axios";
import Context from "../../contexts/Context";
import { useContext, useState, useEffect } from "react";

const ModalParticipants = () => {
  const {
    idEventParticipants,
    setShowModalParticipants,
    showModalParticipants,
  } = useContext(Context);
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    axios
      .get(
        `http://localhost:8000/api/participants/event/${idEventParticipants}`
      )
      .then((res) => setParticipants(res.data))
      .catch((err) => console.log(err));
  }, [idEventParticipants]);

  const handleParentsClick = () => {
    setShowModalParticipants(false);
  };

  const handleChildClick = (item) => {
    item.stopPropagation(item);
  };

  return (
    <div
      className={showModalParticipants ? "modalBack" : "displayNone"}
      onClick={() => handleParentsClick()}
    >
      <div className="modalBack__modal" onClick={(e) => handleChildClick(e)}>
        <h2>Participants</h2>
        <table className="modalBack__modal-table">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Numéro de licence</th>
              <th>Email</th>
              <th>Téléphone</th>
            </tr>
          </thead>
          <tbody>
            {participants.length ? (
              participants.map((part, index) => (
                <tr key={index}>
                  <td>{part.lastname}</td>
                  <td>{part.firstname}</td>
                  <td>{part.licence}</td>
                  <td>{part.email}</td>
                  <td>{part.phone}</td>
                </tr>
              ))
            ) : (
              <p>Cet évènement n'a pas encore d'inscrit</p>
            )}
          </tbody>
        </table>
        {/* <section className = "modalBack__modal-table">
                            <div>
                                <th>Nom</th>
                                <th>Prénom</th>
                                <th>Numéro de licence</th>
                                <th>Email</th>
                                <th>Téléphone</th>
                            </div>
                        <ul>
                            {
                                participants.length && participants.map((part, index) => (
                                    <li key={index}>
                                        <p>{part.lastname}</p>
                                        <p>{part.firstname}</p>
                                        <p>{part.licence}</p>
                                        <p>{part.email}</p>
                                        <p>{part.tel}</p>
                                    </li>
                                ))
                            }
                        </ul>
                    </section> */}
      </div>
    </div>
  );
};

export default ModalParticipants;
