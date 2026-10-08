import React from 'react';

/**
 * ProjectMockup
 * 
 * Generative SVG/CSS visual artworks for Mahi's Selected Ventures:
 * - aura-capital: Geometric capital flow matrix, dynamic currency vectors, luxury gold/magenta lattices
 * - lumina-studio: Architectural brand prism, chromatic refractive shields, spatial minimalism
 * - apex-systems: Enterprise algorithmic network, cloud nodes, low-latency telemetry paths
 * - genesis-impact: Organic venture nexus, regenerative financial rings, radiant vitality
 */
export default function ProjectMockup({ id, className = '', isExpanded = false }) {
  switch (id) {
    case 'aura-capital':
      return <AuraCapitalMockup className={className} isExpanded={isExpanded} />;
    case 'lumina-studio':
      return <LuminaStudioMockup className={className} isExpanded={isExpanded} />;
    case 'apex-systems':
      return <ApexSystemsMockup className={className} isExpanded={isExpanded} />;
    case 'genesis-impact':
      return <GenesisImpactMockup className={className} isExpanded={isExpanded} />;
    default:
      return <AuraCapitalMockup className={className} isExpanded={isExpanded} />;
  }
}

/**
 * 1. Aura Capital: Geometric capital flow matrix, dynamic currency vectors, luxury gold/magenta lattices
 */
function AuraCapitalMockup({ className, isExpanded }) {
  return (
    <div className={`project-artwork artwork-aura ${className}`}>
      <svg
        viewBox="0 0 800 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="artwork-svg"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="aura-bg" cx="50%" cy="50%" r="70%">
            <stop offset="0%" stopColor="#3d152a" />
            <stop offset="60%" stopColor="#200d18" />
            <stop offset="100%" stopColor="#14070f" />
          </radialGradient>
          
          <linearGradient id="aura-gold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f7d070" />
            <stop offset="50%" stopColor="#d4af37" />
            <stop offset="100%" stopColor="#9a7b20" />
          </linearGradient>

          <linearGradient id="aura-magenta" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#e0218a" />
            <stop offset="100%" stopColor="#ff70b8" />
          </linearGradient>

          <linearGradient id="aura-vector-glow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#e0218a" stopOpacity="0" />
            <stop offset="50%" stopColor="#f7d070" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#e0218a" stopOpacity="0" />
          </linearGradient>

          <pattern id="aura-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="1" />
            <circle cx="0" cy="0" r="1.5" fill="rgba(212, 175, 55, 0.3)" />
          </pattern>

          <filter id="glow-gold" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Deep Luxury Backdrop */}
        <rect width="800" height="500" fill="url(#aura-bg)" />
        <rect width="800" height="500" fill="url(#aura-grid)" />

        {/* Atmospheric Radial Orbs */}
        <circle cx="400" cy="250" r="180" fill="#e0218a" opacity="0.12" filter="url(#glow-gold)" />
        <circle cx="560" cy="180" r="140" fill="#d4af37" opacity="0.08" filter="url(#glow-gold)" />

        {/* Perspective Lattice Lines (Capital Flow Matrix) */}
        <g stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1">
          <line x1="0" y1="120" x2="800" y2="120" />
          <line x1="0" y1="250" x2="800" y2="250" stroke="rgba(224, 33, 138, 0.2)" strokeDasharray="4 4" />
          <line x1="0" y1="380" x2="800" y2="380" />
          <line x1="200" y1="0" x2="200" y2="500" />
          <line x1="400" y1="0" x2="400" y2="500" stroke="rgba(212, 175, 55, 0.25)" />
          <line x1="600" y1="0" x2="600" y2="500" />
        </g>

        {/* Dynamic Curved Currency Vectors */}
        <path
          d="M 50 380 C 220 380, 260 140, 400 140 C 540 140, 600 320, 750 200"
          stroke="url(#aura-vector-glow)"
          strokeWidth="3"
          fill="none"
        />
        <path
          d="M 50 320 C 180 320, 280 440, 440 280 C 600 120, 680 180, 750 140"
          stroke="url(#aura-magenta)"
          strokeWidth="1.5"
          strokeDasharray="6 6"
          fill="none"
          opacity="0.7"
        />
        <path
          d="M 120 460 C 260 220, 480 380, 680 100"
          stroke="url(#aura-gold)"
          strokeWidth="1.5"
          fill="none"
          opacity="0.8"
        />

        {/* Concentric Geometric Matrix Rings */}
        <g transform="translate(400, 250)">
          <circle r="140" stroke="rgba(212, 175, 55, 0.15)" strokeWidth="1" strokeDasharray="3 6" />
          <circle r="100" stroke="url(#aura-gold)" strokeWidth="1.5" opacity="0.6" />
          <circle r="60" stroke="url(#aura-magenta)" strokeWidth="1.5" strokeDasharray="5 5" />
          
          {/* Diamond Lattice Core */}
          <polygon
            points="0,-48 48,0 0,48 -48,0"
            fill="rgba(224, 33, 138, 0.15)"
            stroke="url(#aura-gold)"
            strokeWidth="2"
          />
          <polygon
            points="0,-24 24,0 0,24 -24,0"
            fill="url(#aura-gold)"
            opacity="0.3"
          />
          <circle r="6" fill="#ffd700" filter="url(#glow-gold)" />
          
          {/* Vector Coordinates Crosshair */}
          <line x1="-70" y1="0" x2="-52" y2="0" stroke="#f7d070" strokeWidth="1.5" />
          <line x1="52" y1="0" x2="70" y2="0" stroke="#f7d070" strokeWidth="1.5" />
          <line x1="0" y1="-70" x2="0" y2="-52" stroke="#f7d070" strokeWidth="1.5" />
          <line x1="0" y1="52" x2="0" y2="70" stroke="#f7d070" strokeWidth="1.5" />
        </g>

        {/* Global Node Hubs */}
        <g transform="translate(200, 140)">
          <circle r="16" fill="rgba(224, 33, 138, 0.2)" stroke="url(#aura-magenta)" strokeWidth="1.5" />
          <circle r="4" fill="#ffffff" />
          <text x="24" y="4" fill="#ffd700" fontSize="10" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="600" letterSpacing="1">LONDON NODE</text>
        </g>
        <g transform="translate(600, 200)">
          <circle r="16" fill="rgba(212, 175, 55, 0.2)" stroke="url(#aura-gold)" strokeWidth="1.5" />
          <circle r="4" fill="#ffd700" />
          <text x="24" y="4" fill="#ff70b8" fontSize="10" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="600" letterSpacing="1">NYC TRANSIT</text>
        </g>
        <g transform="translate(320, 380)">
          <circle r="12" fill="rgba(255, 255, 255, 0.1)" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="1" />
          <circle r="3" fill="#ffffff" />
          <text x="20" y="4" fill="rgba(255, 255, 255, 0.7)" fontSize="9" fontFamily="'Plus Jakarta Sans', sans-serif" letterSpacing="0.8">ZURICH VAULT</text>
        </g>

        {/* Luxury Architectural Insignia Overlay */}
        <g transform="translate(50, 60)">
          <text fill="url(#aura-gold)" fontSize="11" fontFamily="'Cinzel', serif" fontWeight="700" letterSpacing="3">
            AURA CAPITAL GLOBAL
          </text>
          <text y="20" fill="rgba(255, 255, 255, 0.5)" fontSize="9" fontFamily="'Plus Jakarta Sans', sans-serif" letterSpacing="1.5">
            CROSS-BORDER LIQUIDITY MATRIX • €420M FUND II
          </text>
        </g>

        <g transform="translate(660, 450)">
          <text fill="rgba(212, 175, 55, 0.7)" fontSize="9" fontFamily="'Plus Jakarta Sans', sans-serif" letterSpacing="1.5" textAnchor="end">
            SYS: VECTOR_FLOW_ALPHA
          </text>
        </g>
      </svg>
    </div>
  );
}

/**
 * 2. Lumina Studio: Architectural brand prism, chromatic refractive shields, spatial minimalism
 */
function LuminaStudioMockup({ className, isExpanded }) {
  return (
    <div className={`project-artwork artwork-lumina ${className}`}>
      <svg
        viewBox="0 0 800 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="artwork-svg"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="lumina-bg" cx="50%" cy="50%" r="75%">
            <stop offset="0%" stopColor="#2c142b" />
            <stop offset="60%" stopColor="#180b19" />
            <stop offset="100%" stopColor="#0d040e" />
          </radialGradient>

          <linearGradient id="prism-beam" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#ffb3d9" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#e0218a" stopOpacity="0.4" />
          </linearGradient>

          <linearGradient id="spectrum-violet" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff77bb" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#7a22ff" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="spectrum-coral" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fca311" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#e0218a" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="spectrum-cyan" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff9ec6" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
          </linearGradient>

          <filter id="lumina-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="12" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Deep Obsidian Canvas */}
        <rect width="800" height="500" fill="url(#lumina-bg)" />

        {/* Minimalist Architectural Grid & Layout Markers */}
        <g stroke="rgba(255, 255, 255, 0.05)" strokeWidth="1">
          <line x1="80" y1="0" x2="80" y2="500" />
          <line x1="720" y1="0" x2="720" y2="500" />
          <line x1="0" y1="80" x2="800" y2="80" />
          <line x1="0" y1="420" x2="800" y2="420" />
          <circle cx="400" cy="250" r="210" stroke="rgba(255, 255, 255, 0.04)" strokeDasharray="2 4" />
        </g>

        {/* Focal Crosshairs */}
        <g stroke="rgba(224, 33, 138, 0.4)" strokeWidth="1">
          <path d="M 75 75 L 85 75 M 80 70 L 80 80" />
          <path d="M 715 75 L 725 75 M 720 70 L 720 80" />
          <path d="M 75 415 L 85 415 M 80 410 L 80 420" />
          <path d="M 715 415 L 725 415 M 720 410 L 720 420" />
        </g>

        {/* Chromatic Refraction Fan (Light Rays leaving Prism) */}
        <polygon points="380,240 760,110 760,190" fill="url(#spectrum-violet)" opacity="0.65" />
        <polygon points="380,240 760,210 760,280" fill="url(#spectrum-cyan)" opacity="0.75" />
        <polygon points="380,240 760,300 760,390" fill="url(#spectrum-coral)" opacity="0.6" />

        {/* Monochromatic Input Light Beam */}
        <polygon points="40,240 380,238 380,242 40,242" fill="url(#prism-beam)" />
        <circle cx="40" cy="240" r="4" fill="#ffffff" filter="url(#lumina-glow)" />

        {/* Architectural Prism Geometry (Central Crystalline Core) */}
        <g transform="translate(380, 240)">
          {/* Glass facet back */}
          <polygon
            points="0,-120 100,50 -100,50"
            fill="rgba(255, 240, 245, 0.04)"
            stroke="rgba(255, 255, 255, 0.3)"
            strokeWidth="1.5"
          />
          {/* Internal Refraction Plane */}
          <polygon
            points="0,-120 40,50 -100,50"
            fill="rgba(224, 33, 138, 0.12)"
            stroke="rgba(224, 33, 138, 0.6)"
            strokeWidth="1"
          />
          {/* Front Crystalline Shield Edge */}
          <line x1="0" y1="-120" x2="40" y2="50" stroke="#ffffff" strokeWidth="2" opacity="0.8" />
          <circle cx="0" cy="-120" r="3" fill="#ffffff" />
          <circle cx="100" cy="50" r="3" fill="#ff77bb" />
          <circle cx="-100" cy="50" r="3" fill="#ffffff" />

          {/* Prism Angle Calliper */}
          <path d="M -20,25 A 25 25 0 0 1 20,25" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="1" fill="none" strokeDasharray="2 2" />
          <text x="0" y="40" fill="rgba(255, 255, 255, 0.6)" fontSize="9" textAnchor="middle" fontFamily="'Plus Jakarta Sans', sans-serif">60.0° REFRACTION</text>
        </g>

        {/* Minimalist Floating Shields */}
        <polygon
          points="220,130 290,100 270,190 200,210"
          fill="rgba(255, 255, 255, 0.02)"
          stroke="rgba(224, 33, 138, 0.35)"
          strokeWidth="1"
        />
        <polygon
          points="520,320 600,280 580,390 510,410"
          fill="rgba(255, 255, 255, 0.02)"
          stroke="rgba(255, 179, 217, 0.3)"
          strokeWidth="1"
        />

        {/* Atelier Typography & Coordinates */}
        <g transform="translate(80, 115)">
          <text fill="#ffffff" fontSize="11" fontFamily="'Cinzel', serif" fontWeight="600" letterSpacing="3">
            LUMINA STRATEGIC ARCHITECTURE
          </text>
          <text y="20" fill="rgba(224, 33, 138, 0.9)" fontSize="9" fontFamily="'Plus Jakarta Sans', sans-serif" letterSpacing="1.8">
            PRISMATIC BRAND ARCHITECTURE • PARIS • MILAN • LONDON
          </text>
        </g>

        <g transform="translate(720, 410)">
          <text fill="rgba(255, 255, 255, 0.4)" fontSize="9" fontFamily="'Plus Jakarta Sans', sans-serif" letterSpacing="1.5" textAnchor="end">
            SPATIAL RATIO: 1.618 • UHNW BRAND MOAT
          </text>
        </g>
      </svg>
    </div>
  );
}

/**
 * 3. Apex Systems: Enterprise algorithmic network, cloud nodes, low-latency telemetry paths
 */
function ApexSystemsMockup({ className, isExpanded }) {
  return (
    <div className={`project-artwork artwork-apex ${className}`}>
      <svg
        viewBox="0 0 800 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="artwork-svg"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="apex-bg" cx="50%" cy="50%" r="75%">
            <stop offset="0%" stopColor="#25102a" />
            <stop offset="65%" stopColor="#140818" />
            <stop offset="100%" stopColor="#08020a" />
          </radialGradient>

          <linearGradient id="apex-accent" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff4da6" />
            <stop offset="50%" stopColor="#e0218a" />
            <stop offset="100%" stopColor="#871050" />
          </linearGradient>

          <linearGradient id="apex-cyan-line" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#e0218a" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#ff85c2" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#e0218a" stopOpacity="0.1" />
          </linearGradient>

          <pattern id="apex-dots" width="30" height="30" patternUnits="userSpaceOnUse">
            <circle cx="15" cy="15" r="1" fill="rgba(255, 255, 255, 0.08)" />
          </pattern>

          <filter id="apex-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Obsidian Enterprise Backdrop */}
        <rect width="800" height="500" fill="url(#apex-bg)" />
        <rect width="800" height="500" fill="url(#apex-dots)" />

        {/* Ambient Algorithmic Core Glow */}
        <circle cx="400" cy="250" r="150" fill="#e0218a" opacity="0.14" filter="url(#apex-glow)" />

        {/* Hexagonal Telemetry Backbone */}
        <g stroke="rgba(255, 255, 255, 0.1)" strokeWidth="1">
          <polygon points="400,120 512,185 512,315 400,380 288,315 288,185" fill="none" strokeDasharray="4 4" />
          <polygon points="400,160 478,205 478,295 400,340 322,295 322,205" fill="rgba(224, 33, 138, 0.05)" stroke="url(#apex-accent)" strokeWidth="1.5" />
        </g>

        {/* High-Throughput Distributed Telemetry Paths */}
        <g strokeWidth="1.5" stroke="rgba(255, 255, 255, 0.25)">
          {/* Main bus lines */}
          <line x1="80" y1="250" x2="322" y2="250" stroke="url(#apex-cyan-line)" strokeWidth="2" />
          <line x1="478" y1="250" x2="720" y2="250" stroke="url(#apex-cyan-line)" strokeWidth="2" />
          
          <line x1="160" y1="120" x2="288" y2="185" stroke="rgba(224, 33, 138, 0.5)" />
          <line x1="160" y1="380" x2="288" y2="315" stroke="rgba(224, 33, 138, 0.5)" />
          <line x1="640" y1="120" x2="512" y2="185" stroke="rgba(255, 133, 194, 0.5)" />
          <line x1="640" y1="380" x2="512" y2="315" stroke="rgba(255, 133, 194, 0.5)" />

          {/* Internal cross-routing */}
          <line x1="322" y1="205" x2="478" y2="295" stroke="rgba(224, 33, 138, 0.3)" />
          <line x1="322" y1="295" x2="478" y2="205" stroke="rgba(224, 33, 138, 0.3)" />
          <line x1="400" y1="160" x2="400" y2="340" stroke="rgba(255, 255, 255, 0.2)" strokeDasharray="3 3" />
        </g>

        {/* Enterprise Distributed Cloud Nodes */}
        {/* Core Node */}
        <g transform="translate(400, 250)">
          <circle r="28" fill="#140818" stroke="url(#apex-accent)" strokeWidth="2" />
          <circle r="14" fill="#e0218a" filter="url(#apex-glow)" />
          <circle r="5" fill="#ffffff" />
          <circle r="44" stroke="rgba(224, 33, 138, 0.4)" strokeWidth="1" strokeDasharray="4 6" />
        </g>

        {/* Edge Nodes */}
        <g transform="translate(288, 185)">
          <circle r="12" fill="#1b0b20" stroke="#ff85c2" strokeWidth="1.5" />
          <circle r="3" fill="#ffffff" />
          <text x="-16" y="-18" fill="rgba(255, 255, 255, 0.7)" fontSize="9" fontFamily="'Plus Jakarta Sans', sans-serif">NODE A1</text>
        </g>
        <g transform="translate(512, 185)">
          <circle r="12" fill="#1b0b20" stroke="#ff85c2" strokeWidth="1.5" />
          <circle r="3" fill="#ffffff" />
          <text x="-4" y="-18" fill="rgba(255, 255, 255, 0.7)" fontSize="9" fontFamily="'Plus Jakarta Sans', sans-serif">NODE B2</text>
        </g>
        <g transform="translate(288, 315)">
          <circle r="12" fill="#1b0b20" stroke="#e0218a" strokeWidth="1.5" />
          <circle r="3" fill="#ffffff" />
          <text x="-16" y="24" fill="rgba(255, 255, 255, 0.7)" fontSize="9" fontFamily="'Plus Jakarta Sans', sans-serif">NODE C3</text>
        </g>
        <g transform="translate(512, 315)">
          <circle r="12" fill="#1b0b20" stroke="#e0218a" strokeWidth="1.5" />
          <circle r="3" fill="#ffffff" />
          <text x="-4" y="24" fill="rgba(255, 255, 255, 0.7)" fontSize="9" fontFamily="'Plus Jakarta Sans', sans-serif">NODE D4</text>
        </g>

        {/* Telemetry Metric Badges */}
        <g transform="translate(80, 110)">
          <rect width="130" height="44" rx="6" fill="rgba(255, 255, 255, 0.04)" stroke="rgba(255, 255, 255, 0.12)" />
          <text x="12" y="18" fill="rgba(255, 255, 255, 0.5)" fontSize="8" fontFamily="'Plus Jakarta Sans', sans-serif" letterSpacing="1">TELEMETRY LATENCY</text>
          <text x="12" y="34" fill="#ff85c2" fontSize="13" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="700">0.42 ms • p99</text>
        </g>
        <g transform="translate(590, 360)">
          <rect width="130" height="44" rx="6" fill="rgba(255, 255, 255, 0.04)" stroke="rgba(255, 255, 255, 0.12)" />
          <text x="12" y="18" fill="rgba(255, 255, 255, 0.5)" fontSize="8" fontFamily="'Plus Jakarta Sans', sans-serif" letterSpacing="1">ENTERPRISE SCALE</text>
          <text x="12" y="34" fill="#ffffff" fontSize="13" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="700">$65M ARR / C-ROUND</text>
        </g>

        {/* System Header */}
        <g transform="translate(50, 60)">
          <text fill="#ffffff" fontSize="11" fontFamily="'Cinzel', serif" fontWeight="700" letterSpacing="3">
            APEX OPERATIONAL PLATFORM
          </text>
          <text y="20" fill="#ff85c2" fontSize="9" fontFamily="'Plus Jakarta Sans', sans-serif" letterSpacing="1.5">
            ALGORITHMIC INFRASTRUCTURE • HYPER-GROWTH SCALE DIRECTORY
          </text>
        </g>

        <g transform="translate(750, 60)">
          <circle cx="-10" cy="-4" r="4" fill="#10b981" />
          <text fill="#10b981" fontSize="9" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="600" letterSpacing="1" textAnchor="end">
            SYS STATUS: OPTIMAL
          </text>
        </g>
      </svg>
    </div>
  );
}

/**
 * 4. Genesis Impact: Organic venture nexus, regenerative financial rings, radiant vitality
 */
function GenesisImpactMockup({ className, isExpanded }) {
  return (
    <div className={`project-artwork artwork-genesis ${className}`}>
      <svg
        viewBox="0 0 800 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="artwork-svg"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="genesis-bg" cx="50%" cy="50%" r="75%">
            <stop offset="0%" stopColor="#3a162b" />
            <stop offset="50%" stopColor="#240c1a" />
            <stop offset="100%" stopColor="#12040d" />
          </radialGradient>

          <linearGradient id="genesis-vitality" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff8ba7" />
            <stop offset="40%" stopColor="#e0218a" />
            <stop offset="100%" stopColor="#ffb3c6" />
          </linearGradient>

          <linearGradient id="genesis-dawn" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#e0218a" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#fca311" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#ffccd5" stopOpacity="0.9" />
          </linearGradient>

          <filter id="genesis-bloom" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="16" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Radiant Canvas */}
        <rect width="800" height="500" fill="url(#genesis-bg)" />

        {/* Organic Vitality Glow Halo */}
        <circle cx="400" cy="250" r="160" fill="#e0218a" opacity="0.18" filter="url(#genesis-bloom)" />
        <circle cx="400" cy="250" r="90" fill="#ff8ba7" opacity="0.12" filter="url(#genesis-bloom)" />

        {/* Interlocking Regenerative Financial Rings (Circular Torus / Nexus) */}
        <g strokeWidth="1.5" fill="none">
          {/* Ring 1 - North-West */}
          <ellipse
            cx="340"
            cy="220"
            rx="140"
            ry="90"
            transform="rotate(-25 340 220)"
            stroke="url(#genesis-vitality)"
            strokeOpacity="0.75"
          />
          {/* Ring 2 - South-East */}
          <ellipse
            cx="460"
            cy="280"
            rx="140"
            ry="90"
            transform="rotate(25 460 280)"
            stroke="url(#genesis-dawn)"
            strokeOpacity="0.75"
          />
          {/* Ring 3 - Outer Equator */}
          <ellipse
            cx="400"
            cy="250"
            rx="210"
            ry="120"
            stroke="rgba(255, 255, 255, 0.15)"
            strokeDasharray="6 8"
          />
        </g>

        {/* Organic Radial Petal/Lattice Nodes (Expanding Vitality) */}
        <g transform="translate(400, 250)">
          {/* 8-fold radial seed axes */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
            <g key={angle} transform={`rotate(${angle})`}>
              <line x1="20" y1="0" x2="110" y2="0" stroke="rgba(255, 180, 200, 0.2)" strokeWidth="1" strokeDasharray="2 3" />
              <circle cx="70" cy="0" r="3" fill="#ff8ba7" opacity="0.6" />
              <circle cx="110" cy="0" r="5" fill="rgba(224, 33, 138, 0.4)" stroke="#ffb3c6" strokeWidth="1" />
            </g>
          ))}

          {/* Golden Ratio Center Core */}
          <circle r="46" fill="rgba(224, 33, 138, 0.18)" stroke="url(#genesis-vitality)" strokeWidth="2" />
          <circle r="28" fill="rgba(255, 255, 255, 0.05)" stroke="#ffccd5" strokeWidth="1" strokeDasharray="3 3" />
          <circle r="10" fill="#ffffff" filter="url(#genesis-bloom)" />
          
          {/* Subtle Compass Rose Lines */}
          <line x1="-55" y1="0" x2="55" y2="0" stroke="#ffccd5" strokeWidth="1" opacity="0.5" />
          <line x1="0" y1="-55" x2="0" y2="55" stroke="#ffccd5" strokeWidth="1" opacity="0.5" />
        </g>

        {/* Impact Satellite Nodes with Connectors */}
        <g transform="translate(180, 150)">
          <circle r="18" fill="rgba(224, 33, 138, 0.25)" stroke="#ff8ba7" strokeWidth="1.5" />
          <circle r="4" fill="#ffffff" />
          <text x="26" y="4" fill="#ffccd5" fontSize="10" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="600" letterSpacing="1">FEMALE FOUNDER SYNDICATE</text>
        </g>
        <g transform="translate(620, 340)">
          <circle r="18" fill="rgba(255, 139, 167, 0.2)" stroke="#e0218a" strokeWidth="1.5" />
          <circle r="4" fill="#ff8ba7" />
          <text x="-26" y="4" fill="#ffccd5" fontSize="10" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="600" letterSpacing="1" textAnchor="end">REGENERATIVE CLIMATE</text>
        </g>

        {/* Editorial Title & Mission Badges */}
        <g transform="translate(50, 60)">
          <text fill="#ffffff" fontSize="11" fontFamily="'Cinzel', serif" fontWeight="700" letterSpacing="3">
            GENESIS IMPACT INITIATIVE
          </text>
          <text y="20" fill="#ff8ba7" fontSize="9" fontFamily="'Plus Jakarta Sans', sans-serif" letterSpacing="1.5">
            ETHICAL VENTURE BACKING • REGENERATIVE CAPITAL MODELS
          </text>
        </g>

        <g transform="translate(65, 430)">
          <text fill="rgba(255, 255, 255, 0.6)" fontSize="9" fontFamily="'Plus Jakarta Sans', sans-serif" letterSpacing="1.5">
            $150M EVERGREEN VEHICLE • SYSTEMIC ALPHA
          </text>
        </g>
      </svg>
    </div>
  );
}
