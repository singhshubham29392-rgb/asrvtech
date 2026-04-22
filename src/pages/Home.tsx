import Hero3D from "@/components/Hero3D";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import StatsBar from "@/components/StatsBar";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import ProjectsSection from "@/components/ProjectsSection";
import TechStack from "@/components/TechStack";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#050a13] text-white selection:bg-cyan-500/30 overflow-x-hidden">
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="relative h-screen flex flex-col items-center justify-center pt-20">
          <Hero3D />
          
          <div className="relative z-10 container mx-auto px-6 text-center flex flex-col items-center">
            <motion.h1 
              className="text-5xl md:text-7xl font-bold font-heading mb-6 max-w-4xl leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Building <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">Scalable Digital Solutions</span>
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              Apps, Websites, Backend Systems & ERP Solutions crafted with precision for the next generation of business.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
            >
              <a href="#projects" className="px-8 py-3 rounded bg-cyan-500 text-[#050a13] font-semibold hover:bg-cyan-400 hover:shadow-[0_0_20px_rgba(0,245,255,0.5)] transition-all">
                View Projects
              </a>
              <a href="#contact" className="px-8 py-3 rounded border border-cyan-500/30 text-white hover:bg-cyan-500/10 transition-all">
                Contact Us
              </a>
            </motion.div>
          </div>

          <motion.div 
            className="absolute bottom-10 left-1/2 -translate-x-1/2 text-cyan-500/50"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <ArrowDown className="w-6 h-6" />
          </motion.div>
        </section>

        <StatsBar />
        
        <div id="about"><AboutSection /></div>
        <div id="services"><ServicesSection /></div>
        <div id="projects"><ProjectsSection /></div>
        <div id="stack"><TechStack /></div>
        <div id="contact"><ContactSection /></div>
      </main>

      <footer className="border-t border-cyan-500/10 py-12 mt-20">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <div className="text-xl font-bold font-heading tracking-tighter mb-4 md:mb-0">
            <span className="text-white">ASRV</span><span className="text-cyan-500">Tech</span>
          </div>
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} ASRVTech. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}