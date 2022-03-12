import NavLinks from "./NavLinks";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";

const Navigation = ({ showLinks }) => {
  const [cookies] = useCookies(["name"]);

  // label link connection

  const [labelConnect, setLabelConnect] = useState("Se connecter");

  useEffect(() => {
    if (cookies.monCookie) {
      setLabelConnect("Déconnexion");
    } else {
      setLabelConnect("Se connecter");
    }
  }, [cookies.monCookie]);

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
