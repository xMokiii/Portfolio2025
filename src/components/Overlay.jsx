import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function Overlay() {
  return (
    <div
      id="overlay"
      className="pointer-events-none fixed top-0 left-0 w-full h-full z-10 flex items-center justify-center"
    >
      {/* Texte 1 visible par défaut */}
      <div
        className="absolute left-1/4 z-20 p-6 bg-slate-200 rounded-lg w-11/12 sm:w-80 md:w-96 lg:w-1/3 max-w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-100"
        id="text-1"
      >
        <h1 className="font-semibold font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl">
          Welcome to the Scene
        </h1>
        <p className="mt-3 text-sm sm:text-base md:text-lg lg:text-xl">
          Scroll down to explore the content.
        </p>
      </div>

      {/* Texte 2 */}
      <div
        className="absolute left-3/4 z-20 p-6 bg-slate-200 rounded-lg w-11/12 sm:w-80 md:w-96 lg:w-1/3 max-w-full opacity-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        id="text-2"
      >
        <h1 className="font-semibold font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl">
          Hello, I'm Wawa Sensei
        </h1>
        <p className="text-gray-500 text-sm sm:text-base md:text-lg lg:text-xl">
          Welcome to my beautiful portfolio
        </p>
        <p className="mt-3 text-sm sm:text-base md:text-lg lg:text-xl">I know:</p>
        <ul className="leading-9 text-sm sm:text-base md:text-lg lg:text-xl">
          <li>🧑‍💻 How to code</li>
          <li>🧑‍🏫 How to learn</li>
          <li>📦 How to deliver</li>
        </ul>
        <p className="animate-bounce mt-6 text-sm sm:text-base md:text-lg lg:text-xl">↓</p>
      </div>

      {/* Texte 3 */}
      <div
        className="absolute left-1/4 z-20 p-6 bg-slate-200 rounded-lg w-11/12 sm:w-80 md:w-96 lg:w-1/3 max-w-full opacity-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        id="text-3"
      >
        <h1 className="font-semibold font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl">
          Here are my skillsets 🔥
        </h1>
        <p className="text-gray-500 text-sm sm:text-base md:text-lg lg:text-xl">PS: I never test</p>
        <p className="mt-3 text-sm sm:text-base md:text-lg lg:text-xl font-bold">Frontend 🚀</p>
        <ul className="leading-9 text-sm sm:text-base md:text-lg lg:text-xl">
          <li>ReactJS</li>
          <li>React Native</li>
          <li>VueJS</li>
          <li>Tailwind</li>
        </ul>
        <p className="mt-3 text-sm sm:text-base md:text-lg lg:text-xl font-bold">Backend 🔬</p>
        <ul className="leading-9 text-sm sm:text-base md:text-lg lg:text-xl">
          <li>NodeJS</li>
          <li>tRPC</li>
          <li>NestJS</li>
          <li>PostgreSQL</li>
        </ul>
        <p className="animate-bounce mt-6 text-sm sm:text-base md:text-lg lg:text-xl">↓</p>
      </div>

      {/* Texte 4 */}
      <div
        className="absolute left-1/4 z-20 p-6 bg-slate-200 rounded-lg w-11/12 sm:w-80 md:w-96 lg:w-1/3 max-w-full opacity-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        id="text-4"
      >
        <h1 className="font-semibold font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl">
          🤙 Call me maybe?
        </h1>
        <p className="text-gray-500 text-sm sm:text-base md:text-lg lg:text-xl">
          I'm very expensive but you won't regret it
        </p>
        <p className="mt-6 p-3 bg-slate-200 rounded-lg text-sm sm:text-base md:text-lg lg:text-xl">
          📞 <a href="tel:(+42) 4242-4242-424242">(+42) 4242-4242-424242</a>
        </p>
      </div>
    </div>
  );
}
