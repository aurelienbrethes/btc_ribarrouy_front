import { Link } from "react-router-dom";


function Navigation({path, label}) {

  return (
       <li className= "navLink">
        <Link to={path}>
            <p>{label}</p>
        </Link>
      </li>
  );
}

export default Navigation;

