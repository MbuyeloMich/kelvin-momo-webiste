import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { tourDates } from "../Constant";

gsap.registerPlugin(ScrollTrigger);

const Tours = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const tourCardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Initial card animations
      gsap.set(tourCardsRef.current, { 
        opacity: 0, 
        y: 50,
        scale: 0.95
      });

      gsap.to(tourCardsRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: ".tour-cards-container",
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });

      // Mouse move animation for each card
      tourCardsRef.current.forEach((card) => {
        if (!card) return;

        const handleMouseMove = (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          
          const rotateX = (y - centerY) / 10;
          const rotateY = (centerX - x) / 10;

          gsap.to(card, {
            rotationX: rotateX,
            rotationY: rotateY,
            scale: 1.05,
            boxShadow: "0 20px 25px -5px rgba(132, 204, 22, 0.2), 0 8px 10px -6px rgba(132, 204, 22, 0.2)",
            borderColor: "#84cc16",
            duration: 0.4,
            ease: "power2.out",
          });

          // Parallax effect on inner elements
          const dateCircle = card.querySelector('.date-circle');
          const button = card.querySelector('.ticket-button');

          if (dateCircle) {
            gsap.to(dateCircle, {
              x: (x - centerX) / 15,
              y: (y - centerY) / 15,
              duration: 0.3,
              ease: "power1.out",
            });
          }

          if (button) {
            gsap.to(button, {
              x: (x - centerX) / 20,
              y: (y - centerY) / 20,
              duration: 0.3,
              ease: "power1.out",
            });
          }
        };

        const handleMouseLeave = () => {
          gsap.to(card, {
            rotationX: 0,
            rotationY: 0,
            scale: 1,
            boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.05)",
            borderColor: "#e5e7eb",
            duration: 0.4,
            ease: "power2.out",
          });

          const dateCircle = card.querySelector('.date-circle');
          const button = card.querySelector('.ticket-button');

          if (dateCircle) {
            gsap.to(dateCircle, {
              x: 0,
              y: 0,
              duration: 0.3,
              ease: "power2.out",
            });
          }

          if (button) {
            gsap.to(button, {
              x: 0,
              y: 0,
              duration: 0.3,
              ease: "power2.out",
            });
          }
        };

        card.addEventListener("mousemove", handleMouseMove);
        card.addEventListener("mouseleave", handleMouseLeave);

        return () => {
          card.removeEventListener("mousemove", handleMouseMove);
          card.removeEventListener("mouseleave", handleMouseLeave);
        };
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return {
      month: date.toLocaleDateString("en-US", { month: "short" }).toUpperCase(),
      day: date.getDate(),
    };
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "sold-out":
        return "text-red-600 border-red-600 bg-red-50";
      case "few-left":
        return "text-amber-600 border-amber-600 bg-amber-50";
      default:
        return "text-lime-600 border-lime-600 bg-lime-50";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "sold-out":
        return "SOLD OUT";
      case "few-left":
        return "FEW LEFT";
      default:
        return "AVAILABLE";
    }
  };

  const handleTicketClick = (ticketUrl, status) => {
    if (status !== "sold-out" && ticketUrl) {
      window.open(ticketUrl, "_blank", "noopener noreferrer");
    }
  };

  // Reusable Card Component
  const TourCard = ({ show, index }) => {
    const { month, day } = formatDate(show.date);
    
    return (
      <div
        ref={(el) => (tourCardsRef.current[index] = el)}
        className="group bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col h-full"
        style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
      >
        {/* Card Content - Fixed height and consistent padding */}
        <div className="flex flex-col h-full p-6">
          {/* Header - Fixed height section */}
          <div className="flex items-start justify-between mb-4 min-h-[88px]">
            {/* Date Circle - Fixed size and position */}
            <div className="date-circle w-20 h-20 bg-lime-500 text-white rounded-2xl flex flex-col items-center justify-center font-bold shadow-md flex-shrink-0">
              <span className="text-sm tracking-wider leading-tight">{month}</span>
              <span className="text-2xl leading-tight font-black">{day}</span>
            </div>

            {/* Status Badge - Fixed position */}
            <span
              className={`status-badge px-3 py-1.5 rounded-full text-xs font-bold border whitespace-nowrap ${getStatusColor(
                show.status
              )}`}
            >
              {getStatusText(show.status)}
            </span>
          </div>

          {/* Event Details - Flexible height but consistent min-height */}
          <div className="flex-grow mb-4 min-h-[100px]">
            <h4 className="text-xl font-bold text-gray-900 mb-1 leading-tight">
              {show.city}, {show.country}
            </h4>
            <p className="text-gray-600 text-sm leading-relaxed">
              {show.venue}
            </p>
          </div>

          {/* Special Note - Fixed height when present */}
          {show.special ? (
            <div className="mb-4 pt-3 border-t border-gray-100 min-h-[60px]">
              <p className="text-xs text-lime-600 italic flex items-start gap-1.5">
                <span className="text-lime-500 text-sm flex-shrink-0">✨</span>
                <span className="leading-relaxed">{show.special}</span>
              </p>
            </div>
          ) : (
            // Empty div to maintain spacing when no special note
            <div className="mb-4 pt-3 min-h-[60px]"></div>
          )}

          {/* Button - Fixed at bottom */}
          <button
            onClick={() => handleTicketClick(show.ticketUrl, show.status)}
            className={`ticket-button w-full py-3 px-4 rounded-xl font-semibold transition-all duration-300 mt-auto ${
              show.status === "sold-out"
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-lime-500 text-white hover:bg-lime-600 hover:shadow-lg hover:shadow-lime-500/25"
            }`}
            disabled={show.status === "sold-out"}
          >
            {show.status === "sold-out" ? "SOLD OUT" : "GET TICKETS"}
          </button>
        </div>
      </div>
    );
  };

  return (
    <section
      ref={sectionRef}
      id="tour"
      className="min-h-screen bg-white text-gray-900 py-16 px-4 md:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2
            ref={titleRef}
            className="text-5xl md:text-7xl lg:text-8xl font-black mb-4 text-lime-600 drop-shadow-xl"
          >
            KELVIN MOMO LIVE 2026
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            The King of Private School Amapiano Live in South Africa
          </p>
        </div>

        {/* All Tour Cards - Single Unified Section */}
        <div className="tour-cards-container">
          <h3 className="text-3xl md:text-4xl font-bold mb-10 text-center text-gray-900">
            Upcoming Events
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 auto-rows-fr">
            {tourDates.map((show, index) => (
              <TourCard key={show.id} show={show} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tours;