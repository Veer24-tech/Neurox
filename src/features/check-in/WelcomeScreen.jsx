import { ArrowRight, Clock3, Heart, LifeBuoy, LockKeyhole, ShieldCheck, Sparkles } from 'lucide-react';

export default function WelcomeScreen({ onStart }) {
  return <section className="welcome view-enter">
    <div className="welcome-copy">
      <div className="eyebrow"><span className="eyebrow-line" /> A MOMENT FOR YOU</div>
      <h1>How are you<br />really <em>feeling?</em></h1>
      <p className="lead">Take a quiet moment to check in. There’s no right answer, and you can leave whenever you like.</p>
      <button className="primary-button" onClick={onStart}>Start a check-in <ArrowRight size={18} /></button>
      <div className="reassurance"><LockKeyhole size={15} /> No sign-in. Nothing is saved.</div>
    </div>
    <div className="welcome-art" aria-hidden="true">
      <div className="sun-halo" /><div className="sun" /><div className="hill hill-back" /><div className="hill hill-front" />
      <div className="art-note"><span className="note-icon"><Sparkles size={18} /></span><span><strong>A little space to breathe</strong><small>Here, at your own pace</small></span></div>
      <div className="floating-leaf leaf-one">✳</div><div className="floating-leaf leaf-two">✳</div>
    </div>
    <div className="welcome-bottom">
      <div className="feature"><span className="feature-icon green"><ShieldCheck size={19} /></span><span><strong>Just for this moment</strong><small>Your answers stay on this screen</small></span></div>
      <div className="feature"><span className="feature-icon lilac"><Clock3 size={19} /></span><span><strong>About 2 minutes</strong><small>Go at whatever pace feels right</small></span></div>
      <div className="feature"><span className="feature-icon peach"><LifeBuoy size={19} /></span><span><strong>Support is always close</strong><small>Immediate help is one tap away</small></span></div>
    </div>
  </section>;
}
