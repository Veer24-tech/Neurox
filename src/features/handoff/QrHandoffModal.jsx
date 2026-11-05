import { QrCode, X } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

export default function QrHandoffModal({ seconds, resourceUrl, onClose }) {
  return <div className="overlay" role="dialog" aria-modal="true" aria-labelledby="qr-title">
    <div className="modal qr-modal">
      <button className="modal-close" onClick={onClose} aria-label="Close QR code"><X size={20} /></button>
      <div className="modal-symbol qr-symbol"><QrCode size={22} /></div>
      <div className="eyebrow centered"><span className="eyebrow-line" /> PRIVATE TAKEAWAY <span className="eyebrow-line" /></div>
      <h2 id="qr-title">Take a little support<br />with you</h2>
      <p>Scan this code to open your suggestions on your phone. This code expires in <strong>{seconds} seconds</strong>.</p>
      <div className="qr-wrap"><QRCodeSVG value={resourceUrl} size={184} level="M" includeMargin /></div>
      <div className="qr-expiry"><span className="expiry-dot" /> This code works only on this device session</div>
      <button className="secondary-button modal-done" onClick={onClose}>Done</button>
    </div>
  </div>;
}
