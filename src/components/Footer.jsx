import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaTelegram, FaGithub } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const container = useRef();
  const { t } = useTranslation();

  useGSAP(() => {
    const items = gsap.utils.toArray(".footer-item");

    gsap.set(items, {
      opacity: 0,
      y: 40,
    });

    gsap.to(items, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: container.current,
        start: "top 85%",
        once: true,
      },
    });
  }, { scope: container });

  return (
    <footer ref={container} className="relative mt-32 overflow-hidden">
      {/* Glow background */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-600/20 blur-[180px] rounded-full pointer-events-none" />

      {/* Divider */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

      <div className="relative max-w-6xl mx-auto px-6 py-24">

        {/* CTA */}
        <div className="footer-item text-center mb-20">
          <h2 className="text-4xl font-bold leading-tight pb-1 
          bg-gradient-to-r from-white via-blue-400 to-blue-600 
          bg-clip-text text-transparent">
            {t("footer.ctaTitle")}
          </h2>

          <p className="mt-4 text-slate-400 max-w-2xl mx-auto text-lg">
            {t("footer.ctaSubtitle")}
          </p>

          <Link
            to="/contacts"
            className="group inline-flex items-center gap-3 mt-8 px-10 py-4 rounded-2xl 
            bg-gradient-to-r from-blue-600 to-blue-700 
            hover:from-blue-500 hover:to-blue-600 
            transition-all duration-300 
            text-white font-semibold 
            shadow-xl shadow-blue-600/30 
            hover:shadow-blue-500/50 
            hover:scale-105 active:scale-95"
          >
            <FaTelegram className="text-lg group-hover:rotate-12 transition" />
            {t("footer.ctaButton")}
          </Link>
        </div>

        {/* Card */}
        <div className="footer-item bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-10 text-center shadow-2xl shadow-black/40">

          <h3 className="text-2xl font-semibold text-white tracking-wide">
            {t("footer.brand")}
          </h3>

          <p className="mt-4 text-slate-400 text-sm max-w-md mx-auto">
            {t("footer.copy")}
          </p>

          <div className="mt-8 flex justify-center gap-6">
            
            <Link
              to="/contacts"
              className="size-12 flex items-center justify-center rounded-full 
              bg-slate-900/60 border border-white/10 
              text-slate-200 
              hover:border-blue-500 hover:text-blue-400 
              hover:shadow-lg hover:shadow-blue-600/30 
              transition-all duration-300 hover:-translate-y-1"
            >
              <FaTelegram />
            </Link>

            <a
              href="https://github.com/calsel"
              target="_blank"
              rel="noopener noreferrer"
              className="size-12 flex items-center justify-center rounded-full 
              bg-slate-900/60 border border-white/10 
              text-slate-200 
              hover:border-blue-500 hover:text-blue-400 
              hover:shadow-lg hover:shadow-blue-600/30 
              transition-all duration-300 hover:-translate-y-1"
            >
              <FaGithub />
            </a>

          </div>
        </div>

        {/* Bottom */}
        <div className="footer-item mt-12 text-center text-slate-500 text-sm tracking-wide">
          © 2026 Calsel. {t("footer.rights")}
        </div>

      </div>
    </footer>
  );
};

export default Footer;