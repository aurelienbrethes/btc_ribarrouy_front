import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Event from "./Event.jsx";
import Context from "../../contexts/Context";
import ModalCreacteEvent from "./ModalCreateEvent.jsx";
import ModalUpdateEvent from "./ModalUpdateEvent.jsx";

const Events = ({ setShowModal }) => {
  const { cookies, showModalUpdateEvent } = useContext(Context);
  const [events, setEvents] = useState([]);
  const [showModalCreateEvent, setShowModalCreateEvent] = useState(false);
  const [nextEvents, setNextEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const today = new Date();

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/events")
      .then((res) => setEvents(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    events.length &&
      setNextEvents(events.filter((event) => new Date(event.date) > today));
    events.length &&
      setPastEvents(events.filter((event) => new Date(event.date) < today));
  }, [events]);

  return (
    <div className="events">
      <h1>Nos évènements</h1>
      <h2>A venir</h2>
      <section className="events__container">
        {nextEvents.length ? (
          nextEvents.map((event, index) => (
            <Event
              key={index}
              idEvent={event.id}
              title={event.title}
              description={event.description}
              date={event.date}
              place={event.place}
              setShowModal={setShowModal}
            />
          ))
        ) : (
          <p>Aucun évènements à venir</p>
        )}
      </section>
      {cookies.monCookie && (
        <div>
          <h2>Passés</h2>
          <section className="events__container">
            {pastEvents.length ? (
              pastEvents.map((event, index) => (
                <Event
                  key={index}
                  idEvent={event.id}
                  title={event.title}
                  description={event.description}
                  date={event.date}
                  place={event.place}
                  setShowModal={setShowModal}
                />
              ))
            ) : (
              <p>Aucun évènements passés</p>
            )}
          </section>
          <section>
            <button onClick={() => setShowModalCreateEvent(true)}>
              Ajouter un évènement
            </button>
            {showModalCreateEvent && (
              <ModalCreacteEvent
                setShowModalCreateEvent={setShowModalCreateEvent}
                showModalCreateEvent={showModalCreateEvent}
              />
            )}
            {showModalUpdateEvent && <ModalUpdateEvent />}
          </section>
        </div>
      )}
    </div>
  );
};

export default Events;
