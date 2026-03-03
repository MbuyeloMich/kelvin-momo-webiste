import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Instagram, Twitter, Music, Youtube } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const logoRef = useRef(null);
  const socialRef = useRef([]);
  const copyrightRef = useRef(null);
  const noteRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        logoRef.current,
        { scale: 0.5, opacity: 0, rotation: -10 },
        {
          scale: 1,
          opacity: 1,
          rotation: 0,
          duration: 1.2,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: logoRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        },
      );

      gsap.set(socialRef.current, { scale: 0, rotation: 180 });
      gsap.to(socialRef.current, {
        scale: 1,
        rotation: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.7)",
        delay: 0.5,
        scrollTrigger: {
          trigger: logoRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.fromTo(
        copyrightRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          delay: 1,
          scrollTrigger: {
            trigger: logoRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );

      noteRefs.current.forEach((note, index) => {
        if (!note) return;
        gsap.to(note, {
          y: index % 2 === 0 ? -18 : 18,
          x: index % 2 === 0 ? 8 : -8,
          duration: 4 + index,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      });
    });

    return () => ctx.revert();
  }, []);

  const socials = [
    {
      name: "Instagram",
      Icon: Instagram,
      url: "https://www.instagram.com/kelvinmomo_/",
    },
    {
      name: "Twitter",
      Icon: Twitter,
      url: "",
    },
    {
      name: "YouTube",
      Icon: Youtube,
      url: "https://www.youtube.com/channel/UC61G9NG-rDJcJ5N1yYLPM2Q",
    },
  ];

  return (
    <footer className="relative overflow-hidden bg-black text-white py-12 px-6 text-center">
      <div className="pointer-events-none absolute inset-0">
        {[...Array(24)].map((_, index) => (
          <Music
            key={index}
            ref={(el) => (noteRefs.current[index] = el)}
            size={14 + (index % 4) * 5}
            className="absolute text-cyan-300/20"
            style={{
              left: `${(index * 7) % 100}%`,
              top: `${8 + ((index * 13) % 80)}%`,
            }}
          />
        ))}
      </div>

      <div ref={logoRef} className="mb-4">
        <img
          src={`${import.meta.env.BASE_URL}logo.jpg`}
          alt="Burna Boy Logo"
          className="mx-auto w-25 h-25"
        />
        <p className="text-sm text-gray-400 uppercase tracking-wide mt-2">
          Mr Private School Piano
        </p>
      </div>

      <div className="flex justify-center gap-4 mb-6">
        {socials.map((social, index) => (
          <a
            key={social.name}
            ref={(el) => (socialRef.current[index] = el)}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 bg-zinc-800 hover:bg-cyan-400 hover:text-black rounded-full flex items-center justify-center transition-colors duration-300 border border-zinc-700 hover:border-cyan-300"
            title={social.name}
          >
            <social.Icon size={20} strokeWidth={2} />
          </a>
        ))}
      </div>

      <div ref={copyrightRef} className="relative z-10 mt-8 px-4 py-6 text-gray-400 text-sm">
        <p className="relative z-10">(c) 2026 Kelvin Momo. All rights reserved.</p>
        <p className="relative z-10">Specially Made for Mr Private School Piano</p>
      </div>
    </footer>
  );
};

export default Footer;
