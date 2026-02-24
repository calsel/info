import React, { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from 'react-i18next';

gsap.registerPlugin(ScrollTrigger);

const Hire = () => {
  const container = useRef();
  const { t } = useTranslation();
  const [form, setForm] = useState({
    name: "",
    telegram: "",
    project: "",
  });
  const [status, setStatus] = useState("idle");
  const [errorText, setErrorText] = useState("");
  const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
  const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorText("");

    if (!form.name.trim() || !form.telegram.trim() || !form.project.trim()) {
      return;
    }

    if (!botToken || !chatId) {
      setStatus("error");
      setErrorText("Telegram is not configured. Set VITE_TELEGRAM_BOT_TOKEN and VITE_TELEGRAM_CHAT_ID.");
      return;
    }

    setStatus("sending");

    const message = [
      "New inquiry from portfolio",
      `Name: ${form.name}`,
      `Telegram: ${form.telegram}`,
      `Project: ${form.project}`,
    ].join("\n");

    try {
      const body = new URLSearchParams({
        chat_id: chatId,
        text: message,
      });

      await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body,
      });

      setStatus("success");
      setForm({ name: "", telegram: "", project: "" });
    } catch (err) {
      setStatus("error");
      setErrorText("Failed to send. Please try again.");
    }
  };

  return (
    <section ref={container} className="pt-50">
      <div className="text-gs max-w-5xl mx-auto px-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
            {t('hire.title')}
          </h1>
          <p className="mt-3 text-slate-600 dark:text-gray-400">
            {t('hire.subtitle')}
          </p>
        </div>

        <div className="mt-12 bg-slate-50/80 dark:bg-white/5 backdrop-blur-xl border border-slate-200/80 dark:border-neutral-700 rounded-3xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6">

              <input
                type="text"
                name="name"
                placeholder={t('hire.name_placeholder')}
                required
                value={form.name}
                onChange={handleChange}
                className="w-full bg-slate-50/90 dark:bg-transparent border border-slate-300 dark:border-neutral-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 
                           focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/30
                           transition duration-300"
              />

              <input
                type="text"
                name="telegram"
                placeholder={t('hire.telegram_placeholder')}
                autoComplete="off"
                required
                value={form.telegram}
                onChange={handleChange}
                className="w-full bg-slate-50/90 dark:bg-transparent border border-slate-300 dark:border-neutral-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 
                           focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/30
                           transition duration-300"
              />

              <textarea
                rows="4"
                name="project"
                placeholder={t('hire.project_placeholder')}
                required
                value={form.project}
                onChange={handleChange}
                className="w-full bg-slate-50/90 dark:bg-transparent border border-slate-300 dark:border-neutral-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 
                           focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/30
                           transition duration-300"
              ></textarea>

              <button
                type="submit"
                disabled={status === "sending"}
                className="mt-4 w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-70 disabled:cursor-not-allowed
                           transition duration-300 text-white font-medium shadow-lg
                           hover:shadow-blue-600/40"
              >
                {status === "sending" ? "Sending..." : t('hire.send')}
              </button>

              {status === "success" && (
                <p className="text-center text-sm text-emerald-600">
                  Message sent. I will reply soon.
                </p>
              )}

              {status === "error" && (
                <p className="text-center text-sm text-rose-600">
                  {errorText || "Failed to send. Please try again."}
                </p>
              )}

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
