import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import ProjectMockup from './ProjectMockup';
import useScrollReveal from './useScrollReveal';
import { playClick, playHover, playOpen, playClose } from './soundEffects';
import './ProjectsSection.css';

/**
 * 4 Featured Executive Initiatives & Directorships
 */
const VENTURES_DATA = [
  {
    id: 'aura-capital',
    title: 'Aura Capital Global Growth',
    category: 'Venture Capital',
    year: '2024–Present',
    mandate: 'General Partner & Investment Committee Chair',
    summary: 'Directing multi-stage cross-border capital allocation across European and North American fintech ecosystems, overseeing €420M in fund assets.',
    thesis: 'Deploying institutional capital into structural software platforms unlocking friction-free cross-border liquidity, embedded treasury automation, and institutional digital asset rails.',
    parameters: {
      vehicle: 'Aura Global Growth Fund II',
      aum: '€420M Fund AUM (Series A–C Focus)',
      focus: 'Fintech Infrastructure, Cross-Border Payments, Next-Gen Liquidity',
      geography: 'London • Zurich • New York',
      engagement: 'General Partner, Investment Committee Chair',
    },
    metrics: [
      { label: 'AUM Directorship', value: '€420M' },
      { label: 'Core Geography', value: 'London & NYC' },
      { label: 'Investment Stage', value: 'Series A–C' },
    ],
  },
  {
    id: 'lumina-studio',
    title: 'Lumina Strategic Architecture',
    category: 'Advisory',
    year: '2024–Present',
    mandate: 'Founding Strategic Director & Brand Architect',
    summary: 'Advising premier luxury Maisons and deep-tech scaleups on high-conviction narrative positioning, brand moats, and ultra-high-net-worth market penetration.',
    thesis: 'Elevating venture-backed market innovators into iconic cultural institutions by fusing architectural minimalism, brand prestige, and uncompromising pricing power.',
    parameters: {
      vehicle: 'Bespoke Executive Advisory Mandate',
      aum: 'Selective Client Advisory ($250M+ Enterprise Valuations)',
      focus: 'Brand Architecture, Category Dominance, UHNW Positioning',
      geography: 'Paris • Milan • Mayfair London',
      engagement: 'Founding Director, Senior Counsel to Executive Boards',
    },
    metrics: [
      { label: 'Mandate Scope', value: 'Executive Board' },
      { label: 'Target Valuation', value: '$250M+' },
      { label: 'Presence Hubs', value: 'Paris & London' },
    ],
  },
  {
    id: 'apex-systems',
    title: 'Apex Operational Platform',
    category: 'Enterprise Scaling',
    year: '2025–Present',
    mandate: 'Non-Executive Board Director & Scaling Counsel',
    summary: 'Orchestrating operational infrastructure and organizational redesign through hyper-growth from Series B to Series C, scaling from $12M to $65M ARR.',
    thesis: 'Engineering resilient operational frameworks, executive talent density, and low-latency deployment cadence to transition engineering-led breakthroughs into compounding SaaS market leaders.',
    parameters: {
      vehicle: 'Series B / C Institutional Board Directorship',
      aum: '$75M Series C Round ($65M ARR)',
      focus: 'Autonomous Cloud Telemetry, High-Throughput Distributed Systems',
      geography: 'San Francisco • Austin • London',
      engagement: 'Board Director, Compensation & Scale Committee',
    },
    metrics: [
      { label: 'ARR Expansion', value: '$12M → $65M' },
      { label: 'Series C Round', value: '$75M' },
      { label: 'Directorship', value: 'Non-Executive' },
    ],
  },
  {
    id: 'genesis-impact',
    title: 'Genesis Impact Initiative',
    category: 'Venture Capital',
    year: '2023–Present',
    mandate: 'Advisory Board Member & Venture Mentor',
    summary: 'Championing regenerative financial models, female-led venture pipelines, and high-impact climate tech deployment across emerging global hubs.',
    thesis: 'Demonstrating that intentional capital allocation toward underrepresented founders and regenerative infrastructure produces systemic alpha and durable generational prosperity.',
    parameters: {
      vehicle: 'Genesis Impact Evergreen Syndicate',
      aum: '$150M Evergreen Vehicle',
      focus: 'Regenerative Agriculture, Female Founder Acceleration, Clean Energy',
      geography: 'Singapore • Nairobi • London',
      engagement: 'Advisory Board Member, Diversity & Capital Allocation Lead',
    },
    metrics: [
      { label: 'Evergreen Vehicle', value: '$150M' },
      { label: 'Founder Thesis', value: 'Diverse & Female' },
      { label: 'Global Footprint', value: 'Europe & Asia' },
    ],
  },
];

const FILTER_CATEGORIES = ['All', 'Venture Capital', 'Advisory', 'Enterprise Scaling'];

export default function ProjectsSection({ onOpenContact }) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedVenture, setSelectedVenture] = useState(null);

  // Filter ventures based on selected category pill
  const filteredVentures = useMemo(() => {
    if (activeFilter === 'All') return VENTURES_DATA;
    return VENTURES_DATA.filter((v) => v.category === activeFilter);
  }, [activeFilter]);

  // Hook for zero-overhead IntersectionObserver reveal
  useScrollReveal([activeFilter]);

  // Open curatorial mandate lightbox
  const handleOpenVenture = useCallback((venture) => {
    playClick();
    playOpen();
    setSelectedVenture(venture);
    document.body.style.overflow = 'hidden';
  }, []);

  // Close curatorial mandate lightbox
  const handleCloseVenture = useCallback(() => {
    playClose();
    setSelectedVenture(null);
    document.body.style.overflow = '';
  }, []);

  // Handle ESC key listener for lightbox dismissal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && selectedVenture) {
        handleCloseVenture();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedVenture, handleCloseVenture]);

  // Ensure body scroll is reset on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleFilterClick = (cat) => {
    if (activeFilter !== cat) {
      playClick();
      setActiveFilter(cat);
    }
  };

  return (
    <section id="ventures" className="works-section" aria-label="Selected Ventures & Directorships">
      <div className="works-container">
        {/* Editorial Section Header */}
        <header className="works-header reveal-on-scroll">
          <div className="works-label-row">
            <span className="works-badge font-cinzel">SELECTED VENTURES</span>
            <span className="works-dot" aria-hidden="true" />
            <span className="works-counter">{filteredVentures.length} Initiatives</span>
          </div>

          <h2 className="works-title font-serif">
            Directorships &amp; Advisory Mandates
          </h2>

          <p className="works-subtitle">
            Curated portfolio spanning multi-stage venture capital, strategic brand architecture, and enterprise scale.
          </p>

          {/* Filter Pills */}
          <nav className="works-filter-nav" aria-label="Filter Ventures by Mandate Type">
            {FILTER_CATEGORIES.map((cat) => {
              const isActive = activeFilter === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  className={`filter-pill ${isActive ? 'is-active' : ''}`}
                  onClick={() => handleFilterClick(cat)}
                  onMouseEnter={playHover}
                  aria-pressed={isActive}
                >
                  {cat}
                </button>
              );
            })}
          </nav>
        </header>

        {/* Ventures Grid */}
        <div className="works-grid">
          {filteredVentures.map((venture, idx) => (
            <article
              key={venture.id}
              className="work-card reveal-on-scroll"
              style={{ '--reveal-delay': `${idx * 120}ms` }}
            >
              {/* Card Media Artwork Banner */}
              <div
                className="work-card-media"
                onClick={() => handleOpenVenture(venture)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleOpenVenture(venture);
                  }
                }}
                aria-label={`Inspect mandate for ${venture.title}`}
              >
                <ProjectMockup id={venture.id} />
                <div className="work-card-media-overlay">
                  <span className="media-inspect-btn">
                    Inspect Mandate <ArrowUpRight size={15} />
                  </span>
                </div>
              </div>

              {/* Card Content & Metadata */}
              <div className="work-card-body">
                <div className="work-card-meta">
                  <span className="meta-category">{venture.category}</span>
                  <span className="meta-year">{venture.year}</span>
                </div>

                <h3 className="work-card-title font-serif">
                  {venture.title}
                </h3>

                <p className="work-card-mandate">
                  {venture.mandate}
                </p>

                <p className="work-card-summary">
                  {venture.summary}
                </p>

                {/* Key Metrics Row */}
                <div className="work-card-metrics">
                  {venture.metrics.map((m, mIdx) => (
                    <div key={mIdx} className="metric-item">
                      <span className="metric-val">{m.value}</span>
                      <span className="metric-lbl">{m.label}</span>
                    </div>
                  ))}
                </div>

                {/* Action Footer */}
                <div className="work-card-footer">
                  <button
                    type="button"
                    className="card-cta-btn"
                    onClick={() => handleOpenVenture(venture)}
                    onMouseEnter={playHover}
                  >
                    <span>Inspect Mandate</span>
                    <ArrowUpRight size={14} className="card-cta-arrow" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Interactive Curatorial Lightbox Modal */}
      {selectedVenture && (
        <div
          className="mandate-lightbox-overlay"
          onClick={handleCloseVenture}
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightbox-title"
        >
          <div
            className="mandate-lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Close Button */}
            <button
              type="button"
              className="lightbox-close-btn"
              onClick={handleCloseVenture}
              onMouseEnter={playHover}
              aria-label="Close mandate details"
            >
              <X size={20} />
            </button>

            {/* Modal High-Res Artwork Banner */}
            <div className="lightbox-artwork-container">
              <ProjectMockup id={selectedVenture.id} isExpanded={true} />
              <div className="lightbox-artwork-badge">
                <span className="lightbox-cat font-cinzel">{selectedVenture.category}</span>
                <span className="lightbox-year">{selectedVenture.year}</span>
              </div>
            </div>

            {/* Modal Editorial Details */}
            <div className="lightbox-body">
              <header className="lightbox-header">
                <div className="lightbox-pretitle font-cinzel">EXECUTIVE MANDATE SPECIFICATION</div>
                <h3 id="lightbox-title" className="lightbox-title font-serif">
                  {selectedVenture.title}
                </h3>
                <p className="lightbox-mandate-subtitle">
                  {selectedVenture.mandate}
                </p>
              </header>

              {/* Mandate Thesis Statement */}
              <div className="lightbox-thesis-box">
                <div className="thesis-label font-cinzel">Investment &amp; Directorship Thesis</div>
                <p className="thesis-text">
                  “{selectedVenture.thesis}”
                </p>
              </div>

              {/* Investment & Directorship Parameters Grid */}
              <div className="lightbox-parameters-section">
                <div className="parameters-heading font-cinzel">Mandate Parameters</div>
                <div className="parameters-grid">
                  <div className="parameter-card">
                    <span className="param-label">Fund / Vehicle</span>
                    <span className="param-value">{selectedVenture.parameters.vehicle}</span>
                  </div>
                  <div className="parameter-card">
                    <span className="param-label">AUM / Round Capital</span>
                    <span className="param-value">{selectedVenture.parameters.aum}</span>
                  </div>
                  <div className="parameter-card">
                    <span className="param-label">Sector Focus</span>
                    <span className="param-value">{selectedVenture.parameters.focus}</span>
                  </div>
                  <div className="parameter-card">
                    <span className="param-label">Geographic Scope</span>
                    <span className="param-value">{selectedVenture.parameters.geography}</span>
                  </div>
                  <div className="parameter-card parameter-card-wide">
                    <span className="param-label">Executive Engagement</span>
                    <span className="param-value">{selectedVenture.parameters.engagement}</span>
                  </div>
                </div>
              </div>

              {/* Lightbox Action Footer */}
              <div className="lightbox-footer">
                <button
                  type="button"
                  className="btn-editorial btn-primary lightbox-inquire-btn"
                  onClick={() => {
                    playClick();
                    handleCloseVenture();
                    onOpenContact?.();
                  }}
                  onMouseEnter={playHover}
                >
                  <span>Inquire About Mandate</span>
                  <ArrowUpRight size={16} />
                </button>

                <button
                  type="button"
                  className="btn-editorial btn-secondary"
                  onClick={handleCloseVenture}
                  onMouseEnter={playHover}
                >
                  Close Specification
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
