# Crow Loop Studio — Website Design Doc

**Purpose of this document:** a complete creative + structural brief for building crowloopstudio.com. Written to be handed directly to an implementation agent (Claude Code). Where real brand assets don't exist yet, this doc defines provisional specs that can be swapped for final assets without restructuring the site.

**Studio:** Crow Loop Studio — solo-founded (Guido Göbbels), positioned as a boutique studio. 10+ years experience, 150+ games shipped, work with brands like LEGO Ninjago, Dragons, Ghostbusters/Playmobil, Idefix, Cini Mini.
**Audience:** B2B — brand agencies and companies that need HTML5 game expertise for kids'/young-adult branded content.
**Primary conversion goal:** get qualified visitors to the contact/inquiry form fast — portfolio and credibility content exist to earn that click, not to be a destination in themselves.
**Mascot:** Russel the crow — an active on-page guide (speech bubbles, tips, contextual nudges), not just a logo decoration.
**Device support:** the site must be fully responsive and functional across desktop, tablet, and mobile — not a desktop-first site with mobile as an afterthought. Non-negotiable baseline, not a stretch goal.

---

## 1. Brand foundation

**Positioning statement:** Crow Loop Studio turns brand IP into playable HTML5 experiences — built by a team with a decade of shipping games for the biggest names in kids' entertainment, without agency overhead or crunch.

**Voice & tone:** Confident, plain-spoken, a little playful — like a senior game designer explaining a project to a client over coffee, not a marketing deck. Short sentences. No game-industry jargon dumped on visitors who don't need it. Russel gets to be more playful than the body copy; he's the wink, the copy is the handshake.

**Why "Crow Loop"?** Crows are among the few non-primate species known to use — and even craft — tools to solve problems. That's a more honest and more useful parallel than "crows like shiny things": it maps directly to what the studio actually does, solving specific design problems for clients (see the case studies in Section 8 — reconciling a competitive brief with a cooperative IP, building brand personality into a mechanic, designing around an audience constraint). "Loop" works on three levels at once, all genuinely relevant rather than a single pun:
- The **game loop / core loop** — the fundamental repeating unit every game is built from.
- The **feedback loop** — the iterative, collaborative process at the center of how a project actually runs (Section 4.5).
- The **magic circle** (Johan Huizinga, *Homo Ludens*) — the idea that play creates its own bounded space with its own rules, separate from ordinary life. A conceptual nod for anyone in the industry who catches it, without needing to be explained to everyone else.

This gives Russel's visual language and voice a real source to draw from — tool use, problem-solving, cleverness — rather than a generic cartoon bird.

---

## 2. Design token system *(color palette, logo, type, and mascot all confirmed)*

> **Status:** Color palette, logo, type, and Russel mascot artwork are all confirmed. Layout concept below remains the only stylistic guidance left to validate once real content/pages are built — structure all CSS/theme variables so anything still open can be adjusted in one place without touching layout code.

**Logo — confirmed, final files delivered:** a stylized crow head in profile inside a circular badge, navy line art, with a nice detail worth carrying into the brand story — the eye's highlight is shaped like a crescent moon, reinforcing the "night sky" concept already present in the color palette below. The badge is ringed in the confirmed Highlight 01/Highlight 02 colors (orange/green), on a cream interior. Wordmark: "Crow Loop" (stacked two lines) in the rounded, friendly display typeface, navy.

**Six final files delivered, covering all standard use cases:**
- `CLS_Logo_Main.png` — full-color icon + wordmark (primary lockup — use in header/hero on light backgrounds)
- `CLS_Logo_Main_image.png` — full-color icon only (square/social-avatar use, favicon source)
- `CLS_Logo_black.png` / `CLS_Logo_black_image.png` — monochrome black, with/without wordmark, for light backgrounds
- `CLS_Logo_white.png` / `CLS_Logo_white_image.png` — monochrome white, with/without wordmark, for dark backgrounds (e.g. the navy hero/CTA sections in the layout concept below)

**Confirmed:** dropping "Studio" from the visual mark is intentional. The logo's wordmark reads "Crow Loop" only; the full company name "Crow Loop Studio" is used everywhere else (site copy, page titles, Impressum, footer, legal pages). Treat this the way most brands handle a shortened mark — e.g. a header lockup showing the "Crow Loop" badge next to or above a page title/tagline that carries the full name where useful (like the browser tab title, or an "est. 2026" style footer line), rather than trying to force "Studio" into the logo itself.

**Still not delivered:** a wordmark-only file (text without the circular badge) — useful for narrow contexts like a footer credit line where the full badge doesn't fit well. Not blocking, but worth requesting if one of the six delivered files doesn't cover that case.

**Color — confirmed brand palette:**
- **Backgrounds:** `--bg-slate: #4B5578` (primary/main) · `--bg-navy: #1C2340` · `--bg-navy-deep: #171924`
- **Text:** `--text-cream: #F6F5F0` (primary/main) · `--text-khaki: #CEC9AF` · `--text-dark: #282514`
- **Highlight 01 (primary accent — orange):** `--accent-orange: #F2803A` (primary/main) · `--accent-peach: #FFD7BE` · `--accent-brown: #693719`
- **Highlight 02 (secondary accent — green):** `--accent-green: #7AC487` (main) · `--accent-mint: #CBE5CF` · `--accent-forest: #13401B`
- **Russel accent (mascot-only, outside the core palette):** `--russel-lime: #ADF403` — a saturated neon lime used specifically for Russel's scarf/goggles accessory. Confirmed as an intentional, deliberate exception rather than a palette inconsistency: Russel's rendering is treated as a distinct illustrated layer with its own accent, separate from the flat brand palette used everywhere else. Do not use `--russel-lime` outside of Russel artwork/speech-bubble UI tied directly to him — it's his color, not a site-wide accent.

**Confirmed usage roles:**
- **Orange is the primary action/CTA color** — buttons, key links, primary emphasis, Russel's accent color. This is the color a visitor's eye should land on for "click here."
- **Green is secondary** — used for supporting accents, positive/success states, secondary badges, and moments that shouldn't compete with a primary CTA on the same view.
- The three background tones (slate, navy, deep navy) give a tonal range for dark sections rather than one flat dark theme: slate blue as the standard mid-dark background, navy/deep-navy reserved for the highest-impact full-bleed moments (hero, closing CTA banner) per the layout concept below.
- The three text tones aren't just light/dark opposites — cream for text on dark backgrounds, dark brown-black for body text on light backgrounds, khaki as a muted/secondary tone (captions, metadata, disabled states) rather than a straight midpoint.
- Ensure all text/background pairings meet WCAG AA contrast — check khaki-on-slate and similar mid-tone combinations specifically, since they're the most likely to fall short.

**Type — confirmed:**
- **Headlines (H1, H2): McLaren.** A distinctive, characterful display face — use for page titles and major section headings only, per the layout concept below (large, tight tracking, restrained — not on every heading level).
- **Everything else — body text, subheadings below H2, UI labels, buttons, form fields, stats, captions: Roboto Flex.** A variable font, which is a real practical advantage here — it can cover the full range from body copy to small utility labels (e.g. "150+ GAMES SHIPPED") by adjusting weight/width axes rather than loading multiple separate font files, which keeps page weight down given the bilingual EN/DE content doubling (Section 6).

**Layout concept:** Confident, editorial, not maximalist. Generous whitespace on cream/light sections; the navy/deep-navy background used for 1–2 high-impact full-bleed sections (hero, CTA banner) rather than a uniform dark theme, with slate blue as the standard mid-dark tone elsewhere. Portfolio uses an asymmetric grid (not a rigid 3-column tile wall) so featured projects can run larger than others.

**Signature element:** Russel appears as a small, consistently-placed illustrated character with a speech-bubble callout that follows scroll position — not animated confetti or gimmicks, one disciplined recurring device. See Section 5 for full spec.

---

## 3. Sitemap

1. **Home** — hero, proof strip, service overview, portfolio teaser, mascot-guided CTA
2. **Portfolio** — full project grid/case studies
3. **About** — founder background, credibility, studio story
4. **Services** — what's offered, engagement types
5. **Process** — how a project runs, step by step
6. **Testimonials** — client quotes (placeholder-ready, may launch empty — see Section 7)
7. **Contact** — inquiry form

Navigation: Home / Portfolio / Services / Process / About / Contact, plus a **language switcher (EN/DE) in the top navigation** — confirmed placement, not footer-only. Testimonials linked from Home and About rather than main nav until populated, to avoid an empty-looking nav item. **Footer-only pages** (legally required, not in main nav — see Section 9): Impressum, Datenschutzerklärung, Haftungsausschluss, AGB.

---

## 4. Page-by-page specs

### 4.1 Home
- **Hero — confirmed interaction sequence:**
  1. Russel drops in from the top of the viewport with a bounce-ease landing (overshoot then settle — not a hard stop).
  2. Once the bounce settles, his speech bubble opens with a scale-up + bounce easing, ~0.5s, containing a greeting line (e.g. "Hi, I'm Russel — welcome to Crow Loop Studio." — final copy TBD, but should introduce both him and the studio in one breath).
  3. **Click interaction:** clicking Russel swaps the bubble text to "Hey, that tickles!" and triggers a small shake on his image (quick, playful, not jarring).
  4. **Accessibility:** for `prefers-reduced-motion` (per the Section 6 accessibility floor), replace the drop/bounce/shake with simple opacity fades — same content and sequence, no motion.
  - Headline (separate from Russel's speech bubble) states what Crow Loop Studio does and for whom in one sentence. Primary CTA: "Start a project" → Contact.
- **"Brands worked with" trust strip — confirmed, with actual logos.** Placed after the hero, before or alongside the proof strip. Pulls in recognizable IP the featured Portfolio projects were built for: LEGO Ninjago, Dragons (DreamWorks), Ghostbusters (Playmobil), Idefix (Asterix/Toggo) — matching the confirmed Portfolio set (Section 7 checklist) rather than pulling in unrelated brands from the founder's prior employment history (Section 4.3's Flying Sheep Studios chapter), to keep Home's claims tightly matched to what Portfolio can actually back up.
  - **Legal flag (checklist item, Section 7):** these are third-party trademarked logos for licensed IP the founder worked on as a contractor/employee, not brands Crow Loop Studio has a direct commercial relationship with. Confirm actual permission/rights to display each official logo before using real logo files; if permission can't be confirmed for any of them, fall back to styled text-only brand name chips for that entry rather than an unauthorized logo.
- **Proof strip:** stat row using Roboto Flex at a bolder/wider variable-font setting for a "utility label" feel (see Section 2) — years experience, games shipped, brands worked with. Pulls credibility forward immediately for a B2B visitor who's evaluating fast.
- **Services overview:** 3–4 service cards (see Section 4.4), each short, linking to full Services page.
- **Portfolio teaser:** 3–4 featured projects, "See full portfolio" CTA.
- **Russel CTA moment:** a speech-bubble from Russel near the bottom — a direct, low-pressure nudge into Contact (e.g. "Got a brand that needs a game? Let's talk." rather than generic "Contact us").

### 4.2 Portfolio
- Filterable/taggable grid (by audience, game type, or brand, depending on how many projects exist) — suggested tag axes: brand/IP, audience age range, game genre. Adjustable once real content is in place; not a hard requirement to nail exactly in v1.
- **Explicit distinction required:** projects fall into two categories and must be visually/labeled distinct:
  - **Crow Loop Studio projects** — work produced under the studio.
  - **Reference work** — prior work by the founder (from guido.graphics), clearly labeled as reference/portfolio-of-record rather than Crow Loop output (e.g. a small badge: "Reference project — prior work by our founder"). Reference tiles link externally out to the original guido.graphics post (Section 7 checklist has the confirmed URLs) rather than getting a dedicated on-site page.
  - As real Crow Loop projects ship, reference projects should be phased out. Build the grid/data structure so swapping is a content change, not a rebuild (see Section 8).
- Each project: thumbnail/playable embed if available, brand name, one-line description, tags (audience, platform, role).
- **Case studies — confirmed treatment:** Ghostbusters, Cini Mini, and Idefix (Section 8) appear as regular tiles within the same grid as everything else, not visually pinned/separated — but tagged distinctly (e.g. a "Case Study" badge). Each case-study tile shows a **3-line teaser** plus a **"Read the case study" button**, which leads to a **dedicated on-site case study page** (unlike reference tiles, which link externally). Suggested URL pattern: `/portfolio/[project-slug]` (e.g. `/portfolio/ghostbusters-haunted-mansion`) — confirm/adjust in Section 6 once routing is set up.
  - Dedicated case study page content: project header (name, brand/client), the challenge → design decision → outcome narrative already drafted in Section 8, supporting images, and a link back to Portfolio.
- **"In production" note:** short line near the top of the page, above the grid — new Crow Loop Studio projects (delivered after the studio's 01.09.2026 launch) are underway; see Section 8 for tone guidance.

### 4.3 About
- Founder-led narrative, framed as studio positioning rather than a personal résumé (i.e., "Crow Loop was founded by..." not "Here's my CV").
- Credibility markers, confirmed from business plan: 10+ years in games/interactive; 150+ projects delivered across mobile, web, and platform; 120+ games for 15+ brands; led international teams up to 18 people. Nearly nine years at **Flying Sheep Studios** (2014–2024, scaled from first hire to Design Director) — a Cologne HTML5 games studio that delivered 220+ games for LEGO, Barbie, and DreamWorks, acquired by iCandy Interactive in 2022. Frame this as prior employment/team experience, distinct from the freelance "reference project" portfolio tiles (Section 4.2/8) — it's a different kind of credibility (large-studio, team-based delivery) worth its own short mention rather than folding into the portfolio grid.
- Notable relationship: multi-year working relationship with **Super RTL/Toggo**, spanning the founder's time at Flying Sheep Studios and continuing into Crow Loop Studio's launch pipeline — a concrete, ongoing credibility anchor worth stating plainly (without over-claiming specifics not yet public).
- A short "why HTML5 games for brands" point of view.
- Optional, once available: a brief, low-key mention that the founder's work has been recommended in writing by former colleagues/managers — no need to quote directly unless/until you confirm what's shareable publicly.
- Optional: a short "How Russel came to be" aside — humanizes the brand without derailing the credibility focus.
- Brief echo of the "in production" note from Portfolio (Section 8) — studio officially launched 01.09.2026, new projects underway.
- **Professional references/endorsements** (distinct from client Testimonials, Section 4.6 — these speak to the founder's employment track record, not to Crow Loop Studio client experience):
  - Thomas Rössig, former Managing Director, Flying Sheep Studios: *"I cannot overstate how critical Mr. Göbbels was to the success of Flying Sheep over the 9 years of his tenure."* / *"Our 10-year relationship with our biggest client SUPER RTL would not have been possible without his skill at fostering long-lasting relationships."*
  - Robert Heil, Head of Operations, Wegesrand GmbH & Co. KG (translated from German): *"Exceptional creativity, strong expertise, and outstanding strategic understanding"* — grasped complex requirements and turned them into precise, convincingly presented concepts.
  - **Open to-do:** get explicit sign-off from both Thomas Rössig and Robert Heil that they're comfortable being quoted by name on the public Crow Loop Studio website — the original letters were written for job/funding applications, not for public marketing use. **Plan:** build the page with these quotes as planned; show Thomas and Robert the finished site and confirm at that point, before the site goes live publicly, rather than blocking build on it now.
  - Attribution on-site: name, role, and former company only — no personal contact details from the original letters.
- CTA at the end into Contact or Portfolio.

### 4.4 Services
Structure confirmed from the business plan — five offerings, matching your actual capacity/pricing model rather than a generic list:
1. **Full-service game production** — concept to finished product, fixed-price small/medium HTML5 games. Primary offering; leads with "you know the cost upfront."
2. **Game design, game art & UI/UX** — standalone deliverables for teams that already have dev capacity but need design or IP-handling expertise.
3. **Game concept feedback & development** — reviewing and giving expert feedback on a client's existing game concept, or developing a concept from scratch for internal buy-in or a funding application. Lower-commitment entry point than full production.
4. **Updating & rebranding** — refreshing or reskinning an existing game (e.g. new visuals, an IP swap, extending its usable life). Not a platform-porting/migration service — that's explicitly out of scope, not a core offering.
5. **Embedded team support** — project-based game designer / art director / UI-UX designer / producer capacity to cover gaps, spikes, or sickness within a client's or agency's own team.
Each with: what it is, who it's for, what "done" looks like, and a CTA into Contact.

**Capacity-model messaging (brief, on this page; full version on Process):** small projects handled solo, medium projects supplemented with a trusted freelance network, larger productions joined as an embedded specialist within a bigger team. Directly pre-empts the "can a one-person studio handle our scale?" objection.

### 4.5 Process
Confirmed, real sequence — genuinely step-by-step, so numbered stages are justified here (unlike a decorative 01/02/03):

1. **Inquiry** — client reaches out with their project idea.
2. **Discovery call** — goals, wishes, materials, and budget discussed directly.
3. **Design brief & quote** — a written brief scoping what's in and out, with a quote structured as **MVP + optional extras** so the client can scale the project to their budget.
4. **Deposit (50%)** — due on accepting the offer; production begins.
5. **Concept phase** — first visual drafts of UI/gameplay, client feedback round.
6. **Gameplay construction** — playable but non-final build, feedback round on mechanics.
7. **Final polish** — feedback on a finished but not-yet-tested build (bugs may still occur here).
8. **QA & delivery** — testing on the devices/platforms agreed with the client; final product delivered.
9. **Final invoice (remaining 50%)** — due on delivery.

**Typical timeline:** 3 weeks for a micro project up to 9 weeks for a medium one — state this range plainly so visitors can self-qualify before reaching out.

**QA, stated openly:** standard QA covers phone, tablet, and desktop across Chrome, Firefox, Edge, and Safari — via BrowserStack — which covers the large majority of real-world bugs. QA is not positioned as the core specialty; if a project needs broader device/OS coverage or a dedicated QA pass, that's arranged (via an external QA partner, organized by Crow Loop) and scoped into the budget upfront at the brief stage (Step 3). Present this as scope clarity, not a limitation — it signals the studio knows its boundaries and already has a solution ready rather than overpromising.

**AI-assisted workflow, stated openly:** modern AI-assisted tools (used selectively across concepting, art, and development) are part of how a single-person studio delivers studio-level production without studio-level overhead or timelines. Frame it as a deliberate production choice with 20+ years of non-AI craft behind it, not a shortcut — the founder can and has delivered fully without AI tools; using them selectively is what makes solo-studio economics work while keeping fixed pricing realistic. Being upfront about this pre-empts the two real concerns a brand client might have (content quality, and "is a human actually designing this") rather than leaving them to wonder.

**Tools:**
- Production: Godot, Figma, Affinity, Blender, Claude Code, ComfyUI.
- Communication: adapts to the client's own stack (MS Teams, Slack, email, etc.) rather than imposing a fixed tool — worth stating as a small but real "easy to work with" signal.

**Post-delivery:** engagement normally ends at delivery. Game-breaking bugs found within 3 months post-launch are covered under the original contract at no extra cost, excluding issues caused by platform updates or external circumstances (e.g. poor connectivity) outside the studio's control. Hosting and ongoing live-ops/post-launch support are not standard but can be scoped and added — this should be raised at the discovery call (Step 2), not left implicit.

### 4.6 Testimonials
- Card-based quote layout, client name/company/logo.
- **Launch state:** may be empty or near-empty at first. Don't build an apologetic empty state — instead, treat it as a placeholder for early social proof (e.g. lead with founder-attributed brand credibility from About/Portfolio, with testimonials added as they come in). Flag this to revisit once first Crow Loop clients are secured.

### 4.7 Contact
**Form fields:**
- Name
- Company
- Email (used for the reply — state this explicitly next to the field)
- Project type — dropdown mapped to Services (Section 4.4), **always include a wildcard option** ("Not sure / other")
- Budget range — dropdown, **wildcard option included** ("Not sure yet / prefer to discuss")
- Timeline/deadline — open or short dropdown (e.g. "ASAP", "1–3 months", "3+ months", "Flexible")
- Message — open text field for the request itself

**Backend behavior:**
- Submission routes to the founder's inbox.
- An automated confirmation email is sent to the address the visitor provided, confirming receipt.
- Stated response-time promise on the page: **1–3 business days.**
- *(Business email address to be set up before launch — see checklist, Section 7.)*

**Primary vs. secondary contact path:**
- **v1 launch: form only.** No scheduling tool for the initial launch — decided to keep the Contact page simple to start. The form (above) is the sole contact path.
- **Future option, not for v1:** a scheduling link (Calendly or Cal.com) could be added later as an alternative for visitors who'd rather book the discovery call (Process Step 2) directly instead of waiting on a form reply — worth revisiting once there's a sense of actual inquiry volume, not before.

**Confirmation state:** a dedicated confirmation screen/message after submission (not just an inline success banner) — this is one of Russel's placements per Section 5. Russel's message should cover, in his usual short/direct voice:
1. Confirms the response-time promise (1–3 business days).
2. Confirms an automated email was just sent to the address they entered.
3. A troubleshooting note: if no confirmation email arrives within ~10 minutes, check the entered address for typos and check spam — since the real reply will land on that same address.

**Fallback contact:** direct email link as a backup for form-averse visitors, once the business email is live.

---

## 5. Russel — mascot usage spec

**Role:** active guide, present at decision points, not decorative filler on every section.

**Artwork — confirmed, delivered:** four poses, all against a circular badge frame consistent with the logo's badge shape:
- `russel_normal.png` — **neutral**, default/base appearance
- `russel_pointing.png` — **pointing/guiding**, wing extended toward content — primary tool for directing attention to a CTA or section
- `russel_excited.png` — **excited**, wings spread, celebratory — for positive/confirmation moments
- `russel_computer.png` — **at a computer, headset + thumbs up** — a bonus pose beyond the original three, well-suited to Contact/communication moments and to the AI-assisted-workflow disclosure in Process (Section 4.5), where a "here's the tech side" tone fits naturally

**Character details confirmed as canon:** aviator goggles (worn up, on the forehead) and a neon lime scarf (`--russel-lime`, Section 2) are established parts of Russel's design — not one-off artist flourishes. Rendering style is intentionally painterly/illustrated, distinct from the flat vector logo (Section 2) — treat Russel as a separate illustrated character layer within the brand system rather than something that needs to visually match the logo's flat style.

**Placement rules (deliberately restrained — pick moments, not every scroll):**
- Home hero (introduces the studio) — neutral or pointing
- Home, pre-footer CTA (nudges toward Contact) — pointing
- Portfolio, distinguishing "reference" vs. "Crow Loop" work (a helpful callout, not just a badge) — neutral
- About, optional personality aside — neutral or excited
- Contact, closing reassurance (Section 4.7) — excited, or the computer pose (fits the "automated email was just sent" context particularly well)

**Voice when speaking as Russel:** short, playful, first-person-plural or crow-flavored without being twee ("Right tool, right moment — shall we build something clever together?" is fine occasionally; don't overdo bird puns). Speech bubbles should always carry real information or a real nudge — never pure decoration per the "words as design material" principle.

**Interaction:** speech bubbles can be static-positioned per section (simplest, most reliable) or subtly scroll/hover-triggered (more polished, higher build cost). Recommend static-per-section for v1, with hover micro-interaction (Russel tilts head, blinks) as a stretch goal — respect `prefers-reduced-motion`.

---

## 6. Technical stack

- **Build tool:** Vite
- **Hosting:** AWS Amplify
- **Framework: React + TypeScript on Vite — confirmed.** Pairs naturally with Amplify hosting, gives component structure for repeatable pieces (project cards, Russel speech-bubble component, service cards).
- **Language: bilingual EN/DE with a toggle.** Recommend `react-i18next` (or equivalent) with content split into per-locale JSON/content files rather than hardcoded strings, so every component (including `RusselGuide` speech bubbles) pulls from a translation key. Suggest `/en/` and `/de/` path-based routing (better for SEO than a client-only toggle) with the **language switcher placed in the top navigation** (confirmed — Section 3), visible/reachable on every page rather than tucked into the footer. **Fallback/default language: English** — confirmed. Visitors with no clear language signal (e.g. browser locale doesn't match `en`/`de`, or landing on the bare root path) get English by default, matching the international B2B agency audience; German loads for `/de/` or when a visitor's browser locale is clearly German. All copy in this doc is drafted in English as the source language; German translation is a separate content task (see Section 7).
- Component-ize early: `RusselGuide`, `ProjectCard` (with `variant: "crowloop" | "reference"`), `ServiceCard`, `StatStrip`.
- Structure portfolio data as a typed content file/JSON (not hardcoded markup) so swapping reference → Crow Loop projects is a data edit.
- **Responsive design, explicit requirement:** fully functional and visually intentional (not just "not broken") across three targets — **desktop** (primary content-rich layouts), **tablet** (touch-friendly, adjusted grid density for Portfolio/Services), and **mobile** (single-column, thumb-reachable CTAs, Russel's speech bubbles repositioned rather than shrunk to illegibility). Matches the actual QA device coverage already committed to in Process (Section 4.5: phone, tablet, desktop across Chrome/Firefox/Edge/Safari) — the responsive build should be designed against those same targets from the start, not fixed after the fact. Test at common breakpoints (e.g. ~375px, ~768px, ~1024px, ~1440px) rather than only at a single "mobile" width.
- Accessibility/quality floor: visible keyboard focus states, `prefers-reduced-motion` respected throughout — non-negotiable baseline per Section 5.
- Theme tokens (Section 2) implemented as CSS variables / a single theme file for easy swap when final brand colors arrive.

---

## 7. Asset & content checklist (needed before/during build)

- [x] Final logo files — delivered and confirmed (Section 2): full-color, black monochrome, and white monochrome, each with and without wordmark (6 files total)
- [x] Confirmed: "Studio" is intentionally dropped from the visual mark; "Crow Loop Studio" remains the full company name used in text/legal contexts (Section 2)
- [ ] Wordmark-only file (no badge) — request if needed for tight footer/letterhead use (Section 2)
- [x] Final Russel mascot illustrations — delivered (Section 5): neutral, pointing, excited, plus a bonus "at computer" pose
- [x] Final color palette — confirmed, see Section 2
- [x] Reference project list confirmed. Beyond the three case studies (Ghostbusters, Cini Mini, Idefix — Section 8), the following are standard reference tiles on Portfolio:
  - **Knights of Fortune** — https://guido.graphics/2024/06/15/knights-of-fortune-prototype/ (original IP, publisher pitch — not client/brand work)
  - **Life 3.0 (later Star Life)** — https://guido.graphics/2025/03/25/life-3-0-later-star-life-demo/ (client: iCandy Interactive)
  - **Sunrise Roots** — https://guido.graphics/2025/01/28/sunrise-roots/ (original/team IP, not client/brand work — same framing as Knights of Fortune)
  - **Ninjago – Turnier der Tapferen** — https://guido.graphics/2024/06/09/ninjago-turnier-der-tapferen/ (client: Toggo/LEGO)
  - **Dragons – Das große Drachenrennen** — https://guido.graphics/2024/05/31/dragons-das-grose-drachenrennen/ (client: Toggo/DreamWorks)
- [x] Service descriptions confirmed — the 5 in Section 4.4 (with items 3 & 4 revised)
- [x] Process steps confirmed — the 9-stage sequence and timeline in Section 4.5
- [ ] Contact form destination (email/CRM) for Amplify backend wiring
- [ ] Sign-off from Thomas Rössig and Robert Heil to publicly quote their reference letters (Section 4.3) — **plan confirmed:** show them the finished site and ask at that point, rather than blocking build on it now
- [ ] German translations of all site copy (bilingual EN/DE requirement, Section 6)
- [ ] Business email address set up and confirmed (Section 4.7 — form routing and auto-confirmation depend on this)
- [x] Scheduling tool: **decided against for v1** — form-only Contact page at launch (Section 4.7); revisit later if useful
- [ ] Impressum content (business address, contact details, register/tax info as applicable — Section 9) — placeholder/blindtext for now, per above
- [ ] Datenschutzerklärung, Haftungsausschluss, AGB, Impressum content — **decided:** use placeholder/blindtext for these pages initially to test layout and visuals; real legal text to be organized separately (by you) before public launch. Build all four pages/sections into the site now with placeholder content so the layout, footer links, and cookie-consent flow can be fully tested — swap in real text later without restructuring.
- [ ] "game — Verband der deutschen Games-Branche" membership — **status: planning to join before launch.** Build the footer badge/link into the layout now (Section 9) but treat it as inactive/placeholder until membership is confirmed; do not publish live before that's actually true.
- [ ] Cookie consent banner implementation (opt-in, not pre-checked, per TTDSG — Section 9)
- [ ] Confirm/obtain permission to display real trademarked brand logos (LEGO Ninjago, Dragons/DreamWorks, Ghostbusters/Playmobil, Idefix/Asterix) in the Home "brands worked with" strip (Section 4.1) — fall back to text-only brand chips per entry if permission can't be confirmed
- [ ] Set up routing structure for dedicated case study pages (`/portfolio/[project-slug]`, Section 4.2) as part of the React/Vite build (Section 6)
- [x] "game — Verband der deutschen Games-Branche" membership status confirmed as: planning to join before launch (see above) — do not activate the live badge until membership is actually confirmed

---

## 8. Case studies — confirmed

Portfolio (Section 4.2) is the scan-in-two-seconds proof of output. Case studies do a different job: they prove the founder understands *someone else's* problem — client constraints, IP guidelines, audience limits — which is what actually gets a studio shortlisted by an agency or brand evaluating on someone else's behalf. Three flagship case studies confirmed, each built around a distinct design problem so they don't read as three versions of the same story:

### 1. Ghostbusters – Haunted Mansion (Playmobil)
- **Reference:** https://guido.graphics/2024/11/19/ghostbusters-haunted-mansion-playmobil/
- **Design problem:** the client wanted a competitive action game (resonates better with the target audience, boys ~10), but the IP itself is built on teamwork — Ghostbusters hunt as a team.
- **Solution:** cooperative ghost-hunting with a competitive layer on top — players hunt together but compete over who catches the most ghosts. Resolves the brief and the IP truth simultaneously, instead of picking one over the other.
- **Outcome:** Top 10 most-played games of the week on Toggo. Performed well enough that the client commissioned a second version reusing the same core mechanic, reskinned with Alvin and the Chipmunks — the mechanic itself proved to have value beyond the original IP.

### 2. Cini Mini – Pyramide
- **Reference:** https://guido.graphics/2024/05/21/cini-mini-pyramide/
- **Design problem:** how to use more than the brand's art and name — actually build the IP's personality into the gameplay itself. Cini Mini characters are established (in TV/print advertising) as rascals who lick/bite each other.
- **Solution:** a stacking game where players build a pyramid of Cini Mini characters while managing the characters' own established mischief (licking each other, causing the stack to collapse) as the core obstacle. The brand's personality trait *is* the mechanic, not a skin on top of a generic game.
- **Outcome:** ran as a microsite tied to an ad flight (offline after ~1 month, so no ranking data available) — this case study rests on the design decision itself rather than a metric, which is fine and worth presenting honestly.

### 3. Idefix – Vorsicht Römer
- **Reference:** https://guido.graphics/2025/02/18/idefix-vorsicht-romer/
- **Design problem:** built for a Toggo spin-off show launch, for a younger audience — needed to showcase every character from the show while keeping gameplay non-violent (Idefix and friends evade Roman patrols using cleverness, not combat).
- **Solution:** each character's distinct ability becomes a way to outsmart patrols, giving every cast member a functional reason to exist in the game rather than a cosmetic appearance.
- **Outcome:** Top 10 most-played games of the week on Toggo, with the longest streak of the three projects.

**Framing note for the writeups:** these are kids'-audience placements, so there's no funnel/retargeting data — "most-played" is Toggo's own platform ranking, not a marketing metric. State that plainly rather than omitting it; it signals real understanding of kids'-media constraints (no tracking, no ads-based analytics) that a generalist studio might not think to mention.

**Knights of Fortune** (https://guido.graphics/2024/06/15/knights-of-fortune-prototype/) and **Sunrise Roots** (https://guido.graphics/2025/01/28/sunrise-roots/) stay in the Portfolio grid as strong reference tiles — both are original/team IP, not client/brand work, so neither fits the case-study narrative shape (client constraint → design decision → outcome), but both are excellent evidence of range and process depth. **Life 3.0/Star Life** (iCandy Interactive) and **Ninjago – Turnier der Tapferen** / **Dragons – Das große Drachenrennen** (Toggo/LEGO and Toggo/DreamWorks) round out the confirmed reference tile set as genuine client-brand work, just not selected for the full case-study treatment — full list and links in the Section 7 checklist.

- **Studio launch date:** Crow Loop Studio officially starts **01.09.2026**. Any project delivered under the studio from that date forward is a genuine "Crow Loop Studio" portfolio entry (not a reference tile). Build the portfolio data structure (Section 6) with a `date` field so this cutover is enforceable in content, not just convention.
- **"In production" note:** add a short, honest note flagging that new Crow Loop Studio projects are underway. Placement: a small line on **Portfolio** (near the top, before the reference-tagged grid) and echoed briefly on **About**. Tone: forward-looking, not apologetic — e.g. "New Crow Loop Studio projects are currently in production — check back soon" rather than explaining the reference/Crow Loop split defensively. Russel can optionally deliver this line (fits his "active guide" role from Section 5).

---

## 9. Legal & compliance (Germany)

The studio is based in Germany, so the site is subject to German/EU requirements regardless of the bilingual EN/DE audience. Based on the standard IHK ("Chamber of Commerce") checklist for legally compliant business websites, the following are required in the **footer**, present on every page, in both languages:

- **Impressum** — legally required provider identification (name, business address, contact details, and, once available, register/tax details as applicable to a solo proprietorship). Required under German law (TMG/DDG) for any commercial website — non-negotiable, not a "nice to have."
- **Datenschutzerklärung (privacy policy / GDPR-DSGVO statement)** — must cover, per Art. 13/14 DSGVO: what data is collected (e.g. the Contact form fields, Section 4.7), how it's used, and disclosure of any third-party services that process data — analytics, and any embedded video (e.g. YouTube, if used for portfolio pieces per the reference projects' original pages). *(No scheduling-tool embed for v1 — see Section 4.7 — so that item drops off the disclosure list unless a scheduling tool is added later.)*
- **Haftungsausschluss (disclaimer)** — standard liability disclaimer, relevant here mainly for external links (e.g. links out to guido.graphics reference projects, Toggo, client sites).
- **AGB (general terms & conditions)** — governs the actual service engagement described in Process (Section 4.5) and Contact (Section 4.7); distinct from the informational legal pages above. Should be referenced at the point a client accepts a quote (Process Step 4), not just buried in the footer.
- **Cookie consent banner** — shown on first visit, opt-in (not pre-checked) for any non-essential cookie/tracking use, per TTDSG §25. Since the site plans to embed third-party tools (scheduling widget, potentially analytics), default to a real opt-in banner rather than a cosmetic notice — a banner with tracking cookies pre-enabled doesn't satisfy the legal requirement.

**Industry association membership:** add a small **game — Verband der deutschen Games-Branche** badge/logo with a link in the footer, alongside the legal links. *(Checklist item: confirm actual membership status before this goes live — the business plan references "game" as a market-data source but doesn't yet confirm membership; the footer claim needs to be true before it's published.)*

These four legal pages are footer-only, excluded from main nav and from the "polished storytelling" tone used elsewhere on the site — plain, compliant, functional copy is the correct choice here, not Russel's voice.

**Content status, decided:** build all four legal pages into the site now with placeholder/blindtext content, so layout, footer links, and the cookie-consent flow can be fully tested end-to-end. Real legal text is being organized separately and will be swapped in before public launch — **the site must not go live publicly with placeholder legal text**, even though it's fine for development/testing.

---

## 10. Status & next steps

**Confirmed/resolved:** Services (4.4), Process (4.5), case study strategy (Section 8), portfolio reference/Crow Loop split and launch-date cutover, Contact page (4.7), bilingual EN/DE requirement, tech stack (React + TypeScript + Vite on Amplify), color palette, logo, type, and Russel mascot artwork (Sections 2, 5).

**Still open:**
1. Sign-off from Thomas Rössig and Robert Heil to publicly quote their reference letters (Section 4.3).
2. Remaining items in the Asset & content checklist (Section 7) — German translations, business email, scheduling tool setup, legal pages (Section 9).
3. Home page (4.1) and Portfolio page (4.2) haven't had a dedicated deep-dive pass yet the way Process/Services/Contact have — worth one more round before build if you want the same level of detail there.

**Once resolved:** hand this doc, plus final decisions, to Claude Code for implementation.
