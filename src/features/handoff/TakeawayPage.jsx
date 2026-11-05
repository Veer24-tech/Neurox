import { Clock3, Heart, ShieldCheck } from 'lucide-react';
import { suggestions } from '../check-in/content.js';

export default function TakeawayPage({ data, hasExpired }) {
  const result = suggestions[data?.feeling] || suggestions.unsure;

  return <main className="takeaway-page">
    <div className="takeaway-brand"><span className="brand-mark"><Heart size={20} fill="currentColor" /></span><span>here for you<small>CAMPUS WELLBEING</small></span></div>
    {hasExpired ? <section className="takeaway-expired"><span className="modal-symbol"><Clock3 size={22} /></span><h1>This QR code has expired</h1><p>It may have already been used. Ask the kiosk to create a new code.</p></section>
      : !data ? <section className="takeaway-expired"><span className="modal-symbol"><Clock3 size={22} /></span><h1>Opening your ideas…</h1><p>This may take a moment.</p></section>
        : <section className="takeaway-content"><div className="eyebrow"><span className="eyebrow-line" /> A FEW IDEAS FOR YOU</div><h1>{result.title}</h1><p className="takeaway-lead">{result.intro}</p>{result.cards.map(({ icon: Icon, title, text }) => <article className="suggestion-card" key={title}><span className="suggestion-icon"><Icon size={19} /></span><div><h3>{title}</h3><p>{text}</p></div></article>)}<div className="takeaway-disclaimer"><ShieldCheck size={16} /> General wellbeing ideas, not medical advice.</div></section>}
  </main>;
}
