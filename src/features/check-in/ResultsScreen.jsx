import { ArrowRight, QrCode, RotateCcw, ShieldCheck } from 'lucide-react';
import { campusResources } from '../../config/site-config.js';
import { feelings, suggestions } from './content.js';

export default function ResultsScreen({ feeling, intensity, onClear, onCreateHandoff, handoffLoading, handoffError }) {
  const selectedFeeling = feelings.find((item) => item.id === feeling);
  const result = suggestions[feeling] || suggestions.unsure;

  return <section className="results view-enter">
    <div className="result-topline"><div className="eyebrow"><span className="eyebrow-line" /> A FEW IDEAS FOR YOU</div><button className="start-over" onClick={onClear}><RotateCcw size={15} /> Start over</button></div>
    <div className="result-intro"><span className="result-sun">✳</span><div><p className="result-context">You shared that you’re feeling <strong>{selectedFeeling?.label.toLowerCase()}</strong>{intensity === 'a-lot' ? ', and that it feels like a lot right now' : ''}.</p><h2>{result.title}</h2><p>{result.intro}</p></div></div>
    <div className="suggestion-grid">{result.cards.map(({ icon: Icon, title, text }, index) => <article className="suggestion-card" key={title}><span className={`suggestion-icon icon-${index}`}><Icon size={19} /></span><div><span className="card-kicker">A SMALL NEXT STEP</span><h3>{title}</h3><p>{text}</p></div></article>)}</div>
    <div className="resource-section">
      <div className="resource-heading"><div><div className="eyebrow"><span className="eyebrow-line" /> IF YOU’D LIKE MORE</div><h3>Support is here when you need it</h3></div><span className="resource-hint"><ShieldCheck size={15} /> Your choice, always</span></div>
      <div className="resource-list">{campusResources.map((resource, index) => <div className={`resource-link ${resource.href ? '' : 'resource-unconfigured'}`} key={resource.title}><span className="resource-number">0{index + 1}</span><span><strong>{resource.title}</strong><small>{resource.href ? resource.detail : `${resource.detail} · Ask campus staff for details`}</small></span>{resource.href ? <a href={resource.href} target="_blank" rel="noreferrer" aria-label={`Open ${resource.title}`}><ArrowRight size={17} /></a> : <ShieldCheck size={15} aria-hidden="true" />}</div>)}</div>
    </div>
    <div className="takeaway-row"><div className="takeaway-copy"><span className="qr-icon"><QrCode size={20} /></span><span><strong>Want to take these ideas with you?</strong><small>One scan, one use. Expires after 60 seconds.</small></span></div><button className="secondary-button" onClick={onCreateHandoff} disabled={handoffLoading}><QrCode size={16} /> {handoffLoading ? 'Preparing…' : 'Show QR code'}</button></div>
    {handoffError && <p className="handoff-error" role="alert">{handoffError}</p>}
    <p className="gentle-note">This kiosk offers general wellbeing information, not medical advice or a diagnosis.</p>
  </section>;
}
