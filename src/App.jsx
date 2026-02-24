import React, { useRef } from "react";
import { Routes, Route } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Work from "./pages/Work";
import Contacts from "./pages/Contacts";

const App = () => {
  const bgRef = useRef();

  useGSAP(() => {
    gsap.to(bgRef.current, {
      backgroundPosition: "200% 200%",
      duration: 15,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });
  });

  return (
    <div
      ref={bgRef}
      className="min-h-screen app-bg text-slate-100"
    >
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<Work />} />
        <Route path="/contacts" element={<Contacts />} />
      </Routes>

      <Footer />
    </div>
  );
};

export default App;
