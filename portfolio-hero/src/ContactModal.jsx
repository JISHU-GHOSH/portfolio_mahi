import React, { useState, useEffect, useCallback } from 'react';
import {
  X,
  CheckCircle2,
  Send,
  Building,
  User,
  Mail,
  FileText,
  ShieldCheck,
  RefreshCw,
} from 'lucide-react';
import { playClick, playHover, playOpen, playClose } from './soundEffects';
import './ContactModal.css';

const CATEGORIES = [
  'Venture Capital / LP',
  'Board Advisory',
  'Enterprise Scaling',
  'Strategic Consultation',
];

export default function ContactModal({ isOpen, onClose }) {
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    scope: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [refId, setRefId] = useState('');

  // Handle modal close with sound and cleanup
  const handleClose = useCallback(() => {
    playClose();
    onClose();
  }, [onClose]);

  // Sound & body scroll lock lifecycle
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

  const handleCategorySelect = (cat) => {
    playClick();
    setCategory(cat);
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Please provide your full executive name.';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Please provide a valid work or firm email.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!formData.organization.trim()) {
      newErrors.organization = 'Please provide your organization or fund vehicle.';
    }
    if (!formData.scope.trim()) {
      newErrors.scope = 'Please briefly outline the mandate scope or engagement thesis.';
    } else if (formData.scope.trim().length < 10) {
      newErrors.scope = 'Please provide at least 10 characters detailing the mandate.';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    playClick();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    // Simulate high-assurance submission
    setTimeout(() => {
      const generatedRef = `MHI-${Math.floor(1000 + Math.random() * 9000)}-${new Date().getFullYear()}`;
      setRefId(generatedRef);
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 450);
  };

  const handleReset = () => {
    playClick();
    setFormData({
      name: '',
      email: '',
      organization: '',
      scope: '',
    });
    setErrors({});
    setIsSubmitted(false);
  };

  return (
    <div
      className="contact-modal-backdrop"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-heading"
    >
      <div
        className="contact-modal-dialog"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="modal-header">
          <div className="modal-header-meta">
            <span className="modal-badge font-cinzel">EXECUTIVE MANDATE INQUIRY</span>
            <div className="modal-sla-tag">
              <ShieldCheck size={14} aria-hidden="true" />
              <span>Direct Routing &bull; 24h SLA</span>
            </div>
          </div>

          <button
            type="button"
            className="modal-close-btn"
            onClick={handleClose}
            onMouseEnter={playHover}
            aria-label="Close inquiry window"
          >
            <X size={20} />
          </button>
        </div>

        {isSubmitted ? (
          /* Confirmation Screen */
          <div className="modal-confirmation">
            <div className="confirmation-icon-wrap">
              <CheckCircle2 size={48} className="confirmation-check" aria-hidden="true" />
            </div>

            <h3 id="contact-modal-heading" className="confirmation-title font-serif">
              Inquiry Received
            </h3>

            <p className="confirmation-lead">
              Executive office will respond within 24 hours.
            </p>

            <p className="confirmation-desc">
              Your confidential inquiry has been routed directly to Mahi&apos;s executive triage office. A partner or executive associate will review the mandate parameters and respond to the contact details provided.
            </p>

            {/* Reference Summary Dossier Card */}
            <div className="confirmation-card glass-card">
              <div className="confirm-row">
                <span className="confirm-lbl">Reference ID</span>
                <span className="confirm-val font-mono">{refId}</span>
              </div>
              <div className="confirm-row">
                <span className="confirm-lbl">Engagement Category</span>
                <span className="confirm-val">{category}</span>
              </div>
              <div className="confirm-row">
                <span className="confirm-lbl">Organization / Fund</span>
                <span className="confirm-val">{formData.organization}</span>
              </div>
              <div className="confirm-row">
                <span className="confirm-lbl">Executive Contact</span>
                <span className="confirm-val">{formData.email}</span>
              </div>
            </div>

            <div className="confirmation-actions">
              <button
                type="button"
                className="btn-editorial btn-primary"
                onClick={handleClose}
                onMouseEnter={playHover}
              >
                Close Window
              </button>

              <button
                type="button"
                className="btn-editorial btn-secondary"
                onClick={handleReset}
                onMouseEnter={playHover}
              >
                <RefreshCw size={15} aria-hidden="true" />
                <span>Submit Another Inquiry</span>
              </button>
            </div>
          </div>
        ) : (
          /* Inquiry Form Screen */
          <form className="modal-form" onSubmit={handleSubmit} noValidate>
            <div className="modal-heading-group">
              <h3 id="contact-modal-heading" className="modal-title font-serif">
                Initiate Strategic Dialogue
              </h3>
              <p className="modal-intro">
                Select your mandate focus and submit executive parameters for investment, directorship, or advisory engagement.
              </p>
            </div>

            {/* Category Selector Pills */}
            <div className="category-selection-block">
              <label className="field-label">Mandate Engagement Category</label>
              <div className="category-pills-row" role="radiogroup" aria-label="Select mandate engagement category">
                {CATEGORIES.map((cat) => {
                  const isSelected = category === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      className={`modal-cat-pill ${isSelected ? 'is-selected' : ''}`}
                      onClick={() => handleCategorySelect(cat)}
                      onMouseEnter={playHover}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Form Fields Grid */}
            <div className="form-fields-grid">
              {/* Full Name */}
              <div className="form-field-group">
                <label htmlFor="inquiry-name" className="field-label">
                  <User size={14} aria-hidden="true" />
                  <span>Full Name</span>
                </label>
                <input
                  id="inquiry-name"
                  type="text"
                  className={`modal-input ${errors.name ? 'has-error' : ''}`}
                  placeholder="e.g. Marcus Vance"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  autoComplete="name"
                />
                {errors.name && <span className="field-error-msg">{errors.name}</span>}
              </div>

              {/* Direct Email */}
              <div className="form-field-group">
                <label htmlFor="inquiry-email" className="field-label">
                  <Mail size={14} aria-hidden="true" />
                  <span>Executive Email</span>
                </label>
                <input
                  id="inquiry-email"
                  type="email"
                  className={`modal-input ${errors.email ? 'has-error' : ''}`}
                  placeholder="e.g. mvance@vanceholdings.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  autoComplete="email"
                />
                {errors.email && <span className="field-error-msg">{errors.email}</span>}
              </div>

              {/* Organization / Fund */}
              <div className="form-field-group form-field-full">
                <label htmlFor="inquiry-org" className="field-label">
                  <Building size={14} aria-hidden="true" />
                  <span>Organization / Fund Vehicle</span>
                </label>
                <input
                  id="inquiry-org"
                  type="text"
                  className={`modal-input ${errors.organization ? 'has-error' : ''}`}
                  placeholder="e.g. Vance Global Growth Fund III / Apex Systems Inc."
                  value={formData.organization}
                  onChange={(e) => handleInputChange('organization', e.target.value)}
                  autoComplete="organization"
                />
                {errors.organization && <span className="field-error-msg">{errors.organization}</span>}
              </div>

              {/* Mandate Scope & Timeline */}
              <div className="form-field-group form-field-full">
                <label htmlFor="inquiry-scope" className="field-label">
                  <FileText size={14} aria-hidden="true" />
                  <span>Mandate Scope &amp; Timeline</span>
                </label>
                <textarea
                  id="inquiry-scope"
                  rows={4}
                  className={`modal-textarea ${errors.scope ? 'has-error' : ''}`}
                  placeholder="Outline the engagement context, capital vehicle or board mandate scope, target milestones, and desired commencement timeline..."
                  value={formData.scope}
                  onChange={(e) => handleInputChange('scope', e.target.value)}
                />
                {errors.scope && <span className="field-error-msg">{errors.scope}</span>}
              </div>
            </div>

            {/* Modal Form Footer */}
            <div className="modal-form-footer">
              <div className="confidentiality-notice">
                <ShieldCheck size={15} aria-hidden="true" />
                <span>All communications held in strict fiduciary confidence.</span>
              </div>

              <div className="modal-btn-row">
                <button
                  type="button"
                  className="btn-editorial btn-secondary"
                  onClick={handleClose}
                  onMouseEnter={playHover}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="btn-editorial btn-primary submit-btn"
                  disabled={isSubmitting}
                  onMouseEnter={playHover}
                >
                  {isSubmitting ? (
                    <span>Transmitting...</span>
                  ) : (
                    <>
                      <span>Transmit Inquiry</span>
                      <Send size={15} aria-hidden="true" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
