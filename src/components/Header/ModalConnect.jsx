import { useState } from "react";
import axios from "axios";

const ModalConnect = ({ setModalConnect, modalConnect }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleConnect = (event) => {
    event.preventDefault();
    axios
      .post(
        `http://localhost:8000/api/login`,
        { email, password },
        { withCredentials: true }
      )
      .then((res) => res.data)
      .then(() => {
        console.log("vous êtes bien connecté");
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      })
      .catch((err) => console.log(err));
  };

  const handleChildClick = (item) => {
    item.stopPropagation(item);
  };

  const handleParentsClick = () => {
    setModalConnect(false);
  };

  return (
    <div
      className={modalConnect ? "modalBack" : "displayNone"}
      onClick={() => handleParentsClick()}
    >
      <form className="modalBack__modal" onClick={(e) => handleChildClick(e)}>
        <label htmlFor="email">Email</label>
        <input type="email" onChange={(e) => setEmail(e.target.value)} />
        <label htmlFor="password">Mot de passe</label>
        <input type="text" onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" onClick={(e) => handleConnect(e)}>
          Se connecter
        </button>
      </form>
    </div>
  );
};

export default ModalConnect;
