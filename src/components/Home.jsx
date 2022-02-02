function Home() {

  const [showLinks, setShowLinks] = useState(false);

  return (
    <div className={wheel ? "header_container" : "header_hide"}>
      <Header />
    </div>
  );
}

export default Home;

