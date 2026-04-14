import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Work = () => {
  const { t } = useTranslation();
  const container = useRef();

  useGSAP(
    () => {
      const tl = gsap.timeline();

      tl.from(".wrapper", {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      })
        .from(
          ".text-gs1",
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.5"
        )
        .from(
          ".text-gs2",
          {
            scale: 0.9,
            opacity: 0,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.4"
        );
    },
    { scope: container }
  );

  return (
    <section ref={container} className="py-32">
      <div className="wrapper max-w-4xl mx-auto px-6 text-center">

        {/* Title */}
        <div className="text-gs1">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-100">
            {t("work.title_prefix")}{" "}
            <span className="text-blue-600">
              {t("work.title_highlight")}
            </span>
          </h2>

          <p className="mt-6 text-slate-400 text-lg">
            {t("work.subtitle")}
          </p>
        </div>

        {/* CTA Card */}
        <div className="text-gs2 mt-12 bg-white/5 backdrop-blur-xl border border-neutral-800 rounded-3xl p-10 shadow-2xl">

          <p className="text-slate-300 text-lg mb-6">
            {t("work.cta_text")}
          </p>

          <Link
            to="/contacts"
            className="inline-block px-8 py-4 text-lg font-semibold rounded-2xl 
            bg-gradient-to-r from-blue-600 to-blue-700 
            hover:from-blue-500 hover:to-blue-600 
            text-white 
            transition-all duration-300 
            hover:scale-105 
            shadow-xl shadow-blue-600/30"
          >
            {t("work.contact_me")}
          </Link>
        </div>

      </div>
    </section>
  );
};

export default Work;