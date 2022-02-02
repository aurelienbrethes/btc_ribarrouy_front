import NavLinks from "./NavLinks";

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
];

function Navigation() {

  return (
       <ul className='navbar'>
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

