import { useState } from "react";
import Modal from "./Modal";


const Event = ({title, description, date, place}) => {

    const [showModal, setShowModal] = useState(false);

    const openModalInscriptions = () => {

        if ( !showModal ){
            setShowModal(true)
        }
    }

    const handleParentsClick = () => {
        setShowModal(false)
    };

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
                />
            </div>  
        </div>
    )
}

export default Event;