import { useContext } from "react";
import NavLinks from "./NavLinks";
import Context from "../../contexts/Context";

const Navigation = ({ showLinks }) => {
  const { labelConnect } = useContext(Context);

  const navlinks = [
    {
      path: "/",
      label: "Accueil",
    },
    {
      path: "/events",
      label: "Evènements",
    },
    {
      path: "/contact",
      label: "Contact",
    },
    {
      path: "/",
      label: labelConnect,
    },
  ];

  return (
    <ul className={showLinks ? "navlist" : "navbar"}>
      {navlinks.map((link, i) => (
        <NavLinks key={i} path={link.path} label={link.label} />
      ))}
    </ul>
  );
};

export default Navigation;
