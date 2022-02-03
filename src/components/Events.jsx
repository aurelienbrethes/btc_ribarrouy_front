import { useEffect, useState } from "react";
import axios from "axios";
import Event from "./Event.jsx";

const Events = ({setShowModal}) => {

    const [events, setEvents] = useState([]);


    useEffect(() => {
        axios.get("http://localhost:8000/api/events")
        .then(res => setEvents(res.data))
        .catch(err => console.log(err));
    }, []);

    return (
        <div className="events">
            <h1>Nos évènements</h1>
            <section className="events__container">
                {events.length && events.map((e) => (
                    <Event
                        key={e.id}
                        title={e.titre}
                        description={e.description}
                        date={e.date}
                        place={e.lieu}
                        setShowModal={setShowModal}
                    />
                ))}
            </section>
        </div>
    )
}

export default Events;