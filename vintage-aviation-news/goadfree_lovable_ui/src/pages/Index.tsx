import heroBg from "@/assets/hero-bg.jpg";
import comparisonImg from "@/assets/comparison.jpg";
import aircraftImg from "@/assets/final-aircraft.jpg";
import { useEffect, useState } from "react";

const CTA_COLOR = "#bb361b";
const CTA_HOVER = "#9e2e17";
const LOGO_URL = "/LH2_Assets_UI/vintage-aviation-news/assets/van-logo.png";
const BASE = "/LH2_Assets_UI/vintage-aviation-news/";

// Event-based trigger for the login modal
const openLoginModal = () => { window.dispatchEvent(new CustomEvent("van-open-login")); };

const goToPayment = () => {
  const loggedIn = localStorage.getItem("van_user");
  if (loggedIn) {
    window.location.hash = "#/payment";
  } else {
    openLoginModal();
  }
};

/* ─── Login Modal ─── */
const LoginModal = () => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("van-open-login", handler);
    return () => window.removeEventListener("van-open-login", handler);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  if (!open) return null;

  const completeLogin = (name: string) => {
    localStorage.setItem("van_user", JSON.stringify({ name, ts: Date.now() }));
    setOpen(false);
    setTimeout(() => { window.location.hash = "#/payment"; }, 200);
  };

  const onGoogle = () => completeLogin("Google User");
  const onMagicLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSent(true);
    setTimeout(() => completeLogin(email.split("@")[0]), 1200);
  };

  return (
    <div onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }} style={{position:"fixed",inset:0,zIndex:99999,background:"rgba(0,0,0,0.55)",display:"flex",alignItems:"center",justifyContent:"center",padding:16,fontFamily:"Inter,sans-serif"}}>
      <div style={{background:"#fff",borderRadius:12,maxWidth:440,width:"100%",padding:"36px 36px 32px",position:"relative",boxShadow:"0 28px 70px rgba(0,0,0,0.3)"}}>
        <button onClick={() => setOpen(false)} aria-label="Close" style={{position:"absolute",top:14,right:16,background:"#f0f0f0",border:"none",width:32,height:32,borderRadius:6,cursor:"pointer",fontSize:18,color:"#333",display:"flex",alignItems:"center",justifyContent:"center"}}>&times;</button>

        <h2 style={{fontFamily:"'Merriweather',Georgia,serif",fontSize:22,fontWeight:700,color:"#1a1a1a",textAlign:"center",margin:"0 0 24px"}}>Sign In to Go Ad-Free</h2>

        <button onClick={onGoogle} style={{display:"flex",alignItems:"center",justifyContent:"center",gap:10,width:"100%",padding:"12px 20px",background:"#fff",border:"1px solid #ddd",borderRadius:8,fontSize:14,fontWeight:600,color:"#444",cursor:"pointer",fontFamily:"inherit",marginBottom:20}}>
          <svg width="18" height="18" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/><path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"/><path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0124 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/><path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 01-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/></svg>
          Continue with Google
        </button>

        <div style={{display:"flex",alignItems:"center",gap:14,margin:"20px 0"}}>
          <div style={{flex:1,height:1,background:"#eee"}}/>
          <span style={{fontSize:12,color:"#bbb",fontWeight:600,letterSpacing:0.5}}>OR</span>
          <div style={{flex:1,height:1,background:"#eee"}}/>
        </div>

        <h3 style={{fontFamily:"'Merriweather',Georgia,serif",fontSize:15,fontWeight:700,color:"#1a1a1a",textAlign:"center",margin:"0 0 14px"}}>Sign in with Magic Link</h3>

        {sent ? (
          <div style={{textAlign:"center",padding:"16px 0"}}>
            <div style={{width:44,height:44,borderRadius:"50%",background:"#ecfdf5",color:"#059669",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 12px",fontSize:20}}>✓</div>
            <p style={{fontSize:14,color:"#666",margin:0}}>Link sent! Signing you in...</p>
          </div>
        ) : (
          <form onSubmit={onMagicLink}>
            <label style={{display:"block",fontSize:12,fontWeight:700,color:"#555",marginBottom:6,textTransform:"uppercase",letterSpacing:0.4}}>Email Address</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required style={{width:"100%",padding:"12px 14px",border:"1.5px solid #e0e0e0",borderRadius:8,fontSize:14,outline:"none",fontFamily:"inherit",marginBottom:14,boxSizing:"border-box"}}/>
            <button type="submit" style={{width:"100%",padding:"13px",background:CTA_COLOR,color:"#fff",border:"none",borderRadius:8,fontSize:15,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>Send Magic Link</button>
            <p style={{fontSize:12,color:"#999",textAlign:"center",margin:"12px 0 0",lineHeight:1.5}}>We'll send a secure login link to your email. No password needed.</p>
          </form>
        )}
      </div>
    </div>
  );
};

/* ─── VAN Site Header ─── */
const VANHeader = () => (
  <>
    <div style={{background:"#fff",borderBottom:"1px solid #e0e0e0"}}>
      <div style={{maxWidth:1280,margin:"0 auto",padding:"12px 20px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div style={{display:"flex",gap:14,alignItems:"center"}}>
          {["facebook-f","twitter","youtube","instagram"].map(i=>(
            <a key={i} href="#" style={{color:"#777",fontSize:15,textDecoration:"none"}}><i className={`fab fa-${i}`}/></a>
          ))}
        </div>
        <a href={BASE+"index.html"} style={{textDecoration:"none"}}>
          <img src={LOGO_URL} alt="Vintage Aviation News" style={{height:80}} />
        </a>
        <div style={{display:"flex",alignItems:"center",border:"1px solid #ddd",borderRadius:20,padding:"7px 16px",gap:8}}>
          <input type="text" placeholder="Search Headlines, News..." style={{border:"none",outline:"none",fontSize:13,width:180,fontFamily:"Inter,sans-serif",background:"transparent"}} />
          <i className="fas fa-arrow-circle-right" style={{color:"#aaa",fontSize:15,cursor:"pointer"}}/>
        </div>
      </div>
    </div>
    <nav style={{background:"#fff",borderBottom:"2px solid #eee",position:"sticky",top:0,zIndex:100}}>
      <div style={{maxWidth:1280,margin:"0 auto",padding:"0 20px",display:"flex",alignItems:"center",justifyContent:"center",flexWrap:"wrap"}}>
        {[
          {label:"Home",href:BASE+"index.html"},
          {label:"Restorations",href:BASE+"pages/restorations.html"},
          {label:"Warbirds News",href:BASE+"pages/warbirds-news.html"},
          {label:"Vintage",href:BASE+"pages/vintage.html"},
          {label:"Articles",href:BASE+"pages/articles.html"},
          {label:"Aviation Museum News",href:BASE+"pages/museum-news.html"},
          {label:"Sponsors",href:"#"},
        ].map(item=>(
          <a key={item.label} href={item.href} style={{padding:"14px 16px",fontSize:14,fontWeight:600,color:"#333",textDecoration:"none",fontFamily:"Inter,sans-serif",whiteSpace:"nowrap"}}>{item.label}</a>
        ))}
        <a href={BASE+"go-ad-free/"} style={{padding:"8px 18px",fontSize:13,fontWeight:700,color:"#fff",background:CTA_COLOR,borderRadius:4,textDecoration:"none",marginLeft:4,fontFamily:"Inter,sans-serif"}}>Go Ad-Free</a>
      </div>
    </nav>
  </>
);

/* ─── VAN Site Footer ─── */
const VANFooter = () => (
  <footer style={{background:"#1a1a1a",color:"#ccc",padding:"48px 0 32px",fontFamily:"Inter,sans-serif"}}>
    <div style={{maxWidth:1280,margin:"0 auto",padding:"0 20px"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:28,paddingBottom:24,borderBottom:"1px solid #333",flexWrap:"wrap",gap:16}}>
        <a href={BASE+"index.html"} style={{textDecoration:"none"}}>
          <img src={LOGO_URL} alt="Vintage Aviation News" style={{height:60,opacity:0.9}} />
        </a>
        <div style={{display:"flex",gap:12}}>
          {["facebook-f","twitter","youtube","instagram"].map(icon=>(
            <a key={icon} href="#" style={{width:36,height:36,borderRadius:"50%",border:"1px solid #555",display:"flex",alignItems:"center",justifyContent:"center",color:"#aaa",fontSize:14,textDecoration:"none"}}><i className={`fab fa-${icon}`}/></a>
          ))}
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr",gap:40}}>
        <p style={{fontSize:13,lineHeight:1.7,color:"#888",fontStyle:"italic"}}>Vintage Aviation News is a company founded by a group of passionate aviation enthusiasts who love the history and technology Aviation and Flying Museums preserve for the public. It is our intention to play a role in safeguarding the heritage of these beautiful machines by providing increased awareness and education through the use of internet based digital media.</p>
        <div style={{display:"flex",flexDirection:"column" as const,gap:10}}>
          {[["Home",BASE+"index.html"],["Restorations",BASE+"pages/restorations.html"],["Vintage Aviation",BASE+"pages/vintage.html"],["Aviation Museum News",BASE+"pages/museum-news.html"],["Articles",BASE+"pages/articles.html"],["Today in Aviation History","#"]].map(([l,h])=>(
            <a key={l} href={h} style={{color:"#999",fontSize:13,textDecoration:"none"}}>{l}</a>
          ))}
        </div>
        <div style={{display:"flex",flexDirection:"column" as const,gap:10}}>
          {["Privacy Policy","Terms of Service","Newsletter","About Us","Contact Us","Login","Ethics-Policy"].map(l=>(
            <a key={l} href="#" style={{color:"#999",fontSize:13,textDecoration:"none"}}>{l}</a>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

/* ─── Sticky Bottom CTA ─── */
const StickyBottomCTA = () => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className={`fixed bottom-0 inset-x-0 z-50 bg-background/95 backdrop-blur border-t border-border transition-transform duration-300 ${visible ? "translate-y-0" : "translate-y-full"}`}>
      <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3">
        <div className="text-sm font-serif font-semibold text-foreground">
          <span className="line-through opacity-60 font-normal">$3</span>{" "}
          <span>$2</span><span className="text-muted-foreground font-sans font-normal">/month</span>
        </div>
        <button onClick={goToPayment} style={{padding:"8px 20px",background:CTA_COLOR,color:"#fff",border:"none",borderRadius:6,fontSize:13,fontWeight:700,cursor:"pointer"}}>Read Without Ads</button>
      </div>
    </div>
  );
};

/* ─── Sticky Header ─── */
const StickyHeader = () => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className={`fixed top-0 inset-x-0 z-[200] bg-background/90 backdrop-blur border-b border-border transition-transform duration-300 ${visible ? "translate-y-0" : "-translate-y-full"}`}>
      <div className="max-w-5xl mx-auto flex items-center justify-between px-6 py-3">
        <span className="font-serif font-semibold text-foreground">Vintage Aviation News</span>
        <button onClick={goToPayment} style={{padding:"8px 20px",background:CTA_COLOR,color:"#fff",border:"none",borderRadius:6,fontSize:13,fontWeight:700,cursor:"pointer"}}>Read Without Ads</button>
      </div>
    </header>
  );
};

/* ─── Hero ─── */
const Hero = () => (
  <section className="relative min-h-[90vh] flex items-center overflow-hidden">
    <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover" />
    <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/40" />
    <div className="relative max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center py-24">
      <div className="space-y-6">
        <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-serif font-semibold leading-tight text-foreground">The stories deserve your full&nbsp;attention.</h1>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-md">No ads. No popups. Just aviation, uninterrupted.</p>
        <div className="space-y-2">
          <button onClick={goToPayment} style={{padding:"16px 40px",background:CTA_COLOR,color:"#fff",border:"none",borderRadius:10,fontSize:16,fontWeight:700,cursor:"pointer",boxShadow:"0 4px 16px rgba(187,54,27,0.3)"}}>Read Without Ads</button>
          <p className="text-sm text-muted-foreground">
            <span className="line-through opacity-60">$3/month</span>{" "}
            <span className="font-semibold text-foreground">$2/month — today only.</span> Cancel anytime.
          </p>
        </div>
      </div>
    </div>
  </section>
);

/* ─── Why We Exist ─── */
const WhyWeExist = () => (
  <section className="py-16 md:py-24">
    <div className="max-w-2xl mx-auto px-6 text-center space-y-6">
      <h2 className="text-2xl md:text-3xl font-serif font-semibold text-foreground">Built for the readers who never left</h2>
      <p className="text-base md:text-lg text-muted-foreground leading-relaxed font-serif italic">
        You don't come here to scroll. You come for the vintage stories — the warbirds, the restorations, the legacy behind every aircraft. Ads break that rhythm. Ad-free lets you stay with the story, start to finish.
      </p>
    </div>
  </section>
);

/* ─── Comparison ─── */
const Comparison = () => (
  <section className="py-16 md:py-24 bg-secondary/40">
    <div className="max-w-6xl mx-auto px-2 md:px-6 space-y-4 md:space-y-6">
      <div className="text-center space-y-3 px-4">
        <h2 className="text-3xl md:text-4xl font-serif font-semibold text-foreground">The difference is immediate</h2>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">Same article. Same content. One lets you actually read it.</p>
      </div>
      <img src={comparisonImg} alt="With ads vs ad-free" className="rounded-lg shadow-xl w-full mx-auto" loading="lazy" style={{objectFit:"cover"}} />
      <div className="grid grid-cols-2 gap-4 md:gap-8 px-4 pt-2">
        <div className="space-y-3">
          <p className="font-serif font-semibold text-destructive text-sm md:text-base">With Ads</p>
          <ul className="space-y-2 text-xs md:text-sm text-muted-foreground">
            {["Broken reading flow","Slower pages","Constant distractions"].map(t=>(<li key={t} className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-destructive shrink-0"/>{t}</li>))}
          </ul>
        </div>
        <div className="space-y-3">
          <p className="font-serif font-semibold text-accent text-sm md:text-base">Ad-Free</p>
          <ul className="space-y-2 text-xs md:text-sm text-muted-foreground">
            {["Uninterrupted reading","Faster load times","Full focus on the story"].map(t=>(<li key={t} className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent shrink-0"/>{t}</li>))}
          </ul>
        </div>
      </div>
    </div>
  </section>
);

/* ─── Pricing ─── */
const Pricing = () => (
  <section id="pricing" className="py-24">
    <div className="max-w-lg mx-auto px-6 text-center space-y-8">
      <h2 className="text-2xl md:text-3xl font-serif font-semibold text-foreground">One plan. No surprises.</h2>
      <div className="bg-card rounded-lg shadow-lg p-10 space-y-6 border border-border">
        <p className="text-sm font-medium uppercase tracking-wide" style={{color:CTA_COLOR}}>Today only</p>
        <p className="text-lg font-serif font-medium text-foreground">Ad-Free Access</p>
        <div>
          <span className="text-2xl font-serif text-muted-foreground line-through opacity-60">$3</span>
          <span className="text-5xl font-serif font-bold text-foreground ml-2">$2</span>
          <span className="text-muted-foreground ml-1">/ month</span>
        </div>
        <p className="text-sm text-muted-foreground">Just $2/month. Cancel anytime.</p>
        <ul className="text-sm text-muted-foreground space-y-2 text-left max-w-xs mx-auto">
          {["Every article, no interruptions","No banners, popups, or video ads","Faster, lighter pages"].map(item=>(<li key={item} className="flex items-center gap-2"><span className="h-1 w-1 rounded-full bg-accent shrink-0"/>{item}</li>))}
        </ul>
        <button onClick={goToPayment} style={{width:"100%",padding:"16px",background:CTA_COLOR,color:"#fff",border:"none",borderRadius:10,fontSize:16,fontWeight:700,cursor:"pointer"}}>Read Without Ads</button>
        <p className="text-xs text-muted-foreground">Cancel anytime. Takes seconds.</p>
      </div>
    </div>
  </section>
);

/* ─── End CTA ─── */
const EndCTA = () => (
  <section className="relative py-28">
    <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{backgroundImage:`url(${aircraftImg})`}} />
    <div className="relative max-w-2xl mx-auto px-6 text-center space-y-6">
      <p className="text-xl font-serif text-foreground leading-relaxed">You've read this far — now read every article without interruptions.</p>
      <button onClick={goToPayment} style={{padding:"16px 40px",background:CTA_COLOR,color:"#fff",border:"none",borderRadius:10,fontSize:16,fontWeight:700,cursor:"pointer",boxShadow:"0 4px 16px rgba(187,54,27,0.3)"}}>Read Without Ads — $2/month</button>
      <p className="text-sm text-muted-foreground">Cancel anytime. Takes seconds.</p>
    </div>
  </section>
);

/* ─── Page ─── */
const Index = () => (
  <>
    <VANHeader />
    <StickyHeader />
    <StickyBottomCTA />
    <Hero />
    <Comparison />
    <Pricing />
    <WhyWeExist />
    <EndCTA />
    <VANFooter />
    <LoginModal />
  </>
);

export default Index;
