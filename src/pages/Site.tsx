import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState, useCallback } from "react";
import { CheckCircle, Shield, Clock, Search, Eye, Zap, RefreshCw, BarChart3, Target, TrendingUp, ArrowRight, Send, Mail, User, MessageSquare } from "lucide-react";
import karbon14Logo from "@/assets/karbon14-logo.png";
import heroDashboard from "@/assets/hero-dashboard.jpg";
import standardCelebration from "@/assets/standard-celebration.jpg";
import featureScreenshot from "@/assets/feature-screenshot.jpg";
import featureArchive from "@/assets/feature-archive.jpg";
import featureTrace from "@/assets/feature-trace.jpg";
import featureOrganize from "@/assets/feature-organize.jpg";
import realtimeMonitor from "@/assets/realtime-monitor.jpg";

/* ── Scroll-reveal hook ── */
function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ── Reusable animated wrapper ── */
const Reveal = ({ children, className = "", delay = 0, direction = "up" }: { children: React.ReactNode; className?: string; delay?: number; direction?: "up" | "left" | "right" | "scale" }) => {
  const { ref, visible } = useReveal();
  const transforms: Record<string, string> = { up: "translateY(60px)", left: "translateX(-60px)", right: "translateX(60px)", scale: "scale(0.9)" };
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "none" : transforms[direction],
      transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      willChange: "opacity, transform",
    }}>
      {children}
    </div>
  );
};

/* ── Parallax on mouse for hero ── */
const useParallax = () => {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 20;
    const y = ((e.clientY - r.top) / r.height - 0.5) * 20;
    el.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg)`;
  }, []);
  const onLeave = useCallback(() => { if (ref.current) ref.current.style.transform = "perspective(1000px) rotateY(0deg) rotateX(0deg)"; }, []);
  return { ref, onMove, onLeave };
};

/* ── Navbar scroll state ── */
const useScrolled = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  return scrolled;
};

/* ────────────────────────── SITE COMPONENT ────────────────────────── */
const Site = () => {
  const navigate = useNavigate();
  const parallax = useParallax();
  const scrolled = useScrolled();

  const [contactForm, setContactForm] = useState({ prenom: "", nom: "", email: "", objet: "", message: "" });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 3000);
    setContactForm({ prenom: "", nom: "", email: "", objet: "", message: "" });
  };

  return (
    <div className="min-h-screen font-sans overflow-x-hidden" style={{ background: "#0A0E27", color: "#FFFFFF" }}>

      {/* ── Navbar ── */}
      <nav className="fixed top-0 w-full z-50 transition-all duration-500" style={{
        background: scrolled ? "rgba(10,14,39,0.95)" : "rgba(10,14,39,0.6)",
        backdropFilter: "blur(20px)",
        borderBottom: `1px solid rgba(255,255,255,${scrolled ? "0.1" : "0.04"})`,
        boxShadow: scrolled ? "0 8px 32px rgba(0,0,0,0.4)" : "none",
      }}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <img src={karbon14Logo} alt="KARBON14" className="h-8 w-auto transition-transform duration-300 group-hover:scale-110" />
            <span className="font-bold text-lg tracking-wider whitespace-nowrap transition-all duration-300 group-hover:tracking-[0.2em]" style={{ color: "#00FFC8" }}>KARBON14</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm" style={{ color: "#6B7A99" }}>
            {["Solution", "Audit", "Nous contacter"].map(l => (
              <a key={l} href={`#${l.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "-")}`}
                className="relative py-1 transition-colors duration-300 hover:text-white">
                <span className="relative z-10">{l}</span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 rounded-full scale-x-0 transition-transform duration-300 hover:scale-x-100" style={{ background: "#00FFC8" }} />
              </a>
            ))}
          </div>
          <button onClick={() => navigate("/")}
            className="group relative px-5 py-2 rounded-xl text-sm font-semibold overflow-hidden transition-all duration-300 hover:scale-105"
            style={{ background: "#00FFC8", color: "#0A0E27" }}>
            <span className="relative z-10">Se connecter</span>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: "linear-gradient(135deg, #00FFC8, #4A9EFF)", boxShadow: "0 0 30px rgba(0,255,200,0.4)" }} />
          </button>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="pt-32 pb-24 px-6 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] opacity-30 pointer-events-none" style={{ background: "radial-gradient(ellipse, rgba(0,255,200,0.15), transparent 70%)" }} />
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Big tagline */}
          <Reveal>
            <h1 className="text-center text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight" style={{ background: "linear-gradient(135deg, #FFFFFF 30%, #00FFC8 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              AI Solution for Transparency in AdTech
            </h1>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-center text-xl lg:text-2xl mb-4 max-w-3xl mx-auto" style={{ color: "#6B7A99" }}>La transparence publicitaire en temps réel</p>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="text-center text-lg font-medium mb-12" style={{ color: "#00FFC8" }}>Audit & preuve de diffusion automatisés</p>
          </Reveal>
          <Reveal delay={0.35}>
            <div className="flex flex-wrap justify-center gap-4 mb-16">
              <button onClick={() => navigate("/")}
                className="group relative px-8 py-3.5 rounded-xl font-semibold overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(0,255,200,0.3)]"
                style={{ background: "#00FFC8", color: "#0A0E27" }}>
                <span className="relative z-10 flex items-center gap-2">Démarrer maintenant <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
              </button>
              <a href="#solution"
                className="px-8 py-3.5 rounded-xl font-semibold border transition-all duration-300 hover:bg-white/5 hover:border-white/30 hover:scale-105"
                style={{ borderColor: "rgba(255,255,255,0.15)", color: "#FFFFFF" }}>
                En savoir plus
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.4} direction="scale">
            <div className="max-w-5xl mx-auto" ref={parallax.ref} onMouseMove={parallax.onMove} onMouseLeave={parallax.onLeave}
              style={{ transition: "transform 0.3s ease-out" }}>
              <div className="absolute -inset-1 rounded-2xl opacity-60 blur-xl" style={{ background: "linear-gradient(135deg, rgba(0,255,200,0.2), rgba(74,158,255,0.1))" }} />
              <img src={heroDashboard} alt="Dashboard KARBON14" className="relative rounded-2xl shadow-2xl w-full" style={{ border: "1px solid rgba(255,255,255,0.1)" }} />
              <div className="absolute inset-0 rounded-2xl" style={{ background: "linear-gradient(135deg, rgba(0,255,200,0.08) 0%, transparent 50%)" }} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Standard ── */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <Reveal><h2 className="text-4xl lg:text-5xl font-bold mb-14">Le marché a besoin d'un standard</h2></Reveal>
          <div className="grid lg:grid-cols-2 gap-14 items-start">
            <div className="space-y-4">
              {[
                { title: "Transparence totale", desc: "100% de la diffusion tracée" },
                { title: "Audit systématique", desc: "Vérification réelle vs plan média" },
                { title: "Suivi instantané", desc: "Monitoring live des emplacements" },
                { title: "Contrôle continu", desc: "Évaluation permanente des partenaires" },
              ].map((item, i) => (
                <Reveal key={i} delay={i * 0.1} direction="left">
                  <div className="group p-5 rounded-xl transition-all duration-500 hover:-translate-x-2 cursor-default"
                    style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", borderLeft: "3px solid rgba(255,255,255,0.1)" }}
                    onMouseEnter={e => { e.currentTarget.style.borderLeftColor = "#00FFC8"; e.currentTarget.style.background = "rgba(0,255,200,0.03)"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderLeftColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.background = "rgba(255,255,255,0.02)"; }}>
                    <h3 className="text-lg font-medium">{item.title}</h3>
                    <p className="text-sm" style={{ color: "#6B7A99" }}>{item.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal direction="right">
              <div className="relative group overflow-hidden rounded-2xl">
                <img src={standardCelebration} alt="Standard" className="w-full transition-transform duration-700 group-hover:scale-105" style={{ border: "1px solid rgba(255,255,255,0.08)" }} />
              </div>
              <div className="mt-6 p-4 rounded-xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <p className="text-sm" style={{ color: "#6B7A99" }}>Karbon14 devient l'outil de référence des agences</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Solution ── */}
      <section id="solution" className="py-24 px-6 relative">
        <div className="absolute left-0 top-0 w-[600px] h-[600px] opacity-20 pointer-events-none" style={{ background: "radial-gradient(circle, rgba(0,255,200,0.12), transparent 70%)" }} />
        <div className="max-w-7xl mx-auto">
          <Reveal><span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest mb-6" style={{ background: "rgba(255,77,106,0.15)", color: "#FF4D6A", border: "1px solid rgba(255,77,106,0.2)" }}>🔒 SOLUTION</span></Reveal>
          <Reveal delay={0.1}><h2 className="text-4xl lg:text-5xl font-bold mb-14">Karbon14 automatise la preuve et l'audit de diffusion</h2></Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-14">
            {[
              { img: featureScreenshot, title: "Screenshots automatiques", desc: "Capture systématique de chaque diffusion" },
              { img: featureArchive, title: "Archivage centralisé", desc: "Stockage sécurisé et accessible" },
              { img: featureTrace, title: "Traçabilité horodatée", desc: "Preuve irréfutable avec horodatage" },
              { img: featureOrganize, title: "Organisation intelligente", desc: "Classement par campagne, format, device" },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 0.12} direction="up">
                <div className="group cursor-default">
                  <div className="relative overflow-hidden rounded-xl mb-4">
                    <div className="absolute -inset-1 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg" style={{ background: "linear-gradient(135deg, rgba(0,255,200,0.15), rgba(74,158,255,0.1))" }} />
                    <img src={item.img} alt={item.title} className="relative w-full aspect-square object-cover rounded-xl transition-transform duration-500 group-hover:scale-110" style={{ border: "1px solid rgba(255,255,255,0.08)" }} />
                  </div>
                  <h3 className="text-lg font-medium mb-1 transition-colors duration-300 group-hover:text-[#00FFC8]">{item.title}</h3>
                  <p className="text-sm" style={{ color: "#6B7A99" }}>{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal><div style={{ borderLeft: "3px solid #00FFC8", paddingLeft: "16px" }}><p style={{ color: "#6B7A99" }}>Preuve irréfutable, industrialisée, scalable</p></div></Reveal>
        </div>
      </section>

      {/* ── Plugin ── */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <Reveal><span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest mb-6" style={{ background: "rgba(255,77,106,0.15)", color: "#FF4D6A", border: "1px solid rgba(255,77,106,0.2)" }}>🔌 PLUGIN</span></Reveal>
          <Reveal delay={0.1}><h2 className="text-4xl lg:text-5xl font-bold mb-14">Un plugin intégré au workflow</h2></Reveal>
          <div className="grid lg:grid-cols-2 gap-14">
            <Reveal direction="left">
              <div className="p-8 rounded-2xl relative overflow-hidden group transition-all duration-500 hover:shadow-[0_20px_60px_rgba(0,255,200,0.1)]" style={{ background: "rgba(255,255,255,0.9)", color: "#0A0E27" }}>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "linear-gradient(135deg, rgba(0,255,200,0.05), transparent)" }} />
                <h3 className="relative text-2xl font-bold mb-4" style={{ color: "#0A0E27" }}>Adoption immédiate</h3>
                <p className="relative font-semibold mb-2" style={{ color: "#0A0E27" }}>Aucune friction technique</p>
                <p className="relative" style={{ color: "#0A0E27" }}>Installation en 2 minutes</p>
                <p className="relative" style={{ color: "#0A0E27" }}>Compatible Chrome & Edge</p>
              </div>
            </Reveal>
            <div className="space-y-6">
              {[
                { num: "01", title: "Installation simple", desc: "Extension navigateur en un clic" },
                { num: "02", title: "Capture intelligente", desc: "Automatique ou déclenchée manuellement" },
                { num: "03", title: "Classification auto", desc: "Campagne, support, emplacement identifiés" },
                { num: "04", title: "Envoi instantané", desc: "Synchronisation directe avec la plateforme" },
              ].map((item, i) => (
                <Reveal key={i} delay={i * 0.1} direction="right">
                  <div className="group flex gap-4 items-start pb-5 transition-all duration-300 hover:translate-x-2" style={{ borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.08)" : "none" }}>
                    <span className="text-2xl font-bold transition-colors duration-300 group-hover:text-[#00FFC8]" style={{ color: "rgba(255,255,255,0.1)" }}>{item.num}</span>
                    <div>
                      <h3 className="text-lg font-medium transition-colors duration-300 group-hover:text-[#00FFC8]">{item.title}</h3>
                      <p className="text-sm" style={{ color: "#6B7A99" }}>{item.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Audit 100% ── */}
      <section id="audit" className="py-24 px-6 relative">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[800px] h-[400px] opacity-15 pointer-events-none" style={{ background: "radial-gradient(ellipse, rgba(0,255,200,0.15), transparent 70%)" }} />
        <div className="max-w-7xl mx-auto">
          <Reveal><span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest mb-6" style={{ background: "rgba(255,255,255,0.06)", color: "#6B7A99", border: "1px solid rgba(255,255,255,0.08)" }}>AUDIT COMPLET</span></Reveal>
          <Reveal delay={0.1}><h2 className="text-4xl lg:text-5xl font-bold mb-14">Audit 100% de la diffusion</h2></Reveal>
          <div className="grid sm:grid-cols-2 gap-6 mb-14">
            {[
              { icon: <CheckCircle className="h-6 w-6" />, title: "Vérification systématique", desc: "Contrôle de chaque placement" },
              { icon: <Shield className="h-6 w-6" />, title: "Couverture totale", desc: "Tous les placements tracés" },
              { icon: <Clock className="h-6 w-6" />, title: "Historique complet", desc: "Preuves consultables et exploitables" },
              { icon: <Search className="h-6 w-6" />, title: "Contrôle granulaire", desc: "Par période, device, emplacement" },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="group p-6 rounded-xl flex items-start gap-4 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,0,0,0.3)]"
                  style={{ background: "#0F1535", border: "1px solid rgba(255,255,255,0.08)" }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(0,255,200,0.2)")}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}>
                  <div className="p-2.5 rounded-xl transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(0,255,200,0.2)]" style={{ background: "rgba(0,255,200,0.1)", color: "#00FFC8" }}>{item.icon}</div>
                  <div>
                    <h3 className="text-lg font-medium transition-colors duration-300 group-hover:text-[#00FFC8]">{item.title}</h3>
                    <p className="text-sm" style={{ color: "#6B7A99" }}>{item.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal><h3 className="text-3xl lg:text-4xl font-bold" style={{ background: "linear-gradient(90deg, #FFFFFF 0%, #00FFC8 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>100% audit, pas un échantillon</h3></Reveal>
        </div>
      </section>

      {/* ── Visualisation temps réel ── */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <Reveal><h2 className="text-4xl lg:text-5xl font-bold mb-14">Visualisation en temps réel dans l'environnement média</h2></Reveal>
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <Reveal direction="left">
              <div className="relative group overflow-hidden rounded-2xl">
                <div className="absolute -inset-2 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl" style={{ background: "linear-gradient(135deg, rgba(0,255,200,0.15), rgba(74,158,255,0.1))" }} />
                <img src={realtimeMonitor} alt="Realtime" className="relative rounded-2xl w-full transition-transform duration-700 group-hover:scale-105" style={{ border: "1px solid rgba(255,255,255,0.08)" }} />
              </div>
            </Reveal>
            <div className="space-y-8">
              {[
                { icon: <Eye className="h-6 w-6" />, title: "Suivi live", desc: "Apparition instantanée des campagnes" },
                { icon: <Zap className="h-6 w-6" />, title: "Accès immédiat", desc: "Preuve disponible en temps réel" },
                { icon: <RefreshCw className="h-6 w-6" />, title: "Monitoring continu", desc: "Pas d'attente jusqu'à la fin de campagne" },
              ].map((item, i) => (
                <Reveal key={i} delay={i * 0.15} direction="right">
                  <div className="group flex gap-4 items-start transition-all duration-300 hover:translate-x-2">
                    <div className="p-2.5 rounded-xl transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(0,255,200,0.2)]" style={{ background: "rgba(0,255,200,0.1)", color: "#00FFC8" }}>{item.icon}</div>
                    <div>
                      <h3 className="text-lg font-semibold transition-colors duration-300 group-hover:text-[#00FFC8]">{item.title}</h3>
                      <p className="text-sm" style={{ color: "#6B7A99" }}>{item.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
              <Reveal delay={0.5}>
                <div className="p-5 rounded-xl transition-all duration-300 hover:border-white/20" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <p className="text-sm" style={{ color: "#6B7A99" }}>Vous voyez la réalité du terrain, pas un reporting Excel</p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── Performance ── */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <Reveal><span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest mb-6" style={{ background: "rgba(255,255,255,0.06)", color: "#6B7A99", border: "1px solid rgba(255,255,255,0.08)" }}>PERFORMANCE</span></Reveal>
          <Reveal delay={0.1}><h2 className="text-4xl lg:text-5xl font-bold mb-14">Des insights pour optimiser la performance</h2></Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-14">
            {[
              { icon: <BarChart3 className="h-6 w-6" />, title: "Sites les plus performants", desc: "Identification des environnements à fort ROI" },
              { icon: <Target className="h-6 w-6" />, title: "Environnements optimaux", desc: "Contextes de diffusion les plus efficaces" },
              { icon: <TrendingUp className="h-6 w-6" />, title: "Ajustement budgétaire", desc: "Réallocation en cours de campagne" },
              { icon: <ArrowRight className="h-6 w-6" />, title: "Recommandations actionnables", desc: "Décisions basées sur la diffusion réelle" },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="group text-center p-6 rounded-xl transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_20px_60px_rgba(0,0,0,0.3)]"
                  style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(0,255,200,0.2)")}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)")}>
                  <div className="mx-auto mb-4 p-3 rounded-xl inline-flex transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_25px_rgba(0,255,200,0.2)]" style={{ background: "rgba(0,255,200,0.1)", color: "#00FFC8" }}>{item.icon}</div>
                  <h3 className="text-base font-semibold mb-1 transition-colors duration-300 group-hover:text-[#00FFC8]">{item.title}</h3>
                  <p className="text-sm" style={{ color: "#6B7A99" }}>{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal><div style={{ borderLeft: "3px solid #00FFC8", paddingLeft: "16px" }}><p style={{ color: "#6B7A99" }}>Karbon14 ne prouve pas seulement : il améliore la performance</p></div></Reveal>
        </div>
      </section>

      {/* ── Nous contacter ── */}
      <section id="nous-contacter" className="py-24 px-6 relative">
        <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[900px] h-[500px] opacity-10 pointer-events-none" style={{ background: "radial-gradient(ellipse, rgba(0,255,200,0.2), transparent 70%)" }} />
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left side - text */}
            <Reveal direction="left">
              <div>
                <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest mb-6" style={{ background: "rgba(0,255,200,0.15)", color: "#00FFC8", border: "1px solid rgba(0,255,200,0.2)" }}>CONTACT</span>
                <h2 className="text-4xl lg:text-6xl font-bold leading-tight mb-6" style={{ background: "linear-gradient(135deg, #FFFFFF 30%, #00FFC8 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  Laissez un message.<br />Nous revenons vers vous.
                </h2>
                <p className="text-lg mb-8" style={{ color: "#6B7A99" }}>
                  Une question, une démo, un partenariat ? Notre équipe vous répond sous 24h.
                </p>
                <div className="flex items-center gap-3 mb-3">
                  <Mail className="h-5 w-5" style={{ color: "#00FFC8" }} />
                  <span style={{ color: "#6B7A99" }}>contact@karbon14.com</span>
                </div>
              </div>
            </Reveal>

            {/* Right side - form */}
            <Reveal direction="right" delay={0.15}>
              <form onSubmit={handleContactSubmit} className="p-8 rounded-2xl space-y-5" style={{ background: "#0F1535", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: "#6B7A99" }}>Prénom</label>
                    <input type="text" value={contactForm.prenom} onChange={e => setContactForm(p => ({ ...p, prenom: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-300 focus:ring-2"
                      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#FFFFFF", focusRingColor: "#00FFC8" } as any}
                      placeholder="Votre prénom" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: "#6B7A99" }}>Nom</label>
                    <input type="text" value={contactForm.nom} onChange={e => setContactForm(p => ({ ...p, nom: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-300 focus:ring-2"
                      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#FFFFFF" }}
                      placeholder="Votre nom" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: "#6B7A99" }}>E-mail <span style={{ color: "#FF4D6A" }}>*</span></label>
                  <input type="email" required value={contactForm.email} onChange={e => setContactForm(p => ({ ...p, email: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-300 focus:ring-2"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#FFFFFF" }}
                    placeholder="votre@email.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: "#6B7A99" }}>Objet</label>
                  <input type="text" value={contactForm.objet} onChange={e => setContactForm(p => ({ ...p, objet: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-300 focus:ring-2"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#FFFFFF" }}
                    placeholder="Objet de votre message" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: "#6B7A99" }}>Message</label>
                  <textarea rows={4} value={contactForm.message} onChange={e => setContactForm(p => ({ ...p, message: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-300 focus:ring-2 resize-none"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#FFFFFF" }}
                    placeholder="Rédigez votre message ici..." />
                </div>
                <button type="submit"
                  className="w-full py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(0,255,200,0.3)]"
                  style={{ background: "#00FFC8", color: "#0A0E27" }}>
                  {formSubmitted ? "✓ Message envoyé !" : <><Send className="h-4 w-4" /> Envoyer</>}
                </button>
              </form>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-14 px-6 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <img src={karbon14Logo} alt="KARBON14" className="h-6 w-auto transition-transform duration-300 group-hover:scale-110" />
            <span className="font-bold tracking-wider" style={{ color: "#00FFC8" }}>KARBON14</span>
          </div>
          <p className="text-sm" style={{ color: "#6B7A99" }}>© 2025 Karbon14. Tous droits réservés.</p>
          <button onClick={() => navigate("/")}
            className="group px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(0,255,200,0.3)]"
            style={{ background: "#00FFC8", color: "#0A0E27" }}>
            Se connecter
          </button>
        </div>
      </footer>

      <style>{`html { scroll-behavior: smooth; }`}</style>
    </div>
  );
};

export default Site;
