import { useEffect, useState } from "react";
import axios from "axios";
import Event from "./Event.jsx";

const Events = () => {

    const [events, setEvents] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8000/api/events")
        .then(res => setEvents(res.data))
        .catch(err => console.log(err));
    }, []);

    return (
        <div className="events">
            <h1>Nos évènements</h1>
            {events.length && events.map((e) => (
                <Event
                    key={e.id}
                    title={e.titre}
                    description={e.decription}
                    date={e.date}
                    place={e.lieu}
                 />
            ))}
        </div>
    )
}

export default Events;