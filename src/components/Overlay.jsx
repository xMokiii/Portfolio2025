import React, { useRef, useState } from "react";
import projects from "../assets/json/datas.json";
import Gallery from './Gallery'

export default function Overlay() {
  const projectsRef = useRef(null);
  const [flippedIndex, setFlippedIndex] = useState(null); // Ajouté

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
              Bonjour, je suis <span className="text-3xl lg:text-4xl xl:text-6xl font-bold"><br />Colin Morlion</span>
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
          <h1 className="text-2xl lg:text-3xl xl:text-4xl text-center font-bold mb-3">
            À propos de moi
          </h1>
          <p className="text-base lg:text-lg xl:text-xl text-gray-900 mb-6 break-words">
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
            <h1 className="text-2xl lg:text-3xl xl:text-5xl font-bold mb-3">
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
                  className={`min-w-full h-auto relative flip-card${flippedIndex === index ? " flipped" : ""}`}
                  onClick={() => setFlippedIndex(flippedIndex === index ? null : index)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="flip-card-inner w-full h-[30vh] sm:h-[35vh] md:h-[40vh] lg:h-[33vh] rounded-2xl">
                    {/* Face avant */}
                    <div className="flip-card-front w-full h-full rounded-2xl overflow-hidden">
                      <img
                        src={projet.image}
                        alt={projet.titre}
                        className="absolute top-0 left-0 w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-slate-900 bg-opacity-55 flex flex-col justify-center items-center font-450 text-white text-center p-4 z-10">
                        <h2 className="text-3xl font-bold">{projet.titre}</h2>
                        <p className="mt-4 text-lg">{projet.description}</p>
                        <a href={projet.url}
                          target="_blank"
                          id="url"
                          className="mt-4 text-lg font-bold underline hover:text-bold">
                          {projet.urltexte}
                        </a>
                      </div>
                    </div>
                    {/* Face arrière */}
                    <div className="flip-card-back w-full h-full rounded-2xl flex flex-col justify-center items-center bg-gray-800 text-white p-4">
                      <h2 className="2xl:text-4xl text-xl font-bold 2xl:mb-2">{projet.titre}</h2>
                      <h3 className="2xl:text-xl text-base text-gray-400 mb-2">Détails du projet</h3>
                      <p className="text-xs 2xl:text-lg  mx-5">{projet.details}</p>
                      <div className="2xl:mt-2 mt-1 flex flex-wrap justify-center gap-1 2xl:gap-2">
                        {projet.skills.split(",").map((skill, skillIndex) => (
                          <span
                            key={skillIndex}
                            className="bg-blue-500 text-white px-3 2xl:py-1 rounded-full text-xs 2xl:text-base lg:mt-1"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div id="text-7" className="absolute right-[16.66%] bg-white rounded-2xl shadow-xl opacity-0 p-6 md:p-10 flex flex-col md:flex-row items-center gap-6">
          {/* Image à gauche */}
          <img
            src="/colinphotocv.png"
            alt="Portrait de Colin Morlion"
            className="w-28 h-44 lg:w-48 lg:h-64 xl:w-62 xl:h-80 object-cover rounded-full shadow-lg"
          />

          {/* Contenu à droite */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl xl:text-4xl 2xl:text-5xl font-bold mb-1">Contactez-moi !</h1>
            <p className="text-gray-500 text-base mb-4">Developed by Colin Morlion</p>

            <p className="text-base mb-2">
              <strong>Email :</strong> morlioncolin@gmail.com
            </p>

            <p className="text-base mb-2">
              <strong>Téléphone :</strong> 06 31 83 24 46
            </p>

            <p className="text-base mb-2">
              <strong>LinkedIn :</strong>{" "}
              <a
                href="https://www.linkedin.com/in/colin-morlion-8a11ba2a1/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                Colin Morlion
              </a>
            </p>

            <p className="text-base">
              <strong>GitHub :</strong>{" "}
              <a
                href="https://github.com/xMokiii/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                xMokiii
              </a>
            </p>
          </div>
        </div>



      </div>
    </div>
  );
}
