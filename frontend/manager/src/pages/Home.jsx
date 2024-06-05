import React from "react";
import { Link } from "react-router-dom";
import homeScreen from "../assets/homeScreen.jpg";
import NavBarTop from "../components/NavBarTop";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebook, FaWhatsapp } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";

const Home = () => {
  return (
    <div className="relative overflowX-hidden">
      <div className="fixed top-1 left-0 z-50  w-full">
        <NavBarTop />
      </div>
      <div className="h-screen w-sreen relative  bg-gradient-to-t from-black ">
        <img
          src={homeScreen}
          alt="farm"
          className="object-cover top-0 absolute mix-blend-overlay h-full w-full"
        />
        <div className=" z-10 flex h-full p-10 md:px-30 gap-20 flex-col justify-center items-start">
          <h1 className="text-5xl md:text-7xl  text-gray-50">Agrimanager</h1>
          <p className="text-xl md:text-2xl pr-48 text-gray-200 text-start">
            Bienvenue sur notre plateforme dédiée aux agropasteurs ! Simplifiez
            la gestion de vos stocks, employés, transactions et ressources en
            quelques clics. Profitez d'outils efficaces pour optimiser votre
            exploitation et augmenter votre productivité. Rejoignez-nous dès
            aujourd'hui et transformez votre façon de travailler !
          </p>

          <Link
            to="/homedash"
            className="rounded p-2 bg-gray-50 text-black transition-all hover:bg-white/10 hover:text-white z-20"
          >
            Essayer le dashboard
          </Link>
        </div>
      </div>

      <div className="p-20 min-h-screen dark:text-gray-50  dark:bg-gray-800 text-gray-800  flex flex-col justify-center items-center gap-10">
        <h1 className="text-3xl underline text-center md:text-5xl">Services</h1>
        <div className="flex flex-col  md:flex-row justify-center items-center gap-10 ">
          <div className="fonctionnalite p-4 h-52 md:h-96 shadow-black shadow-sm rounded flex flex-col justify-center text-center ">
            <h3 className="text-xl md:text-3xl  pb-5">Gestion de Stock</h3>
            <p className="mt-10">
              Surveillez et gérez vos stocks de manière efficace. Accédez en
              temps réel aux informations sur les quantités disponibles et les
              besoins futurs pour éviter les ruptures ou les excédents.
            </p>
          </div>

          <div className="fonctionnalite p-4 shadow-black h-52 md:h-96 shadow-sm rounded flex flex-col justify-center text-center ">
            <h3 className="text-xl md:text-3xl pb-5">Gestion des Employés</h3>
            <p className="mt-10">
              Organisez et supervisez facilement votre équipe. Suivez les
              horaires de travail, les performances et les tâches assignées à
              chaque employé pour une gestion optimale.
            </p>
          </div>

          <div className="fonctionnalite p-4 shadow-black h-52 md:h-96 shadow-sm rounded flex flex-col justify-center text-center ">
            <h3 className="text-xl md:text-3xl pb-5">
              Gestion des Transactions
            </h3>
            <p className="mt-10">
              Gardez une trace précise de toutes vos transactions financières.
              Simplifiez la facturation, les paiements et le suivi des ventes et
              achats pour une comptabilité transparente.
            </p>
          </div>

          <div className="fonctionnalite p-4 shadow-black h-52 md:h-96 shadow-sm rounded flex flex-col justify-center text-center ">
            <h3 className="text-xl md:text-3xl pb-5">Gestion des Ressources</h3>
            <p className="mt-10">
              Optimisez l'utilisation de vos ressources. Planifiez et allouez
              efficacement les ressources matérielles et humaines pour maximiser
              la productivité de votre exploitation.
            </p>
          </div>
        </div>
      </div>

      <div className="p-20 min-h-screen dark:text-gray-50  dark:bg-gray-800 text-gray-800  flex flex-col justify-center items-center gap-10">
        <h1 className="text-3xl underline text-center md:text-5xl">
          Pourquoi nous?
        </h1>
        <div className="flex flex-col md:flex-row justify-center items-center gap-10">
          <div className="p-4 h-52 md:h-96 shadow-black shadow-sm rounded flex flex-col justify-center text-center">
            <h3 className="text-xl md:text-3xl pb-5">Expertise Spécialisée</h3>
            <p>
              Nous nous consacrons exclusivement aux besoins des agropasteurs,
              offrant des solutions parfaitement adaptées à votre secteur
              d'activité.
            </p>
          </div>

          <div className="p-4 h-52 md:h-96 shadow-black shadow-sm rounded flex flex-col justify-center text-center">
            <h3 className="text-xl md:text-3xl pb-5">Interface Intuitive</h3>
            <p>
              Notre plateforme est conçue pour être facile à utiliser, même pour
              les utilisateurs sans compétences techniques, garantissant une
              adoption rapide et efficace.
            </p>
          </div>

          <div className="p-4 h-52 md:h-96 shadow-black shadow-sm rounded flex flex-col justify-center text-center">
            <h3 className="text-xl md:text-3xl pb-5">Support Client Dédié</h3>
            <p>
              Profitez d'un service client réactif et personnalisé, disponible
              pour vous aider à tout moment et résoudre rapidement vos
              problèmes.
            </p>
          </div>

          <div className="p-4 h-52 md:h-96 shadow-black shadow-sm rounded flex flex-col justify-center text-center">
            <h3 className="text-xl md:text-3xl pb-5">Innovation Continue</h3>
            <p>
              Nous investissons continuellement dans la recherche et le
              développement pour vous offrir les technologies les plus avancées
              et les plus efficaces.
            </p>
          </div>
        </div>
      </div>
      <footer className="flex flex-col p-20 w-full items-center dark:text-gray-50  dark:bg-gray-800">
        <div className="dark:text-gray-50  dark:bg-gray-800 dark-gray-800 p-10 flex flex-row items-center justify-center gap-10">
          <div>
            <Link to="#">
              <FaXTwitter size={42} />
            </Link>
          </div>
          <div>
            <Link to="#">
              <FaFacebook size={42} />
            </Link>
          </div>
          <div>
            <Link to="#">
              <BiLogoGmail size={42} />
            </Link>
          </div>
          <div>
            <Link to="#">
              <FaWhatsapp size={42} />
            </Link>
          </div>
        </div>

        <p className="pt-12">copyright 2024</p>
      </footer>
    </div>
  );
};

export default Home;
