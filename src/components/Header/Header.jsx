import {useState} from 'react';
import Burger from './Burger';
import Navigation from './Navigation';

function Header({wheel}) {

  const [showLinks, setShowLinks] = useState(false);

  return (
    <div className={wheel ? "header_container" : "header_hide"}>
      <a href="#home">
        <img src={logo} alt="aurelien brethes logo" id="logo_header" />
      </a>
      <Navigation className="navigation_component" showLinks={showLinks}/>
      <Burger showLinks={showLinks} setShowLinks={setShowLinks} className="burger_component" />
    </div>
  );
}

export default Header;

