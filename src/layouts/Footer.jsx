import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Instagram,
  Twitter,
  Music,
  Music2,
  Music3,
  Youtube,
  Drum,
  Guitar,
  Piano,
  MicVocal,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);
  const logoRef = useRef(null);
  const socialRef = useRef([]);
  const copyrightRef = useRef(null);
  const iconWrapRefs = useRef([]);
  const iconRefs = useRef([]);
  const iconSpinRefs = useRef([]);
  const iconPool = [Music, Music2, Music3, Drum, Guitar, Piano, MicVocal];
  const iconThemes = [
    {
      icon: "text-orange-50",
    },
    {
      icon: "text-blue-50",
    },
    {
      icon: "text-emerald-50",
    },
  ];

  useEffect(() => {
    const footerEl = footerRef.current;

    const onMove = (event) => {
      if (!footerEl) return;
      const bounds = footerEl.getBoundingClientRect();
      const mouseX = event.clientX - bounds.left;
      const mouseY = event.clientY - bounds.top;

      iconRefs.current.forEach((icon) => {
        if (!icon) return;
        const iconBounds = icon.getBoundingClientRect();
        const iconX = iconBounds.left - bounds.left + iconBounds.width / 2;
        const iconY = iconBounds.top - bounds.top + iconBounds.height / 2;
        const distance = Math.hypot(mouseX - iconX, mouseY - iconY);
        const influence = Math.max(0, 1 - distance / 190);

        gsap.to(icon, {
          scale: 1 + influence * 0.35,
          opacity: 0.65 + influence * 0.35,
          rotateX: -(influence * 18),
          rotateY: influence * 22,
          rotateZ: influence * 8,
          z: influence * 20,
          duration: 0.28,
          ease: "power2.out",
        });
      });
    };

    const onLeave = () => {
      iconRefs.current.forEach((icon) => {
        if (!icon) return;
        gsap.to(icon, {
          scale: 1,
          opacity: 0.65,
          rotateX: 0,
          rotateY: 0,
          rotateZ: 0,
          z: 0,
          duration: 0.4,
          ease: "power2.out",
        });
      });
    };

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

      iconWrapRefs.current.forEach((item, index) => {
        if (!item) return;
        gsap.to(item, {
          y: index % 2 === 0 ? -18 : 18,
          x: index % 2 === 0 ? 8 : -8,
          rotation: index % 2 === 0 ? 8 : -8,
          duration: 8 + (index % 6),
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      });

      iconSpinRefs.current.forEach((item, index) => {
        if (!item) return;
        gsap.to(item, {
          rotateY: 360,
          rotateZ: index % 2 === 0 ? 12 : -12,
          duration: 12 + (index % 5),
          ease: "none",
          repeat: -1,
        });
      });
    });

    footerEl?.addEventListener("mousemove", onMove);
    footerEl?.addEventListener("mouseleave", onLeave);

    return () => {
      footerEl?.removeEventListener("mousemove", onMove);
      footerEl?.removeEventListener("mouseleave", onLeave);
      ctx.revert();
    };
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
    <footer
      ref={footerRef}
      className="relative overflow-hidden bg-black text-white py-12 px-6 text-center"
    >
      <div className="pointer-events-none absolute inset-0">
        {[...Array(24)].map((_, index) => (
          <div
            key={index}
            ref={(el) => (iconWrapRefs.current[index] = el)}
            className="absolute [perspective:700px]"
            style={{
              left: `${(index * 7) % 100}%`,
              top: `${8 + ((index * 13) % 80)}%`,
            }}
          >
            {(() => {
              const IconComp = iconPool[index % iconPool.length];
              const theme = iconThemes[index % iconThemes.length];
              const iconSize = 14 + (index % 4) * 5;
              return (
                <div
                  ref={(el) => (iconRefs.current[index] = el)}
                  className="relative [transform-style:preserve-3d]"
                  style={{ width: `${iconSize}px`, height: `${iconSize}px` }}
                >
                  <div
                    ref={(el) => (iconSpinRefs.current[index] = el)}
                    className="relative [transform-style:preserve-3d]"
                  >
                    <IconComp
                      size={iconSize}
                      strokeWidth={3.2}
                      className={`${theme.icon} absolute left-0 top-0 opacity-95 drop-shadow-[0_4px_8px_rgba(0,0,0,0.7)]`}
                      style={{ transform: "translateZ(8px)" }}
                    />
                    <IconComp
                      size={iconSize}
                      strokeWidth={3.2}
                      className={`${theme.icon} absolute left-0 top-0 opacity-55 blur-[0.2px]`}
                      style={{ transform: "translateZ(2px)" }}
                    />
                    <IconComp
                      size={iconSize}
                      strokeWidth={3.2}
                      className="absolute left-0 top-0 text-black/55"
                      style={{ transform: "translateZ(-6px) translateX(2px) translateY(2px)" }}
                    />
                  </div>
                </div>
              );
            })()}
          </div>
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
