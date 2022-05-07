import React, { createContext, useState } from "react";
import { useCookies } from "react-cookie";

const Context = createContext();

export default Context;

export const ContextProvider = ({ children }) => {
  const [cookies, setCookies, removeCookie] = useCookies(["monCookie"]);
  const [idEventParticipants, setIdEventParticipants] = useState();
  const [showModalParticipants, setShowModalParticipants] = useState(false);
  const [showModalUpdateEvent, setShowModalUpdateEvent] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [events, setEvents] = useState([]);
  const [isConnected, setIsConnected] = useState(false);

  // set current user to nothing !
  const logout = () => {
    setIsConnected(false);
    removeCookie("monCookie");
    window.location.reload();
  };

  // Login

  const [login, setLogin] = useState(false);

  return (
    <Context.Provider
      value={{
        login,
        setLogin,
        logout,
        cookies,
        setCookies,
        removeCookie,
        showModalParticipants,
        setShowModalParticipants,
        idEventParticipants,
        setIdEventParticipants,
        showModalUpdateEvent,
        setShowModalUpdateEvent,
        participants,
        setParticipants,
        events,
        setEvents,
        isConnected,
        setIsConnected,
      }}
    >
      {children}
    </Context.Provider>
  );
};
