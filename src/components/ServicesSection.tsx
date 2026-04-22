import { motion } from "framer-motion";
import { Smartphone, Globe, Server, Database, LayoutDashboard } from "lucide-react";

const services = [
  {
    title: "App Development",
    description: "Native and cross-platform mobile applications built for performance.",
    icon: Smartphone,
  },
  {
    title: "Website Development",
    description: "High-end, responsive, and animated web experiences.",
    icon: Globe,
  },
  {
    title: "Backend Development",
    description: "Scalable, secure APIs and microservices architecture.",
    icon: Server,
  },
  {
    title: "Database Design & Management",
    description: "Optimized schemas, query tuning, and data integrity.",
    icon: Database,
  },
  {
    title: "ERP Portal Development",
    description: "Custom enterprise resource planning systems tailored to your workflow.",
    icon: LayoutDashboard,
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 }
  },
};

export default function ServicesSection() {
  return (
    <section className="py-24 bg-[#060d1a] relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-3xl md:text-5xl font-bold font-heading mb-4">
            What We <span className="text-cyan-400">Build</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Comprehensive digital engineering covering the full stack.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group p-8 rounded-xl bg-[#050a13] border border-cyan-500/10 hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(0,245,255,0.15)] transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute -right-10 -top-10 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl group-hover:bg-cyan-500/10 transition-colors" />
                <Icon className="w-12 h-12 text-cyan-400 mb-6 drop-shadow-[0_0_10px_rgba(0,245,255,0.5)]" />
                <h3 className="text-xl font-bold font-heading mb-3 text-white group-hover:text-cyan-300 transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}