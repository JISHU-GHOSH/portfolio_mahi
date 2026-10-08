import React, { useEffect, useCallback } from 'react';
import {
  X,
  Printer,
  Download,
  GraduationCap,
  Building2,
  Award,
  TrendingUp,
  ShieldCheck,
  MapPin,
  Mail,
  Globe,
} from 'lucide-react';
import { playClick, playHover, playOpen, playClose } from './soundEffects';
import './ResumeModal.css';

export default function ResumeModal({ isOpen, onClose }) {
  const handleClose = useCallback(() => {
    playClose();
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      playOpen();
      document.body.style.overflow = 'hidden';

      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          handleClose();
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = '';
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    playClick();
    window.print();
  };

  return (
    <div
      className="resume-modal-backdrop"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-modal-title"
    >
      <div
        className="resume-modal-dialog"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar (Hidden during print) */}
        <div className="resume-modal-topbar">
          <div className="topbar-badge-wrap">
            <span className="topbar-badge font-cinzel">EXECUTIVE DOSSIER</span>
            <span className="topbar-title font-sans">Curriculum Vitae &amp; Governance Record</span>
          </div>

          <div className="topbar-actions">
            <button
              type="button"
              className="topbar-btn topbar-btn-print"
              onClick={handlePrint}
              onMouseEnter={playHover}
              title="Print or Save as PDF"
              aria-label="Print or Save Executive CV as PDF"
            >
              <Printer size={16} aria-hidden="true" />
              <span>Print / Save PDF</span>
            </button>

            <button
              type="button"
              className="topbar-btn topbar-btn-close"
              onClick={handleClose}
              onMouseEnter={playHover}
              aria-label="Close dossier"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Scrollable Printable CV Document */}
        <div className="resume-document-wrapper">
          <article className="resume-paper" id="executive-cv-document">
            {/* CV Header */}
            <header className="cv-header">
              <div className="cv-header-primary">
                <h1 id="resume-modal-title" className="cv-name font-serif">
                  Mahi
                </h1>
                <p className="cv-role font-cinzel">
                  Founder &bull; General Partner &bull; Venture Strategist
                </p>
              </div>

              <div className="cv-contact-block">
                <div className="cv-contact-item">
                  <MapPin size={13} aria-hidden="true" />
                  <span>London Mayfair &bull; New York Hudson Yards &bull; Singapore</span>
                </div>
                <div className="cv-contact-item">
                  <Mail size={13} aria-hidden="true" />
                  <span>mahi@auracapital.com</span>
                </div>
                <div className="cv-contact-item">
                  <Globe size={13} aria-hidden="true" />
                  <span>auracapital.com &bull; luminaadvisory.com</span>
                </div>
              </div>
            </header>

            {/* Executive Bio / Thesis */}
            <section className="cv-section">
              <h2 className="cv-section-heading font-cinzel">
                <ShieldCheck size={16} aria-hidden="true" />
                <span>Executive Profile</span>
              </h2>
              <div className="cv-section-rule" />
              <p className="cv-bio-text">
                Institutional board director, general partner, and cross-border venture strategist managing and advising &euro;420M+ in fund vehicles across fintech, deep software infrastructure, and UHNW enterprise ecosystems. Specializing in capital syndication, fiduciary corporate governance, and scaling high-velocity ventures from Series A through global institutional liquidity.
              </p>
            </section>

            {/* Board Directorships & Governance Mandates */}
            <section className="cv-section">
              <h2 className="cv-section-heading font-cinzel">
                <Building2 size={16} aria-hidden="true" />
                <span>Board Directorships &amp; Governance Mandates</span>
              </h2>
              <div className="cv-section-rule" />

              <div className="cv-entries-list">
                {/* Aura Capital */}
                <div className="cv-entry">
                  <div className="cv-entry-head">
                    <div className="cv-entry-title-wrap">
                      <h3 className="cv-entry-title font-serif">Aura Capital Global Growth</h3>
                      <span className="cv-entry-role">General Partner &amp; Investment Committee Chair</span>
                    </div>
                    <div className="cv-entry-meta">
                      <span className="cv-entry-period">2024&ndash;Present</span>
                      <span className="cv-entry-loc">London &bull; New York</span>
                    </div>
                  </div>
                  <ul className="cv-entry-bullets">
                    <li>Directing investment committee deploying &euro;420M Fund II focused on fintech infrastructure, cross-border payments, and institutional digital liquidity.</li>
                    <li>Structuring cross-border syndication across sovereign wealth funds, European family offices, and institutional LPs.</li>
                    <li>Instituting standardized institutional governance charters and valuation defense frameworks across 14 portfolio entities.</li>
                  </ul>
                </div>

                {/* Apex Enterprise Systems */}
                <div className="cv-entry">
                  <div className="cv-entry-head">
                    <div className="cv-entry-title-wrap">
                      <h3 className="cv-entry-title font-serif">Apex Enterprise Systems</h3>
                      <span className="cv-entry-role">Non-Executive Board Director</span>
                    </div>
                    <div className="cv-entry-meta">
                      <span className="cv-entry-period">2025&ndash;Present</span>
                      <span className="cv-entry-loc">New York</span>
                    </div>
                  </div>
                  <ul className="cv-entry-bullets">
                    <li>Serving on the Board Audit and Executive Compensation committees; stewarding hyper-scale transition from $12M to $65M ARR.</li>
                    <li>Counseling executive leadership on transatlantic GTM expansion, channel alliances, and buy-side strategic M&amp;A evaluation.</li>
                  </ul>
                </div>

                {/* Lumina Strategic Architecture */}
                <div className="cv-entry">
                  <div className="cv-entry-head">
                    <div className="cv-entry-title-wrap">
                      <h3 className="cv-entry-title font-serif">Lumina Strategic Architecture</h3>
                      <span className="cv-entry-role">Founding Strategic Director &amp; Brand Architect</span>
                    </div>
                    <div className="cv-entry-meta">
                      <span className="cv-entry-period">2024&ndash;Present</span>
                      <span className="cv-entry-loc">London &bull; Zurich</span>
                    </div>
                  </div>
                  <ul className="cv-entry-bullets">
                    <li>Advising luxury Maisons and deep-tech unicorns on high-conviction narrative positioning, brand pricing power, and UHNW market penetration.</li>
                    <li>Constructing defensible brand moats and cultural capital architectures resulting in over $250M in enterprise valuation expansions.</li>
                  </ul>
                </div>

                {/* Genesis Impact */}
                <div className="cv-entry">
                  <div className="cv-entry-head">
                    <div className="cv-entry-title-wrap">
                      <h3 className="cv-entry-title font-serif">Genesis Impact Initiative</h3>
                      <span className="cv-entry-role">Advisory Board Chair</span>
                    </div>
                    <div className="cv-entry-meta">
                      <span className="cv-entry-period">2023&ndash;Present</span>
                      <span className="cv-entry-loc">Global</span>
                    </div>
                  </div>
                  <ul className="cv-entry-bullets">
                    <li>Directing $150M evergreen sustainable fund vehicle across cross-border circular economy and clean technology platforms.</li>
                    <li>Establishing high-assurance ESG measurement frameworks compliant with European SFDR Article 9 standards.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Venture Track Record & Core Competencies */}
            <section className="cv-section">
              <h2 className="cv-section-heading font-cinzel">
                <TrendingUp size={16} aria-hidden="true" />
                <span>Executive Track Record &amp; Competencies</span>
              </h2>
              <div className="cv-section-rule" />

              <div className="cv-competencies-grid">
                <div className="cv-comp-card">
                  <h4 className="cv-comp-title font-cinzel">Capital Stewardship</h4>
                  <p className="cv-comp-desc">
                    &euro;420M+ cumulative fund AUM managed &amp; advised. Lead negotiator on Series A&ndash;C growth rounds and secondary buyouts.
                  </p>
                </div>
                <div className="cv-comp-card">
                  <h4 className="cv-comp-title font-cinzel">Board Governance</h4>
                  <p className="cv-comp-desc">
                    Chartered Director (IoD). Experienced in fiduciary audit, risk stewardship, and multi-stakeholder dispute resolution.
                  </p>
                </div>
                <div className="cv-comp-card">
                  <h4 className="cv-comp-title font-cinzel">Enterprise Scaling</h4>
                  <p className="cv-comp-desc">
                    5.4x average enterprise valuation expansion across advised growth companies ($10M to $100M+ revenue inflection).
                  </p>
                </div>
                <div className="cv-comp-card">
                  <h4 className="cv-comp-title font-cinzel">Global Expansion</h4>
                  <p className="cv-comp-desc">
                    Established institutional operating presence and distribution corridors across London, New York, Zurich, and Singapore.
                  </p>
                </div>
              </div>
            </section>

            {/* Education */}
            <section className="cv-section">
              <h2 className="cv-section-heading font-cinzel">
                <GraduationCap size={16} aria-hidden="true" />
                <span>Executive Education</span>
              </h2>
              <div className="cv-section-rule" />

              <div className="cv-entries-list">
                <div className="cv-entry">
                  <div className="cv-entry-head">
                    <div className="cv-entry-title-wrap">
                      <h3 className="cv-entry-title font-serif">University of Oxford, Sa&iuml;d Business School</h3>
                      <span className="cv-entry-role">Executive Leadership &amp; Financial Strategy Programme</span>
                    </div>
                    <div className="cv-entry-meta">
                      <span className="cv-entry-period">2023</span>
                      <span className="cv-entry-loc">Oxford, United Kingdom</span>
                    </div>
                  </div>
                  <p className="cv-entry-detail">
                    Advanced study in corporate governance, sovereign wealth allocation, and multinational capital structures.
                  </p>
                </div>

                <div className="cv-entry">
                  <div className="cv-entry-head">
                    <div className="cv-entry-title-wrap">
                      <h3 className="cv-entry-title font-serif">The London School of Economics and Political Science (LSE)</h3>
                      <span className="cv-entry-role">BSc (Hons) Finance &amp; International Strategy</span>
                    </div>
                    <div className="cv-entry-meta">
                      <span className="cv-entry-period">2018&ndash;2021</span>
                      <span className="cv-entry-loc">London, United Kingdom</span>
                    </div>
                  </div>
                  <p className="cv-entry-detail">
                    First Class Honours. Specialized in institutional asset pricing, macroeconomic monetary systems, and quantitative game theory.
                  </p>
                </div>
              </div>
            </section>

            {/* Accreditations & Fellowships */}
            <section className="cv-section cv-section-last">
              <h2 className="cv-section-heading font-cinzel">
                <Award size={16} aria-hidden="true" />
                <span>Accreditations &amp; Fellowships</span>
              </h2>
              <div className="cv-section-rule" />

              <div className="cv-accreditations-grid">
                <div className="cv-accred-item">
                  <span className="cv-accred-year">2024</span>
                  <div>
                    <h4 className="cv-accred-name">Chartered Director (C.Dir)</h4>
                    <p className="cv-accred-issuer">Institute of Directors (IoD), United Kingdom</p>
                  </div>
                </div>

                <div className="cv-accred-item">
                  <span className="cv-accred-year">2025</span>
                  <div>
                    <h4 className="cv-accred-name">Executive Council Fellow</h4>
                    <p className="cv-accred-issuer">Forbes Business Council</p>
                  </div>
                </div>

                <div className="cv-accred-item">
                  <span className="cv-accred-year">2024</span>
                  <div>
                    <h4 className="cv-accred-name">Strategic Leader of the Year</h4>
                    <p className="cv-accred-issuer">Women in Private Capital European Forum</p>
                  </div>
                </div>

                <div className="cv-accred-item">
                  <span className="cv-accred-year">2023</span>
                  <div>
                    <h4 className="cv-accred-name">ESG &amp; Sustainable Governance Certification</h4>
                    <p className="cv-accred-issuer">CFA Institute</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Document Verification Footer */}
            <footer className="cv-document-footer">
              <div className="cv-footer-rule" />
              <div className="cv-footer-meta">
                <span>Verified Executive Record &bull; Office of Mahi</span>
                <span>Ref: EX-CV-2026-UK-US</span>
                <span>Confidential &bull; Institutional Use Only</span>
              </div>
            </footer>
          </article>
        </div>

        {/* Modal Bottom Action Bar (Hidden during print) */}
        <div className="resume-modal-footer">
          <button
            type="button"
            className="btn-editorial btn-primary"
            onClick={handlePrint}
            onMouseEnter={playHover}
          >
            <Printer size={16} aria-hidden="true" />
            <span>Print / Save as PDF</span>
          </button>

          <button
            type="button"
            className="btn-editorial btn-secondary"
            onClick={handleClose}
            onMouseEnter={playHover}
          >
            <span>Close Dossier</span>
          </button>
        </div>
      </div>
    </div>
  );
}
