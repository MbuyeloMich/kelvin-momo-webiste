import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import SplitType from "split-type";
import Lenis from "@studio-freight/lenis";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin"; // Add this import

gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin); // Register the plugin

const About = () => {
  const divRef = useRef(null);
  const containerRef = useRef(null);
  const quoteRef = useRef(null); // Add ref for quote

  useEffect(() => {
    const lenis = new Lenis();
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const elements = document.querySelectorAll(".fade-text");
    elements.forEach((element) => {
      const text = new SplitType(element, { types: "chars" });

      const scrollConfig = {
        trigger: element,
        start: "top 80%",
        end: "top 20%",
        scrub: true,
        toggleActions: "play play reverse reverse",
      };

      gsap.fromTo(
        text.chars,
        { opacity: 0.4 },
        {
          opacity: 1,
          duration: 0.3,
          stagger: 0.02,
          scrollTrigger: scrollConfig,
        }
      );

      gsap.fromTo(
        element.querySelectorAll("span.char"),
        { color: "#000000" },
        {
          color: "#84cc16",
          duration: 0.3,
          stagger: 0.02,
          scrollTrigger: scrollConfig,
        }
      );
    });

    // SCRAMBLE TEXT ANIMATION FOR QUOTE
    if (quoteRef.current) {
      // First, set the initial scrambled text
      gsap.set(quoteRef.current, {
        text: "████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████"
      });

      // Then animate to the real quote with scramble effect
      gsap.to(quoteRef.current, {
        duration: 3,
        scrambleText: {
          text: `"My mixture of jazz, deep house, and lounge has gained listeners from both local and international audiences," Momo once said, reflecting on how his sound connects across borders. For him, Private School Amapiano is "the bottle that holds the whole drink."`,
          chars: "01ABCDEFGHIJKLMNOPQRSTUVWXYZ⎔⎔⎔⎔", // Custom character set
          revealDelay: 0.2,
          speed: 0.4,
          tweenLength: false,
          newClass: "scrambling"
        },
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: quoteRef.current,
          start: "top 80%",
          end: "top 30%",
          scrub: 1, // Smooth scrolling effect
        }
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  useEffect(() => {
    const childElements = containerRef.current.children;

    gsap.set(childElements, {
      y: 50,
      opacity: 0,
    });

    gsap.to(childElements, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  useEffect(() => {
    gsap.from(divRef.current, {
      y: 100,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });
  }, []);

  return (
    <section
      ref={containerRef}
      id="about"
      className="about-section px-6 py-16 max-w-6xl mx-auto text-black"
    >
      <div ref={divRef} className="mb-12">
        <h2 className="sm:text-7xl text-3xl font-black mb-4 text-black">
          Thato "Kelvin Momo" Ledwaba
        </h2>
        <p className="text-lg text-black/80">
          <strong className="text-black">Born 9 August 1994 — Diepkloof, Soweto, Johannesburg</strong>
        </p>
        <p className="mb-4 text-lg text-black/70">
          South African DJ and producer widely celebrated as the{" "}
          <strong className="text-black">King of Private School Amapiano</strong>.
        </p>
      </div>
      
      <p className="fade-text mb-8 sm:text-4xl font-bold sm:leading-15 text-black/80">
        Kelvin Momo champions a genre he calls <strong className="text-yellow">Private School Amapiano</strong>—a
        genre-bending blend of jazz, deep house, and lounge. He created it because he refused to be boxed into a single
        sound, choosing instead to fuse cultures, rhythms, and traditions into
        something distinctively his own.
      </p>
      
      {/* Quote with ScrambleTextPlugin */}
      <blockquote 
        ref={quoteRef}
        className="italic border-l-4 border-lime-500 pl-4 mb-4 sm:text-xl text-black/70 font-medium min-h-[120px]"
      >
        {/* Initial content will be scrambled */}
      </blockquote>
    </section>
  );
};

export default About;