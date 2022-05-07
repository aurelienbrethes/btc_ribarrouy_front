function Burger({ showLinks, setShowLinks }) {
  let burgerClass = "burger-line";

  if (showLinks) {
    burgerClass += " open";
  }

  return (
    <div
      className={burgerClass}
      id="burger"
      onClick={() => setShowLinks(!showLinks)}
    >
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
}

export default Burger;
