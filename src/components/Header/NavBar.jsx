/* This example requires Tailwind CSS v2.0+ */
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { motion } from "framer-motion";
import { Disclosure } from "@headlessui/react";
import { useCookies } from "react-cookie";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Context from "../../contexts/Context";
import ModalConnect from "./ModalConnect";

// Options for opacity animation menu dropdown
const variations = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

export default function NavBar(wheel) {
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

  const { logout, isConnected } = useContext(Context);
  const [modalConnect, setModalConnect] = useState(false);

  const connect = (label) => {
    if (label === "Se connecter") {
      setModalConnect(true);
    } else if (label === "Déconnexion") {
      logout();
    }
  };

  const navLinks = [
    {
      index: 0,
      label: "Accueil",
      path: "/",
    },
    {
      index: 1,
      label: "Evènements",
      path: "/events",
    },
    {
      index: 2,
      label: "Contact",
      path: "/Contact",
    },
    {
      index: 3,
      label: labelConnect,
      path: "/",
    },
  ];

  return (
    <Disclosure
      as="nav"
      className={`fixed top-0 z-10 flex flex-col w-full lg:items-center sm:h-20 lg:h-28 bg-neutral-800`}
    >
      {({ open }) => (
        <>
          <div className="hidden sm:block"></div>
          <div className="flex items-center w-full h-full lg:w-1/2 sm:w-2/3">
            <div className="w-full h-1 sm:h-16">
              <div className="flex items-center justify-center h-1 sm:h-full">
                <div className="hidden w-full sm:block">
                  <nav className="flex justify-around w-full mt-6 mb-6">
                    {navLinks.map((link) => (
                      <div
                        key={link.index}
                        className="duration-300 ease-in-out hover:translate-y-1"
                      >
                        <Link
                          to={link.path}
                          onClick={() => connect(link.label)}
                        >
                          <p className="text-white">{link.label}</p>
                        </Link>
                      </div>
                    ))}
                  </nav>
                </div>
              </div>

              {/* Profile dropdown */}

              <div className="flex justify-between sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center p-2 text-white rounded-md focus:outline-none ">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon
                      className="absolute z-10 w-8 h-8 hover:scale-125 top-6 right-6"
                      aria-hidden="true"
                    />
                  ) : (
                    <MenuIcon
                      className="absolute z-10 w-12 h-12 p-2 rounded-lg hover:bg-zinc-700 bg-zinc-800 top-4 right-4"
                      aria-hidden="true"
                    />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="w-full sm:hidden">
            <motion.div
              variants={variations}
              initial="hidden"
              animate="visible"
              transition={{
                duration: 1,
              }}
            >
              <Disclosure.Button className="w-full ">
                <nav className="flex flex-col items-start px-4 pt-16 pb-3 space-y-1 bg-neutral-800">
                  {navLinks.map((link) => (
                    <div
                      key={link.index}
                      className="py-2 duration-500 ease-in-out hover:translate-y-1"
                    >
                      <motion.div
                        animate={{ x: 40 }}
                        transition={{
                          ease: "easeOut",
                          duration: link.index * 0.2 + 0.4,
                        }}
                        variants={variations}
                      >
                        <Link
                          to={link.path}
                          onClick={() => connect(link.label)}
                        >
                          <p className="text-white">{link.label}</p>
                        </Link>
                      </motion.div>
                    </div>
                  ))}
                </nav>
              </Disclosure.Button>
            </motion.div>
          </Disclosure.Panel>
          {modalConnect && !isConnected && (
            <ModalConnect
              setModalConnect={setModalConnect}
              modalConnect={modalConnect}
            />
          )}
        </>
      )}
    </Disclosure>
  );
}
