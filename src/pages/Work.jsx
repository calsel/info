import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const projects = [
  {
    category: "Angular",
    title: "Portfolio Website",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=80",
    demo: "https://calsel.github.io/info/",
    github: "https://github.com/calsel/info",
  },
  {
    category: "Angular 17+",
    title: "Task Planner",
    image:
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&w=900&q=80",
    demo: "https://calsel.github.io/planner/planner",
    github: "https://github.com/calsel/planner",
  },
  {
    category: "Next.js",
    title: "House Staff Shop",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80",
    demo: "https://shop-nextjs-ecru.vercel.app/",
    github: null,
  },
  {
    category: "Telegram Bot",
    title: "Support Bot Integration",
    image:
      "https://images.unsplash.com/photo-1611605698335-8b1569810432?auto=format&fit=crop&w=900&q=80",
    demo: "https://test-xnec.vercel.app/",
    github: null,
  },
];

const Work = () => {
  const { t } = useTranslation();
  const container = useRef();

  useGSAP(
    () => {
      const tl = gsap.timeline();

      tl.from(".wrapper", {
        x: -200,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
      })
        .from(
          ".text-gs",
          {
            y: -20,
            opacity: 0,
            stagger: 0.1,
            duration: 1,
            ease: "power2.out",
          },
          "-=0.5",
        )
        .from(".text-gs2", {
          y: -50,
          opacity: 0,
          stagger: 0.1,
          duration: 1,
          ease: "power2.out",
        })
        .from(".text-gs3", {
          y: -50,
          opacity: 0,
          stagger: 0.1,
          duration: 1,
          ease: "power2.out",
        })
        .from("text-gs4", {
          y: -50,
          opacity: 0,
          stagger: 0.1,
          duration: 1,
          ease: "power2.out",
        });
    },
    { scope: container },
  );
  return (
    <section ref={container} className='pt-32'>
      <div className='wrapper max-w-[85rem] px-6 mx-auto'>
        {/* Title */}
        <div className='max-w-2xl text-center mx-auto mb-14'>
          <h2 className='text-3xl md:text-5xl font-bold text-slate-900 dark:text-slate-100'>
            {t("work.title_prefix")}{" "}
            <span className='text-blue-600'>{t("work.title_highlight")}</span>
          </h2>
          <p className='mt-4 text-slate-600 dark:text-gray-500'>
            {t("work.subtitle")}
          </p>
        </div>

        {/* Grid */}
        <div className='text-gs1 grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-14'>
          {projects.map((project, index) => (
            <div
              key={index}
              className='group flex flex-col bg-slate-50/80 dark:bg-white/5 backdrop-blur-xl border border-slate-200/80 dark:border-neutral-800 rounded-2xl overflow-hidden hover:border-blue-600/40 transition duration-300'
            >
              {/* Image */}
              <div className='aspect-[16/9] overflow-hidden'>
                <img
                  className='w-full h-full object-cover group-hover:scale-105 transition duration-500'
                  src={project.image}
                  alt={project.title}
                />
              </div>

              {/* Content */}
              <div className='text-gs2 p-5 flex flex-col flex-grow'>
                <p className='text-xs uppercase text-blue-500 tracking-wider'>
                  {project.category}
                </p>

                <h3 className='mt-2 text-lg font-semibold text-slate-900 dark:text-slate-100 group-hover:text-blue-500 transition'>
                  {project.title}
                </h3>

                <div className='text-gs3 mt-auto pt-6 flex gap-3'>
                  {project.github && (
                    <a
                      href={project.github}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='px-3 py-1 text-sm border border-slate-300 text-slate-700 dark:text-gray-500 dark:border-black rounded-lg hover:border-blue-600 transition'
                    >
                      {t("work.github")}
                    </a>
                  )}

                  {project.demo && (
                    <a
                      href={project.demo}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-gs4 px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 text-slate-50 rounded-lg transition'
                    >
                      {t("work.demo")}
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className='text-center'>
          <div className='inline-block bg-slate-50/80 dark:bg-white/5 backdrop-blur-xl border border-slate-200/80 dark:border-neutral-800 rounded-full px-6 py-3'>
            <span className='text-slate-600 dark:text-gray-400'>
              {t("work.cta_text")}
            </span>
            <Link
              to='/contacts'
              className='ml-2 text-blue-500 hover:underline font-medium'
            >
              {t("work.cta_link")} →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Work;
