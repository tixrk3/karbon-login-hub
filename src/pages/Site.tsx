import { useNavigate } from "react-router-dom";
import { Camera, Archive, Clock, FolderOpen, CheckCircle, Shield, Eye, Zap, RefreshCw, Search, Target, AlertTriangle, BarChart3, TrendingUp, ArrowRight } from "lucide-react";
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

const Site = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen font-sans" style={{ background: "#0A0E27", color: "#FFFFFF" }}>
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 border-b" style={{ background: "rgba(10,14,39,0.9)", backdropFilter: "blur(20px)", borderColor: "rgba(255,255,255,0.08)" }}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={karbon14Logo} alt="KARBON14" className="h-8 w-auto" />
            <span className="font-bold text-lg tracking-wider whitespace-nowrap" style={{ color: "#00FFC8" }}>KARBON14</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm" style={{ color: "#6B7A99" }}>
            <a href="#probleme" className="hover:text-white transition-colors">Problème</a>
            <a href="#solution" className="hover:text-white transition-colors">Solution</a>
            <a href="#audit" className="hover:text-white transition-colors">Audit</a>
            <a href="#detection" className="hover:text-white transition-colors">Détection</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          </div>
          <button onClick={() => navigate("/")} className="px-5 py-2 rounded-xl text-sm font-semibold transition-all hover:shadow-lg" style={{ background: "#00FFC8", color: "#0A0E27", boxShadow: "0 0 20px rgba(0,255,200,0.2)" }}>
            Se connecter
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <img src={heroDashboard} alt="Dashboard KARBON14" className="rounded-2xl shadow-2xl w-full" style={{ border: "1px solid rgba(255,255,255,0.08)" }} />
            <div className="absolute inset-0 rounded-2xl" style={{ background: "linear-gradient(135deg, rgba(0,255,200,0.1) 0%, transparent 50%)" }} />
          </div>
          <div>
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">Karbon14</h1>
            <p className="text-xl mb-4" style={{ color: "#6B7A99" }}>La transparence publicitaire en temps réel</p>
            <p className="text-lg font-medium" style={{ color: "#00FFC8" }}>Audit & preuve de diffusion automatisés</p>
            <div className="mt-8 flex gap-4">
              <button onClick={() => navigate("/")} className="px-8 py-3 rounded-xl font-semibold transition-all hover:shadow-lg" style={{ background: "#00FFC8", color: "#0A0E27" }}>
                Démarrer maintenant
              </button>
              <a href="#solution" className="px-8 py-3 rounded-xl font-semibold border transition-all hover:bg-white/5" style={{ borderColor: "rgba(255,255,255,0.15)", color: "#FFFFFF" }}>
                En savoir plus
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Problème Section */}
      <section id="probleme" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <span className="inline-block px-4 py-1.5 rounded-lg text-xs font-semibold tracking-widest mb-6" style={{ background: "rgba(255,255,255,0.08)", color: "#6B7A99", border: "1px solid rgba(255,255,255,0.08)" }}>PROBLÈME</span>
          <h2 className="text-4xl lg:text-5xl font-bold mb-12">La publicité digitale manque de transparence</h2>
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <img src={problemOffice} alt="Problème" className="rounded-2xl w-full" style={{ border: "1px solid rgba(255,255,255,0.08)" }} />
            <div className="space-y-6">
              {[
                { title: "Campagnes non conformes", desc: "Diffusion différente des prévisions" },
                { title: "Preuves insuffisantes", desc: "Partielles, manuelles, non fiables" },
                { title: "Contrôle limité", desc: "Agences et annonceurs sans visibilité réelle" },
                { title: "Impact direct", desc: "Perte de budget + perte de confiance" },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-start" style={{ borderLeft: "3px solid rgba(255,255,255,0.15)", paddingLeft: "16px" }}>
                  <div>
                    <h3 className="text-lg font-medium">{item.title}</h3>
                    <p className="text-sm" style={{ color: "#6B7A99" }}>{item.desc}</p>
                  </div>
                </div>
              ))}
              <div className="mt-8 p-4 rounded-xl flex items-start gap-3" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <p className="text-sm" style={{ color: "#6B7A99" }}>L'écosystème fonctionne sur de la déclaration, pas sur de la preuve</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Business */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <img src={impactMeeting} alt="Impact Business" className="rounded-2xl w-full mb-12" style={{ border: "1px solid rgba(255,255,255,0.08)" }} />
          <span className="inline-block px-4 py-1.5 rounded-lg text-xs font-semibold tracking-widest mb-6" style={{ background: "rgba(255,255,255,0.08)", color: "#6B7A99", border: "1px solid rgba(255,255,255,0.08)" }}>IMPACT BUSINESS</span>
          <h2 className="text-4xl lg:text-5xl font-bold mb-12">Ce que ça coûte réellement</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { title: "Temps opérationnel", desc: "Screenshots et vérifications manuelles" },
              { title: "Difficultés contractuelles", desc: "Impossible de contester les fournisseurs" },
              { title: "Pertes financières", desc: "Surfacturation et sous-diffusion non détectées" },
              { title: "Décisions biaisées", desc: "Reporting incomplet et optimisation inefficace" },
            ].map((item, i) => (
              <div key={i} className="p-6 rounded-xl" style={{ background: "#0F1535", border: "1px solid rgba(255,255,255,0.08)" }}>
                <h3 className="text-lg font-medium mb-2">{item.title}</h3>
                <p className="text-sm" style={{ color: "#6B7A99" }}>{item.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ borderLeft: "3px solid #00FFC8", paddingLeft: "16px" }}>
            <p style={{ color: "#6B7A99" }}>La perte n'est pas seulement financière, elle est stratégique</p>
          </div>
        </div>
      </section>

      {/* Le marché a besoin d'un standard */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl lg:text-5xl font-bold mb-12">Le marché a besoin d'un standard</h2>
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-4">
              {[
                { title: "Transparence totale", desc: "100% de la diffusion tracée" },
                { title: "Audit systématique", desc: "Vérification réelle vs plan média" },
                { title: "Suivi instantané", desc: "Monitoring live des emplacements" },
                { title: "Contrôle continu", desc: "Évaluation permanente des partenaires" },
              ].map((item, i) => (
                <div key={i} className="p-5 rounded-xl" style={{ borderLeft: "3px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <h3 className="text-lg font-medium">{item.title}</h3>
                  <p className="text-sm" style={{ color: "#6B7A99" }}>{item.desc}</p>
                </div>
              ))}
            </div>
            <div>
              <img src={standardCelebration} alt="Standard" className="rounded-2xl w-full" style={{ border: "1px solid rgba(255,255,255,0.08)" }} />
              <div className="mt-6 p-4 rounded-xl flex items-start gap-3" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <p className="text-sm" style={{ color: "#6B7A99" }}>Karbon14 devient l'outil de référence des agences</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution */}
      <section id="solution" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <span className="inline-block px-4 py-1.5 rounded-lg text-xs font-semibold tracking-widest mb-6" style={{ background: "rgba(255,77,106,0.15)", color: "#FF4D6A", border: "1px solid rgba(255,77,106,0.2)" }}>🔒 SOLUTION</span>
          <h2 className="text-4xl lg:text-5xl font-bold mb-12">Karbon14 automatise la preuve et l'audit de diffusion</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { img: featureScreenshot, title: "Screenshots automatiques", desc: "Capture systématique de chaque diffusion" },
              { img: featureArchive, title: "Archivage centralisé", desc: "Stockage sécurisé et accessible" },
              { img: featureTrace, title: "Traçabilité horodatée", desc: "Preuve irréfutable avec horodatage" },
              { img: featureOrganize, title: "Organisation intelligente", desc: "Classement par campagne, format, device" },
            ].map((item, i) => (
              <div key={i}>
                <img src={item.img} alt={item.title} className="rounded-xl w-full aspect-square object-cover mb-4" style={{ border: "1px solid rgba(255,255,255,0.08)" }} />
                <h3 className="text-lg font-medium mb-1">{item.title}</h3>
                <p className="text-sm" style={{ color: "#6B7A99" }}>{item.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ borderLeft: "3px solid #00FFC8", paddingLeft: "16px" }}>
            <p style={{ color: "#6B7A99" }}>Preuve irréfutable, industrialisée, scalable</p>
          </div>
        </div>
      </section>

      {/* Plugin */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <span className="inline-block px-4 py-1.5 rounded-lg text-xs font-semibold tracking-widest mb-6" style={{ background: "rgba(255,77,106,0.15)", color: "#FF4D6A", border: "1px solid rgba(255,77,106,0.2)" }}>🔌 PLUGIN</span>
          <h2 className="text-4xl lg:text-5xl font-bold mb-12">Un plugin intégré au workflow</h2>
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="p-8 rounded-2xl" style={{ background: "rgba(255,255,255,0.9)", color: "#0A0E27" }}>
              <h3 className="text-2xl font-bold mb-4" style={{ color: "#0A0E27" }}>Adoption immédiate</h3>
              <p className="font-semibold mb-2" style={{ color: "#0A0E27" }}>Aucune friction technique</p>
              <p style={{ color: "#0A0E27" }}>Installation en 2 minutes</p>
              <p style={{ color: "#0A0E27" }}>Compatible Chrome & Edge</p>
            </div>
            <div className="space-y-8">
              {[
                { num: "01", title: "Installation simple", desc: "Extension navigateur en un clic" },
                { num: "02", title: "Capture intelligente", desc: "Automatique ou déclenchée manuellement" },
                { num: "03", title: "Classification auto", desc: "Campagne, support, emplacement identifiés" },
                { num: "04", title: "Envoi instantané", desc: "Synchronisation directe avec la plateforme" },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-start" style={{ borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.08)" : "none", paddingBottom: "16px" }}>
                  <span className="text-sm font-medium" style={{ color: "#6B7A99" }}>{item.num}</span>
                  <div>
                    <h3 className="text-lg font-medium">{item.title}</h3>
                    <p className="text-sm" style={{ color: "#6B7A99" }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Audit 100% */}
      <section id="audit" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <span className="inline-block px-4 py-1.5 rounded-lg text-xs font-semibold tracking-widest mb-6" style={{ background: "rgba(255,255,255,0.08)", color: "#6B7A99", border: "1px solid rgba(255,255,255,0.08)" }}>AUDIT COMPLET</span>
          <h2 className="text-4xl lg:text-5xl font-bold mb-12">Audit 100% de la diffusion</h2>
          <div className="grid sm:grid-cols-2 gap-6 mb-12">
            {[
              { icon: <CheckCircle className="h-6 w-6" />, title: "Vérification systématique", desc: "Contrôle de chaque placement" },
              { icon: <Shield className="h-6 w-6" />, title: "Couverture totale", desc: "Tous les placements tracés" },
              { icon: <Clock className="h-6 w-6" />, title: "Historique complet", desc: "Preuves consultables et exploitables" },
              { icon: <Search className="h-6 w-6" />, title: "Contrôle granulaire", desc: "Par période, device, emplacement" },
            ].map((item, i) => (
              <div key={i} className="p-6 rounded-xl flex items-start gap-4" style={{ background: "#0F1535", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div className="p-2 rounded-lg" style={{ background: "rgba(0,255,200,0.1)", color: "#00FFC8" }}>{item.icon}</div>
                <div>
                  <h3 className="text-lg font-medium">{item.title}</h3>
                  <p className="text-sm" style={{ color: "#6B7A99" }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <h3 className="text-3xl lg:text-4xl font-bold">100% audit, pas un échantillon</h3>
        </div>
      </section>

      {/* Visualisation temps réel */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl lg:text-5xl font-bold mb-12">Visualisation en temps réel dans l'environnement média</h2>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <img src={realtimeMonitor} alt="Realtime" className="rounded-2xl w-full" style={{ border: "1px solid rgba(255,255,255,0.08)" }} />
            <div className="space-y-8">
              {[
                { icon: <Eye className="h-6 w-6" />, title: "Suivi live", desc: "Apparition instantanée des campagnes" },
                { icon: <Zap className="h-6 w-6" />, title: "Accès immédiat", desc: "Preuve disponible en temps réel" },
                { icon: <RefreshCw className="h-6 w-6" />, title: "Monitoring continu", desc: "Pas d'attente jusqu'à la fin de campagne" },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="p-2 rounded-lg" style={{ background: "rgba(0,255,200,0.1)", color: "#00FFC8" }}>{item.icon}</div>
                  <div>
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="text-sm" style={{ color: "#6B7A99" }}>{item.desc}</p>
                  </div>
                </div>
              ))}
              <div className="p-4 rounded-xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <p className="text-sm" style={{ color: "#6B7A99" }}>Vous voyez la réalité du terrain, pas un reporting Excel</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Détection */}
      <section id="detection" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <span className="inline-block px-4 py-1.5 rounded-lg text-xs font-semibold tracking-widest mb-6" style={{ background: "rgba(255,77,106,0.15)", color: "#FF4D6A", border: "1px solid rgba(255,77,106,0.2)" }}>🔍 DÉTECTION</span>
          <h2 className="text-4xl lg:text-5xl font-bold mb-12">Détection automatique des anomalies</h2>
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="grid sm:grid-cols-3 gap-6 mb-8">
                {[
                  { title: "Comparaison systématique", desc: "Plan média prévu vs diffusion observée" },
                  { title: "Identification précise", desc: "Manques, retards, sous-diffusion détectés" },
                  { title: "Alertes intelligentes", desc: "Notification immédiate des incohérences" },
                ].map((item, i) => (
                  <div key={i}>
                    <div className="h-1 w-full mb-4 rounded" style={{ background: "rgba(255,255,255,0.15)" }}>
                      <div className="h-full w-1/2 rounded" style={{ background: "#FF4D6A" }} />
                    </div>
                    <h3 className="text-base font-medium mb-1">{item.title}</h3>
                    <p className="text-sm" style={{ color: "#6B7A99" }}>{item.desc}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <div className="h-1 w-full mb-4 rounded" style={{ background: "rgba(255,255,255,0.15)" }}>
                  <div className="h-full w-1/3 rounded" style={{ background: "#FFB800" }} />
                </div>
                <h3 className="text-base font-medium mb-1">Arguments concrets</h3>
                <p className="text-sm" style={{ color: "#6B7A99" }}>Données pour négociation fournisseur</p>
              </div>
              <div className="mt-8" style={{ borderLeft: "3px solid #00FFC8", paddingLeft: "16px" }}>
                <p style={{ color: "#6B7A99" }}>Karbon14 donne du pouvoir aux agences</p>
              </div>
            </div>
            <img src={detectionRoom} alt="Detection" className="rounded-2xl w-full" style={{ border: "1px solid rgba(255,255,255,0.08)" }} />
          </div>
        </div>
      </section>

      {/* Performance */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <span className="inline-block px-4 py-1.5 rounded-lg text-xs font-semibold tracking-widest mb-6" style={{ background: "rgba(255,255,255,0.08)", color: "#6B7A99", border: "1px solid rgba(255,255,255,0.08)" }}>PERFORMANCE</span>
          <h2 className="text-4xl lg:text-5xl font-bold mb-12">Des insights pour optimiser la performance</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { icon: <BarChart3 className="h-6 w-6" />, title: "Sites les plus performants", desc: "Identification des environnements à fort ROI" },
              { icon: <Target className="h-6 w-6" />, title: "Environnements optimaux", desc: "Contextes de diffusion les plus efficaces" },
              { icon: <TrendingUp className="h-6 w-6" />, title: "Ajustement budgétaire", desc: "Réallocation en cours de campagne" },
              { icon: <ArrowRight className="h-6 w-6" />, title: "Recommandations actionnables", desc: "Décisions basées sur la diffusion réelle" },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="mx-auto mb-3 p-3 rounded-xl inline-flex" style={{ background: "rgba(0,255,200,0.1)", color: "#00FFC8" }}>{item.icon}</div>
                <h3 className="text-base font-semibold mb-1">{item.title}</h3>
                <p className="text-sm" style={{ color: "#6B7A99" }}>{item.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ borderLeft: "3px solid #00FFC8", paddingLeft: "16px" }}>
            <p style={{ color: "#6B7A99" }}>Karbon14 ne prouve pas seulement : il améliore la performance</p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <span className="inline-block px-4 py-1.5 rounded-lg text-xs font-semibold tracking-widest mb-6" style={{ background: "rgba(0,255,200,0.15)", color: "#00FFC8", border: "1px solid rgba(0,255,200,0.2)" }}>PRICING</span>
          <h2 className="text-4xl lg:text-5xl font-bold mb-12">Modèle SaaS simple & scalable</h2>
          <div className="grid sm:grid-cols-3 gap-8 mb-16">
            {[
              { price: "40€", role: "Lecteur", desc: "Consultation et reporting" },
              { price: "80€", role: "Utilisateur", desc: "Captures + exports", highlight: true },
              { price: "120€", role: "Admin", desc: "Gestion + dashboards + audit avancé" },
            ].map((item, i) => (
              <div key={i} className="text-center p-8 rounded-2xl" style={{ background: "#0F1535", border: item.highlight ? "1px solid rgba(0,255,200,0.3)" : "1px solid rgba(255,255,255,0.08)" }}>
                <p className="text-4xl font-bold mb-2" style={{ color: "#00FFC8" }}>{item.price}<span className="text-lg font-normal" style={{ color: "#6B7A99" }}>/mois</span></p>
                <p className="text-lg font-semibold mb-2">{item.role}</p>
                <p className="text-sm" style={{ color: "#6B7A99" }}>{item.desc}</p>
              </div>
            ))}
          </div>

          <h3 className="text-3xl font-bold mb-8">Démarrez maintenant</h3>
          <div className="grid sm:grid-cols-3 gap-6 mb-12">
            {[
              { title: "Pilotes agences médias", desc: "Testez en conditions réelles" },
              { title: "Partenariats régies", desc: "Intégration avec vos partenaires" },
              { title: "Déploiement équipe", desc: "Formation et onboarding inclus" },
            ].map((item, i) => (
              <div key={i} className="p-6 rounded-xl" style={{ background: "#0F1535", border: "1px solid rgba(255,255,255,0.08)" }}>
                <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                <p className="text-sm" style={{ color: "#6B7A99" }}>{item.desc}</p>
              </div>
            ))}
          </div>

          <div style={{ borderLeft: "3px solid #00FFC8", paddingLeft: "16px" }}>
            <p className="font-medium">Karbon14 transforme la publicité digitale en un environnement vérifiable, mesurable et auditable</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src={karbon14Logo} alt="KARBON14" className="h-6 w-auto" />
            <span className="font-bold tracking-wider" style={{ color: "#00FFC8" }}>KARBON14</span>
          </div>
          <p className="text-sm" style={{ color: "#6B7A99" }}>© 2025 Karbon14. Tous droits réservés.</p>
          <button onClick={() => navigate("/")} className="px-6 py-2 rounded-xl text-sm font-semibold transition-all" style={{ background: "#00FFC8", color: "#0A0E27" }}>
            Se connecter
          </button>
        </div>
      </footer>
    </div>
  );
};

export default Site;
