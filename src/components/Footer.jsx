import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaTelegram } from "react-icons/fa";
import { useTranslation } from "react-i18next";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const container = useRef();
  const { t } = useTranslation();

  useGSAP(() => {
    gsap.from(".footer-item", {
      opacity: 0,
      y: 50,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: container.current,
        start: "top 85%",
      },
    });
  }, { scope: container });

  return (
    <footer ref={container} className="relative mt-24">

      {/* Gradient divider */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-600/40 to-transparent" />

      <div className="max-w-6xl mx-auto px-6 py-20">

        {/* CTA */}
        <div className="footer-item text-center mb-14">
          <h2 className="text-3xl font-bold text-slate-100 leading-tight">
            {t("footer.ctaTitle")}
          </h2>
          <p className="mt-3 text-slate-400 max-w-2xl mx-auto">
            {t("footer.ctaSubtitle")}
          </p>

          <a
            href="https://t.me/calsel"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-6 px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition text-white font-medium shadow-lg shadow-blue-600/20"
          >
            {t("footer.ctaButton")}
          </a>
        </div>

        {/* Main Footer */}
        <div className="footer-item bg-white/5 backdrop-blur-xl border border-neutral-800 rounded-3xl p-8 md:p-10 text-center">

          <h3 className="text-xl font-semibold text-slate-100">
            {t("footer.brand")}
          </h3>

          <p className="mt-3 text-slate-400 text-sm">
            {t("footer.copy")}
          </p>

          <div className="mt-6 flex justify-center gap-4">

            <a
              href="https://t.me/calsel"
              target="_blank"
              rel="noopener noreferrer"
              className="size-11 flex items-center justify-center rounded-full bg-slate-900/60 border border-neutral-800 text-slate-200 hover:border-blue-600 hover:text-blue-500 hover:shadow-lg hover:shadow-blue-600/20 transition"
            >
              <FaTelegram />
            </a>

            <a
              href="https://github.com/calsel"
              target="_blank"
              rel="noopener noreferrer"
              className="size-11 flex items-center justify-center rounded-full bg-slate-900/60 border border-neutral-800 text-slate-200 hover:border-blue-600 hover:text-blue-500 hover:shadow-lg hover:shadow-blue-600/20 transition"
            >
              <svg
                className="size-5"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M8 0C3.58 0 0 3.58 0 8a8.013 8.013 0 0 0 5.47 7.59c.4.07.55-.17.55-.38
                0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13
                -.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66
                .07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95
                0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12
                0 0 .67-.21 2.2.82A7.66 7.66 0 0 1 8 4.8c.68 0 1.36.09 2 .27
                1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12
                .51.56.82 1.27.82 2.15
                0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48
                0 1.07-.01 1.93-.01 2.2
                0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8
                c0-4.42-3.58-8-8-8z"/>
              </svg>
            </a>

          </div>

        </div>

        <div className="footer-item mt-10 text-center text-slate-500 text-sm">
          (c) 2026 Calsel. {t("footer.rights")}
        </div>

      </div>
    </footer>
  );
};

export default Footer;
