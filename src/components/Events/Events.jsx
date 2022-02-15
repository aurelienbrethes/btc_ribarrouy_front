import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Event from "./Event.jsx";
import Context from '../../contexts/Context';
import ModalCreacteEvent from "../Header/ModalCreateEvent.jsx";
import ModalParticipants from "./ModalParticipants.jsx";

const Events = ({setShowModal}) => {

    const { cookies, showModalParticipants } = useContext(Context);
    const [events, setEvents] = useState([]);
    const [showModalCreateEvent, setShowModalCreateEvent] = useState(false);
    const [nextEvents, setNextEvents] = useState([]);
    const [pastEvents, setPastEvents] = useState([]);

    const today = new Date();

    console.log(events);

    const eventsFilter = (item) => {
       setNextEvents(item.filter((event) => new Date(event.date) > today));
       setPastEvents(item.filter((event) => new Date(event.date) < today))
    };

    useEffect(() => {
        axios.get("http://localhost:8000/api/events")
        .then(res => setEvents(res.data))
        .catch(err => console.log(err))       
    }, []);

    useEffect(()=> {
        events.length && eventsFilter(events)
    },[events]);

    return (
        <div className="events">
            <h1>Nos évènements</h1>
            <h2>A venir</h2>
            <section className="events__container">
                {nextEvents.length && nextEvents.map((event, index) => (
                    <Event
                        key={index}
                        idEvent={event.id}
                        title={event.titre}
                        description={event.description}
                        date={event.date}
                        place={event.lieu}
                        setShowModal={setShowModal}
                    />
                ))}
            </section>
            {cookies.monCookie &&
            <div>
                <h2>Passés</h2>
                <section className="events__container">
                    {pastEvents.length && pastEvents.map((event, index) => (
                        <Event
                            key={index}
                            idEvent={event.id}
                            title={event.titre}
                            description={event.description}
                            date={event.date}
                            place={event.lieu}
                            setShowModal={setShowModal}
                        />
                    ))}
                </section>
                <section>
                    <button onClick={() => setShowModalCreateEvent(true)}>Ajouter un évènement</button>
                    {showModalCreateEvent && 
                    <ModalCreacteEvent
                        setShowModalCreateEvent={setShowModalCreateEvent}
                        showModalCreateEvent={showModalCreateEvent}                    
                    />}
                    {showModalParticipants && <ModalParticipants />}
                </section>
            </div>
            }
        </div>
    )
}

export default Events;