import React, { useRef } from "react";
import projects from "../assets/json/datas.json";
import Gallery from './Gallery'

export default function Overlay() {
  const projectsRef = useRef(null);
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
              Bonjour, je suis <span className="text-3xl lg:text-4xl xl:text-6xl font-bold"><br/>Colin Morlion</span>
            </h1>
            <p className="text-base lg:text-lg xl:text-xl text-gray-600 mb-6 break-words">
              En chair et en écaille !
            </p>
            <p className="mt-3 text-base lg:text-lg xl:text-xl">Je suis un développeur sur Bordeaux en étude à l'EPSI.</p>

            <div className="text-center text-lg l:text-2xl xl:text-3xl mt-6 animate-bounce">⬇</div>
          </div>

          <div className="flex-shrink-0">
            <img
              src="/colinphotocv.png"
              alt="Portrait de Colin Morlion"
              className="w-28 h-44 lg:w-48 lg:h-64 xl:w-62 xl:h-80 rounded-full object-cover shadow-xl"
            />
          </div>
        </div>

        <div
          id="text-2"
          className="right-[16.66%] bg-white rounded-2xl shadow-lg w-auto max-w-full lg:max-w-lg xl:max-w-xl opacity-0 p-8 xl:p-10 h-auto overflow-hidden absolute animate-fade-in">
          <h1 className="text-2xl lg:text-3xl xl:text-4xl text-center font-bold mb-3 text-gray-800">
            À propos de moi
          </h1>
          <p className="text-base lg:text-lg xl:text-xl text-gray-600 mb-6 break-words">
            <span className="block">
              🏃‍♂️ <span className="font-bold">Actif et passionné</span> - Sportif : Volley-ball, football et tennis.
            </span>
            <span className="block mt-2">
              🎨 <span className="font-bold">Créatif et innovant</span> - Organisateur d'événements multijoueurs Minecraft.
            </span>
            <span className="block mt-2">
              🤔 <span className="font-bold">Ouvert au monde et curieux</span> - Intérêt pour la culture anglo-saxonne.
            </span>
            <span className="block mt-2">
              🤝 <span className="font-bold">Engagé et impliqué</span> - Ambassadeur de mon école.
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
        <div
          id="text-5"
          className="right-[16.66%] w-full max-w-full lg:max-w-[33%] h-auto absolute rounded-2xl opacity-0"
        >
          <div className="bg-white rounded-2xl shadow-lg p-8 overflow-hidden flex flex-col items-center justify-center h-auto">
            <h1 className="text-2xl lg:text-3xl xl:text-5xl font-bold mb-3 text-gray-800">
              Mes compétences
            </h1>
            <Gallery autoplay={true} pauseOnHover={true} />
          </div>
        </div>
        {/* Bloc text-5 modifié pour effet slide horizontal */}
        <div
          id="text-6"
          className="left-[16.66%] w-full max-w-full lg:max-w-[33%] h-auto absolute rounded-2xl opacity-0"
        >
          <div className="bg-white rounded-2xl shadow-lg p-8 overflow-hidden flex flex-col items-center justify-center">
            <div
              className="flex flex-nowrap space-x-10 w-full h-full"
              id="projects"
              ref={projectsRef}
            >
              {projects.map((projet, index) => (
                <div
                  key={index}
                  className="min-w-full h-auto relative"
                >
                  <div className="w-full h-[30vh] sm:h-[35vh] md:h-[40vh] lg:h-[33vh] relative overflow-hidden rounded-2xl">
                    <img
                      src={projet.image}
                      alt={projet.titre}
                      className="absolute top-0 left-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-slate-900 bg-opacity-50 flex flex-col justify-center items-center text-white text-center p-4 z-10">
                      <h2 className="text-3xl font-bold">{projet.titre}</h2>
                      <p className="mt-4 text-lg">{projet.description}</p>
                      <a href={projet.url} className="mt-4 text-lg">{projet.urltexte}</a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div
          id="text-7"
          className="right-[16.66%] bg-white rounded-2xl shadow-2xl w-auto max-w-full lg:max-w-lg xl:max-w-xl opacity-0 p-8 xl:p-10 h-auto overflow-hidden absolute flex flex-row items-center gap-6">
          <div className="flex-1">
            <h1 className="text-2xl lg:text-3xl xl:text-6xl font-bold mb-3">
              Contactez-moi !
            </h1>
            <p className="text-sm lg:text-base xl:text-lg text-gray-600 mb-6 break-words">
              Developped by Colin Morlion
            </p>
            <p className="mt-3 text-base text-center lg:text-lg xl:text-2xl">Email : morlioncolin@gmail.com</p>

          </div>
        </div>



      </div>
    </div>
  );
}
