import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function Overlay() {
  return (
    <div
      id="overlay"
      className="pointer-events-none fixed top-0 w-full h-full z-10 flex items-center justify-center px-2"
    >
      <div className="relative w-full h-full flex items-center justify-center">

        {/* Bloc avec photo à droite */}
        <div
          id="text-1"
          className="left-[16.66%] bg-white rounded-2xl shadow-2xl w-auto max-w-full max-w-md lg:max-w-lg xl:max-w-xl opacity-1 p-8 xl:p-10 h-auto overflow-hidden absolute flex flex-row items-center gap-6"
        >
          {/* Texte à gauche */}
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
            <div className="text-center text-lg text-2xl xl:text-3xl mt-6 animate-bounce">⬇</div>
          </div>

          {/* Photo à droite */}
          <div className="flex-shrink-0">
            <img
              src="public/colinphotocv.png" // Mets ici ton chemin correct si différent
              alt="Portrait de Colin Morlion"
              className="w-28 h-44 lg:w-48 lg:h-64 xl:w-62 xl:h-80 rounded-full object-cover shadow-xl"
            />
          </div>
        </div>
        <div
          id="text-2"
          className="right-[16.66%] bg-white rounded-2xl shadow-lg w-auto max-w-full max-w-md lg:max-w-lg xl:max-w-xl opacity-0 p-8 xl:p-10 h-auto overflow-hidden absolute animate-fade-in"
        >
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
          className="left-[16.66%] transform transition-all duration-500 ease-in-out w-auto max-w-full max-w-md lg:max-w-lg xl:max-w-xl opacity-0 p-4 xl:p-10 h-auto overflow-hidden absolute"
        >
          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-3">
            Vous n'avez vu que la surface.
          </h1>
        </div>
        <div
          id="text-4"
          className="left-[16.66%] transform transition-all duration-500 ease-in-out w-auto max-w-full max-w-md lg:max-w-lg xl:max-w-xl opacity-0 p-4 xl:p-10 h-auto overflow-hidden absolute"
        >
          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 text-white">
            Plongeons au coeur du sujet.
          </h1>
        </div>
        
        <div
          id="text-5"
          className="left-[16.66%] bg-white rounded-2xl shadow-2xl w-auto max-w-full max-w-md lg:max-w-lg xl:max-w-xl opacity-0 p-4 p-8 xl:p-10 h-auto overflow-hidden absolute"
        >
          <h1 className="text-2xl lg:text-3xl xl:text-4xl font-bold mb-3">
            Another Section Title
          </h1>
          <p className=" text-base lg:text-lg xl:text-xl text-gray-600 mb-6 break-words">
            Content for another section here.
          </p>
          <div className="space-y-2 space-y-4  text-base lg:text-lg xl:text-xl">
            <p>📗 Another point</p>
            <p>📍 A different idea</p>
          </div>
          <div className="text-center text-lg text-2xl xl:text-3xl mt-6 animate-bounce">⬇</div>
        </div>
      </div>
    </div>


  );
}
