import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import ModalConnect from "./ModalConnect";
import Context from "../../contexts/Context";

const NavLinks = ({ path, label }) => {
  const { logout, cookies } = useContext(Context);
  const [modalConnect, setModalConnect] = useState(false);

  const connect = () => {
    if (label === "Se connecter") {
      setModalConnect(true);
    } else if (label === "Déconnexion") {
      logout();
    }
  };

  return (
    <li className="navLink">
      <Link to={path} onClick={() => connect()}>
        <p>{label}</p>
      </Link>
      {modalConnect && !cookies.monCookie && (
        <ModalConnect
          setModalConnect={setModalConnect}
          modalConnect={modalConnect}
        />
      )}
    </li>
  );
};

export default NavLinks;
