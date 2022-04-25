import { useEffect, useState, useContext } from "react";
import axios from "axios";
import H1 from "../UI/H1.jsx";
import H2 from "../UI/H2.jsx";

import Event from "./Event.jsx";
import Context from "../../contexts/Context";
import ModalCreacteEvent from "./ModalCreateEvent.jsx";
import ModalUpdateEvent from "./ModalUpdateEvent.jsx";

const Events = ({ setShowModal }) => {
  const { cookies, showModalUpdateEvent, events, setEvents } =
    useContext(Context);
  const [showModalCreateEvent, setShowModalCreateEvent] = useState(false);
  const [nextEvents, setNextEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const today = new Date();

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/events")
      .then((res) => setEvents(res.data))
      .catch((err) => console.log(err));
  }, [events]);

  useEffect(() => {
    events.length &&
      setNextEvents(events.filter((event) => new Date(event.date) > today));
    events.length &&
      setPastEvents(events.filter((event) => new Date(event.date) < today));
  }, [events]);

  return (
    <div className="flex flex-col w-full bg-500-red items center">
      <H1> Coucou </H1>
      <H2> A venir </H2>
      <section className="flex flex-wrap justify-around">
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
          <p className="bg-blue-300">Aucun évènements à venir</p>
        )}
      </section>
      {cookies.monCookie && (
        <div className="bg-blue-300">
          <H2>Passés</H2>
          <section>
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
