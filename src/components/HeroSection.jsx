import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { FaTelegram } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const HeroSection = () => {
  const { t } = useTranslation();
  const typingTexts = t('hero.titles', { returnObjects: true }) || ["Frontend Dev", "Full-Stack Dev"];
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
  const [textIndex, setTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fullText = "I'm " + typingTexts[textIndex];
    let typingSpeed = isDeleting ? 50 : 100;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (charIndex < fullText.length) {
          setDisplayedText(fullText.substring(0, charIndex + 1));
          setCharIndex((prev) => prev + 1);
        } else {
          setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        if (charIndex > 4) {
          setDisplayedText(fullText.substring(0, charIndex - 1));
          setCharIndex((prev) => prev - 1);
        } else {
          setIsDeleting(false);
          setTextIndex((prev) => (prev + 1) % typingTexts.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, textIndex]);

  return (
    <div className="pt-24" ref={container}>
      <div className='relative overflow-hidden wrapper'>
        <div className='max-w-6xl mx-auto px-6 pb-16'>
          <div className='flex flex-col items-center text-center gap-6'>
            {/* Announcement Banner */}
            <div className='flex justify-center'>
              <Link
                className='inline-flex items-center gap-x-2 bg-neutral-800 border border-neutral-700 text-xs text-slate-100 px-4 py-2 rounded-full transition hover:border-neutral-600 focus:outline-hidden focus:border-neutral-600'
                to='/work'
              >
                {t('hero.banner_explore')}
                <span className='flex items-center gap-x-1'>
                  <span className='border-s border-neutral-700 text-blue-500 ps-2'>
                    {t('hero.banner_explore_small')}
                  </span>
                  <svg
                    className='shrink-0 size-4 text-blue-500'
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <path d='m9 18 6-6-6-6' />
                  </svg>
                </span>
              </Link>
            </div>
            {/* End Announcement Banner */}

            {/* Title */}
            <div className='max-w-2xl'>
              <h1 className='text-gs block font-bold text-slate-100 text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tight'>
                <span className='text-blue-600 animate-pulse'>{t('hero.greeting')}</span> {t('hero.name_line')}
              </h1>

              <h2 className='text-gs2 mt-3 block font-bold text-slate-100 text-3xl md:text-4xl lg:text-5xl min-h-[60px]'>
                I'm{" "}
                <span className='text-blue-600'>
                  {displayedText.replace("I'm ", "")}
                </span>
                <span className='animate-pulse'>|</span>
              </h2>
            </div>

            <div className='text-gs3 max-w-3xl'>
              <p className='animate-pulse text-lg md:text-xl text-slate-300'>
                {t('hero.subtitle')}
              </p>
            </div>

            {/* Buttons */}
            <div className='flex flex-wrap justify-center gap-3'>
              <Link
                className='text-gs4 inline-flex justify-center items-center gap-x-3 text-center bg-gradient-to-tl from-blue-600 to-violet-600 hover:from-violet-600 hover:to-blue-600 text-white text-sm font-medium rounded-full py-3 px-6 transition-all duration-300'
                to='/contacts'
              >
                <FaTelegram className='size-5' />
                {t('hero.cta_contact')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
