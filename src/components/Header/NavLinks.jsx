import { useState } from "react";
import { Link } from "react-router-dom";
import ModalConnect from "./ModalConnect";


const NavLinks = ({path, label}) => {

  const [modalConnect, setModalConnect] = useState(false);

  const connect = () => {
    if (label === "Se connecter") {
      setModalConnect(true)
    }
  }

    return (
        <li className= "navLink">
          <Link to={path} onClick={() => connect()}>
              <p>{label}</p>
          </Link>
           {modalConnect && <ModalConnect setModalConnect={setModalConnect} modalConnect={modalConnect} />}
        </li>
    );
  }

export default NavLinks;

