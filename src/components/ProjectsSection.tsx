import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ExternalLink } from "lucide-react";
import React from "react";

const projects = [
  {
    title: "Cubbit",
    description: "A social media app where users can create communities, call friends, and chat in real time.",
    tags: ["Flutter", "Firebase", "Cloudinary"],
    status: "Live",
    url: "https://cubbit-web.onrender.com/"
  },
  {
    title: "MyTask",
    description: "A task manager app where users can create tasks and access them from anywhere.",
    tags: ["Flutter", "Firebase"],
    status: "Live",
    url: "https://mytask25.netlify.app/"
  }
];

function ProjectCard({ project, index }: { project: typeof projects[0], index: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        className="h-full rounded-2xl bg-gradient-to-b from-[#0a1122] to-[#050a13] border border-cyan-500/20 p-8 relative overflow-hidden group hover:border-cyan-400/50 transition-colors"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
      >
        <div className="absolute inset-0 bg-cyan-500/0 group-hover:bg-cyan-500/5 transition-colors duration-500 pointer-events-none" />
        
        <div className="flex justify-between items-start mb-6 transform translate-z-10">
          <div className="px-3 py-1 rounded-full border border-green-500/50 bg-green-500/10 text-green-400 text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-[0_0_10px_rgba(34,197,94,0.2)]">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            {project.status}
          </div>
          <a
            href={project.url}
            target="_blank"
            rel="noreferrer"
            aria-label={`Open ${project.title}`}
            className="text-muted-foreground group-hover:text-cyan-400 transition-colors"
          >
            <ExternalLink className="w-5 h-5" />
          </a>
        </div>
        
        <h3 className="text-2xl font-bold font-heading mb-3 text-white transform translate-z-20">
          {project.title}
        </h3>
        
        <p className="text-muted-foreground mb-8 line-clamp-3 transform translate-z-10">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-8 transform translate-z-10">
          {project.tags.map((tag, i) => (
            <span key={i} className="px-3 py-1 text-xs font-medium rounded bg-[#0f172a] text-cyan-300 border border-cyan-900/50">
              {tag}
            </span>
          ))}
        </div>
        
        <a
          href={project.url}
          target="_blank"
          rel="noreferrer"
          className="block w-full py-3 rounded bg-transparent border border-cyan-500/30 text-cyan-400 font-semibold hover:bg-cyan-500/10 hover:border-cyan-400 transition-all transform translate-z-20 text-center"
        >
          View Project
        </a>
      </motion.div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-3xl md:text-5xl font-bold font-heading mb-4">
            Our <span className="text-purple-500">Work</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl">
            Selected projects demonstrating our capability to deliver robust, scalable applications.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
