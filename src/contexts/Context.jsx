import React, { createContext, useState } from 'react';
import { useCookies } from 'react-cookie';

const Context = createContext();

export default Context;

export const ContextProvider = ({ children }) => {

  const [cookies, setCookies, removeCookie] = useCookies(['monCookie']);

  // set current user to nothing !
  const logout = () => {
    removeCookie('monCookie');
    window.location.reload();
  };

  // label link connection
  let labelConnect = "Se connecter";

  if(cookies.monCookie) {
    labelConnect = "Déconnexion";
  }


  // Login

  const [login, setLogin] = useState (false);

  return (
    <Context.Provider
      value={{
        login,
        setLogin,
        logout,
        cookies,
        setCookies,
        removeCookie,
        labelConnect
      }}>
      {children}
    </Context.Provider>
  );
};