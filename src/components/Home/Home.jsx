import logo from "../../assets/logo_btc.gif";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmitNewUser = () => {
    axios
      .post(`http://localhost:8000/api/users`, { email, password })
      .then(() => toast.success("User has been created"))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <section className="flex flex-col items-center">
        <div className="flex flex-col w-1/2 m-4 bg-yellow-400 p-11">
          <label htmlFor="email">email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            type="text"
          />
          <label htmlFor="password">password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            type="text"
          />
          <button onClick={() => handleSubmitNewUser()} type="submit">
            Create Account
          </button>
        </div>
        <img src={logo} alt="ball trap ribarrouy logo" />
        <img src={logo} alt="ball trap ribarrouy logo" />
        <img src={logo} alt="ball trap ribarrouy logo" />
        <img src={logo} alt="ball trap ribarrouy logo" />
      </section>
    </div>
  );
}

export default Home;
