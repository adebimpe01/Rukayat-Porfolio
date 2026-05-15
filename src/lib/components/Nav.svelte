<script>
  import { theme } from '$lib/stores/theme.js';
  import { page } from '$app/stores';

  let menuOpen = false;

  const links = [
    { href: '/#about', label: 'About' },
    { href: '/#projects', label: 'Projects' },
    { href: '/#skills', label: 'Skills' },
    { href: '/#contact', label: 'Contact' },
  ];

  function toggleTheme() {
    theme.update(t => t === 'dark' ? 'light' : 'dark');
  }
</script>

<nav class="nav">
  <a href="/" class="nav__logo">
    <span class="nav__logo-bracket">&lt;</span>
    <span class="nav__logo-name">Rukayat</span>
    <span class="nav__logo-bracket">/&gt;</span>
  </a>

  <div class="nav__links" class:open={menuOpen}>
    {#each links as link}
      <a href={link.href} class="nav__link" on:click={() => menuOpen = false}>
        {link.label}
      </a>
    {/each}
    <a href="/resume.pdf" class="nav__cta" target="_blank" rel="noopener">Resume</a>
  </div>

  <div class="nav__actions">
    <button class="nav__theme" on:click={toggleTheme} aria-label="Toggle theme">
      {#if $theme === 'dark'}☀️{:else}🌙{/if}
    </button>
    <button class="nav__burger" on:click={() => menuOpen = !menuOpen} aria-label="Toggle menu">
      <span class:open={menuOpen}></span>
      <span class:open={menuOpen}></span>
      <span class:open={menuOpen}></span>
    </button>
  </div>
</nav>

<style>
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  height: 64px;
  background: var(--bg-nav);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border);
}

.nav__logo {
  font-family: 'Space Mono', monospace;
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text);
  text-decoration: none;
  display: flex;
  gap: 2px;
}

.nav__logo-bracket { color: var(--accent); }
.nav__logo-name { color: var(--text); }

.nav__links {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.nav__link {
  font-family: 'Space Mono', monospace;
  font-size: 0.8rem;
  color: var(--text-muted);
  text-decoration: none;
  letter-spacing: 0.05em;
  transition: color 0.2s;
}

.nav__link:hover { color: var(--accent); }

.nav__cta {
  font-family: 'Space Mono', monospace;
  font-size: 0.8rem;
  color: var(--accent);
  text-decoration: none;
  border: 1px solid var(--accent);
  padding: 0.4rem 1rem;
  border-radius: 4px;
  transition: all 0.2s;
}

.nav__cta:hover {
  background: var(--accent);
  color: var(--bg);
}

.nav__actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.nav__theme {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.1rem;
  padding: 0.25rem;
}

.nav__burger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
}

.nav__burger span {
  display: block;
  width: 22px;
  height: 2px;
  background: var(--text);
  transition: all 0.3s;
}

@media (max-width: 768px) {
  .nav__burger { display: flex; }

  .nav__links {
    position: fixed;
    top: 64px;
    left: 0;
    right: 0;
    background: var(--bg-nav);
    flex-direction: column;
    padding: 2rem;
    gap: 1.5rem;
    transform: translateY(-110%);
    transition: transform 0.3s ease;
    border-bottom: 1px solid var(--border);
  }

  .nav__links.open { transform: translateY(0); }
}
</style>
