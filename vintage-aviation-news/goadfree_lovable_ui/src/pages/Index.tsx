import { Button } from "@/components/ui/button";

import heroBg from "@/assets/hero-bg.jpg";
import comparisonImg from "@/assets/comparison.jpg";
import aircraftImg from "@/assets/final-aircraft.jpg";
import { useEffect, useState } from "react";

const goToPayment = () => {
  window.location.hash = "#/payment";
};

/* ─── Sticky Bottom CTA (Mobile) ─── */
const StickyBottomCTA = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 inset-x-0 z-50 bg-background/95 backdrop-blur border-t border-border transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3">
        <div className="text-sm font-serif font-semibold text-foreground">
          <span className="line-through opacity-60 font-normal">$25</span>{" "}
          <span>$20</span><span className="text-muted-foreground font-sans font-normal">/year</span>
        </div>
        <Button variant="cta" size="sm" onClick={goToPayment}>
          Read Without Ads
        </Button>
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
    <header
      className={`fixed top-0 inset-x-0 z-50 bg-background/90 backdrop-blur border-b border-border transition-transform duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="max-w-5xl mx-auto flex items-center justify-between px-6 py-3">
        <span className="font-serif font-semibold text-foreground">Vintage Aviation News</span>
        <Button variant="cta" size="sm" onClick={goToPayment}>
          Read Without Ads
        </Button>
      </div>
    </header>
  );
};

/* ─── Hero ─── */
const Hero = () => (
  <section className="relative min-h-[90vh] flex items-center overflow-hidden">
    <img
      src={heroBg}
      alt=""
      className="absolute inset-0 w-full h-full object-cover"
      width={1920}
      height={1080}
    />
    <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/40" />
    <div className="relative max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center py-24">
      <div className="space-y-6">
        <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-serif font-semibold leading-tight text-foreground">
          The stories deserve your full&nbsp;attention.
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-md">
          No ads. No popups. Just aviation, uninterrupted.
        </p>
        <div className="space-y-2">
          <Button variant="cta" size="lg" onClick={goToPayment}>
            Read Without Ads
          </Button>
          <p className="text-sm text-muted-foreground">
            <span className="line-through opacity-60">$25/year</span>{" "}
            <span className="font-semibold text-foreground">$20/year — today only.</span>{" "}
            Cancel anytime.
          </p>
        </div>
      </div>
      <div className="hidden md:block" />
    </div>
  </section>
);

/* ─── Emotional Connection ─── */
const WhyWeExist = () => (
  <section className="py-16 md:py-24">
    <div className="max-w-2xl mx-auto px-6 text-center space-y-6">
      <h2 className="text-2xl md:text-3xl font-serif font-semibold text-foreground">
        Built for the readers who never left
      </h2>
      <p className="text-base md:text-lg text-muted-foreground leading-relaxed font-serif italic">
        You don't come here to scroll. You come for the vintage stories — the warbirds, the restorations, the legacy behind every aircraft. These aren't quick reads. They take time and attention. Ads break that rhythm. Ad-free lets you stay with the story, start to finish.
      </p>
    </div>
  </section>
);


const MidScrollTrigger = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      setVisible(scrollPercent > 0.3 && scrollPercent < 0.6);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 bg-card border border-border rounded-xl shadow-2xl p-8 max-w-md w-[90vw] text-center space-y-4 animate-in fade-in zoom-in-95 duration-300">
      <p className="text-lg font-serif font-semibold text-foreground">
        Enjoying this? Read the rest without interruptions.
      </p>
      <Button variant="cta" size="lg" onClick={() => { goToPayment(); }}>
        Remove Ads Instantly — $20/year (was $25)
      </Button>
      <p className="text-xs text-muted-foreground">Cancel anytime. Takes seconds.</p>
    </div>
  );
};

/* ─── Before / After Comparison ─── */
const Comparison = () => (
  <section className="py-16 md:py-24 bg-secondary/40">
    <div className="max-w-6xl mx-auto px-2 md:px-6 space-y-4 md:space-y-6">
      <div className="text-center space-y-3 px-4">
        <h2 className="text-3xl md:text-4xl font-serif font-semibold text-foreground">
          The difference is immediate
        </h2>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
          Same article. Same content. One lets you actually read it.
        </p>
      </div>
      <img
        src={comparisonImg}
        alt="Side-by-side: ad-filled article vs clean ad-free version"
        className="rounded-lg shadow-xl w-full mx-auto"
        loading="lazy"
        width={1024}
        height={640}
        style={{ objectFit: 'cover' }}
      />
      <div className="grid grid-cols-2 gap-4 md:gap-8 px-4 pt-2">
        <div className="space-y-3">
          <p className="font-serif font-semibold text-destructive text-sm md:text-base">With Ads</p>
          <ul className="space-y-2 text-xs md:text-sm text-muted-foreground">
            {["Broken reading flow", "Slower pages", "Constant distractions"].map((t) => (
              <li key={t} className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-destructive shrink-0" />
                {t}
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-3">
          <p className="font-serif font-semibold text-accent text-sm md:text-base">Ad-Free</p>
          <ul className="space-y-2 text-xs md:text-sm text-muted-foreground">
            {["Uninterrupted reading", "Faster load times", "Full focus on the story"].map((t) => (
              <li key={t} className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                {t}
              </li>
            ))}
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
      <h2 className="text-2xl md:text-3xl font-serif font-semibold text-foreground">
        One plan. No surprises.
      </h2>
      <div className="bg-card rounded-lg shadow-lg p-10 space-y-6 border border-border">
        <p className="text-sm font-medium text-accent uppercase tracking-wide">Today only</p>
        <p className="text-lg font-serif font-medium text-foreground">Ad-Free Access</p>
        <div>
          <span className="text-2xl font-serif text-muted-foreground line-through opacity-60">$25</span>
          <span className="text-5xl font-serif font-bold text-foreground ml-2">$20</span>
          <span className="text-muted-foreground ml-1">/ year</span>
        </div>
        <p className="text-sm text-muted-foreground">Cancel anytime.</p>
        <ul className="text-sm text-muted-foreground space-y-2 text-left max-w-xs mx-auto">
          {[
            "Every article, no interruptions",
            "No banners, popups, or video ads",
            "Faster, lighter pages",
          ].map((item) => (
            <li key={item} className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-accent shrink-0" />
              {item}
            </li>
          ))}
        </ul>
        <Button variant="cta" size="lg" className="w-full" onClick={goToPayment}>
          Read Without Ads
        </Button>
        <p className="text-xs text-muted-foreground">Cancel anytime. Takes seconds.</p>
      </div>
    </div>
  </section>
);

/* ─── End-of-Page CTA ─── */
const EndCTA = () => (
  <section className="relative py-28">
    <div
      className="absolute inset-0 bg-cover bg-center opacity-10"
      style={{ backgroundImage: `url(${aircraftImg})` }}
    />
    <div className="relative max-w-2xl mx-auto px-6 text-center space-y-6">
      <p className="text-xl font-serif text-foreground leading-relaxed">
        You've read this far — now read every article without interruptions.
      </p>
      <Button variant="cta" size="lg" onClick={goToPayment}>
        Read Without Ads — $0.05/day
      </Button>
      <p className="text-sm text-muted-foreground">Cancel anytime. Takes seconds.</p>
    </div>
  </section>
);

/* ─── Page ─── */
const Index = () => (
  <>
    <StickyHeader />
    <StickyBottomCTA />
    <Hero />
    <Comparison />
    <Pricing />
    <WhyWeExist />
    <EndCTA />
  </>
);

export default Index;
