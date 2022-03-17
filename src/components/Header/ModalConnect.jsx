import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ModalConnect = ({ setModalConnect, modalConnect }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleConnect = (event) => {
    event.preventDefault();
    if (email && password) {
      axios
        .post(
          `http://localhost:8000/api/auth/login`,
          { email, password },
          { withCredentials: true }
        )
        .then(() => window.location.reload())
        .catch((err) => {
          console.log(err);
          toast.error("Email ou mot de passe invalide");
        });
    } else {
      toast.error("Email ou mot de passe manquant");
    }
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
        <input type="password" onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" onClick={(e) => handleConnect(e)}>
          Se connecter
        </button>
      </form>
    </div>
  );
};

export default ModalConnect;
