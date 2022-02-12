import {useState} from 'react';
import Burger from './Burger';
import Navigation from './Navigation';

function Header({wheel}) {

  const [showLinks, setShowLinks] = useState(false);

  return (
    <div className={wheel ? "header" : "header_hide"}>
      <Navigation className="header__navigationComponent" showLinks={showLinks}/>
      <Burger className="header__burgerComponent" showLinks={showLinks} setShowLinks={setShowLinks}/>
    </div>
  );
}

export default Header;

