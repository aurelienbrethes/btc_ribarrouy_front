// import {useState} from 'react';
// import Burger from './Burger';
import Navigation from './Navigation';

function Header() {

  // const [showLinks, setShowLinks] = useState(true);


  return (
    <div className="header">
      <Navigation className="header__navigationComponent"/>
      {/* <Burger className="header__burgeComponent"/> */}
    </div>
  );
}

export default Header;

