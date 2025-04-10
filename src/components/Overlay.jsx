import { Scroll, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useState } from "react";

const Section = (props) => {
  return (
    <section
      className={`h-screen flex flex-col justify-center p-10 ${props.right ? "items-end" : "items-start"
        }`}
      style={{
        opacity: props.opacity,
      }}
    >
      <div className="w-1/2 flex items-center justify-center">
        <div className="max-w-sm w-full">
          {/* Applique le fond blanc uniquement si la section n'est pas la 3 ou la 4 */}
          <div className={`${props.noBackground ? '' : 'bg-white'} rounded-lg px-8 py-12`}>
            {props.children}
          </div>
        </div>
      </div>
    </section>
  );
};

export const Overlay = ({ pages = 5 }) => {
  const scroll = useScroll();
  const [opacityFirstSection, setOpacityFirstSection] = useState(1);
  const [opacitySecondSection, setOpacitySecondSection] = useState(1);
  const [opacityThirdSection, setOpacityThirdSection] = useState(1);
  const [opacityFourthSection, setOpacityFourthSection] = useState(1);
  const [opacityFifthSection, setOpacityFifthSection] = useState(1);
  const [opacitySixthSection, setOpacitySixthSection] = useState(1);
  const [opacitySeventhSection, setOpacitySeventhSection] = useState(1);
  const [opacityLastSection, setOpacityLastSection] = useState(1);

  useFrame(() => {
    const pageHeight = 1 / pages; // Determine the height of each page in the scroll range

    setOpacityFirstSection(1 - scroll.range(0, 1 / 8));
    setOpacitySecondSection(scroll.curve(1.3 / 8, 1.4 / 8));
    setOpacityThirdSection(scroll.curve(3.4 / 8, 3.4 / 8));
    setOpacityFourthSection(scroll.curve(10 / 8, 10 / 8));
    setOpacityFifthSection(scroll.curve(2 / 8, 1 / 8));
    setOpacitySixthSection(scroll.curve(2 / 8, 1 / 8));
    setOpacitySeventhSection(scroll.curve(2 / 8, 1 / 8));
    setOpacityLastSection(scroll.range(2 / 8, 1 / 8));
  });

  return (
    <Scroll html>
      <div className="w-screen">
        <Section opacity={opacityFirstSection}>
          <h1 className="font-semibold font-serif text-2xl">
            Bonjour, je suis Colin Morlion
          </h1>
          <p className="text-gray-500">Bienvenue sur mon portfolio</p>
          <p className="mt-3">Je suis:</p>
          <ul className="leading-9">
            <li>🧑‍💻 développeur</li>
            <li>🧑‍🏫 colonisateur</li>
            <li>📦 un poisson</li>
          </ul>
          <p className="animate-bounce mt-6">↓</p>
        </Section>
        <Section right opacity={opacitySecondSection}>
          <h1 className="font-semibold font-serif text-2xl">
            Voici mes compétences 🔥
          </h1>
          <p className="text-gray-500">PS: I never test</p>
          <p className="mt-3">
            <b>Frontend 🚀</b>
          </p>
          <ul className="leading-9">
            <li>ReactJS</li>
            <li>React Native</li>
            <li>VueJS</li>
            <li>Dos Crawlé</li>
          </ul>
          <p className="mt-3">
            <b>Backend 🔬</b>
          </p>
          <ul className="leading-9">
            <li>NodeJS</li>
            <li>tRPC</li>
            <li>NestJS</li>
            <li>PostgreSQL</li>
          </ul>
          <p className="animate-bounce mt-6">↓</p>
        </Section>
        {/* Section 3: Titre en bleu et texte plus gros */}
        <Section opacity={opacityThirdSection} noBackground>
          <h1 className="font-bold text-4xl">
            We've only just seen the submerged part.
          </h1>
        </Section>
        {/* Section 4: Titre en bleu et texte plus gros */}
        <Section opacity={opacityFourthSection} noBackground>
          <h1 className="font-bold text-4xl text-blue-500">
            Another chapter begins!
          </h1>
        </Section>
        <Section opacity={opacityLastSection}>
          <h1 className="font-semibold font-serif text-2xl">
            🤙 Call me maybe?
          </h1>
          <p className="text-gray-500">
            I'm very expensive but you won't regret it
          </p>
          <p className="mt-6 p-3 bg-slate-200 rounded-lg">
            📞 <a href="tel:(+42) 4242-4242-424242">(+42) 4242-4242-424242</a>
          </p>
        </Section>
      </div>
    </Scroll>
  );
};
