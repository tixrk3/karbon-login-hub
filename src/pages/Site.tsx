import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState, useCallback } from "react";
import { CheckCircle, Shield, Clock, Search, Eye, Zap, RefreshCw, BarChart3, Target, TrendingUp, ArrowRight } from "lucide-react";
import karbon14Logo from "@/assets/karbon14-logo.png";
import heroDashboard from "@/assets/hero-dashboard.jpg";
import problemOffice from "@/assets/problem-office.jpg";
import impactMeeting from "@/assets/impact-meeting.jpg";
import standardCelebration from "@/assets/standard-celebration.jpg";
import featureScreenshot from "@/assets/feature-screenshot.jpg";
import featureArchive from "@/assets/feature-archive.jpg";
import featureTrace from "@/assets/feature-trace.jpg";
import featureOrganize from "@/assets/feature-organize.jpg";
import detectionRoom from "@/assets/detection-room.jpg";
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

/* ── Counter animation ── */
const Counter = ({ value, suffix = "" }: { value: string; suffix?: string }) => {
  const { ref, visible } = useReveal();
  const [display, setDisplay] = useState("0");
  useEffect(() => {
    if (!visible) return;
    const num = parseInt(value);
    if (isNaN(num)) { setDisplay(value); return; }
    let start = 0;
    const dur = 1500;
    const step = (ts: number) => { start = start || ts; const p = Math.min((ts - start) / dur, 1); setDisplay(Math.floor(p * num).toString()); if (p < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  }, [visible, value]);
  return <span ref={ref}>{display}{suffix}</span>;
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
            {["Problème", "Solution", "Audit", "Détection", "Pricing"].map(l => (
              <a key={l} href={`#${l.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`}
                className="relative py-1 transition-colors duration-300 hover:text-white after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:rounded-full after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
                style={{ "--tw-after-bg": "#00FFC8" } as any}>
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
        {/* Ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] opacity-30 pointer-events-none" style={{ background: "radial-gradient(ellipse, rgba(0,255,200,0.15), transparent 70%)" }} />
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <Reveal direction="left">
            <div ref={parallax.ref} onMouseMove={parallax.onMove} onMouseLeave={parallax.onLeave}
              className="relative transition-transform duration-300 ease-out">
              <div className="absolute -inset-1 rounded-2xl opacity-60 blur-xl" style={{ background: "linear-gradient(135deg, rgba(0,255,200,0.2), rgba(74,158,255,0.1))" }} />
              <img src={heroDashboard} alt="Dashboard KARBON14" className="relative rounded-2xl shadow-2xl w-full" style={{ border: "1px solid rgba(255,255,255,0.1)" }} />
              <div className="absolute inset-0 rounded-2xl" style={{ background: "linear-gradient(135deg, rgba(0,255,200,0.08) 0%, transparent 50%)" }} />
            </div>
          </Reveal>
          <div>
            <Reveal delay={0.1}>
              <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight" style={{ background: "linear-gradient(135deg, #FFFFFF 30%, #00FFC8 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Karbon14
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-xl lg:text-2xl mb-4" style={{ color: "#6B7A99" }}>La transparence publicitaire en temps réel</p>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="text-lg font-medium" style={{ color: "#00FFC8" }}>Audit & preuve de diffusion automatisés</p>
            </Reveal>
            <Reveal delay={0.4}>
              <div className="mt-10 flex flex-wrap gap-4">
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
          </div>
        </div>
      </section>

      {/* ── Problème ── */}
      <section id="probleme" className="py-24 px-6 relative">
        <div className="absolute right-0 top-1/2 w-[500px] h-[500px] opacity-20 pointer-events-none" style={{ background: "radial-gradient(circle, rgba(255,77,106,0.15), transparent 70%)" }} />
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest mb-6 backdrop-blur-sm" style={{ background: "rgba(255,255,255,0.06)", color: "#6B7A99", border: "1px solid rgba(255,255,255,0.08)" }}>PROBLÈME</span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-4xl lg:text-5xl font-bold mb-14 max-w-3xl">La publicité digitale manque de transparence</h2>
          </Reveal>
          <div className="grid lg:grid-cols-2 gap-14 items-start">
            <Reveal direction="left">
              <div className="relative group">
                <div className="absolute -inset-2 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" style={{ background: "linear-gradient(135deg, rgba(255,77,106,0.1), rgba(0,255,200,0.1))" }} />
                <img src={problemOffice} alt="Problème" className="relative rounded-2xl w-full transition-transform duration-500 group-hover:scale-[1.02]" style={{ border: "1px solid rgba(255,255,255,0.08)" }} />
              </div>
            </Reveal>
            <div className="space-y-5">
              {[
                { title: "Campagnes non conformes", desc: "Diffusion différente des prévisions" },
                { title: "Preuves insuffisantes", desc: "Partielles, manuelles, non fiables" },
                { title: "Contrôle limité", desc: "Agences et annonceurs sans visibilité réelle" },
                { title: "Impact direct", desc: "Perte de budget + perte de confiance" },
              ].map((item, i) => (
                <Reveal key={i} delay={0.1 + i * 0.1} direction="right">
                  <div className="group flex gap-4 items-start pl-4 py-3 rounded-r-xl transition-all duration-300 hover:bg-white/[0.02] cursor-default"
                    style={{ borderLeft: "3px solid rgba(255,255,255,0.1)" }}
                    onMouseEnter={e => (e.currentTarget.style.borderLeftColor = "#00FFC8")}
                    onMouseLeave={e => (e.currentTarget.style.borderLeftColor = "rgba(255,255,255,0.1)")}>
                    <div>
                      <h3 className="text-lg font-medium transition-colors duration-300 group-hover:text-[#00FFC8]">{item.title}</h3>
                      <p className="text-sm" style={{ color: "#6B7A99" }}>{item.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
              <Reveal delay={0.5}>
                <div className="mt-6 p-5 rounded-xl backdrop-blur-sm transition-all duration-300 hover:border-white/20" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <p className="text-sm italic" style={{ color: "#6B7A99" }}>L'écosystème fonctionne sur de la déclaration, pas sur de la preuve</p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── Impact Business ── */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <Reveal direction="scale">
            <div className="relative group mb-14 overflow-hidden rounded-2xl">
              <img src={impactMeeting} alt="Impact Business" className="w-full transition-transform duration-700 group-hover:scale-105" style={{ border: "1px solid rgba(255,255,255,0.08)" }} />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #0A0E27 0%, transparent 50%)" }} />
            </div>
          </Reveal>
          <Reveal><span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest mb-6" style={{ background: "rgba(255,255,255,0.06)", color: "#6B7A99", border: "1px solid rgba(255,255,255,0.08)" }}>IMPACT BUSINESS</span></Reveal>
          <Reveal delay={0.1}><h2 className="text-4xl lg:text-5xl font-bold mb-14">Ce que ça coûte réellement</h2></Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
            {[
              { title: "Temps opérationnel", desc: "Screenshots et vérifications manuelles" },
              { title: "Difficultés contractuelles", desc: "Impossible de contester les fournisseurs" },
              { title: "Pertes financières", desc: "Surfacturation et sous-diffusion non détectées" },
              { title: "Décisions biaisées", desc: "Reporting incomplet et optimisation inefficace" },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="group p-6 rounded-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,0,0,0.3)]"
                  style={{ background: "#0F1535", border: "1px solid rgba(255,255,255,0.08)" }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(0,255,200,0.2)")}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}>
                  <h3 className="text-lg font-medium mb-2 transition-colors duration-300 group-hover:text-[#00FFC8]">{item.title}</h3>
                  <p className="text-sm" style={{ color: "#6B7A99" }}>{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal><div style={{ borderLeft: "3px solid #00FFC8", paddingLeft: "16px" }}><p style={{ color: "#6B7A99" }}>La perte n'est pas seulement financière, elle est stratégique</p></div></Reveal>
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

      {/* ── Détection ── */}
      <section id="detection" className="py-24 px-6 relative">
        <div className="absolute right-0 bottom-0 w-[500px] h-[500px] opacity-15 pointer-events-none" style={{ background: "radial-gradient(circle, rgba(255,77,106,0.15), transparent 70%)" }} />
        <div className="max-w-7xl mx-auto">
          <Reveal><span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest mb-6" style={{ background: "rgba(255,77,106,0.15)", color: "#FF4D6A", border: "1px solid rgba(255,77,106,0.2)" }}>🔍 DÉTECTION</span></Reveal>
          <Reveal delay={0.1}><h2 className="text-4xl lg:text-5xl font-bold mb-14">Détection automatique des anomalies</h2></Reveal>
          <div className="grid lg:grid-cols-2 gap-14 items-start">
            <div>
              <div className="grid sm:grid-cols-3 gap-6 mb-8">
                {[
                  { title: "Comparaison systématique", desc: "Plan média prévu vs diffusion observée", color: "#FF4D6A" },
                  { title: "Identification précise", desc: "Manques, retards, sous-diffusion détectés", color: "#FF4D6A" },
                  { title: "Alertes intelligentes", desc: "Notification immédiate des incohérences", color: "#FF4D6A" },
                ].map((item, i) => (
                  <Reveal key={i} delay={i * 0.1}>
                    <div className="group">
                      <div className="h-1 w-full mb-4 rounded overflow-hidden" style={{ background: "rgba(255,255,255,0.1)" }}>
                        <div className="h-full rounded transition-all duration-1000" style={{ background: item.color, width: "60%" }} />
                      </div>
                      <h3 className="text-base font-medium mb-1 transition-colors duration-300 group-hover:text-[#FF4D6A]">{item.title}</h3>
                      <p className="text-sm" style={{ color: "#6B7A99" }}>{item.desc}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
              <Reveal delay={0.3}>
                <div className="mt-4">
                  <div className="h-1 w-full mb-4 rounded overflow-hidden" style={{ background: "rgba(255,255,255,0.1)" }}>
                    <div className="h-full rounded" style={{ background: "#FFB800", width: "40%" }} />
                  </div>
                  <h3 className="text-base font-medium mb-1">Arguments concrets</h3>
                  <p className="text-sm" style={{ color: "#6B7A99" }}>Données pour négociation fournisseur</p>
                </div>
              </Reveal>
              <Reveal delay={0.4}><div className="mt-8" style={{ borderLeft: "3px solid #00FFC8", paddingLeft: "16px" }}><p style={{ color: "#6B7A99" }}>Karbon14 donne du pouvoir aux agences</p></div></Reveal>
            </div>
            <Reveal direction="right">
              <div className="relative group overflow-hidden rounded-2xl">
                <img src={detectionRoom} alt="Detection" className="rounded-2xl w-full transition-transform duration-700 group-hover:scale-105" style={{ border: "1px solid rgba(255,255,255,0.08)" }} />
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "linear-gradient(to top, rgba(255,77,106,0.1), transparent)" }} />
              </div>
            </Reveal>
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

      {/* ── Pricing ── */}
      <section id="pricing" className="py-24 px-6 relative">
        <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[900px] h-[500px] opacity-10 pointer-events-none" style={{ background: "radial-gradient(ellipse, rgba(0,255,200,0.2), transparent 70%)" }} />
        <div className="max-w-7xl mx-auto">
          <Reveal><span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest mb-6" style={{ background: "rgba(0,255,200,0.15)", color: "#00FFC8", border: "1px solid rgba(0,255,200,0.2)" }}>PRICING</span></Reveal>
          <Reveal delay={0.1}><h2 className="text-4xl lg:text-5xl font-bold mb-14">Modèle SaaS simple & scalable</h2></Reveal>
          <div className="grid sm:grid-cols-3 gap-8 mb-16">
            {[
              { price: "40", role: "Lecteur", desc: "Consultation et reporting" },
              { price: "80", role: "Utilisateur", desc: "Captures + exports", highlight: true },
              { price: "120", role: "Admin", desc: "Gestion + dashboards + audit avancé" },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 0.12}>
                <div className={`group text-center p-8 rounded-2xl transition-all duration-500 hover:-translate-y-3 ${item.highlight ? "hover:shadow-[0_20px_60px_rgba(0,255,200,0.15)]" : "hover:shadow-[0_20px_60px_rgba(0,0,0,0.3)]"}`}
                  style={{ background: "#0F1535", border: item.highlight ? "1px solid rgba(0,255,200,0.3)" : "1px solid rgba(255,255,255,0.08)" }}>
                  {item.highlight && <div className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "linear-gradient(135deg, rgba(0,255,200,0.1), transparent)" }} />}
                  <p className="text-4xl font-bold mb-2 relative" style={{ color: "#00FFC8" }}><Counter value={item.price} suffix="€" /><span className="text-lg font-normal" style={{ color: "#6B7A99" }}>/mois</span></p>
                  <p className="text-lg font-semibold mb-2 relative">{item.role}</p>
                  <p className="text-sm relative" style={{ color: "#6B7A99" }}>{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal><h3 className="text-3xl font-bold mb-8">Démarrez maintenant</h3></Reveal>
          <div className="grid sm:grid-cols-3 gap-6 mb-14">
            {[
              { title: "Pilotes agences médias", desc: "Testez en conditions réelles" },
              { title: "Partenariats régies", desc: "Intégration avec vos partenaires" },
              { title: "Déploiement équipe", desc: "Formation et onboarding inclus" },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="group p-6 rounded-xl transition-all duration-500 hover:-translate-y-2"
                  style={{ background: "#0F1535", border: "1px solid rgba(255,255,255,0.08)" }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(0,255,200,0.2)")}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}>
                  <h3 className="text-lg font-semibold mb-1 transition-colors duration-300 group-hover:text-[#00FFC8]">{item.title}</h3>
                  <p className="text-sm" style={{ color: "#6B7A99" }}>{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal><div style={{ borderLeft: "3px solid #00FFC8", paddingLeft: "16px" }}><p className="font-medium">Karbon14 transforme la publicité digitale en un environnement vérifiable, mesurable et auditable</p></div></Reveal>
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

      {/* ── Smooth scroll CSS ── */}
      <style>{`html { scroll-behavior: smooth; }`}</style>
    </div>
  );
};

export default Site;
