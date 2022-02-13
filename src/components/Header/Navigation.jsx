import { useContext } from "react";
import NavLinks from "./NavLinks";
import Context from '../../contexts/Context';

const Navigation = ({showLinks}) => {

  const { labelConnect } = useContext(Context);

  const navlinks = [
    {
      path : "/",
      label : "Accueil"
    },
    {
      path : "/events",
      label : "Evènements"
    },
    {
      path : "/contact",
      label : "Contact"
    },
    {
      path : "/",
      label : labelConnect
    },
  ];


  return (
       <ul className= { showLinks? 'navlist' : 'navbar'}>
            {navlinks.map((e, i) => (
              <NavLinks
              key={i}
              path={e.path}
              label={e.label}
              />
            ))}
      </ul>
  );
}

export default Navigation;

