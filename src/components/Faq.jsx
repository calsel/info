import React, { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from 'react-i18next';
import en from "../locales/en/translation.json";
import ru from "../locales/ru/translation.json";

gsap.registerPlugin(ScrollTrigger);

const Faq = () => {
  const { t, i18n } = useTranslation();
  const faqsRaw = t('faq.items', { returnObjects: true, defaultValue: [] });
  const fallbackFaqs = i18n.language?.startsWith("ru")
    ? ru?.faq?.items
    : en?.faq?.items;
  const faqs = Array.isArray(faqsRaw) && faqsRaw.length
    ? faqsRaw
    : (Array.isArray(fallbackFaqs) ? fallbackFaqs : []);

  const container = useRef();
  const [activeIndex, setActiveIndex] = useState(0);

  useGSAP(
    () => {
      const items = gsap.utils.toArray(".faq-item");
      gsap.set(items, { opacity: 0, x: -24 });

      ScrollTrigger.batch(items, {
        start: "top 85%",
        once: true,
        onEnter: (batch) => {
          gsap.to(batch, {
            opacity: 1,
            x: -100,
            duration: 0.7,
            stagger: 0.12,
            ease: "power2.out",
            clearProps: "transform,opacity",
          });
        },
      });
    },
    { scope: container }
  );

  const toggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section ref={container} className="py-40">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-5 gap-10 items-start">
          
          {/* Left Side */}
          <div className="faq-item md:col-span-2">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-100">
              {t('faq.title')}
            </h2>
            <p className="mt-4 text-slate-400 text-sm md:text-base">
              {t('faq.subtitle')}
            </p>
          </div>

          {/* Right Side */}
          <div className="md:col-span-3 space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="faq-item border border-neutral-800 rounded-2xl overflow-hidden bg-slate-900/40 backdrop-blur-md hover:border-blue-600/40 transition"
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex justify-between items-center px-6 py-5 text-left text-lg font-semibold text-slate-100"
                >
                  {faq.question}
                  <span
                    className={`text-slate-400 text-sm transition-transform duration-300 ${
                      activeIndex === index ? "rotate-180" : ""
                    }`}
                  >
                    v
                  </span>
                </button>

                <div
                  className={`px-6 transition-all duration-300 overflow-hidden ${
                    activeIndex === index
                      ? "max-h-80 pb-5 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-slate-400 leading-relaxed">{faq.answer}</p>
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
