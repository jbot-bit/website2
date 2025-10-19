# SC Diesel Tuning Documentation Site - Design Guidelines

## Design Approach
**Reference-Based Approach**: Drawing inspiration from investigative journalism platforms (ProPublica, The Intercept) and legal documentation sites. This creates an authoritative, evidence-first aesthetic that commands credibility while maintaining visual impact through sharp typography and strategic use of negative space.

**Core Principle**: Cold professionalism with surgical precision. Every design element reinforces factual authority and serious intent.

---

## Core Design Elements

### A. Color Palette

**Dark Mode (Primary)**
- Background: 0 0% 8% (near-black)
- Surface: 0 0% 12% (elevated surfaces)
- Border: 0 0% 20% (subtle separation)
- Primary Accent: 200 90% 55% (ice blue - use sparingly for critical emphasis)
- Alert/Warning: 0 85% 60% (red for violations)
- Text Primary: 0 0% 95% (crisp white)
- Text Secondary: 0 0% 65% (muted gray)

**Light Mode (Secondary)**
- Background: 0 0% 98%
- Surface: 0 0% 100%
- Border: 0 0% 88%
- Primary Accent: 200 90% 45%
- Alert/Warning: 0 85% 50%
- Text Primary: 0 0% 10%
- Text Secondary: 0 0% 40%

### B. Typography

**Font Families**
- Headlines: 'Inter' (900 weight for impact, 700 for subheadings)
- Body: 'Inter' (400 regular, 500 medium for emphasis)
- Evidence/Data: 'JetBrains Mono' (monospaced for timestamps, references, invoice numbers)

**Type Scale**
- Hero: text-6xl to text-8xl font-black
- Section Headers: text-4xl to text-5xl font-bold
- Subsections: text-2xl to text-3xl font-bold
- Body: text-base to text-lg
- Captions/Meta: text-sm font-medium

### C. Layout System

**Spacing Primitives**: Use Tailwind units of 4, 8, 12, 16, 24, 32
- Component padding: p-8, p-12
- Section spacing: py-16, py-24, py-32
- Grid gaps: gap-8, gap-12
- Container max-width: max-w-7xl

**Grid System**
- Evidence cards: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Timeline: Single column with left-aligned markers
- Invoice comparison: 2-column side-by-side layout

### D. Component Library

**Navigation**
- Fixed top bar, dark background with subtle border-bottom
- Logo/site title: Bold, uppercase tracking-wide
- Sharp underline hover states (ice blue)
- CTA button: "Download Evidence Pack" - primary accent

**Hero Section** (No image - text-first)
- Full-width dark background with subtle gradient
- Massive bold headline: "SC DIESEL TUNING: A DOCUMENTED PATTERN OF FRAUD"
- Subheading with key violation count
- Two CTAs: "View Evidence Timeline" (primary) + "Download Report" (outline)
- Scrolling indicator with ice blue accent

**Timeline Component**
- Vertical line with date markers
- Each violation in expandable card
- Red alert icons for serious violations
- Quote callouts in monospace font with background highlight
- "Evidence" badge linking to supporting documents

**Evidence Gallery**
- Masonry grid layout for document previews
- Click to expand with zoom/lightbox functionality
- Categorized tabs: "Invoices" | "Messages" | "Business Records" | "Public Responses"
- Hover state: subtle scale + ice blue border glow

**Violation Cards**
- Dark surface with subtle border
- Icon + violation title + severity indicator
- Expandable accordion for detailed breakdown
- Reference numbers in monospace
- Link to supporting evidence

**Call-to-Action Sections**
- High-contrast blocks between content sections
- Single focused message: "This is Public Interest Disclosure"
- Download button for comprehensive PDF
- Social share options with disclaimer

**Footer**
- Minimalist: Legal disclaimer, last updated date, contact for additional evidence
- No social fluff - pure documentation focus

### E. Interactions & Animations

**Minimal, Purposeful Motion**
- Smooth scroll behavior for timeline navigation
- Fade-in on scroll for evidence cards (subtle, 0.3s duration)
- Lightbox transitions for evidence zoom
- No decorative animations - every motion serves function

**Micro-interactions**
- Button hover: subtle ice blue glow
- Card hover: elevation increase (shadow)
- Link underline: animated from left (200ms)
- Accordion expand: smooth height transition

---

## Special Features

**Evidence Presentation**
- Side-by-side invoice comparison with highlighting for unauthorized additions
- Message screenshots with timestamp overlays in monospace
- Business registry lookup results embedded with source links
- Quote blocks with red left border for particularly damaging statements

**Downloadable Assets**
- PDF fact sheet with all violations compiled
- Individual evidence files available per violation
- Attribution/source information for legal defensibility

**SEO & Discoverability**
- Meta descriptions emphasizing business compliance violations
- Structured data for organization and legal documentation
- Open Graph tags for serious, professional sharing

---

## Images

**No Large Hero Image Required**

Instead, use:
- Small icon set for violation types (13 custom icons representing each violation category - use Font Awesome or Heroicons with custom colors)
- Document preview thumbnails (blurred/redacted appropriately) in evidence gallery
- Business registry screenshots embedded inline
- Message screenshot thumbnails with zoom capability

All images serve evidentiary purpose - no decorative photography.

---

## Accessibility & Responsiveness

- WCAG AAA contrast ratios for all text
- Keyboard navigation for all interactive elements
- Screen reader labels for evidence references
- Mobile: Single column stack, sticky navigation
- Tablet: 2-column grids where appropriate
- Desktop: Full 3-column layouts for evidence galleries

**Critical**: Maintain dark mode consistency across all form inputs, modals, and interactive elements. This site's serious tone demands visual coherence.