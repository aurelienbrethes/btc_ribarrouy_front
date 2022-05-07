import { useContext, useState } from "react";
import ModalInscription from "./ModalInscription";
import Context from "../../contexts/Context";
import H2 from "../UI/H2";

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
    <div className="flex flex-col items-center justify-between w-2/5 p-5 my-6 bg-red-400 ">
      <H2>{title}</H2>
      <p className="my-3">{dateToDisplay}</p>
      <button onClick={() => openModalInscriptions()}>Détails</button>
      <div
        className={showModal ? "visible" : "hidden"}
        onClick={() => handleParentsClick()}
      >
        <ModalInscription
          title={title}
          description={description}
          setShowModal={setShowModal}
          showModal={showModal}
          place={place}
          date={dateToDisplay}
          idEvent={idEvent}
        />
      </div>
    </div>
  );
};

export default Event;
