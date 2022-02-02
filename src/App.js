import './app.scss';

function App() {

  const [wheel, setWheel] = useState(false);

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
      </main>
    </div>
  );
}

export default App;
