import { motion } from "framer-motion";
import { Mail, MapPin, CheckCircle } from "lucide-react";
import { useState } from "react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSending) return;

    setIsSending(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(payload?.error || "Failed to send message. Please try again.");
      }

      setIsSubmitted(true);
      setFormData({ name: "", email: "", phone: "", address: "", message: "" });
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to send message. Please try again.";
      setErrorMessage(message);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16">
          <motion.div 
            className="flex-1"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold font-heading mb-6">
              Let's Build <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Together</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-md leading-relaxed">
              We are currently open to new projects. Whether you need a full-stack application, an MVP, or an enterprise portal, let's talk.
            </p>

            <div className="space-y-6 mb-10">
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center group-hover:bg-cyan-500/20 group-hover:shadow-[0_0_15px_rgba(0,245,255,0.3)] transition-all">
                  <Mail className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground font-medium">Email Us</div>
                  <a href="mailto:customers@asrvtech.in" className="text-lg font-semibold text-white hover:text-cyan-400 transition-colors">customers@asrvtech.in</a>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center group-hover:bg-cyan-500/20 group-hover:shadow-[0_0_15px_rgba(0,245,255,0.3)] transition-all">
                  <MapPin className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground font-medium">Address</div>
                  <p className="text-lg font-semibold text-white">ASRV Tech, India</p>
                </div>
              </div>
            </div>

          </motion.div>

          <motion.div 
            className="flex-1"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-[#050a13]/80 backdrop-blur-xl border border-cyan-500/20 p-8 rounded-2xl shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 pointer-events-none" />
              
              {isSubmitted ? (
                <motion.div 
                  className="h-full min-h-[350px] flex flex-col items-center justify-center text-center space-y-4"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <CheckCircle className="w-16 h-16 text-cyan-400 drop-shadow-[0_0_15px_rgba(0,245,255,0.5)]" />
                  <h3 className="text-2xl font-bold font-heading text-white">Message Sent</h3>
                  <p className="text-muted-foreground">We'll get back to you shortly.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground" htmlFor="name">Name</label>
                      <input 
                        id="name"
                        type="text" 
                        required
                        value={formData.name}
                        onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                        className="w-full bg-[#0a1122] border border-cyan-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder:text-muted-foreground/50"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground" htmlFor="email">Email</label>
                      <input 
                        id="email"
                        type="email" 
                        required
                        value={formData.email}
                        onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                        className="w-full bg-[#0a1122] border border-cyan-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder:text-muted-foreground/50"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground" htmlFor="phone">Phone</label>
                      <input
                        id="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                        className="w-full bg-[#0a1122] border border-cyan-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder:text-muted-foreground/50"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground" htmlFor="address">Address</label>
                      <input
                        id="address"
                        type="text"
                        required
                        value={formData.address}
                        onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
                        className="w-full bg-[#0a1122] border border-cyan-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder:text-muted-foreground/50"
                        placeholder="Your city, state"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground" htmlFor="message">Message</label>
                    <textarea 
                      id="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                      className="w-full bg-[#0a1122] border border-cyan-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder:text-muted-foreground/50 resize-none"
                      placeholder="Tell us about your project..."
                    ></textarea>
                  </div>
                  {errorMessage ? <p className="text-sm text-red-400">{errorMessage}</p> : null}
                  <button 
                    type="submit"
                    disabled={isSending}
                    className="w-full py-4 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-[#050a13] font-bold text-lg hover:shadow-[0_0_20px_rgba(0,245,255,0.4)] hover:brightness-110 transition-all"
                  >
                    {isSending ? "Sending..." : "Send Message"}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
