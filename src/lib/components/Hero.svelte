<script>
  import { onMount } from 'svelte';
  import { bio } from '$lib/data/portfolio.js';

  let visible = false;
  let typedText = '';
  const fullText = bio.tagline;

  onMount(() => {
    setTimeout(() => visible = true, 100);
    let i = 0;
    const interval = setInterval(() => {
      if (i <= fullText.length) {
        typedText = fullText.slice(0, i);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 40);
    return () => clearInterval(interval);
  });
</script>

<section class="hero" id="home">
  <div class="hero__bg">
    <div class="hero__grid"></div>
    <div class="hero__glow"></div>
  </div>

  <div class="hero__content" class:visible>
    <div class="hero__label">
      <span class="hero__dot"></span>
      Available for work
    </div>

    <h1 class="hero__name">
      {bio.name.split(' ')[0]}<br/>
      <span class="hero__surname">{bio.name.split(' ')[1]}</span>
    </h1>

    <p class="hero__title">// {bio.title}</p>

    <p class="hero__tagline">
      {typedText}<span class="cursor">|</span>
    </p>

    <div class="hero__actions">
      <a href="/#projects" class="btn btn--primary">View Work</a>
      <a href="/#contact" class="btn btn--ghost">Get in Touch</a>
    </div>

    <div class="hero__socials">
      <a href={bio.github} target="_blank" rel="noopener" aria-label="GitHub">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
        </svg>
      </a>
      <a href={bio.linkedin} target="_blank" rel="noopener" aria-label="LinkedIn">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      </a>
      <a href={`mailto:${bio.email}`} aria-label="Email">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
      </a>
    </div>
  </div>

  <div class="hero__scroll">
    <span>scroll</span>
    <div class="hero__scroll-line"></div>
  </div>
</section>

<style>
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  padding: 0 2rem;
}

.hero__bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.hero__grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(var(--grid-color) 1px, transparent 1px),
    linear-gradient(90deg, var(--grid-color) 1px, transparent 1px);
  background-size: 60px 60px;
  mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%);
}

.hero__glow {
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, var(--accent-glow) 0%, transparent 70%);
  pointer-events: none;
}

.hero__content {
  position: relative;
  z-index: 1;
  max-width: 800px;
  margin: 0 auto;
  padding-top: 80px;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}

.hero__content.visible {
  opacity: 1;
  transform: translateY(0);
}

.hero__label {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  color: var(--accent);
  background: var(--accent-bg);
  border: 1px solid var(--accent-border);
  padding: 0.3rem 0.75rem;
  border-radius: 999px;
  margin-bottom: 1.5rem;
  letter-spacing: 0.05em;
}

.hero__dot {
  width: 6px;
  height: 6px;
  background: var(--accent);
  border-radius: 50%;
  animation: blink 1.5s infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

.hero__name {
  font-family: 'Syne', sans-serif;
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 800;
  line-height: 1;
  color: var(--text);
  margin-bottom: 0.5rem;
  letter-spacing: -0.03em;
}

.hero__surname {
  color: var(--accent);
  -webkit-text-stroke: 2px var(--accent);
  -webkit-text-fill-color: transparent;
}

.hero__title {
  font-family: 'Space Mono', monospace;
  font-size: 0.9rem;
  color: var(--text-muted);
  margin-bottom: 1.5rem;
  letter-spacing: 0.05em;
}

.hero__tagline {
  font-size: clamp(1rem, 2.5vw, 1.3rem);
  color: var(--text-soft);
  max-width: 520px;
  line-height: 1.6;
  margin-bottom: 2.5rem;
  min-height: 2em;
}

.cursor {
  animation: blink 1s infinite;
  color: var(--accent);
}

.hero__actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 2.5rem;
}

.btn {
  font-family: 'Space Mono', monospace;
  font-size: 0.85rem;
  padding: 0.75rem 1.75rem;
  border-radius: 6px;
  text-decoration: none;
  transition: all 0.2s;
  letter-spacing: 0.05em;
}

.btn--primary {
  background: var(--accent);
  color: var(--bg);
  border: 2px solid var(--accent);
}

.btn--primary:hover {
  background: transparent;
  color: var(--accent);
}

.btn--ghost {
  background: transparent;
  color: var(--text);
  border: 2px solid var(--border-strong);
}

.btn--ghost:hover {
  border-color: var(--accent);
  color: var(--accent);
}

.hero__socials {
  display: flex;
  gap: 1.25rem;
}

.hero__socials a {
  color: var(--text-muted);
  transition: color 0.2s, transform 0.2s;
  display: flex;
}

.hero__socials a:hover {
  color: var(--accent);
  transform: translateY(-2px);
}

.hero__scroll {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  font-family: 'Space Mono', monospace;
  font-size: 0.65rem;
  color: var(--text-muted);
  letter-spacing: 0.15em;
  text-transform: uppercase;
  animation: float 2s ease-in-out infinite;
}

.hero__scroll-line {
  width: 1px;
  height: 40px;
  background: linear-gradient(to bottom, var(--accent), transparent);
}

@keyframes float {
  0%, 100% { transform: translateX(-50%) translateY(0); }
  50% { transform: translateX(-50%) translateY(6px); }
}
</style>
