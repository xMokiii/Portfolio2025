import React, { useEffect, useState, useRef } from "react";

export default function Overlay() {
  const [projects, setProjects] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollTimeout = useRef(null);

  useEffect(() => {
    fetch("/feur.json")
      .then((res) => res.json())
      .then((data) => {
        if (data.projets && data.projets.length > 0) {
          setProjects(data.projets);
        }
      })
      .catch((err) => console.error("Erreur de chargement :", err));
  }, []);

  useEffect(() => {
    const handleWheel = (e) => {
      if (scrollTimeout.current) return;

      setCurrentIndex((prev) => {
        if (e.deltaY > 0) {
          return (prev + 1) % projects.length;
        } else {
          return (prev - 1 + projects.length) % projects.length;
        }
      });

      scrollTimeout.current = setTimeout(() => {
        scrollTimeout.current = null;
      }, 700);
    };

    window.addEventListener("wheel", handleWheel);
    return () => window.removeEventListener("wheel", handleWheel);
  }, [projects]);

  if (projects.length === 0) return null;

  return (
    <div
      id="overlay"
      className="pointer-events-none fixed top-0 w-full h-full z-10 flex items-center justify-center px-2">
      <div className="relative w-full h-full flex items-center justify-center">
        <div
          id="text-1"
          className="left-[16.66%] bg-white rounded-2xl shadow-2xl w-auto max-w-full lg:max-w-lg xl:max-w-xl opacity-1 p-8 xl:p-10 h-auto overflow-hidden absolute flex flex-row items-center gap-6">
          <div className="flex-1">
            <h1 className="text-xl lg:text-2xl xl:text-3xl font-medium mb-3">
              Bonjour, je suis <span className="text-2xl lg:text-3xl xl:text-6xl font-bold">Colin Morlion</span>
            </h1>
            <p className="text-base lg:text-lg xl:text-xl text-gray-600 mb-6 break-words">
              En chair et en écaille !
            </p>
            <p className="mt-3 text-base lg:text-lg xl:text-xl">Je sais :</p>
            <div className="space-y-4 text-base lg:text-lg xl:text-xl">
              <p>📐 Coder</p>
              <p>📚 Apprendre</p>
              <p>📦 M'investir</p>
            </div>
            <div className="text-center text-lg l:text-2xl xl:text-3xl mt-6 animate-bounce">⬇</div>
          </div>

          <div className="flex-shrink-0">
            <img
              src="public/colinphotocv.png"
              alt="Portrait de Colin Morlion"
              className="w-28 h-44 lg:w-48 lg:h-64 xl:w-62 xl:h-80 rounded-full object-cover shadow-xl"
            />
          </div>
        </div>

        <div
          id="text-2"
          className="right-[16.66%] bg-white rounded-2xl shadow-lg w-auto max-w-full lg:max-w-lg xl:max-w-xl opacity-0 p-8 xl:p-10 h-auto overflow-hidden absolute animate-fade-in">
          <h1 className="text-2xl lg:text-3xl xl:text-4xl font-bold mb-3 text-gray-800">
            À propos de moi
          </h1>
          <p className="text-base lg:text-lg xl:text-xl text-gray-600 mb-6 break-words">
            <span className="block">
              🏃‍♂️ <span className="font-bold">Actif et passionné</span> par le sport, j'ai pratiqué plusieurs disciplines, dont le volley-ball 🏐, le football ⚽ et le tennis 🎾.
            </span>
            <span className="block mt-2">
              🎨 <span className="font-bold">Créatif et innovant</span>, j'adore organiser des événements 🎉 et créer des expériences multijoueurs 🎮, notamment sur Minecraft.
            </span>
            <span className="block mt-2">
              🤔 <span className="font-bold">Ouvert au monde et curieux</span>, je m'intéresse particulièrement à la découverte de la culture anglo-saxonne 🇬🇧.
            </span>
            <span className="block mt-2">
              🤝 <span className="font-bold">Engagé et impliqué</span>, je suis ambassadeur de mon école 🏫, participant activement aux salons 📅 et aux journées portes ouvertes 🚪.
            </span>
            <span className="block mt-2">
              🚀 <span className="font-bold">Toujours prêt à relever</span> de nouveaux défis, je trouve de l'inspiration dans chaque projet.
            </span>
          </p>
        </div>

        <div
          id="text-3"
          className="left-[16.66%] transform transition-all duration-500 ease-in-out w-auto max-w-full lg:max-w-lg xl:max-w-xl opacity-0 p-4 xl:p-10 h-auto overflow-hidden absolute"
        >
          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-3">
            Vous n'avez vu que la surface.
          </h1>
        </div>

        <div
          id="text-4"
          className="left-[16.66%] transform transition-all duration-500 ease-in-out w-auto max-w-full lg:max-w-lg xl:max-w-xl opacity-0 p-4 h-auto overflow-hidden absolute"
        >
          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 text-white">
            Plongeons au coeur du sujet.
          </h1>
        </div>

        {/* Bloc text-5 modifié pour effet slide horizontal */}
        <div
          id="text-5"
          className="left-[16.66%] w-auto max-w-full lg:max-w-lg xl:max-w-xl h-auto overflow-hidden absolute rounded-2xl"
        >
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
              width: `${projects.length * 100}%`,
            }}
          >
            {projects.map((project, index) => (
              <div
                key={index}
                className="bg-white shadow-2xl w-full p-8 xl:p-10 h-auto flex flex-row items-center gap-6 shrink-0"
                style={{ width: `${100 / projects.length}%` }}
              >
                <div className="w-full h-full relative">
                  <img
                    src={project.image}
                    alt={project.titre}
                    className="w-full h-full object-cover rounded-2xl"
                  />
                  <div className="absolute bottom-0 bg-black/60 text-white p-4 w-full">
                    <h2 className="text-xl md:text-2xl font-bold">{project.titre}</h2>
                    <p className="text-sm md:text-base">{project.description}</p>
                    <span className="text-xs text-gray-300">{project.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
