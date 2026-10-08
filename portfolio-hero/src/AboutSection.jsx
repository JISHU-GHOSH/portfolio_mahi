import React, { useRef } from 'react';
import {
  TrendingUp,
  ShieldCheck,
  Layers,
  Globe,
  FileText,
  ArrowUpRight,
  Award,
  CheckCircle2,
} from 'lucide-react';
import useScrollReveal from './useScrollReveal';
import { playClick } from './soundEffects';
import './AboutSection.css';

/**
 * 4 Strategic Pillars
 */
const STRATEGIC_PILLARS = [
  {
    number: '01',
    title: 'Capital Allocation & Growth Stage M&A',
    description:
      'Directing high-conviction capital deployment, cross-border syndication, and strategic buy-side acquisition mandates to accelerate structural market advantage.',
    focusAreas: [
      'Series A–C Syndication',
      'Cross-Border Buy-Side M&A',
      'Valuation Defense & Structure',
      'LP Capital Deployment Strategy',
    ],
    metric: '€420M+ AUM Managed & Advised',
    icon: TrendingUp,
  },
  {
    number: '02',
    title: 'Board Advisory & Corporate Governance',
    description:
      'Instituting institutional-grade board governance, aligning founder-investor incentives, and safeguarding multi-stakeholder fiduciary trust through high-stakes expansion.',
    focusAreas: [
      'Fiduciary Oversight & Audit',
      'Founder-Sponsor Incentive Alignment',
      'Risk & Compliance Stewardship',
      'Independent Board Counsel',
    ],
    metric: 'Chartered Director (IoD)',
    icon: ShieldCheck,
  },
  {
    number: '03',
    title: 'Enterprise Scaling & Operational Architecture',
    description:
      'Engineering executive org structures, telemetry infrastructure, and repeatable go-to-market systems to transition high-velocity scaleups into durable category leaders.',
    focusAreas: [
      'Org Design & C-Suite Coaching',
      'ARR Inflection ($10M to $100M+)',
      'Operational Cadence & OKRs',
      'Unit Economics Optimization',
    ],
    metric: '5.4x Avg. Enterprise Growth',
    icon: Layers,
  },
  {
    number: '04',
    title: 'Global Market Penetration & Partnerships',
    description:
      'Unlocking institutional enterprise pipelines, negotiating multi-jurisdiction commercial partnerships, and anchoring high-fashion and fintech presence across global capitals.',
    focusAreas: [
      'London • Zurich • NYC Corridors',
      'Strategic Distribution Alliances',
      'Category Brand Positioning',
      'Tier-1 Institutional Moats',
    ],
    metric: 'Cross-Border Execution Hubs',
    icon: Globe,
  },
];

/**
 * Leadership Chronology Timeline (2023–2026)
 */
const LEADERSHIP_CHRONOLOGY = [
  {
    year: '2026',
    role: 'General Partner & Strategic Advisor',
    organization: 'Aura Capital Global Fund II',
    badge: 'Current Mandate',
    description:
      'Guiding institutional capital allocation across European and North American fintech infrastructure, digital asset rails, and next-generation treasury ecosystems.',
    highlights: ['London • Zurich • New York', 'Investment Committee Chair', '€420M Fund Deployment'],
  },
  {
    year: '2025',
    role: 'Non-Executive Board Director',
    organization: 'Apex Enterprise Systems',
    badge: 'Board Directorship',
    description:
      'Appointed to the board to advise executive leadership through hyper-growth from Series B to Series C, scaling operational architecture from $12M to $65M ARR.',
    highlights: ['Audit & Risk Stewardship', 'Enterprise Scaling Counsel', 'Series C Trajectory'],
  },
  {
    year: '2024',
    role: 'Founding Director',
    organization: 'Lumina Advisory Atelier',
    badge: 'Advisory Practice',
    description:
      'Established high-conviction boutique advisory practice counseling European luxury houses and deep-tech scaleups on brand architecture, category moats, and UHNW positioning.',
    highlights: ['Paris • Milan • London Hubs', 'Senior Counsel to Executive Boards', '$250M+ Enterprise Valuations'],
  },
  {
    year: '2023',
    role: 'Executive Fellow',
    organization: 'Oxford Saïd Global Leadership Initiative',
    badge: 'Global Fellowship',
    description:
      'Conducted advanced executive research and roundtables on multi-stakeholder corporate governance, cross-border venture capital allocation, and sustainable fiduciary models.',
    highlights: ['Global Leadership Fellow', 'Corporate Governance Research', 'International Cohort'],
  },
];

/**
 * Distinctions & Board Accreditations
 */
const DISTINCTIONS = [
  {
    organization: 'Forbes Executive Council',
    title: 'Fellow',
    year: '2025',
    category: 'Global Fellowship',
    description:
      'Selected to the invitation-only council for senior venture capital leaders, contributing insights on capital deployment and tech governance.',
  },
  {
    organization: 'Institute of Directors (IoD)',
    title: 'Chartered Director Certification',
    year: '2024',
    category: 'Board Accreditation',
    description:
      'Awarded the gold-standard professional qualification in corporate governance, board directorship, and fiduciary oversight.',
  },
  {
    organization: 'Women in Private Capital',
    title: 'Strategic Leader of the Year',
    year: '2024',
    category: 'Industry Distinction',
    description:
      'Recognized for exceptional leadership in venture architecture, multi-jurisdiction syndication, and empowering high-growth founders.',
  },
];

/**
 * AboutSection Component
 * Executive Practice & Leadership Philosophy (#advisory)
 */
export default function AboutSection({ onOpenResume, onOpenContact }) {
  const sectionRef = useRef(null);

  // Wire scroll-driven reveal animation engine
  useScrollReveal([], sectionRef);

  return (
    <section id="advisory" className="practice-section" ref={sectionRef}>
      <div className="practice-container">
        {/* Editorial Section Header */}
        <header className="practice-header reveal-on-scroll">
          <div className="practice-label-row">
            <span className="practice-badge">EXECUTIVE PRACTICE &amp; PHILOSOPHY</span>
            <span className="practice-dot" aria-hidden="true" />
            <span className="practice-counter">ADVISORY MANDATE</span>
          </div>
          <h2 className="practice-title font-serif">Strategic Leadership &amp; Board Directorship</h2>
          <p className="practice-subtitle">
            Guiding institutional capital and visionary founders through transformational inflection points, global scale, and enduring market leadership.
          </p>
        </header>

        {/* Executive Philosophy Manifesto Callout */}
        <div className="practice-manifesto reveal-on-scroll" style={{ '--reveal-delay': '60ms' }}>
          <div className="manifesto-card glass-panel">
            <div className="manifesto-decor-mark font-serif" aria-hidden="true">
              “
            </div>
            <div className="manifesto-body">
              <blockquote className="manifesto-quote font-serif">
                Enduring enterprise value is forged at the intersection of disciplined capital stewardship, high-conviction narrative moats, and operational precision.
              </blockquote>
              <div className="manifesto-meta">
                <span className="manifesto-signature font-cinzel">Mahi</span>
                <span className="manifesto-divider" aria-hidden="true" />
                <span className="manifesto-title">General Partner, Board Director &amp; Strategic Advisor</span>
              </div>
            </div>
          </div>
        </div>

        {/* Strategic Pillars Grid */}
        <div className="practice-pillars-wrapper">
          <div className="practice-subheading reveal-on-scroll" style={{ '--reveal-delay': '90ms' }}>
            <span className="practice-subheading-tag">CORE COMPETENCIES</span>
            <h3 className="practice-subheading-title font-serif">Four Strategic Pillars of Practice</h3>
          </div>

          <div className="practice-pillars-grid">
            {STRATEGIC_PILLARS.map((pillar, index) => {
              const IconComponent = pillar.icon;
              const delay = 120 + index * 60;
              return (
                <div
                  key={pillar.number}
                  className="practice-pillar-card glass-card reveal-on-scroll"
                  style={{ '--reveal-delay': `${delay}ms` }}
                >
                  <div className="pillar-header">
                    <span className="pillar-number font-cinzel">{pillar.number}</span>
                    <div className="pillar-icon-badge" aria-hidden="true">
                      <IconComponent size={18} />
                    </div>
                  </div>

                  <h4 className="pillar-title font-serif">{pillar.title}</h4>
                  <p className="pillar-description">{pillar.description}</p>

                  <ul className="pillar-focus-list" aria-label={`Focus areas for ${pillar.title}`}>
                    {pillar.focusAreas.map((area) => (
                      <li key={area} className="pillar-focus-item">
                        <CheckCircle2 size={13} className="pillar-check-icon" aria-hidden="true" />
                        <span>{area}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pillar-metric-row">
                    <span className="pillar-metric-badge">{pillar.metric}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Leadership Chronology Timeline (2023–2026) */}
        <div className="practice-timeline-wrapper">
          <div className="practice-subheading reveal-on-scroll" style={{ '--reveal-delay': '120ms' }}>
            <span className="practice-subheading-tag">EXECUTIVE TRAJECTORY</span>
            <h3 className="practice-subheading-title font-serif">Leadership Chronology (2023–2026)</h3>
            <p className="practice-subheading-subtitle">
              A track record of governance leadership, capital deployment, and institutional advisory engagements.
            </p>
          </div>

          <div className="practice-timeline">
            <div className="timeline-spine" aria-hidden="true" />

            {LEADERSHIP_CHRONOLOGY.map((item, index) => {
              const delay = 140 + index * 70;
              return (
                <div
                  key={item.year}
                  className="timeline-item reveal-on-scroll"
                  style={{ '--reveal-delay': `${delay}ms` }}
                >
                  <div className="timeline-marker" aria-hidden="true">
                    <div className="timeline-dot" />
                  </div>

                  <div className="timeline-content glass-card">
                    <div className="timeline-header">
                      <div className="timeline-year-group">
                        <span className="timeline-year font-cinzel">{item.year}</span>
                        <span className="timeline-badge">{item.badge}</span>
                      </div>
                      <span className="timeline-org font-serif">{item.organization}</span>
                    </div>

                    <h4 className="timeline-role font-serif">{item.role}</h4>
                    <p className="timeline-description">{item.description}</p>

                    <div className="timeline-highlights">
                      {item.highlights.map((highlight) => (
                        <span key={highlight} className="timeline-tag">
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Distinctions & Board Accreditations */}
        <div className="practice-distinctions-wrapper">
          <div className="practice-subheading reveal-on-scroll" style={{ '--reveal-delay': '140ms' }}>
            <span className="practice-subheading-tag">HONORS &amp; ACCREDITATIONS</span>
            <h3 className="practice-subheading-title font-serif">Distinctions &amp; Board Governance</h3>
          </div>

          <div className="practice-distinctions-grid">
            {DISTINCTIONS.map((distinction, index) => {
              const delay = 160 + index * 60;
              return (
                <div
                  key={distinction.organization}
                  className="distinction-card glass-card reveal-on-scroll"
                  style={{ '--reveal-delay': `${delay}ms` }}
                >
                  <div className="distinction-top">
                    <div className="distinction-icon-wrapper" aria-hidden="true">
                      <Award size={18} />
                    </div>
                    <span className="distinction-year font-cinzel">{distinction.year}</span>
                  </div>

                  <span className="distinction-category">{distinction.category}</span>
                  <h4 className="distinction-title font-serif">{distinction.title}</h4>
                  <div className="distinction-org">{distinction.organization}</div>
                  <p className="distinction-description">{distinction.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Executive Action Banner / CTAs */}
        <div className="practice-cta-wrapper reveal-on-scroll" style={{ '--reveal-delay': '200ms' }}>
          <div className="practice-cta-card glass-panel">
            <div className="practice-cta-content">
              <span className="practice-cta-badge">DIRECTORSHIP &amp; ADVISORY INQUIRY</span>
              <h3 className="practice-cta-title font-serif">Engage on Strategic Mandates</h3>
              <p className="practice-cta-text">
                Explore comprehensive executive governance records, board references, and biographical dossier, or initiate a confidential advisory dialogue.
              </p>
            </div>

            <div className="practice-cta-actions">
              <button
                type="button"
                className="btn-editorial btn-primary practice-cta-btn"
                onClick={() => {
                  playClick();
                  onOpenResume?.();
                }}
              >
                <FileText size={16} aria-hidden="true" />
                <span>Executive Biography &amp; CV</span>
              </button>

              <button
                type="button"
                className="btn-editorial btn-secondary practice-cta-btn"
                onClick={() => {
                  playClick();
                  onOpenContact?.();
                }}
              >
                <span>Advisory Consultation</span>
                <ArrowUpRight size={16} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
