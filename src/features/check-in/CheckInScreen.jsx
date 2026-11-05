import { ArrowLeft, ArrowRight, Check } from 'lucide-react';

const intensityOptions = [
  { id: 'a-little', label: 'A little', note: 'I can manage, with some care', icon: '🌿' },
  { id: 'a-fair-bit', label: 'A fair bit', note: 'It’s taking up some space', icon: '🌥️' },
  { id: 'a-lot', label: 'A lot', note: 'I could use more support', icon: '🌧️' },
];

export default function CheckInScreen({ step, setStep, feelings, feeling, setFeeling, intensity, setIntensity }) {
  const isFeelingStep = step === 'feeling';

  return <section className="flow view-enter">
    <button className="back-button" onClick={() => setStep(isFeelingStep ? 'welcome' : 'feeling')}><ArrowLeft size={17} /> Back</button>
    <div className="progress-label">YOUR CHECK-IN <span>{isFeelingStep ? '1 OF 2' : '2 OF 2'}</span></div>
    <div className="progress-track"><span style={{ width: isFeelingStep ? '50%' : '100%' }} /></div>
    <div className="flow-heading">
      <div className="eyebrow"><span className="eyebrow-line" /> {isFeelingStep ? 'NO WRONG ANSWERS' : 'THANKS FOR CHECKING IN'}</div>
      <h2>{isFeelingStep ? <>What feels closest<br />to how you are today?</> : <>How much is this<br />weighing on you?</>}</h2>
      <p>{isFeelingStep ? 'Pick the one that fits best right now. You can change it any time.' : 'No need to overthink it. Choose what feels about right.'}</p>
    </div>
    {isFeelingStep ? <div className="feeling-grid">{feelings.map((item) => <button key={item.id} className={`feeling-card ${item.tint} ${feeling === item.id ? 'selected' : ''}`} onClick={() => setFeeling(item.id)} aria-pressed={feeling === item.id}><span className="feeling-emoji">{item.icon}</span><span className="feeling-words"><strong>{item.label}</strong><small>{item.note}</small></span><span className="radio-mark">{feeling === item.id && <Check size={15} />}</span></button>)}</div> : <div className="intensity-list">{intensityOptions.map((option) => <button className={`intensity-card ${intensity === option.id ? 'selected' : ''}`} key={option.id} onClick={() => setIntensity(option.id)} aria-pressed={intensity === option.id}><span className="feeling-emoji">{option.icon}</span><span className="feeling-words"><strong>{option.label}</strong><small>{option.note}</small></span><span className="radio-mark">{intensity === option.id && <Check size={15} />}</span></button>)}</div>}
    <div className="flow-actions">
      <span>{isFeelingStep ? 'Your answer isn’t stored or shared.' : 'This is a reflection, not a diagnosis.'}</span>
      <button className="primary-button" disabled={isFeelingStep ? !feeling : !intensity} onClick={() => setStep(isFeelingStep ? 'intensity' : 'results')}>{isFeelingStep ? 'Continue' : 'See suggestions'} <ArrowRight size={18} /></button>
    </div>
  </section>;
}
