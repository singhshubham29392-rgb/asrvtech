import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const stats = [
  { label: "Months Experience", value: 5, suffix: "" },
  { label: "Projects Built", value: 10, suffix: "+" },
  { label: "Projects Live", value: 3, suffix: "" },
  { label: "Client Served", value: 1, suffix: "" },
];

function Counter({ from, to, duration = 2 }: { from: number; to: number; duration?: number }) {
  const [count, setCount] = useState(from);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (inView) {
      let startTimestamp: number;
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
        setCount(Math.floor(progress * (to - from) + from));
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [inView, from, to, duration]);

  return <span ref={ref}>{count}</span>;
}

export default function StatsBar() {
  return (
    <section className="py-16 border-y border-cyan-500/10 bg-[#060d1a]">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center justify-center p-6 rounded-lg bg-[#050a13] border border-cyan-500/5 shadow-[0_0_15px_rgba(0,245,255,0.05)] hover:shadow-[0_0_25px_rgba(0,245,255,0.15)] hover:border-cyan-500/20 transition-all"
            >
              <div className="text-4xl md:text-5xl font-bold font-heading text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-2 drop-shadow-[0_0_10px_rgba(0,245,255,0.5)]">
                <Counter from={0} to={stat.value} />
                {stat.suffix}
              </div>
              <div className="text-sm md:text-base text-muted-foreground uppercase tracking-wider font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}