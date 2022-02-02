import { useState } from "react";
import Header from "./components/Header/Header";
import Home from "./components/Home";
import Contact from "./components/Contact";
import Events from "./components/Events";
import { Route, Routes} from "react-router-dom";

function App() {

  const [wheel, setWheel] = useState(true);

  const wheelFunction = (e) => {
    if(e.deltaY < 0){
      setWheel(true)
    } else if (e.deltaY > 0){
      setWheel(false)
    }
  } 

  return (
    <div className="App"
    onWheel={(e) => wheelFunction(e) }
    >
      <header>
        <Header wheel={wheel}/>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
