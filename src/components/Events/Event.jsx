import { useEffect, useContext, useState } from "react";
import Modal from "./ModalInscription";
import Context from '../../contexts/Context';


const Event = ({title, description, date, place, idEvent}) => {

    const { setIdEventParticipants } = useContext(Context);
    const [showModal, setShowModal] = useState(false);

    const openModalInscriptions = () => {
        if ( !showModal ){
            setShowModal(true)
        }
    }

    const handleParentsClick = () => {
        setShowModal(false)
    };

    useEffect(() => {
        setIdEventParticipants(idEvent)
    }, [])

    return (
        <div className="eventContainer">
            <h2>{title}</h2>
            <p>{date}</p>
            <button onClick={() => openModalInscriptions()}>Détails</button>
            <div className={showModal ? "eventContainer__modal" : "eventContainer__displayNone"} onClick={() => handleParentsClick() }>
                <Modal
                title={title}
                description={description}
                setShowModal={setShowModal}
                place={place}
                date={date}
                idEvent={idEvent}
                />
            </div>  
        </div>
    )
}

export default Event;