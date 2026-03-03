import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { SlidersHorizontal, X } from "lucide-react";

const Navbar = ({ triggerAnimation }) => {
  const panelRef = useRef(null);
  const linksRef = useRef([]);
  const navRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    if (!isOpen) {
      openMenu();
    } else {
      closeMenu();
    }
    setIsOpen(!isOpen);
  };

  const openMenu = () => {
    gsap.to(panelRef.current, {
      x: 0,
      duration: 0.5,
      ease: "power2.inOut",
    });

    
    gsap.fromTo(
      linksRef.current,
      { opacity: 0, x: 20 },
      {
        opacity: 1,
        x: 0,
        duration: 0.4,
        stagger: 0.1,
        delay: 0.2,
        ease: "power2.out",
      }
    );
  };

  const closeMenu = () => {
    gsap.to(panelRef.current, {
      x: "100%",
      duration: 0.5,
      ease: "power2.inOut",
    });
  };

  useEffect(() => {
    if (!triggerAnimation || !navRef.current) return;
   
    gsap.set(panelRef.current, { x: "100%", visibility: "hidden" });
   
    gsap.to(navRef.current, {
      opacity: 1,
      duration: 1,
      delay: 0.7,
      onStart: () => {
        gsap.set(panelRef.current, { visibility: "visible" });
      },
    });
  }, [triggerAnimation]);
  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 w-full bg-transparent z-50 flex items-center justify-between px-5 py-3 h-16 opacity-0"
        style={{ opacity: 0 }}
      >
        <div className="flex items-center">
          <a href="/">
            <img
              src={`${import.meta.env.BASE_URL}logo.jpg`}
              alt="Logo"
              className="h-40 w-40 object-contain"
            />
          </a>
        </div>
        <button
          onClick={toggleMenu}
          className="cursor-pointer focus:outline-none rounded-full border border-zinc-300/70 bg-white/85 backdrop-blur-sm px-4 py-2 text-zinc-900 hover:bg-white transition-colors duration-300 flex items-center gap-2 shadow-sm"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X size={18} /> : <SlidersHorizontal size={18} />}
          <span className="text-xs uppercase tracking-[0.2em] font-semibold">
            Menu
          </span>
        </button>
      </nav>
      <div
        ref={panelRef}
        className="fixed top-0 right-0 h-[60%] mt-2 rounded-xl w-64 bg-black text-white p-8 z-40 flex flex-col justify-center space-y-6"
        style={{ transform: "translateX(100%)", visibility: "hidden" }}
      >
        {["About", "Album", "Tour", "Merch"].map((text, i) => (
          <a
            key={i}
            href={`#${text.toLowerCase()}`}
            ref={(el) => (linksRef.current[i] = el)}
            className="text-2xl font-semibold tracking-wide hover:text-yellow-400 transition"
          >
            {text}
          </a>
        ))}
      </div>
    </>
  );
};

export default Navbar;
