<script>
  import { bio } from '$lib/data/portfolio.js';
</script>

<footer class="footer">
  <div class="footer__inner">
    <span class="footer__name">
      <span class="footer__bracket">&lt;</span>Rukayat<span class="footer__bracket">/&gt;</span>
    </span>
    <span class="footer__copy">
      Built with SvelteKit · {new Date().getFullYear()}
    </span>
    <div class="footer__links">
      <a href={bio.github} target="_blank" rel="noopener">GitHub</a>
      <a href={bio.linkedin} target="_blank" rel="noopener">LinkedIn</a>
      <a href={`mailto:${bio.email}`}>Email</a>
    </div>
  </div>
</footer>

<style>
.footer {
  border-top: 1px solid var(--border);
  padding: 2rem;
}

.footer__inner {
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
}

.footer__name {
  font-family: 'Space Mono', monospace;
  font-size: 0.9rem;
  color: var(--text);
  font-weight: 700;
}

.footer__bracket { color: var(--accent); }

.footer__copy {
  font-family: 'Space Mono', monospace;
  font-size: 0.72rem;
  color: var(--text-muted);
}

.footer__links {
  display: flex;
  gap: 1.5rem;
}

.footer__links a {
  font-family: 'Space Mono', monospace;
  font-size: 0.72rem;
  color: var(--text-muted);
  text-decoration: none;
  transition: color 0.2s;
}

.footer__links a:hover { color: var(--accent); }
</style>
