import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function Overlay() {
  return (
    <div
      id="overlay"
      className="pointer-events-none fixed top-0 w-full h-full z-10 flex items-center justify-center px-8 lg:px-12 xl:px-16"
    >
      <div className="relative w-full h-full flex items-center justify-center">

        <div
          id="text-1"
          className="left-[16.66%] bg-white rounded-2xl shadow-2xl w-auto max-w-full max-w-md lg:max-w-lg xl:max-w-xl opacity-1  p-8 xl:p-10 h-auto overflow-hidden absolute"
        >
          <h1 className="text-2xl lg:text-3xl xl:text-4xl font-bold mb-3">
            Bonjour, je suis Colin Morlion
          </h1>
          <p className=" text-base lg:text-lg xl:text-xl text-gray-600 mb-6 break-words">
            Bienvenue sur mon portfolio
          </p>
          <p className="mt-3">Je sais :</p>
          <div className="space-y-2 space-y-4 text-base lg:text-lg xl:text-xl">
            <p>📐 Coder</p>
            <p>📚 Apprendre</p>
            <p>📦 M'investir</p>
          </div>
          <div className="text-center text-lg text-2xl xl:text-3xl mt-6 animate-bounce">⬇</div>
        </div>

        <div
          id="text-2"
          className="right-[16.66%] bg-white rounded-2xl shadow-2xl w-auto max-w-full max-w-md lg:max-w-lg xl:max-w-xl opacity-0 p-8 xl:p-10 h-auto overflow-hidden absolute"
        >
          <h1 className="text-2xl lg:text-3xl xl:text-4xl font-bold mb-3">
            Text 1 Title
          </h1>
          <p className=" text-base lg:text-lg xl:text-xl text-gray-600 mb-6 break-words">
            Some content for the first section.
          </p>
          <div className="space-y-2 space-y-4  text-base lg:text-lg xl:text-xl">
            <p>📘 Point 1</p>
            <p>📚 Point 2</p>
            <p>📦 Point 3</p>
          </div>
          <div className="text-center text-lg text-2xl xl:text-3xl mt-6 animate-bounce">⬇</div>
        </div>


        <div
          id="text-3"
          className="left-[16.66%] w-auto max-w-full max-w-md lg:max-w-lg xl:max-w-xl opacity-0 p-4 p-8 xl:p-10 h-auto overflow-hidden absolute"
        >
          <h1 className="text-2xl lg:text-3xl xl:text-4xl font-bold mb-3">
            Vous n'avez vu que la surface.
          </h1>
        </div>

        <div
          id="text-4"
          className="left-[16.66%] w-auto max-w-full max-w-md lg:max-w-lg xl:max-w-xl opacity-0 p-4 p-8 xl:p-10 h-auto overflow-hidden absolute"
        >
          <h1 className="text-2xl lg:text-3xl xl:text-4xl font-bold mb-3">
            Il est temps de plonger au coeur du sujet.
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
