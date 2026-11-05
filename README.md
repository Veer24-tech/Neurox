# Here for You · Campus Wellbeing Kiosk

A touch-friendly, anonymous wellbeing check-in kiosk built with React, Vite, and a small Express API. Answers remain in browser memory except when a user explicitly creates a QR handoff; the API holds that handoff in memory for up to 60 seconds, serves it once, and deletes it when read or expired.

## Run locally

```sh
npm install
npm run dev
```

This runs the Vite UI at `http://localhost:5173` and the API at `http://localhost:4173`. Vite also listens on the local network so a phone on the same trusted Wi-Fi can open the displayed LAN URL and scan a QR handoff. The Vite proxy forwards the phone's `/api` requests to the local Express process. Allow Node.js through the private-network firewall if Windows prompts. The API's `/api/health` endpoint returns its status. Node.js 20.6 or later is required.

## Campus configuration

The project is preconfigured for Rama University's Mandhana campus in Kanpur. It links the official student counselling page, academic remedial support, and Dean of Student Welfare. The emergency and campus support numbers were supplied and confirmed by the user. India's 112 emergency number is the national fallback. `.env.example` documents these values; `src/site-config.js` includes the same defaults, so the app still works if `.env` is absent. Change them only if deploying at a different campus. Public contacts appear in the client bundle; do not put secrets in `VITE_` variables.

## Production build

```sh
npm run build
npm start
```

The Express server serves the built `dist` app and API on port 4173 by default. Set `PORT` for the host platform. Use HTTPS at the deployment edge, restrict the kiosk browser to the app, disable OS notifications, and use a physical privacy filter. Multiple server replicas need sticky routing or a shared ephemeral store for QR handoffs; the included memory store deliberately does not persist or synchronize tokens and is intended for a single process.

## Project structure

```text
server/                     Express API and in-memory QR handoffs
src/
  app/                      App-level routing and session state
  components/               Shared header and footer
  config/                   Campus contacts and resource links
  features/
    check-in/               Check-in screens and recommendation content
    handoff/                One-time QR and mobile takeaway screens
    support/                Immediate-support screen
  styles/                   Global and accessibility styles
  main.jsx                  React entry point
docs/                       Architecture and data-flow notes
```

## Privacy and scope

- Check-in answers live in React component state. They are not transmitted, logged, or written to browser storage. The 90-second inactivity timer and “Clear session” action reset the screen.
- A QR request sends only the selected feeling and intensity to the API. It creates a cryptographically random, 60-second bearer token. The first read returns the recommendation inputs and deletes the record; later reads fail. API responses use `no-store` headers. Anyone who scans or copies an unused QR link can use it first.
- Both QR data and API state are held only in memory. A server restart erases all outstanding handoffs. No request logging or analytics are configured by this app; hosting, proxy, or kiosk software may still collect logs and must be configured separately.
- This is general wellbeing support, not a diagnosis, validated screening instrument, clinical service, or emergency dispatch system. Kiosk operators must provide a real, staffed path to urgent support.
- The app has no login, database, analytics, external fonts, or third-party runtime requests.
- The kiosk includes a larger-text toggle and keyboard-visible focus styles. The current copy is English; commission and review translations with campus staff before advertising other languages.

See [architecture notes](./docs/ARCHITECTURE.md) for the data-flow diagram and deployment boundary notes.
