import { useState } from "react";
// import Header from "./components/Header/Header";
import NavBar from "./components/Header/NavBar";
import Home from "./components/Home/Home";
import Contact from "./components/Contact";
import Events from "./components/Events/Events";
import { Route, Routes } from "react-router-dom";
import { ContextProvider } from "./contexts/Context";
import Participants from "./components/Events/Participants";
import { ToastContainer } from "react-toastify";
import AlphaBar from "./components/AlphaBar";

function App() {
  const [wheel, setWheel] = useState(true);

  const wheelFunction = (e) => {
    if (e.deltaY < 0) {
      setWheel(true);
    } else if (e.deltaY > 0) {
      setWheel(false);
    }
  };

  return (
    <div onWheel={(e) => wheelFunction(e)}>
      <ToastContainer position="top-center" limit={1} autoClose={2000} />
      <ContextProvider>
        <header className="w-screen">
          <NavBar wheel={wheel} />
          <AlphaBar />
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/participants" element={<Participants />} />
          </Routes>
        </main>
      </ContextProvider>
    </div>
  );
}

export default App;
