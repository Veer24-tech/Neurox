import { Heart, RotateCcw, ShieldCheck } from 'lucide-react';

export default function AppHeader({ largeText, onToggleText, onClear }) {
  return <header className="topbar">
    <a className="brand" href="#home" onClick={(event) => { event.preventDefault(); onClear(); }} aria-label="Here for You home">
      <span className="brand-mark"><Heart size={21} fill="currentColor" /></span>
      <span>here for you<span className="brand-sub">CAMPUS WELLBEING</span></span>
    </a>
    <div className="privacy"><ShieldCheck size={17} /><span>Private by design</span><span className="privacy-dot" /></div>
    <div className="header-actions">
      <button className="text-size-button" aria-label="Toggle larger text" aria-pressed={largeText} onClick={onToggleText}>A<span>A</span></button>
      <button className="clear-button" onClick={onClear}><RotateCcw size={16} /><span>Clear session</span></button>
    </div>
  </header>;
}
