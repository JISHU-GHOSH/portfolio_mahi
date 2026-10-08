import React, { useState } from 'react';
import {
  Mail,
  Copy,
  Check,
  ArrowUpRight,
  FileText,
  ArrowUp,
  ExternalLink,
  MapPin,
  Clock,
  ShieldCheck,
} from 'lucide-react';
import useScrollReveal from './useScrollReveal';
import { playClick, playHover } from './soundEffects';
import './ContactSection.css';

/**
 * Global Executive Office Presences
 */
const OFFICE_LOCATIONS = [
  {
    city: 'London',
    district: 'Mayfair, W1K',
    address: '14 Berkeley Square, Mayfair, London W1K 6ER',
    role: 'European HQ & Private Capital Syndication',
    timezone: 'GMT / BST (UTC+1)',
    badge: 'European HQ',
  },
  {
    city: 'New York',
    district: 'Hudson Yards, Manhattan',
    address: '50 Hudson Yards, New York, NY 10001',
    role: 'North American Enterprise & Tech Advisory',
    timezone: 'EST / EDT (UTC-5)',
    badge: 'Americas Hub',
  },
  {
    city: 'Singapore',
    district: 'Marina Bay Financial Centre',
    address: '10 Marina Boulevard, Tower 2, Singapore 018983',
    role: 'APAC Cross-Border Expansion & Sovereign Capital',
    timezone: 'SGT (UTC+8)',
    badge: 'APAC Gateway',
  },
];

/**
 * Executive Platform & Editorial Publications
 */
const PLATFORM_LINKS = [
  {
    name: 'LinkedIn',
    label: 'Executive Profile & Board Network',
    url: 'https://linkedin.com',
    handle: '@mahi-venture-strategist',
  },
  {
    name: 'Bloomberg Terminal',
    label: 'Aura Capital Growth Directorship',
    url: 'https://bloomberg.com',
    handle: 'BIO <MAHI_AURA>',
  },
  {
    name: 'Forbes Council',
    label: 'Business Council Editorial Fellow',
    url: 'https://forbes.com',
    handle: 'Forbes Thought Leadership',
  },
  {
    name: 'Substack',
    label: 'The Strategic Capitalist — Macro & Governance Letter',
    url: 'https://substack.com',
    handle: 'strategiccapitalist.substack.com',
  },
];

export default function ContactSection({ onOpenContact, onOpenResume }) {
  const [copied, setCopied] = useState(false);

  // IntersectionObserver for staggered reveals
  useScrollReveal();

  const handleCopyEmail = async () => {
    playClick();
    const email = 'mahi@auracapital.com';
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(email);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = email;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    }
  };

  const handleScrollToTop = () => {
    playClick();
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <section id="contact" className="contact-section" aria-label="Advisory Inquiries & Global Locations">
      <div className="contact-container">
        {/* Editorial Section Header */}
        <header className="contact-header reveal-on-scroll">
          <div className="contact-label-row">
            <span className="contact-badge font-cinzel">CONFIDENTIAL ENGAGEMENTS</span>
            <span className="contact-dot" aria-hidden="true" />
            <span className="contact-counter">Advisory &amp; Board Dialogue</span>
          </div>

          <h2 className="contact-title font-serif">
            Initiate Advisory Inquiries &amp; Mandates
          </h2>

          <p className="contact-subtitle">
            Engaging institutional partners, family offices, sovereign capital, and high-growth leadership teams across London, New York, and Singapore.
          </p>
        </header>

        {/* Hero Inquiries Card: Direct Contact & CTAs */}
        <div className="contact-hero-card glass-panel reveal-on-scroll" style={{ '--reveal-delay': '100ms' }}>
          <div className="contact-hero-main">
            <div className="contact-hero-badge-row">
              <span className="executive-routing-pill">
                <ShieldCheck size={14} aria-hidden="true" />
                <span>Direct Executive Routing • PGP Verified</span>
              </span>
              <span className="response-time-pill">
                <Clock size={13} aria-hidden="true" />
                <span>24-Hour Executive SLA</span>
              </span>
            </div>

            <h3 className="contact-hero-title font-serif">
              Confidential Executive Office
            </h3>

            <p className="contact-hero-text">
              Direct all venture capital syndication inquiries, board directorship candidacies, and sovereign advisory briefs directly to the executive office.
            </p>

            {/* Interactive Email Bar */}
            <div className="email-bar-wrapper">
              <div className="email-address-display">
                <Mail size={18} className="email-icon" aria-hidden="true" />
                <span className="email-text">mahi@auracapital.com</span>
              </div>

              <button
                type="button"
                className={`btn-copy ${copied ? 'is-copied' : ''}`}
                onClick={handleCopyEmail}
                onMouseEnter={playHover}
                aria-label={copied ? 'Email copied to clipboard' : 'Copy direct email to clipboard'}
              >
                {copied ? (
                  <>
                    <Check size={15} aria-hidden="true" />
                    <span>Copied to Clipboard</span>
                  </>
                ) : (
                  <>
                    <Copy size={15} aria-hidden="true" />
                    <span>Copy Direct Email</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="contact-hero-actions">
            <button
              type="button"
              className="btn-editorial btn-primary contact-cta-btn"
              onClick={() => {
                playClick();
                onOpenContact?.();
              }}
              onMouseEnter={playHover}
            >
              <span>Initiate Advisory Inquiry</span>
              <ArrowUpRight size={16} aria-hidden="true" />
            </button>

            <button
              type="button"
              className="btn-editorial btn-secondary contact-cta-btn"
              onClick={() => {
                playClick();
                onOpenResume?.();
              }}
              onMouseEnter={playHover}
            >
              <FileText size={16} aria-hidden="true" />
              <span>Download / View Executive CV</span>
            </button>
          </div>
        </div>

        {/* Global Locations Grid */}
        <div className="locations-wrapper reveal-on-scroll" style={{ '--reveal-delay': '180ms' }}>
          <div className="locations-header">
            <span className="locations-section-tag font-cinzel">GLOBAL EXECUTIVE PRESENCES</span>
            <h3 className="locations-heading font-serif">Financial Epicenters &amp; Boardrooms</h3>
          </div>

          <div className="locations-grid">
            {OFFICE_LOCATIONS.map((loc, idx) => (
              <article
                key={loc.city}
                className="location-card glass-card reveal-on-scroll"
                style={{ '--reveal-delay': `${(idx + 1) * 120}ms` }}
              >
                <div className="location-card-top">
                  <span className="location-badge font-cinzel">{loc.badge}</span>
                  <div className="location-city-wrap">
                    <MapPin size={18} className="location-pin-icon" aria-hidden="true" />
                    <h4 className="location-city font-serif">{loc.city}</h4>
                  </div>
                  <p className="location-district">{loc.district}</p>
                </div>

                <div className="location-card-body">
                  <p className="location-role">{loc.role}</p>
                  <p className="location-address">{loc.address}</p>
                </div>

                <div className="location-card-footer">
                  <Clock size={13} aria-hidden="true" />
                  <span className="location-tz">{loc.timezone}</span>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Executive Platforms & Publications */}
        <div className="platforms-wrapper reveal-on-scroll" style={{ '--reveal-delay': '240ms' }}>
          <div className="platforms-header">
            <span className="platforms-tag font-cinzel">THOUGHT LEADERSHIP &amp; PROFILES</span>
            <h3 className="platforms-title font-serif">Executive Platforms</h3>
          </div>

          <div className="platforms-grid">
            {PLATFORM_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="platform-card glass-card"
                onClick={playClick}
                onMouseEnter={playHover}
              >
                <div className="platform-card-header">
                  <span className="platform-name font-cinzel">{link.name}</span>
                  <ArrowUpRight size={15} className="platform-arrow" aria-hidden="true" />
                </div>
                <p className="platform-label">{link.label}</p>
                <span className="platform-handle">{link.handle}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Editorial Colophon & Back to Top */}
        <footer className="contact-colophon reveal-on-scroll" style={{ '--reveal-delay': '280ms' }}>
          <div className="colophon-divider" />

          <div className="colophon-content">
            <div className="colophon-info">
              <p className="colophon-copy">
                &copy; 2026 Mahi &bull; Founder &amp; Venture Strategist. All rights reserved.
              </p>
              <p className="colophon-subcopy">
                London Mayfair &bull; New York Hudson Yards &bull; Singapore Marina Bay &bull; Institutional Private Capital
              </p>
            </div>

            <button
              type="button"
              className="back-to-top-btn"
              onClick={handleScrollToTop}
              onMouseEnter={playHover}
              aria-label="Scroll back to top of page"
            >
              <span>Back to Top</span>
              <ArrowUp size={15} aria-hidden="true" />
            </button>
          </div>
        </footer>
      </div>
    </section>
  );
}
