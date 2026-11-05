import { ArrowRight, LifeBuoy, Phone, X } from 'lucide-react';
import { CONTACT } from '../../config/site-config.js';

export default function CrisisModal({ onClose }) {
  return <div className="overlay crisis-overlay" role="dialog" aria-modal="true" aria-labelledby="crisis-title">
    <div className="modal crisis-modal">
      <button className="modal-close" onClick={onClose} aria-label="Close immediate support"><X size={20} /></button>
      <div className="crisis-mark"><LifeBuoy size={24} /></div>
      <div className="eyebrow crisis-eyebrow">YOU DESERVE SUPPORT RIGHT NOW</div>
      <h2 id="crisis-title">You don’t have to<br />face this alone.</h2>
      <p>If you or someone nearby may be in immediate danger, call India’s 112 emergency service or go to the nearest emergency department.</p>
      <div className="crisis-options">
        <a className="crisis-call" href={`tel:${CONTACT.nationalEmergencyNumber}`}><Phone size={19} /><span><strong>Call national emergency services</strong><small>{CONTACT.nationalEmergencyNumber} · Police, fire or medical emergency</small></span><ArrowRight size={17} /></a>
        <a className="crisis-call" href={`tel:${CONTACT.emergencyNumber}`}><Phone size={19} /><span><strong>Rama University emergency support</strong><small>{CONTACT.emergencyNumber}</small></span><ArrowRight size={17} /></a>
        <a className="campus-call" href={`tel:${CONTACT.campusPhone}`}><span><strong>{CONTACT.campusLabel}</strong><small>{CONTACT.campusPhone}</small></span><ArrowRight size={17} /></a>
      </div>
      <p className="crisis-footer">If speaking feels difficult, show this screen to someone you trust or a staff member nearby.</p>
      <button className="crisis-close" onClick={onClose}>Close</button>
    </div>
  </div>;
}
