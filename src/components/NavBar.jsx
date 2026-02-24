import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const NavBar = () => {
  const container = useRef();
  const { t, i18n } = useTranslation();

  useGSAP(
    () => {
      const tl = gsap.timeline();

      tl.from(".nav-wrapper", {
        y: -100,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
      }).from(
        ".nav-link",
        {
          y: -20,
          opacity: 0,
          stagger: 0.1,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.5"
      );
    },
    { scope: container }
  );

  return (
    <div ref={container}>
      <header className="sticky top-0 pt-4 inset-x-0 z-50 w-full text-sm nav-wrapper will-change-transform">
        <nav className=" relative max-w-2xl w-full 
                        bg-white/70 dark:bg-neutral-800/70 
                        backdrop-blur-2xl
                        shadow-xl
                        rounded-[24px] 
                        mx-2 
                        flex items-center justify-between 
                        p-2 ps-5 
                        sm:mx-auto">

          {/* Logo */}
          <Link
            className="flex-none text-xl font-semibold tracking-wide"
            to='/'
          >
            {t ? t('nav.logo') : 'CALSEL'}
          </Link>

          {/* Links */}
          <div className="flex gap-8">
            <Link to='/' className="nav-link text-gray-800/80 dark:text-neutral-200/80 hover:text-blue-500 transition-colors">
              {t('nav.home')}
            </Link>
            <Link to="/work" className="nav-link text-gray-800/80 dark:text-neutral-200/80 hover:text-blue-500 transition-colors">
              {t('nav.works')}
            </Link>
            <Link to='/contacts' className="nav-link text-gray-800/80 dark:text-neutral-200/80 hover:text-blue-500 transition-colors">
              {t('nav.contact')}
            </Link>
          </div>

          {/* Button */}
          <div className="flex items-center gap-3">
            <Link 
            className="py-2 px-5 rounded-[24px] 
                       bg-blue-600 hover:bg-blue-700 
                       text-white 
                       transition-all duration-300
                       shadow-md hover:shadow-lg"
            to='/contacts'
          >
            {t('nav.contact_me')}
          </Link>

            {/* Language switcher */}
            <div className="flex items-center gap-2">
              <button onClick={() => i18n.changeLanguage('en')} className="px-3 py-1 rounded bg-transparent hover:bg-gray-100 dark:hover:bg-neutral-700">EN</button>
              <button onClick={() => i18n.changeLanguage('ru')} className="px-3 py-1 rounded bg-transparent hover:bg-gray-100 dark:hover:bg-neutral-700">RU</button>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default NavBar;