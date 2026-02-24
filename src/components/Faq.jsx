import React, { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from 'react-i18next';

gsap.registerPlugin(ScrollTrigger);

const Faq = () => {
  const { t } = useTranslation();
  const faqs = t('faq.items', { returnObjects: true }) || [];

  const container = useRef();
  const [activeIndex, setActiveIndex] = useState(0);

  useGSAP(
    () => {
      gsap.from(".faq-item", {
        opacity: 0,
        x: -200,
        duration: 2,
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

  const toggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section ref={container} className="pt-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-5 gap-12">
          
          {/* Left Side */}
          <div className="faq-item md:col-span-2">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100">
              {t('faq.title')}
            </h2>
            <p className="mt-4 text-slate-600 dark:text-gray-400">
              {t('faq.subtitle')}
            </p>
          </div>

          {/* Right Side */}
          <div className="md:col-span-3 space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="faq-item border border-slate-200/80 dark:border-neutral-700 rounded-2xl overflow-hidden bg-slate-50/80 dark:bg-white/5 backdrop-blur-md"
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex justify-between items-center px-6 py-5 text-left text-lg font-semibold text-slate-900 dark:text-gray-500"
                >
                  {faq.question}
                  <span
                    className={`transition-transform duration-300 ${
                      activeIndex === index ? "rotate-180" : ""
                    }`}
                  >
                    ▼
                  </span>
                </button>

                <div
                  className={`px-6 transition-all duration-300 overflow-hidden ${
                    activeIndex === index
                      ? "max-h-40 pb-5 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-slate-600 dark:text-gray-400">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Faq;
