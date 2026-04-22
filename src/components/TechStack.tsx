import { motion } from "framer-motion";
import { Cloud } from "lucide-react";
import { 
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, 
  SiNodedotjs, SiExpress, SiPython, SiFastapi,
  SiPostgresql, SiMongodb, SiRedis, SiMysql,
  SiDocker, SiGit, SiFigma
} from "react-icons/si";

const stackCategories = [
  {
    title: "Frontend",
    skills: [
      { name: "React", icon: SiReact, color: "#61DAFB" },
      { name: "Next.js", icon: SiNextdotjs, color: "#ffffff" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
    ]
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
      { name: "Express", icon: SiExpress, color: "#ffffff" },
      { name: "Python", icon: SiPython, color: "#3776AB" },
      { name: "FastAPI", icon: SiFastapi, color: "#009688" },
    ]
  },
  {
    title: "Database",
    skills: [
      { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
      { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
      { name: "Redis", icon: SiRedis, color: "#DC382D" },
      { name: "MySQL", icon: SiMysql, color: "#4479A1" },
    ]
  },
  {
    title: "Tools & Cloud",
    skills: [
      { name: "Docker", icon: SiDocker, color: "#2496ED" },
      { name: "Git", icon: SiGit, color: "#F05032" },
      { name: "AWS", icon: Cloud, color: "#FF9900" },
      { name: "Figma", icon: SiFigma, color: "#F24E1E" },
    ]
  }
];

export default function TechStack() {
  return (
    <section className="py-24 bg-[#060d1a] relative border-y border-cyan-500/10">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-3xl md:text-5xl font-bold font-heading mb-4">
            Tech We <span className="text-blue-500">Master</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We use the most powerful tools available to build resilient systems.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {stackCategories.map((category, catIndex) => (
            <div key={catIndex} className="flex flex-col items-center">
              <h3 className="text-xl font-bold font-heading mb-8 text-cyan-50 border-b border-cyan-500/20 pb-2 w-full text-center">
                {category.title}
              </h3>
              <div className="grid grid-cols-2 gap-6 w-full">
                {category.skills.map((skill, skillIndex) => {
                  const Icon = skill.icon;
                  return (
                    <motion.div
                      key={skillIndex}
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 200, 
                        damping: 10,
                        delay: catIndex * 0.1 + skillIndex * 0.05 
                      }}
                      whileHover={{ scale: 1.1, y: -5 }}
                      className="flex flex-col items-center justify-center p-4 rounded-xl bg-[#0a1122] border border-cyan-500/10 hover:border-cyan-400/30 transition-colors group cursor-default"
                    >
                      <Icon className="w-10 h-10 mb-3 transition-transform group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" style={{ color: skill.color }} />
                      <span className="text-xs font-medium text-muted-foreground group-hover:text-white transition-colors text-center">
                        {skill.name}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}