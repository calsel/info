import React, { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from 'react-i18next';

gsap.registerPlugin(ScrollTrigger);

const Hire = () => {
  const container = useRef();
  const { t } = useTranslation();

  useGSAP(
    () => {
      gsap.from(".text-gs", {
        opacity: 0,
        x: -200,
        duration: 4,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 60%",
          toggleActions: "play none none none",
          once: true,
        },
      });
    },
    { scope: container }
  );
  return (
    <section ref={container} className="pt-50">
      <div className="text-gs max-w-5xl mx-auto px-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
            {t('hire.title')}
          </h1>
          <p className="mt-3 text-slate-600 dark:text-gray-600">
            {t('hire.subtitle')}
          </p>
        </div>

        <div className="mt-12 bg-slate-50/80 dark:bg-white/5 backdrop-blur-xl border border-slate-200/80 dark:border-neutral-700 rounded-3xl p-8 shadow-2xl">
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="grid gap-6">

              <input
                type="text"
                placeholder={t('hire.name_placeholder')}
                required
                className="w-full bg-slate-50/90 dark:bg-transparent border border-slate-300 dark:border-neutral-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 
                           focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/30
                           transition duration-300"
              />

              <input
                type="text"
                placeholder={t('hire.telegram_placeholder')}
                autoComplete="off"
                required
                className="w-full bg-slate-50/90 dark:bg-transparent border border-slate-300 dark:border-neutral-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 
                           focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/30
                           transition duration-300"
              />

              <textarea
                rows="4"
                placeholder={t('hire.project_placeholder')}
                required
                className="w-full bg-slate-50/90 dark:bg-transparent border border-slate-300 dark:border-neutral-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 
                           focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/30
                           transition duration-300"
              ></textarea>

              <button
                type="submit"
                className="mt-4 w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 
                           transition duration-300 text-white font-medium shadow-lg
                           hover:shadow-blue-600/40"
              >
                {t('hire.send')}
              </button>

              <p className="text-center text-sm text-slate-500 dark:text-gray-500">
                {t('hire.reply_time')}
              </p>

            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Hire;
