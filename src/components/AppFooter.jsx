import { LifeBuoy } from 'lucide-react';

export default function AppFooter({ onImmediateSupport }) {
  return <footer className="footer">
    <span>Take what’s useful. Leave the rest.</span>
    <button onClick={onImmediateSupport}><LifeBuoy size={17} /> I need immediate support</button>
  </footer>;
}
