import '../../sass/navigation.scss';

const navlinks = [
  {
    path : "/home",
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

function Navigation({showLinks}) {

  return (
       <ul className= { showLinks? 'navlist' : 'navbar'}>
            {navlinks.map((e, i) => {
              <Link
              key={i}
              path={e.path}
              label={e.label}
              />
            })}
      </ul>
  );
}

export default Navigation;

