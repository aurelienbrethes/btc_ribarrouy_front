import { useContext, useState } from "react";
import ModalInscription from "./ModalInscription";
import Context from "../../contexts/Context";

const Event = ({ title, description, date, place, idEvent }) => {
  const { setIdEventParticipants } = useContext(Context);
  const [showModal, setShowModal] = useState(false);

  const dateToDisplay = new Date(date).toLocaleDateString();

  const openModalInscriptions = () => {
    setIdEventParticipants(idEvent);
    if (!showModal) {
      setShowModal(true);
    }
  };

  const handleParentsClick = () => {
    setShowModal(false);
  };

  return (
    <div className="flex flex-col items-center justify-between w-1/6 h-40 bg-red-400">
      <h2>{title}</h2>
      <p>{dateToDisplay}</p>
      <button onClick={() => openModalInscriptions()}>Détails</button>
      <div
        className={showModal ? "visible" : "hidden"}
        onClick={() => handleParentsClick()}
      >
        <ModalInscription
          title={title}
          description={description}
          setShowModal={setShowModal}
          place={place}
          date={dateToDisplay}
          idEvent={idEvent}
        />
      </div>
    </div>
  );
};

export default Event;
