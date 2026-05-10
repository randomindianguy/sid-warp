import { useState, useEffect, useRef } from "react";

const C = {
  bg: "#0C0C0C",
  card: "#161413",
  cardHover: "#1E1B19",
  text: "#F0EBE3",
  muted: "#E0DAD4",
  dim: "#9B9189",
  accent: "#D94F2B",
  glow: "rgba(217, 79, 43, 0.12)",
  border: "#2A2520",
  borderL: "#3A3530",
  green: "#4CAF50",
  yellow: "#E8A838",
};

const F = {
  serif: "'Instrument Serif', Georgia, serif",
  sans: "'DM Sans', system-ui, sans-serif",
  mono: "'JetBrains Mono', monospace",
};

function useInView(t = 0.12) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: t });
    o.observe(el);
    return () => o.disconnect();
  }, [t]);
  return [ref, v];
}

function Fade({ children, delay = 0, style = {} }) {
  const [ref, v] = useInView();
  return (
    <div ref={ref} style={{
      opacity: v ? 1 : 0,
      transform: v ? "translateY(0)" : "translateY(24px)",
      transition: `all 0.7s cubic-bezier(0.25,0.1,0.25,1) ${delay}s`,
      ...style,
    }}>{children}</div>
  );
}

function Tag({ children }) {
  return <div style={{ fontFamily: F.mono, fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: C.accent, marginBottom: 16 }}>{children}</div>;
}

function Title({ children }) {
  return <h2 style={{ fontFamily: F.serif, fontSize: "clamp(28px,4.5vw,40px)", fontWeight: 400, color: C.text, lineHeight: 1.15, margin: "0 0 24px 0", fontStyle: "italic" }}>{children}</h2>;
}

function P({ children, style = {} }) {
  return <p style={{ fontFamily: F.sans, fontSize: 16, lineHeight: 1.75, color: C.muted, margin: "0 0 16px 0", ...style }}>{children}</p>;
}

function Callout({ children, color = C.accent }) {
  return (
    <div style={{ marginTop: 32, marginBottom: 8, padding: "20px 24px", borderLeft: `2px solid ${color}`, background: color === C.accent ? C.glow : "rgba(76,175,80,0.08)", borderRadius: "0 8px 8px 0" }}>
      <div style={{ fontFamily: F.sans, fontSize: 15, color: C.text, lineHeight: 1.75 }}>{children}</div>
    </div>
  );
}

function Divider() {
  return <div style={{ width: 40, height: 1, background: C.border, margin: "80px 0" }} />;
}

function FormField({ text }) {
  return <div style={{ background: "#0C0C0C", border: `1px solid ${C.border}`, borderRadius: 5, padding: "8px 12px", fontFamily: F.sans, fontSize: 12, color: C.dim, marginBottom: 6 }}>{text}</div>;
}

export default function WarpThesis() {
  const wrap = { maxWidth: 680, margin: "0 auto", padding: "0 32px" };

  return (
    <div style={{ background: C.bg, color: C.text, minHeight: "100vh", fontFamily: F.sans }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&family=JetBrains+Mono:wght@300;400;500&display=swap');
        * { margin:0; padding:0; box-sizing:border-box; }
        ::selection { background:${C.accent}; color:${C.text}; }
        html { scroll-behavior:smooth; }
        body { background:${C.bg}; }
        @keyframes pulse { 0%,100%{opacity:0.3} 50%{opacity:0.7} }
      `}</style>

      {/* ============ HERO ============ */}
      <div style={{ ...wrap, minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", position: "relative" }}>
        <div style={{ fontFamily: F.mono, fontSize: 11, letterSpacing: "0.1em", color: C.dim, position: "absolute", top: 32, left: 32 }}>
          PRODUCT THESIS / APRIL 2026
        </div>

        <h1 style={{ fontFamily: F.serif, fontSize: "clamp(36px,6vw,56px)", fontWeight: 400, fontStyle: "italic", lineHeight: 1.08, color: C.text, marginBottom: 28 }}>
          Warp's growth team measures who comes in. The CS team measures who stays. Nobody measures which customers actually activated and why.
        </h1>
        <P style={{ fontSize: 17, marginBottom: 48 }}>
          I'd build that layer. Here's the evidence, the plan, and how I'd know if I'm wrong.
        </P>
        <div style={{ fontFamily: F.sans, fontSize: 14, color: C.dim }}>
          by <span style={{ color: C.muted }}>Sidharth Sundaram</span>
          <span style={{ margin: "0 8px", opacity: 0.3 }}>|</span>
          <span>MS Engineering Management, Purdue</span>
        </div>

        <div style={{ position: "absolute", bottom: 40, left: 32, fontFamily: F.mono, fontSize: 10, color: C.dim, letterSpacing: "0.15em", animation: "pulse 2s ease-in-out infinite" }}>
          SCROLL
        </div>
      </div>

      {/* ============ 01 - THE GAP ============ */}
      <div style={{ ...wrap, paddingTop: 40, paddingBottom: 60 }}>
        <Fade>
          <Tag>01 / The Evidence</Tag>
          <Title>Six tools, eight industries, five roles. One qualification form.</Title>
          <P>Warp's website segments aggressively: six free tools, solution pages by size (Startup to Enterprise), by role (CEO to Payroll Admin), and by industry (Technology to Defense & Aerospace). Each attracts a different persona with a different pain.</P>
          <P>But warp.co/qualification is the same form no matter where someone clicks from. Same URL, same fields, same headline ("Get Started"). The signal about why someone arrived gets discarded before onboarding starts.</P>
        </Fade>

        {/* BEFORE / AFTER FORM MOCKUP */}
        <Fade delay={0.2}>
          <div style={{ marginTop: 36 }}>
            <div style={{ fontFamily: F.mono, fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: C.accent, marginBottom: 20 }}>What if the signal carried forward?</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>

              {/* BEFORE */}
              <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "24px 20px", opacity: 0.5 }}>
                <div style={{ fontFamily: F.mono, fontSize: 10, color: C.dim, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>Today / Generic Entry</div>
                <div style={{ fontFamily: F.sans, fontSize: 16, fontWeight: 600, color: C.text, marginBottom: 2 }}>Get Started</div>
                <div style={{ fontFamily: F.sans, fontSize: 12, color: C.dim, marginBottom: 16 }}>Answer a couple quick questions and you're in.</div>
                <FormField text="Work email / Company name" />
                <FormField text="Company size" />
                <div style={{ fontFamily: F.sans, fontSize: 11, color: C.dim, marginTop: 10, marginBottom: 6 }}>What can we help you with?</div>
                {["Payroll", "HR / Onboarding", "Health Benefits", "State Tax Automation", "Global Contractors"].map((item) => (
                  <FormField key={item} text={item} />
                ))}
                <FormField text="Current payroll solution" />
                <FormField text="Looking to switch immediately?" />
                <FormField text="Full name" />
                <div style={{ fontFamily: F.mono, fontSize: 9, color: C.dim, marginTop: 12 }}>warp.co/qualification</div>
              </div>

              {/* AFTER */}
              <div style={{ background: C.card, border: `1px solid ${C.green}`, borderRadius: 10, padding: "24px 20px", position: "relative" }}>
                <div style={{ position: "absolute", top: -10, right: 16, fontFamily: F.mono, fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: C.bg, background: C.green, padding: "3px 10px", borderRadius: 10 }}>Proposed</div>
                <div style={{ fontFamily: F.mono, fontSize: 10, color: C.green, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>From Compliance Calendar</div>
                <div style={{ fontFamily: F.sans, fontSize: 16, fontWeight: 600, color: C.text, marginBottom: 2 }}>Never miss a deadline again</div>
                <div style={{ fontFamily: F.sans, fontSize: 12, color: C.muted, marginBottom: 16 }}>Set up automated compliance in minutes.</div>
                <FormField text="Work email" />
                <FormField text="Company name" />
                <FormField text="Company size" />
                <div style={{ fontFamily: F.sans, fontSize: 11, color: C.dim, marginTop: 12, marginBottom: 6 }}>How many states do you operate in?</div>
                <FormField text="Select range" />
                <div style={{ fontFamily: F.sans, fontSize: 11, color: C.dim, marginBottom: 6 }}>Current payroll provider?</div>
                <FormField text="Select provider" />
                <FormField text="Full name" />
                <div style={{ background: C.glow, border: `1px solid ${C.accent}`, borderRadius: 6, padding: "10px 14px", marginTop: 12 }}>
                  <div style={{ fontFamily: F.sans, fontSize: 12, color: C.accent, fontWeight: 500 }}>Your next deadline: April 30 - Q1 state tax filings</div>
                  <div style={{ fontFamily: F.sans, fontSize: 11, color: C.muted, marginTop: 2 }}>Warp handles this automatically on day one.</div>
                </div>
                <div style={{ fontFamily: F.mono, fontSize: 9, color: C.dim, marginTop: 12 }}>warp.co/qualification?ref=compliance-calendar</div>
              </div>
            </div>
          </div>
        </Fade>

        <Fade delay={0.3}>
          <P style={{ marginTop: 28 }}>
            The compliance calendar is one example. The same pattern applies to every free tool:
          </P>
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "20px", marginTop: 16, overflowX: "auto" }}>
            <div style={{ minWidth: 520 }}>
              <div style={{ display: "grid", gridTemplateColumns: "140px 1fr 1fr", gap: 10, padding: "10px 0", borderBottom: `1px solid ${C.borderL}`, marginBottom: 4 }}>
                {["Tool", "Signal it carries", "Form should ask"].map((h) => (
                  <div key={h} style={{ fontFamily: F.mono, fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: C.dim }}>{h}</div>
                ))}
              </div>
              {[
                { tool: "Compliance Calendar", signal: "Scared of penalties", ask: "How many states? + next deadline" },
                { tool: "Runway Calculator", signal: "Watching cash burn", ask: "Monthly burn rate? + payroll as % of burn" },
                { tool: "Equity Calculator", signal: "About to raise and hire", ask: "Hiring post-round? + new states?" },
                { tool: "Sales Comp Calc", signal: "Building a sales team", ask: "How many reps? + commission structure" },
                { tool: "Offer Letter Gen", signal: "Hiring right now", ask: "Start date? + which state?" },
                { tool: "Contractor Agreement", signal: "Has global workers", ask: "How many contractors? + which countries?" },
              ].map((row, i) => (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "140px 1fr 1fr", gap: 10, padding: "12px 0", borderBottom: i < 5 ? `1px solid ${C.border}` : "none", alignItems: "start" }}>
                  <div style={{ fontFamily: F.sans, fontSize: 13, color: C.text }}>{row.tool}</div>
                  <div style={{ fontFamily: F.sans, fontSize: 12, color: C.muted }}>{row.signal}</div>
                  <div style={{ fontFamily: F.sans, fontSize: 12, color: C.muted }}>{row.ask}</div>
                </div>
              ))}
            </div>
          </div>
          <P style={{ marginTop: 20, fontSize: 14, color: C.dim }}>
            Six tools, six signals, one generic form. The compliance calendar is the case study. The pattern is the thesis.
          </P>
        </Fade>
      </div>

      <div style={wrap}><Divider /></div>

      {/* ============ 02 - WHAT I'D BUILD + VALIDATION ============ */}
      <div style={{ ...wrap, paddingBottom: 60 }}>
        <Fade>
          <Tag>02 / What I'd Build</Tag>
          <Title>Tag. Instrument. Test. And how I'd know if I'm wrong.</Title>
        </Fade>

        <div style={{ marginTop: 16 }}>
          {[
            { num: "01", title: "Tag", desc: "Carry the entry-point signal into the qualification form. When a founder clicks 'Get Started' from the compliance calendar, that context should arrive with them. One UTM parameter. Everything downstream becomes segmentable." },
            { num: "02", title: "Instrument", desc: "Build a scorecard that tracks different activation milestones per segment. Time to first payroll is one metric. Time to first quarter without a compliance notice is another. The activation manager gets segment-specific graduation criteria instead of one number for everyone." },
            { num: "03", title: "Test", desc: "Route compliance-calendar leads into a compliance-first onboarding emphasis. Measure if graduation rate and 90-day retention differ from the generic path. One segment, one experiment over the summer." },
          ].map((item, i) => (
            <Fade key={i} delay={0.1 * i}>
              <div style={{ display: "flex", gap: 20, padding: "24px 0", borderBottom: i < 2 ? `1px solid ${C.border}` : "none" }}>
                <div style={{ fontFamily: F.mono, fontSize: 12, color: C.accent, minWidth: 28, paddingTop: 2 }}>{item.num}</div>
                <div>
                  <div style={{ fontFamily: F.serif, fontSize: 20, fontStyle: "italic", color: C.text, marginBottom: 8 }}>{item.title}</div>
                  <div style={{ fontFamily: F.sans, fontSize: 15, color: C.muted, lineHeight: 1.75 }}>{item.desc}</div>
                </div>
              </div>
            </Fade>
          ))}
        </div>

        <Fade delay={0.4}>
          <div style={{ marginTop: 48, padding: "24px", background: C.card, border: `1px solid ${C.border}`, borderRadius: 10 }}>
            <div style={{ fontFamily: F.mono, fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: C.green, marginBottom: 16 }}>How I'd validate</div>
            <div style={{ fontFamily: F.sans, fontSize: 15, color: C.muted, lineHeight: 1.85 }}>
              <div style={{ marginBottom: 14 }}>
                <span style={{ color: C.text }}>Week 1-2: Sit with the activation manager.</span>{" "}
                Learn where onboarding actually stalls. Understand which customers require the most hand-holding and why. Check whether entry-point data already exists somewhere in the CRM but isn't being used.
              </div>
              <div style={{ marginBottom: 14 }}>
                <span style={{ color: C.text }}>Week 3-4: Interview 10 customers per hypothesized segment.</span>{" "}
                Ask: "When did you feel confident Warp was working for you?" If compliance founders and payroll founders give the same answer, the segmentation hypothesis is wrong. If they give different answers, the scorecard writes itself.
              </div>
              <div>
                <span style={{ color: C.text }}>Kill criteria.</span>{" "}
                If compliance-first and payroll-first customers retain at the same rate after 90 days, the generic activation path is correct and segmentation isn't worth the complexity. That's a useful finding too. It means Warp can scale the current model with confidence instead of guessing.
              </div>
            </div>
          </div>
        </Fade>

        <Fade delay={0.5}>
          <div style={{ marginTop: 24 }}>
            <div style={{ fontFamily: F.mono, fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: C.dim, marginBottom: 12 }}>Hypothesized segments / to be validated with customer data</div>
            <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "20px", overflowX: "auto" }}>
              <div style={{ minWidth: 480 }}>
                <div style={{ display: "grid", gridTemplateColumns: "120px 1fr 1fr", gap: 12, padding: "10px 0", borderBottom: `1px solid ${C.borderL}`, marginBottom: 4 }}>
                  {["Segment", "What Warp measures", "What 'activated' means to them"].map((h) => (
                    <div key={h} style={{ fontFamily: F.mono, fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: C.dim }}>{h}</div>
                  ))}
                </div>
                {[
                  { persona: "Compliance", action: "First payroll runs", aha: "First quarter with zero penalty notices", timing: "~90 days" },
                  { persona: "Payroll Speed", action: "First payroll runs", aha: "Forgot payroll existed this month", timing: "~60 days" },
                  { persona: "Scale", action: "First payroll runs", aha: "Hired in 3 new states, nothing broke", timing: "Variable" },
                  { persona: "Switcher", action: "First payroll runs", aha: "Output matches previous provider exactly", timing: "~30 days" },
                ].map((item, i) => (
                  <div key={i} style={{ display: "grid", gridTemplateColumns: "120px 1fr 1fr", gap: 12, padding: "14px 0", borderBottom: i < 3 ? `1px solid ${C.border}` : "none", alignItems: "start" }}>
                    <div style={{ fontFamily: F.mono, fontSize: 11, color: C.accent }}>{item.persona}</div>
                    <div>
                      <div style={{ fontFamily: F.sans, fontSize: 14, color: C.dim, textDecoration: "line-through", opacity: 0.5 }}>{item.action}</div>
                    </div>
                    <div>
                      <div style={{ fontFamily: F.serif, fontSize: 15, fontStyle: "italic", color: C.text }}>{item.aha}</div>
                      <div style={{ fontFamily: F.mono, fontSize: 10, color: C.dim, marginTop: 3 }}>{item.timing}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Fade>

        <Fade delay={0.55}>
          <Callout color={C.green}>
            First payroll is a valid proxy for activation for segments where payroll speed is the value. But for compliance founders, the proxy should be notice-free periods. For scale founders, it should be frictionless multi-state expansion. One proxy applied uniformly means you're predicting retention accurately for some customers and guessing for others.
          </Callout>
        </Fade>
      </div>

      <div style={wrap}><Divider /></div>

      {/* ============ 03 - SYSTEMS VIEW ============ */}
      <div style={{ ...wrap, paddingBottom: 60 }}>
        <Fade>
          <Tag>03 / Why This Matters at Scale</Tag>
          <Title>The missing feedback loop.</Title>
        </Fade>

        <Fade delay={0.1}>
          <P>Warp has three stocks of customers. Visitors flow in through marketing and free tools. Customers flow in through the qualification form and sales. Activated customers flow in through onboarding.</P>
          <P>The growth team optimizes the first flow. The CS team manages the last stock. But there's no feedback mechanism connecting activated customers back to the growth team. Nobody is asking: which visitors become the best-activated customers? Which entry points predict retention? Which segments fail to activate even though they complete first payroll?</P>
          <P>Without that feedback loop, every team optimizes locally. The growth team drives more visitors without knowing which visitors retain. The activation manager onboards customers without data on which paths produce the best outcomes. The product team builds features without knowing which activation milestones matter most.</P>
        </Fade>

        <Fade delay={0.2}>
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "24px", marginTop: 24 }}>
            <div style={{ fontFamily: F.mono, fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: C.dim, marginBottom: 16 }}>What changes as Warp scales</div>
            {[
              { stage: "At 1,000 customers (now)", desc: "The activation manager can know every customer by name. High-touch onboarding works. The cost is manageable. But the data about what works and what doesn't lives in one person's head, not in a system.", color: C.green },
              { stage: "At 5,000 customers", desc: "High-touch onboarding becomes the limiting factor. Each new customer requires proportionally more human attention. The economics at $35/employee start to compress unless the product carries more of the activation work. The measurement layer built this summer becomes the spec for what engineering automates.", color: C.yellow },
              { stage: "At 10,000+ customers", desc: "Warp is already expanding upmarket (Enterprise, Mid-Market, 8 industry verticals). Each expansion requires different activation paths. The segmented measurement system is the foundation for every new segment they enter.", color: C.accent },
            ].map((item, i) => (
              <div key={i} style={{ padding: "16px 0", borderBottom: i < 2 ? `1px solid ${C.border}` : "none" }}>
                <div style={{ fontFamily: F.mono, fontSize: 11, color: item.color, marginBottom: 6 }}>{item.stage}</div>
                <div style={{ fontFamily: F.sans, fontSize: 14, color: C.muted, lineHeight: 1.75 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </Fade>

        <Fade delay={0.3}>
          <Callout>
            The JD for the activation role is no longer live, and the careers page now lists a Senior Customer Activation Manager, suggesting the role was filled internally. The human work is covered. The measurement layer is a different skillset. A scoped summer project, not a permanent headcount decision.
          </Callout>
        </Fade>
      </div>

      <div style={wrap}><Divider /></div>

      {/* ============ 04 - WHY ME ============ */}
      <div style={{ ...wrap, paddingBottom: 120 }}>
        <Fade>
          <Tag>04 / Why Me</Tag>
          <Title>Two patterns from my work that apply directly here.</Title>
        </Fade>

        <Fade delay={0.1}>
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "24px", marginBottom: 20 }}>
            <div style={{ fontFamily: F.mono, fontSize: 10, color: C.accent, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 14 }}>Pattern 1: Eliminate, don't solve</div>
            <div style={{ fontFamily: F.sans, fontSize: 15, color: C.muted, lineHeight: 1.85 }}>
              At Interview Kickstart, sales reps couldn't explain AI courses on calls. The obvious fix was training. I rejected it because training is a recurring cost: every new hire, every new course, you retrain. Instead, I built expert videos where instructors explained value in their own words. A structural asset that works at 2 AM whether your best rep or newest hire is on the call. 14% conversion lift, roughly $200K in incremental revenue. The same pattern applies here. The obvious fix for activation is "hire more people." The structural fix is a measurement system that makes the right activation path visible to anyone, automatically.
            </div>
          </div>
        </Fade>

        <Fade delay={0.2}>
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "24px", marginBottom: 20 }}>
            <div style={{ fontFamily: F.mono, fontSize: 10, color: C.yellow, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 14 }}>Pattern 2: Find the alignment, not the balance</div>
            <div style={{ fontFamily: F.sans, fontSize: 15, color: C.muted, lineHeight: 1.85 }}>
              Built Interview Kickstart's first B2B corporate training product from zero. The hard part wasn't the product. It was motivation: corporate learners check out when training feels imposed. Most teams try to "balance" what the company wants with what the learner wants. I found a segment where those are the same thing: IT services companies, where the engineer's technical interview IS the company's sales process. Upskilling directly helps both. 4.6/5 satisfaction on mandatory corporate training. Pilot exceeded revenue targets by 14%. This maps directly: Warp's growth team optimizes for pipeline volume. The CS team optimizes for customer retention. The intern finds where those align by identifying which entry points produce both the highest-quality leads AND the best-retaining customers.
            </div>
          </div>
        </Fade>

        <Fade delay={0.3}>
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "24px" }}>
            <div style={{ fontFamily: F.mono, fontSize: 10, color: C.green, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 14 }}>Domain depth</div>
            <div style={{ fontFamily: F.sans, fontSize: 15, color: C.muted, lineHeight: 1.85 }}>
              Built a product thesis for Gusto, one of the companies your customers are actively leaving (<a href="https://gusto-pulse.vercel.app" target="_blank" rel="noopener noreferrer" style={{ color: C.accent, textDecoration: "underline", textUnderlineOffset: 3 }}>see it here</a>). Evaluated and turned down a role at another early-stage payroll startup after building their growth strategy. Chose to pitch Warp because the AI-agent architecture is a different bet entirely. Three companies in the same space. I understand this market from multiple competitive angles.
            </div>
          </div>
        </Fade>

        <Fade delay={0.4}>
          <div style={{ marginTop: 48, textAlign: "center" }}>
            <div style={{ fontFamily: F.serif, fontSize: 24, fontStyle: "italic", color: C.text, marginBottom: 8 }}>Sidharth Sundaram</div>
            <div style={{ fontFamily: F.sans, fontSize: 13, color: C.dim, marginBottom: 16 }}>4 years B2B product in EdTech. Purdue MS. On CPT, no sponsorship. Available this summer. NYC works.</div>
            <div style={{ fontFamily: F.sans, fontSize: 14, color: C.muted, lineHeight: 2.2 }}>
              <a href="https://sidharthsundaram.com" style={{ color: C.muted, textDecoration: "underline", textUnderlineOffset: 3 }}>sidharthsundaram.com</a>
              <span style={{ margin: "0 10px", color: C.dim }}>|</span>
              <a href="mailto:sundar84@purdue.edu" style={{ color: C.muted, textDecoration: "underline", textUnderlineOffset: 3 }}>sundar84@purdue.edu</a>
              <span style={{ margin: "0 10px", color: C.dim }}>|</span>
              <a href="https://linkedin.com/in/sidharthsundaram" style={{ color: C.muted, textDecoration: "underline", textUnderlineOffset: 3 }}>linkedin</a>
            </div>
          </div>
        </Fade>
      </div>
    </div>
  );
}
