# Dodo Checkout

A tiny embeddable checkout. A website drops in one script, calls one function, and a checkout opens on top of the page without the customer ever leaving it. Card details are typed inside the checkout, not on the host page.

## Live link

Both are deployed to Cloudflare Workers:

- Demo: [demo.sourabhhaldarh.workers.dev](https://demo.sourabhhaldarh.workers.dev/)
- Checkout: [super-sea-964a.sourabhhaldarh.workers.dev](https://super-sea-964a.sourabhhaldarh.workers.dev), which the SDK points to by default (`CHECKOUT_URL` in `packages/sdk/src/index.ts`)

## The three pieces

This is a pnpm workspace with three packages:

- `packages/sdk`: the script a site embeds. Exposes `DodoCheckout.open(...)`.
- `apps/checkout`: the checkout itself. A small React app, hosted on its own, that shows the product, takes an email and card, and fakes a payment.
- `apps/demo`: a pretend store (Next.js) that uses the SDK, with a Buy button per product and a live log of every callback the SDK fires.

## How to run it

You need Node and pnpm.

```bash
pnpm install
pnpm dev
```

This starts both the checkout app (`http://localhost:5173`) and the demo site (`http://localhost:3000`) together. Open the demo site and click "Buy now" on any product.

To run just one of them:

```bash
pnpm dev:checkout   # checkout app only, port 5173
pnpm dev:demo       # demo site only, port 3000
```

The SDK doesn't need a dev server of its own. The demo currently imports it directly as a workspace package (`@dodo/checkout-sdk`), since it lives in the same monorepo.

Note that the SDK's `CHECKOUT_URL` is hardcoded to the deployed checkout above, not `localhost:5173`. So clicking "Buy now" on the demo opens the live checkout even when running everything locally — `pnpm dev:checkout` is for developing the checkout app in isolation, not for wiring it up to a local demo. To test checkout changes end-to-end, point `CHECKOUT_URL` in `packages/sdk/src/index.ts` at `http://localhost:5173` temporarily.

`pnpm build:sdk` also produces a second, separate output: `packages/sdk/dist/dodo-checkout.js`. That one is a single self-contained file (no imports, everything bundled and minified) meant for a real third-party site with no bundler of its own. Dropped in as a plain script tag, it sets up `window.DodoCheckout` the same way the npm import does:

```html
<script src="dodo-checkout.js"></script>
<script>
  window.DodoCheckout.open({
    productId: "prod_123",
    onSuccess: ({ sessionId }) => {},
    onClose: ({ reason }) => {},
    onError: ({ code, message }) => {},
  });
</script>
```

### Test cards

The checkout app fakes the payment entirely in the browser, no server involved.

- `4242 4242 4242 4242` succeeds
- `4000 0000 0000 0002` declines
- `4000 0000 0000 0341` fails the first time, then succeeds if you press Pay again
- `4000 0000 0000 9995` simulates a network drop (added on top of the brief's three, to have something to show for the "network fails" state)

Any other 16-digit number also succeeds, so you can try the happy path without memorizing digits.

## How the pieces talk to each other

The demo site never touches the checkout app's code directly, and the checkout app never touches the demo site's code directly. They only talk over `postMessage`, the same way any two different origins would.

1. The demo site calls `DodoCheckout.open({ productId, onSuccess, onError, onClose })`.
2. The SDK creates a full-screen iframe pointed at the checkout app, passing only the `productId` and the host's own origin as URL params. It does not pass price, email, or anything else, the checkout looks up the product (and its price) itself, so the host page can never hand it a fake price.
3. The iframe stays hidden and a "Loading checkout..." spinner shows while it loads. Once the checkout app has mounted, it posts a `READY` message back.
4. The SDK replies with `INIT` (carrying an `instanceId` used to tag every message in that session), reveals the iframe, and moves keyboard focus into it.
5. From there the checkout runs entirely on its own: form validation, the fake card processing, and all of the loading/declined/network/success states. When something happens worth telling the host about, it posts `SUCCESS`, `ERROR`, or `CLOSED` back to the SDK.
6. The SDK checks that every incoming message actually came from the checkout's own origin and from the exact iframe it opened (using the `instanceId`), before calling the matching `onSuccess` / `onError` / `onClose` callback and tearing the iframe down.

So the "conversation" is a handshake (`READY` -> `INIT`) followed by one-way status updates (`SUCCESS` / `ERROR` / `CLOSED`), all origin-checked in both directions. The host page finds out what happened, but never sees what the customer typed.

If the checkout iframe fails to send `READY` within 10 seconds (slow network, app down, etc), the SDK gives up, shows its own "Checkout couldn't load" card with a retry button, and does not leave the customer staring at a blank overlay.

## Two decisions I went back and forth on

**1. Should the host page be able to pass in a price or product details?**
No. The SDK only ever sends a `productId`. The checkout app resolves the product (name, price) from its own data, so a compromised or careless host page can never trick the checkout into charging a different amount than the real one. The tradeoff is the demo site and the checkout app each keep their own small copy of the product catalog, which is a bit of duplication, but it felt like the right side to be strict on for anything involving payment.

**2. What happens if the loader flashes for a fast connection?**
Early on the loading spinner appeared the instant `open()` was called, which meant it would flicker on screen for a frame or two even when the checkout loaded almost instantly, an ugly, jittery first impression. Instead the spinner is now delayed by 150ms, so it only shows up if the checkout genuinely takes a moment to load. On a fast connection, the customer just sees the checkout appear.

## What I'd explore next

This prototype intentionally keeps the payment flow entirely in the browser. For a production version, I'd explore:

- **Real payment processing** — move payment authorization to a secure backend/payment provider instead of simulating it in the browser.
- **Server-side product and price resolution** — make the checkout fetch trusted product/price data from an API rather than maintaining a local catalog.
- **Checkout session API** — create a short-lived server-side checkout session containing the product, amount, currency, and merchant context.
- **SDK distribution** — publish the SDK through a CDN and/or npm with versioned releases.
- **Automated testing** — add unit tests for the SDK message protocol, form validation, payment state transitions, and retry behaviour, plus end-to-end tests for the complete iframe flow.
- **Stronger iframe security** — tighten CSP, iframe permissions, and origin configuration for production environments.
- **Observability** — add structured error reporting and metrics around checkout loading, payment failures, and checkout completion.
