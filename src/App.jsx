import { useState, useEffect, useRef } from "react";

const C = {
  bg: "#0C0C0C",
  card: "#161413",
  cardHover: "#1E1B19",
  text: "#F0EBE3",
  muted: "#9B8E82",
  dim: "#6B6058",
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

function PersonaCard({ tag, tagColor, title, jtbd, signal, aha, delay = 0 }) {
  const [open, setOpen] = useState(false);
  return (
    <Fade delay={delay}>
      <div onClick={() => setOpen(!open)} style={{
        background: open ? C.cardHover : C.card,
        border: `1px solid ${open ? C.borderL : C.border}`,
        borderRadius: 8, padding: "24px 20px", cursor: "pointer",
        transition: "all 0.3s ease",
      }}>
        <div style={{ fontFamily: F.mono, fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: tagColor || C.dim, marginBottom: 14 }}>{tag}</div>
        <div style={{ fontFamily: F.serif, fontSize: 20, fontStyle: "italic", color: C.text, marginBottom: 6 }}>{title}</div>
        <div style={{ fontFamily: F.sans, fontSize: 14, color: C.muted, fontStyle: "italic" }}>"{jtbd}"</div>
        {open && (
          <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 16, marginTop: 16 }}>
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontFamily: F.mono, fontSize: 10, color: C.dim, letterSpacing: "0.1em", textTransform: "uppercase" }}>Entry Signal</div>
              <div style={{ fontFamily: F.sans, fontSize: 14, color: C.muted, marginTop: 4 }}>{signal}</div>
            </div>
            <div>
              <div style={{ fontFamily: F.mono, fontSize: 10, color: C.accent, letterSpacing: "0.1em", textTransform: "uppercase" }}>When they know it's working</div>
              <div style={{ fontFamily: F.serif, fontSize: 17, fontStyle: "italic", color: C.text, marginTop: 6 }}>{aha}</div>
            </div>
          </div>
        )}
        {!open && <div style={{ fontFamily: F.mono, fontSize: 10, color: C.dim, marginTop: 12, opacity: 0.5 }}>Click to expand</div>}
      </div>
    </Fade>
  );
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
          Your Compliance Calendar Is a Better Activator Than Your Onboarding
        </h1>
        <P style={{ fontSize: 17, marginBottom: 48 }}>
          Warp has built a payroll product founders love, with support metrics most enterprise companies can't match. The question is how the next 4,000 customers activate.
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

      {/* ============ 01 - ENTRY POINTS ============ */}
      <div style={{ ...wrap, paddingTop: 40, paddingBottom: 60 }}>
        <Fade>
          <Tag>01 / Entry Points</Tag>
          <Title>Six tools, eight industries, five roles. One qualification form.</Title>
          <P>Warp's website now segments aggressively: six free tools, solution pages by size (Startup to Enterprise), by role (CEO to Payroll Admin), and by industry (Technology to Defense & Aerospace). Each attracts a different persona with a different pain. Here are three of the six tools — click each to see the signal it carries.</P>
        </Fade>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16, marginTop: 36 }}>
          <PersonaCard
            tag="Compliance" tagColor={C.accent}
            title="Compliance Calendar"
            jtbd="I cannot miss another filing deadline"
            signal={"Fully ungated. No email capture. Shows $3.5M max penalties for late W-2s, $15K+ risk for a 50-person startup. Breaks down state-by-state complexity across NY, CA, TX, IL, FL + 46 more. Offers Google Calendar sync that puts Warp's brand in the founder's daily workflow."}
            aha={"First quarter where they didn't think about a single deadline."}
            delay={0}
          />
          <PersonaCard
            tag="Fundraising" tagColor={C.yellow}
            title="Runway Calculator"
            jtbd="When does my startup run out of cash?"
            signal="Ungated. No email captured. Payroll shows up as a burn-rate line item. This founder came thinking about money, not compliance."
            aha={"Payroll cost became predictable and invisible."}
            delay={0.1}
          />
          <PersonaCard
            tag="Hiring" tagColor={C.green}
            title="Offer Letter Generator"
            jtbd="I need to send a compliant offer letter today"
            signal="Ungated. The founder is actively hiring. They need payroll now, not eventually."
            aha={"Sent an offer, onboarded the hire, and ran payroll without switching tools."}
            delay={0.2}
          />
        </div>
        <Fade delay={0.3}>
          <P style={{ marginTop: 24, fontSize: 14, color: C.dim }}>
            Plus: Equity Calculator, Sales Comp Calculator, Contractor Agreement Generator, Mosey migration page, 8 industry pages, 5 role pages, and competitor comparison pages for ADP, Gusto, Rippling, Paylocity, and others. Each generates a different signal about why the visitor arrived.
          </P>
        </Fade>
      </div>

      <div style={wrap}><Divider /></div>

      {/* ============ 02 - THE ACCIDENTAL ACTIVATOR ============ */}
      <div style={{ ...wrap, paddingBottom: 60 }}>
        <Fade>
          <Tag>02 / The Accidental Activator</Tag>
          <Title>The compliance calendar is doing activation work. The qualification form is not.</Title>
        </Fade>

        <Fade delay={0.1}>
          <P>Activation requires three conditions: sufficient motivation, sufficient ability, and a well-timed trigger. Look at what the compliance calendar does:</P>
        </Fade>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16, marginTop: 28 }}>
          {[
            { label: "Why they care", color: C.accent, what: "Fear", detail: "Late W-2 = $3.5M. Missed 941 = 5%/mo compounding. One missed deadline = $15K+ for a 50-person startup. (Figures from Warp's own compliance calendar.)" },
            { label: "Why it feels doable", color: C.yellow, what: "Removes the work", detail: "Every filing deadline organized by date, with state-by-state requirements pre-sorted. Tracking 50 states goes from hours to a single scroll." },
            { label: "What brings them back", color: C.green, what: "Calendar Sync", detail: "\"Add to Google Calendar\" puts Warp's deadlines into the founder's daily workflow. A reminder they didn't ask for, showing up right when it matters." },
          ].map((item, i) => (
            <Fade key={i} delay={0.15 * i}>
              <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "20px 18px" }}>
                <div style={{ fontFamily: F.mono, fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: item.color, marginBottom: 10 }}>{item.label}</div>
                <div style={{ fontFamily: F.serif, fontSize: 18, fontStyle: "italic", color: C.text, marginBottom: 8 }}>{item.what}</div>
                <div style={{ fontFamily: F.sans, fontSize: 13, color: C.muted, lineHeight: 1.65 }}>{item.detail}</div>
              </div>
            </Fade>
          ))}
        </div>

        <Fade delay={0.3}>
          <P style={{ marginTop: 32 }}>Now look at the qualification form the compliance calendar feeds into. The headline is feature-language ("Get Started") rather than benefit-language. The fields are generic. Nothing acknowledges why the founder arrived:</P>
        </Fade>

        <Fade delay={0.35}>
          <Callout>
            The founder who just internalized $15K in penalty risk arrives at the same generic form as someone who clicked "Get Started" from the homepage. The URL is identical. No fields are pre-populated. The motivation the calendar built doesn't carry forward.
          </Callout>
        </Fade>

        {/* BEFORE / AFTER FORM MOCKUP */}
        <Fade delay={0.4}>
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

        <Fade delay={0.55}>
          <P style={{ marginTop: 28 }}>
            This isn't specific to the compliance calendar. The same pattern applies to every free tool:
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

      {/* ============ 03 - THE LEVER MISMATCH ============ */}
      <div style={{ ...wrap, paddingBottom: 60 }}>
        <Fade>
          <Tag>03 / The Lever Question</Tag>
          <Title>The right lever depends on the segment.</Title>
        </Fade>

        <Fade delay={0.1}>
          <P>
            Warp publishes live support stats: 1-minute median response time, dedicated Slack channel per customer, 5/5 CSAT. Every customer gets a human who knows their name. This is exceptional — and for Enterprise and Mid-Market customers, it's the right model.
          </P>
          <P>
            But Warp now serves four segments explicitly: Startups, Small Business, Mid-Market, and Enterprise. The majority of 1,000+ existing customers are startups and small businesses at $35/employee/month. For these segments, people as the primary activation lever creates a cost structure that doesn't match the unit economics.
          </P>
        </Fade>

        <Fade delay={0.2}>
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "24px", marginTop: 24 }}>
            <div style={{ fontFamily: F.mono, fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: C.dim, marginBottom: 16 }}>Three Activation Levers</div>
            {[
              { lever: "Product", desc: "Guide users, customize experience, reduce steps to value", fit: "Scales with customers. Zero marginal cost.", tag: "Startups / SMB", tagColor: C.green },
              { lever: "Incentives", desc: "Free migration, first-month discounts, compliance guarantees", fit: "Scales with spend. Predictable marginal cost.", tag: "Mid-Market", tagColor: C.yellow },
              { lever: "People", desc: "Dedicated Slack, 1-min response, white-glove onboarding", fit: "High-touch. Linear cost per customer.", tag: "Enterprise", tagColor: C.accent },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "14px 0", borderBottom: i < 2 ? `1px solid ${C.border}` : "none" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: F.serif, fontSize: 17, fontStyle: "italic", color: C.text, marginBottom: 4 }}>{item.lever}</div>
                  <div style={{ fontFamily: F.sans, fontSize: 13, color: C.muted }}>{item.desc}</div>
                  <div style={{ fontFamily: F.sans, fontSize: 12, color: C.dim, marginTop: 4 }}>{item.fit}</div>
                </div>
                <span style={{ fontFamily: F.mono, fontSize: 10, color: item.tagColor, letterSpacing: "0.08em", whiteSpace: "nowrap", marginLeft: 16, marginTop: 4 }}>{item.tag}</span>
              </div>
            ))}
          </div>
        </Fade>

        <Fade delay={0.3}>
          <P style={{ marginTop: 28 }}>
            Look at what the activation role's JD described before it was filled internally: data migration, tax registration setup, bank verification, stakeholder engagement, post-go-live training. Every step that enables first payroll. Each one is currently delivered by a person. For Enterprise customers, that makes sense. For startups at $35/employee, the question is which of them can be delivered by product instead.
          </P>
          <P>
            The compliance calendar — a free marketing page — accidentally proves it can. Product does motivation, ability, and trigger work at zero marginal cost. The question is whether that principle extends past the marketing site into the actual customer experience for the segments where unit economics demand it.
          </P>
        </Fade>

        <Fade delay={0.35}>
          <Callout>
            People as a lever is the right choice for Enterprise and Mid-Market segments. The original JD for this role (no longer live) described "a playbook that's still being written." But for Startups and Small Business — where many of the existing customers sit — the playbook's insight should transfer from people to product. Otherwise scaling the startup customer base requires proportionally more human attention, and the economics that let Warp undercut Gusto and Rippling on price start to compress.
          </Callout>
        </Fade>
      </div>

      <div style={wrap}><Divider /></div>

      {/* ============ 04 - THE MEASUREMENT GAP ============ */}
      <div style={{ ...wrap, paddingBottom: 60 }}>
        <Fade>
          <Tag>04 / The Measurement Gap</Tag>
          <Title>The metric says "activated." The customer isn't sure yet.</Title>
        </Fade>

        <Fade delay={0.1}>
          <P>The activation role's KPIs (from the JD, no longer live) were defined as time to first payroll and graduation rate. But the JD itself said first payroll is not activation. That tension exists because different customer segments have different definitions of "this product is working for me":</P>
        </Fade>

        <div style={{ marginTop: 24 }}>
          <div style={{ fontFamily: F.mono, fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: C.dim, marginBottom: 12 }}>Hypothesized segments — to be validated with customer data</div>
          {[
            { persona: "Compliance Founder", action: "First payroll runs", aha: "First quarter with zero penalty notices", timing: "~90 days" },
            { persona: "Payroll Founder", action: "First payroll runs", aha: "Forgot payroll existed this month", timing: "~60 days" },
            { persona: "Scale Founder", action: "First payroll runs", aha: "Hired in 3 new states, nothing broke", timing: "Variable" },
            { persona: "Switcher", action: "First payroll runs", aha: "Output matches previous provider exactly", timing: "~30 days" },
          ].map((item, i) => (
            <Fade key={i} delay={0.08 * i}>
              <div style={{ display: "grid", gridTemplateColumns: "120px 1fr 1fr", gap: 12, padding: "16px 0", borderBottom: `1px solid ${C.border}`, alignItems: "start" }}>
                <div style={{ fontFamily: F.mono, fontSize: 11, color: C.accent }}>{item.persona}</div>
                <div>
                  <div style={{ fontFamily: F.mono, fontSize: 10, color: C.dim, marginBottom: 3 }}>WHAT WARP MEASURES</div>
                  <div style={{ fontFamily: F.sans, fontSize: 14, color: C.dim, textDecoration: "line-through", opacity: 0.5 }}>{item.action}</div>
                </div>
                <div>
                  <div style={{ fontFamily: F.mono, fontSize: 10, color: C.green, marginBottom: 3 }}>WHAT "ACTIVATED" MEANS TO THEM</div>
                  <div style={{ fontFamily: F.serif, fontSize: 15, fontStyle: "italic", color: C.text }}>{item.aha}</div>
                  <div style={{ fontFamily: F.mono, fontSize: 10, color: C.dim, marginTop: 3 }}>{item.timing}</div>
                </div>
              </div>
            </Fade>
          ))}
        </div>

        <Fade delay={0.4}>
          <Callout color={C.green}>
            First payroll is a valid proxy for activation — for segments where payroll speed is the value. But for compliance founders, the proxy should be notice-free periods. For scale founders, it should be frictionless multi-state expansion. One proxy applied uniformly across all segments means you are predicting retention accurately for some customers and blindly for others.
          </Callout>
        </Fade>

        {/* CAM SCORECARD MOCKUP */}
        <Fade delay={0.5}>
          <div style={{ marginTop: 48 }}>
            <div style={{ fontFamily: F.mono, fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: C.accent, marginBottom: 8 }}>Proposed / Activation Scorecard</div>
            <div style={{ fontFamily: F.sans, fontSize: 13, color: C.dim, marginBottom: 20 }}>What the activation manager sees when activation is segmented by entry point.</div>
            <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "20px", overflowX: "auto" }}>
              <div style={{ minWidth: 580 }}>
                {/* Header */}
                <div style={{ display: "grid", gridTemplateColumns: "100px 90px 1fr 1fr 60px", gap: 10, padding: "10px 0", borderBottom: `1px solid ${C.borderL}`, marginBottom: 4 }}>
                  {["Customer", "Entry", "Graduation Criteria", "Status", "Day"].map((h) => (
                    <div key={h} style={{ fontFamily: F.mono, fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: C.dim }}>{h}</div>
                  ))}
                </div>
                {[
                  { name: "Acme Labs", entry: "Compliance Cal", entryColor: C.accent, criteria: "90 days, zero penalty notices", status: "Day 47 - 0 notices", statusColor: C.green, day: "47" },
                  { name: "Nova AI", entry: "Runway Calc", entryColor: C.yellow, criteria: "2 payroll cycles < 5 min each", status: "1st cycle done (3 min)", statusColor: C.green, day: "22" },
                  { name: "Helios Co", entry: "vs. Gusto page", entryColor: C.muted, criteria: "2 cycles matching prior provider", status: "Migration done, 1st pending", statusColor: C.yellow, day: "11" },
                  { name: "Bolt Freight", entry: "Direct signup", entryColor: C.dim, criteria: "First payroll + stakeholder check", status: "Awaiting bank verification", statusColor: C.accent, day: "6" },
                ].map((row, i) => (
                  <div key={i} style={{ display: "grid", gridTemplateColumns: "100px 90px 1fr 1fr 60px", gap: 10, padding: "12px 0", borderBottom: i < 3 ? `1px solid ${C.border}` : "none", alignItems: "start" }}>
                    <div style={{ fontFamily: F.sans, fontSize: 13, color: C.text }}>{row.name}</div>
                    <div style={{ fontFamily: F.mono, fontSize: 10, color: row.entryColor }}>{row.entry}</div>
                    <div style={{ fontFamily: F.sans, fontSize: 12, color: C.muted }}>{row.criteria}</div>
                    <div style={{ fontFamily: F.sans, fontSize: 12, color: row.statusColor }}>{row.status}</div>
                    <div style={{ fontFamily: F.mono, fontSize: 12, color: C.muted }}>{row.day}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Fade>

        <Fade delay={0.55}>
          <P style={{ marginTop: 24 }}>
            The form captures the signal. The scorecard makes it actionable. Instead of one graduation criteria for all customers, the activation manager sees different targets for different segments — and the product team gets a feedback loop showing which milestones are hardest to reach.
          </P>
        </Fade>
      </div>

      <div style={wrap}><Divider /></div>

      {/* ============ 05 - THE PROPOSAL ============ */}
      <div style={{ ...wrap, paddingBottom: 120 }}>
        <Fade>
          <Tag>05 / The Proposal</Tag>
          <Title>The activation role appears filled. The measurement layer underneath it isn't.</Title>
        </Fade>

        <Fade delay={0.1}>
          <P>
            The JD for the activation role is no longer live, and the careers page now lists a Senior Customer Activation Manager — suggesting the role was filled internally. The human work is covered. But the measurement layer — tracking where customers came from, defining what "activated" means for each segment, and testing whether different onboarding paths work better — is a different skillset. The underlying question is whether Warp's growth model transitions from people-powered (linear cost per customer) to product-powered (zero marginal cost) before the unit economics at $35/employee force it.
          </P>
          <P>
            The activation manager does the onboarding work. The intern builds the data layer underneath — so the product team knows what to automate next.
          </P>
        </Fade>

        <div style={{ marginTop: 32 }}>
          {[
            { num: "01", title: "Tag", desc: "Carry the entry-point signal from free tools and comparison pages into the qualification form. When a founder clicks 'Get Started' from the compliance calendar, that context should arrive with them. One UTM parameter. Everything downstream becomes segmentable." },
            { num: "02", title: "Instrument", desc: "Give the activation manager a way to record which milestone each customer reaches first, and how long it takes. Time to first payroll is one metric. Time to first quarter without a compliance notice is another. Build the segmented scorecard the original JD implied but didn't specify." },
            { num: "03", title: "Test", desc: "Route compliance-calendar leads into a compliance-first onboarding emphasis. Measure if graduation rate and 90-day retention differ from the generic path. One segment, one experiment over the summer." },
          ].map((item, i) => (
            <Fade key={i} delay={0.12 * i}>
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
          <div style={{ marginTop: 56, padding: "28px", background: C.card, border: `1px solid ${C.border}`, borderRadius: 10 }}>
            <div style={{ fontFamily: F.sans, fontSize: 15, color: C.muted, lineHeight: 1.85 }}>
              <div style={{ marginBottom: 14 }}>
                <span style={{ color: C.text }}>4 years of B2B product.</span>{" "}
                Launched a 0-to-1 corporate training vertical at Interview Kickstart. Ran activation experiments that moved conversion at scale. Purdue MS Engineering Management.
              </div>
              <div style={{ marginBottom: 14 }}>
                <span style={{ color: C.text }}>Deep in this market.</span>{" "}
                Built a product thesis for Gusto — one of the companies your customers are actively leaving (<a href="https://gusto-pulse.vercel.app" target="_blank" rel="noopener noreferrer" style={{ color: C.accent, textDecoration: "underline", textUnderlineOffset: 3 }}>see it here</a>). Evaluated and turned down a role at another early-stage payroll startup after building their growth strategy. Chose to pitch Warp because the AI-agent architecture is a different bet entirely.
              </div>
              <div>
                <span style={{ color: C.text }}>On CPT through Purdue.</span>{" "}
                Standard employer cooperation letter, no sponsorship. Available this summer. NYC works.
              </div>
            </div>
          </div>
        </Fade>

        <Fade delay={0.5}>
          <div style={{ marginTop: 48, textAlign: "center" }}>
            <div style={{ fontFamily: F.serif, fontSize: 24, fontStyle: "italic", color: C.text, marginBottom: 16 }}>Sidharth Sundaram</div>
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
