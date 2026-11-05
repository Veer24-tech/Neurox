import { useCallback, useEffect, useRef, useState } from 'react';
import AppFooter from '../components/AppFooter.jsx';
import AppHeader from '../components/AppHeader.jsx';
import CheckInScreen from '../features/check-in/CheckInScreen.jsx';
import ResultsScreen from '../features/check-in/ResultsScreen.jsx';
import WelcomeScreen from '../features/check-in/WelcomeScreen.jsx';
import QrHandoffModal from '../features/handoff/QrHandoffModal.jsx';
import TakeawayPage from '../features/handoff/TakeawayPage.jsx';
import CrisisModal from '../features/support/CrisisModal.jsx';
import { feelings } from '../features/check-in/content.js';

export default function App() {
  const [step, setStep] = useState('welcome');
  const [feeling, setFeeling] = useState(null);
  const [intensity, setIntensity] = useState(null);
  const [crisisOpen, setCrisisOpen] = useState(false);
  const [handoff, setHandoff] = useState(false);
  const [handoffLoading, setHandoffLoading] = useState(false);
  const [handoffToken, setHandoffToken] = useState('');
  const [handoffError, setHandoffError] = useState('');
  const [handoffEnds, setHandoffEnds] = useState(0);
  const [takeawayData, setTakeawayData] = useState(null);
  const [takeawayError, setTakeawayError] = useState(false);
  const [largeText, setLargeText] = useState(false);
  const [seconds, setSeconds] = useState(60);
  const resetTimer = useRef(null);
  const handoffTimer = useRef(null);
  const takeawayFetchStarted = useRef(false);
  const sessionGeneration = useRef(0);

  const discardHandoff = useCallback((token) => {
    if (token) fetch(`/api/handoffs/${encodeURIComponent(token)}`, { method: 'DELETE', cache: 'no-store' }).catch(() => {});
  }, []);

  const clearSession = useCallback(() => {
    sessionGeneration.current += 1;
    discardHandoff(handoffToken);
    setStep('welcome');
    setFeeling(null);
    setIntensity(null);
    setCrisisOpen(false);
    setHandoff(false);
    setHandoffEnds(0);
    setHandoffToken('');
    setSeconds(60);
    clearTimeout(handoffTimer.current);
  }, [discardHandoff, handoffToken]);

  const closeHandoff = () => {
    discardHandoff(handoffToken);
    setHandoff(false);
    setHandoffToken('');
  };

  useEffect(() => {
    const activity = () => {
      clearTimeout(resetTimer.current);
      resetTimer.current = setTimeout(clearSession, 90_000);
    };
    ['pointerdown', 'keydown', 'touchstart'].forEach((event) => window.addEventListener(event, activity, { passive: true }));
    activity();
    return () => {
      ['pointerdown', 'keydown', 'touchstart'].forEach((event) => window.removeEventListener(event, activity));
      clearTimeout(resetTimer.current);
      clearTimeout(handoffTimer.current);
    };
  }, [clearSession]);

  useEffect(() => {
    if (!handoff) return undefined;
    const tick = () => {
      const remaining = Math.max(0, Math.ceil((handoffEnds - Date.now()) / 1000));
      setSeconds(remaining);
      if (remaining <= 0) setHandoff(false);
    };
    tick();
    const interval = setInterval(tick, 500);
    return () => clearInterval(interval);
  }, [handoff, handoffEnds]);

  useEffect(() => {
    if (window.location.pathname !== '/takeaway' || takeawayFetchStarted.current) return;
    takeawayFetchStarted.current = true;
    const token = new URLSearchParams(window.location.search).get('token');
    if (!token || !/^[A-Za-z0-9_-]{32}$/.test(token)) {
      setTakeawayError(true);
      return;
    }
    fetch(`/api/handoffs/${encodeURIComponent(token)}`, { cache: 'no-store' })
      .then((response) => response.ok ? response.json() : Promise.reject(new Error('expired')))
      .then((data) => setTakeawayData(data))
      .catch(() => setTakeawayError(true));
  }, []);

  const startHandoff = async () => {
    const generation = sessionGeneration.current;
    setHandoffLoading(true);
    setHandoffError('');
    try {
      const response = await fetch('/api/handoffs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        cache: 'no-store',
        body: JSON.stringify({ feeling: feeling || 'unsure', intensity: intensity || 'a-little' }),
      });
      if (!response.ok) throw new Error('Could not create a handoff. Please try again.');
      const data = await response.json();
      if (generation !== sessionGeneration.current) {
        discardHandoff(data.token);
        return;
      }
      setHandoffToken(data.token);
      setHandoffEnds(data.expiresAt);
      setSeconds(60);
      setHandoff(true);
      clearTimeout(handoffTimer.current);
      handoffTimer.current = setTimeout(() => setHandoff(false), Math.max(0, data.expiresAt - Date.now()));
    } catch {
      setHandoffError('The private handoff is unavailable right now. Please try again.');
    } finally {
      setHandoffLoading(false);
    }
  };

  if (window.location.pathname === '/takeaway') {
    return <TakeawayPage data={takeawayData} hasExpired={takeawayError} />;
  }

  const resourceUrl = `${window.location.origin}/takeaway?token=${encodeURIComponent(handoffToken)}`;

  return <main className={`app-shell ${largeText ? 'large-text' : ''}`}>
    <AppHeader largeText={largeText} onToggleText={() => setLargeText((value) => !value)} onClear={clearSession} />
    <div className="main-content">
      {step === 'welcome' && <WelcomeScreen onStart={() => setStep('feeling')} />}
      {(step === 'feeling' || step === 'intensity') && <CheckInScreen step={step} setStep={setStep} feelings={feelings} feeling={feeling} setFeeling={setFeeling} intensity={intensity} setIntensity={setIntensity} />}
      {step === 'results' && <ResultsScreen feeling={feeling} intensity={intensity} onClear={clearSession} onCreateHandoff={startHandoff} handoffLoading={handoffLoading} handoffError={handoffError} />}
    </div>
    <AppFooter onImmediateSupport={() => setCrisisOpen(true)} />
    {handoff && <QrHandoffModal seconds={seconds} resourceUrl={resourceUrl} onClose={closeHandoff} />}
    {crisisOpen && <CrisisModal onClose={() => setCrisisOpen(false)} />}
  </main>;
}
