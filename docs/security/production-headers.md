# Production Security Header Checks

These checks cover the first production-facing follow-ups from the security headers series:

1. validate headers directly on the production URL;
2. keep links for external scanner evidence;
3. enforce the checks in CI after deploy.

## Manual Production Check

Run:

```bash
curl -I https://www.marcopicanco.com
```

The response must include Cloudflare headers and the expected security policy:

| Header                         | Expected value                                                                                                                 |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| `server`                       | `cloudflare`                                                                                                                   |
| `cf-ray`                       | present                                                                                                                        |
| `x-frame-options`              | `SAMEORIGIN` or `DENY`                                                                                                         |
| `x-content-type-options`       | `nosniff`                                                                                                                      |
| `permissions-policy`           | `geolocation=(), microphone=(), camera=(), payment=(), usb=()`                                                                 |
| `referrer-policy`              | `strict-origin-when-cross-origin`                                                                                              |
| `cross-origin-opener-policy`   | `same-origin`                                                                                                                  |
| `cross-origin-resource-policy` | `same-origin`                                                                                                                  |
| `access-control-allow-origin`  | `https://www.marcopicanco.com`                                                                                                 |
| `strict-transport-security`    | `max-age` of at least one year                                                                                                 |
| `content-security-policy`      | matches the Astro-generated hash policy, includes `frame-ancestors 'self'`, and does not use `'unsafe-inline'` in `script-src` |

Current finding fixed in the last manual check:

```text
x-frame-options: X-Frame-Options
```

That value is invalid. In Cloudflare, update the Response Header Transform Rule so:

- header name: `X-Frame-Options`
- header value: `SAMEORIGIN`

Do not set the value to the header name itself.

The Referrer-Policy warning has also been fixed at the edge:

```text
referrer-policy: strict-origin-when-cross-origin
```

SecurityHeaders.com requires `Referrer-Policy` as an HTTP response header. The `<meta name="referrer" content="strict-origin-when-cross-origin" />` remains useful in the HTML, but the Cloudflare edge must also send the real header.

In Cloudflare, add/update the Response Header Transform Rule:

- operation: `Set static`
- header name: `Referrer-Policy`
- header value: `strict-origin-when-cross-origin`

Do not use `Header name: Referrer-Policy` in the field. The field value must be only `Referrer-Policy`.

## Updating The CSP Header

Astro now generates a hash-based CSP during the production build. This removes the dangerous `script-src 'unsafe-inline'` exception while keeping Astro runtime scripts working.

The value printed by `npm run security:csp` is the edge header value, not only the raw HTML meta value. It intentionally adds:

- `frame-ancestors 'self'`, because browsers ignore `frame-ancestors` when it is delivered through a `<meta http-equiv="Content-Security-Policy">`;
- `https://static.cloudflareinsights.com` in `script-src`, because Cloudflare Web Analytics injects `beacon.min.js`;
- `https://cloudflareinsights.com` in `connect-src`, because the beacon reports analytics data back to Cloudflare.

After every build that changes inline scripts or generated styles, print the current CSP value:

```bash
npm run build
npm run security:csp
```

In Cloudflare, update the Response Header Transform Rule:

- operation: `Set static`
- header name: `Content-Security-Policy`
- header value: output from `npm run security:csp`

Do not wrap the header value in extra quotes. The value intentionally includes `style-src-attr 'unsafe-inline'` because the code block highlighter emits inline `style=""` attributes. The stricter part is that `script-src` and `style-src` no longer contain `'unsafe-inline'`.

If you do not want to allow Cloudflare Web Analytics in CSP, disable Web Analytics/Scrape Shield email obfuscation features that inject scripts at the Cloudflare edge. Otherwise Lighthouse will report blocked `beacon.min.js` requests in the browser console.

The site preconnects to `https://static.cloudflareinsights.com` to reduce the Web Analytics connection cost. Lighthouse can still show `beacon.min.js` and `/cdn-cgi/rum` in the network dependency tree because those requests are injected by Cloudflare, not by the application bundle.

## Automated Production Check

Run:

```bash
npm run security:headers
```

The command sends production requests to `https://www.marcopicanco.com` and fails on missing or invalid edge headers.

To check another environment:

```bash
SITE_URL=https://example.com npm run security:headers
```

## External Scanner Evidence

Use these browser-based scanners after deploy:

- SecurityHeaders.com: <https://securityheaders.com/?q=www.marcopicanco.com&hide=on&followRedirects=on>
- MDN HTTP Observatory: <https://developer.mozilla.org/en-US/observatory/analyze?host=www.marcopicanco.com>

SecurityHeaders.com may challenge automated CI requests with Cloudflare, so CI enforces the same core header values locally with `npm run security:headers` and publishes the scanner links in the workflow summary for manual evidence.

## CI Coverage

The deployment workflow now runs:

```bash
npm ci
npm run lint
npm run security
npm run build
```

After deploy, it waits briefly for the edge and runs:

```bash
npm run security:headers
```
