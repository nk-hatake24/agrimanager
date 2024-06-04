import React from "react";
import { Link } from "react-router-dom";
import homeScreen from "../assets/homeScreen.jpg";
import NavBarTop from "../components/NavBarTop";

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
            className="p-2 bg-gray-50 text-black transition-all hover:bg-white/10 hover:text-white z-20"
          >
            let go to dashboard!
          </Link>
        </div>
      </div>

      <div className="p-20 dark:text-gray-50  dark:bg-gray-800 text-gray-800  flex flex-col md:flex-row gap-10">
        <div class="fonctionnalite p-4 shadow-black shadow-sm rounded text-center ">
          <h3 className="text-xl md:text-3xl pb-5">Gestion de Stock</h3>
          <p>
            Surveillez et gérez vos stocks de manière efficace. Accédez en temps
            réel aux informations sur les quantités disponibles et les besoins
            futurs pour éviter les ruptures ou les excédents.
          </p>
        </div>

        <div class="fonctionnalite p-4 shadow-black shadow-sm rounded text-center ">
          <h3 className="text-xl md:text-3xl pb-5">Gestion des Employés</h3>
          <p>
            Organisez et supervisez facilement votre équipe. Suivez les horaires
            de travail, les performances et les tâches assignées à chaque
            employé pour une gestion optimale.
          </p>
        </div>

        <div class="fonctionnalite p-4 shadow-black shadow-sm rounded text-center ">
          <h3 className="text-xl md:text-3xl pb-5">Gestion des Transactions</h3>
          <p>
            Gardez une trace précise de toutes vos transactions financières.
            Simplifiez la facturation, les paiements et le suivi des ventes et
            achats pour une comptabilité transparente.
          </p>
        </div>

        <div class="fonctionnalite p-4 shadow-black shadow-sm rounded text-center ">
          <h3 className="text-xl md:text-3xl pb-5">Gestion des Ressources</h3>
          <p>
            Optimisez l'utilisation de vos ressources. Planifiez et allouez
            efficacement les ressources matérielles et humaines pour maximiser
            la productivité de votre exploitation.
          </p>
        </div>
      </div>

      <p>
        <Link to="/homedash">go to dashoard</Link>
      </p>
    </div>
  );
};

export default Home;
