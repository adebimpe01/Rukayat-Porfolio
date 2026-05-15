# Abdulkareem Rukayat — Developer Portfolio

A highly interactive, animated developer portfolio built with SvelteKit. Features an AI-powered portfolio assistant, smooth scroll animations, dark/light theming, and a responsive layout.

## Setup

```bash
npm install
npm run dev
```

Visit `http://localhost:5173`

## Deploy

```bash
npm run build
```

Deploy the `build/` folder to Vercel, Netlify, or Cloudflare Pages. For Vercel: connect the GitHub repo and it deploys automatically.

---

## Architecture

```
src/
├── routes/
│   ├── +layout.svelte     # Global styles, Nav, Footer, AI chat wrapper
│   └── +page.svelte       # Composes all sections
├── lib/
│   ├── components/
│   │   ├── Nav.svelte          # Fixed nav, mobile menu, theme toggle
│   │   ├── Hero.svelte         # Landing with typewriter effect
│   │   ├── Projects.svelte     # Filterable project grid
│   │   ├── Skills.svelte       # Animated skill bars + about section
│   │   ├── Contact.svelte      # Form with validation
│   │   ├── AIChat.svelte       # Floating AI assistant
│   │   └── Footer.svelte
│   ├── stores/
│   │   └── theme.js            # Writable store with localStorage persistence
│   └── data/
│       └── portfolio.js        # Single source of truth for all content
```

## Animation Decisions

- **Hero entrance**: CSS opacity + translateY with a 100ms mount delay — avoids flash of unstyled content
- **Typewriter effect**: `setInterval` character-by-character reveal at 40ms per char
- **Skill bars**: `IntersectionObserver` triggers width transition when section enters viewport — avoids animating off-screen
- **Project cards**: staggered `IntersectionObserver` with per-card `animation-delay` for cascade reveal
- **AI chat**: CSS `slideUp` keyframe on mount for natural feel
- **Theme switching**: CSS custom property transitions (`transition: background 0.3s`) — no JavaScript layout recalculation

## Performance Optimization

- Google Fonts loaded with `preconnect` hints and `display=swap`
- `IntersectionObserver` used instead of scroll listeners (no layout thrashing)
- Animations use `transform` and `opacity` only (compositor-only properties, no reflow)
- SvelteKit's built-in code splitting per route
- No heavy animation libraries — all native CSS + Svelte transitions

## Accessibility

- All interactive elements have `aria-label`
- Semantic HTML: `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`
- `:focus-visible` global styles for keyboard navigation
- Form labels properly associated with inputs via `for`/`id`
- Color contrast maintained in both dark and light themes
- `prefers-reduced-motion` can be added to respect OS-level animation settings

## Creative Feature: AI Portfolio Assistant

The floating chat widget uses the Anthropic Claude API directly from the client. It's primed with a system prompt containing Rukayat's bio, skills, and project details, so it can answer natural language questions about her portfolio. Suggested prompts appear on first open to guide visitors.

**Note:** For production, proxy the API call through a SvelteKit server route (`+server.js`) to avoid exposing keys client-side.

## Trade-offs

- **Client-side API call**: For simplicity the AI call goes directly to Anthropic from the browser. Production should use a `+server.js` endpoint.
- **No animations library**: Chose native CSS + Svelte transitions over GSAP to keep bundle size minimal.
- **Placeholder content**: Projects and contact info use placeholder data — update `src/lib/data/portfolio.js` with real values.
- **Contact form**: Currently simulates sending with a timeout. Integrate Formspree or EmailJS for real email delivery.
