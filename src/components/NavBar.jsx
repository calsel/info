import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const NavBar = () => {
  const container = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "light";
    const stored = localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") return stored;
    return "light";
  });

  useEffect(() => {
    const root = document.documentElement;
    const isDark = theme === "dark";
    root.classList.toggle("dark", isDark);
    root.setAttribute("data-theme", theme);
    document.body.classList.toggle("dark", isDark);
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useGSAP(
    () => {
      gsap.from(".nav-wrapper", {
        y: -100,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
      });
    },
    { scope: container }
  );

  return (
    <div ref={container}>
      <header className="sticky top-0 pt-4 inset-x-0 z-50 nav-wrapper">
        <nav className="relative max-w-5xl mx-auto
                        bg-slate-50/80 dark:bg-slate-900/70
                        border border-slate-200/70 dark:border-slate-700/60
                        backdrop-blur-2xl shadow-xl
                        rounded-[24px] p-3 px-6
                        flex items-center justify-between text-slate-900 dark:text-slate-100">

          {/* Logo */}
          <Link className="text-xl font-semibold tracking-wide" to="/">
            {t("nav.logo")}
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="nav-link text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition">
              {t("nav.home")}
            </Link>
            <Link to="/work" className="nav-link text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition">
              {t("nav.works")}
            </Link>
            <Link to="/contacts" className="nav-link text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition">
              {t("nav.contact")}
            </Link>

            <Link
              className="py-2 px-5 rounded-[24px] bg-blue-600 hover:bg-blue-700 text-white transition"
              to="/contacts"
            >
              {t("nav.contact_me")}
            </Link>

            <div className="flex items-center gap-2">
              <button onClick={() => i18n.changeLanguage("en")} className="px-2">EN</button>
              <button onClick={() => i18n.changeLanguage("ru")} className="px-2">RU</button>
              <div className="flex items-center rounded-full border border-slate-300/70 dark:border-slate-600/70 p-0.5">
                <button
                  type="button"
                  onClick={() => setTheme("light")}
                  className={`px-3 py-1 rounded-full text-xs uppercase tracking-wide transition ${
                    theme === "light"
                      ? "bg-blue-600 text-white"
                      : "text-slate-600 dark:text-slate-300 hover:text-blue-600"
                  }`}
                >
                  Light
                </button>
                <button
                  type="button"
                  onClick={() => setTheme("dark")}
                  className={`px-3 py-1 rounded-full text-xs uppercase tracking-wide transition ${
                    theme === "dark"
                      ? "bg-blue-600 text-white"
                      : "text-slate-600 dark:text-slate-300 hover:text-blue-600"
                  }`}
                >
                  Dark
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Burger */}
          <button
            className="md:hidden flex flex-col gap-1"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="w-6 h-0.5  bg-black dark:bg-white"></span>
            <span className="w-6 h-0.5 bg-black dark:bg-white"></span>
            <span className="w-6 h-0.5 bg-black dark:bg-white"></span>
          </button>
        </nav>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-3 mx-4
                          bg-slate-50/90 dark:bg-slate-900/90
                          backdrop-blur-xl rounded-2xl p-6
                          flex flex-col gap-5 text-center shadow-lg text-slate-900 dark:text-white">
            <Link to="/" onClick={() => setIsOpen(false)}>
              {t("nav.home")}
            </Link>
            <Link to="/work" onClick={() => setIsOpen(false)}>
              {t("nav.works")}
            </Link>
            <Link to="/contacts" onClick={() => setIsOpen(false)}>
              {t("nav.contact")}
            </Link>

            <Link
              to="/contacts"
              onClick={() => setIsOpen(false)}
              className="py-2 px-5 rounded-[24px] bg-blue-600 text-white"
            >
              {t("nav.contact_me")}
            </Link>

            <div className="flex justify-center gap-4">
              <button onClick={() => i18n.changeLanguage("en")}>EN</button>
              <button onClick={() => i18n.changeLanguage("ru")}>RU</button>
              <div className="flex items-center rounded-full border border-slate-300/70 dark:border-slate-600/70 p-0.5">
                <button
                  type="button"
                  onClick={() => setTheme("light")}
                  className={`px-3 py-1 rounded-full text-xs uppercase tracking-wide transition ${
                    theme === "light"
                      ? "bg-blue-600 text-white"
                      : "text-slate-600 dark:text-slate-300 hover:text-blue-600"
                  }`}
                >
                  Light
                </button>
                <button
                  type="button"
                  onClick={() => setTheme("dark")}
                  className={`px-3 py-1 rounded-full text-xs uppercase tracking-wide transition ${
                    theme === "dark"
                      ? "bg-blue-600 text-white"
                      : "text-slate-600 dark:text-slate-300 hover:text-blue-600"
                  }`}
                >
                  Dark
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </div>
  );
};

export default NavBar;
