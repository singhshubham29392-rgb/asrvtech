import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "wouter";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#050a13]/80 backdrop-blur-md border-b border-cyan-500/10 py-4" : "bg-transparent py-6"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <div className="text-2xl font-bold font-heading tracking-tighter">
          <span className="text-white">ASRV</span>
          <span className="text-cyan-500">Tech</span>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <a href="#about" className="hover:text-cyan-400 transition-colors">About</a>
          <a href="#services" className="hover:text-cyan-400 transition-colors">Services</a>
          <a href="#projects" className="hover:text-cyan-400 transition-colors">Projects</a>
          <a href="#stack" className="hover:text-cyan-400 transition-colors">Stack</a>
        </nav>

        <a 
          href="#contact" 
          className="px-5 py-2 text-sm font-medium rounded border border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(0,245,255,0.3)] transition-all"
        >
          Contact Us
        </a>
      </div>
    </motion.header>
  );
}