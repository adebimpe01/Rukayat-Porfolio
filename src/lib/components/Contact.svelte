<script>
  import { bio } from '$lib/data/portfolio.js';

  let name = '';
  let email = '';
  let message = '';
  let status = '';
  let errors = {};

  function validate() {
    errors = {};
    if (!name.trim()) errors.name = 'Name is required';
    if (!email.trim()) errors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Invalid email';
    if (!message.trim()) errors.message = 'Message is required';
    return Object.keys(errors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    status = 'sending';
    await new Promise(r => setTimeout(r, 1500));
    status = 'sent';
    name = ''; email = ''; message = '';
  }
</script>

<section class="contact" id="contact">
  <div class="section-header">
    <span class="section-label">// contact</span>
    <h2 class="section-title">Get In Touch</h2>
    <p class="contact__sub">Have a project in mind or want to collaborate? I'd love to hear from you.</p>
  </div>

  <div class="contact__layout">
    <div class="contact__info">

      <!-- Email -->
      <a href={`mailto:${bio.email}`} class="contact__link">
        <div class="contact__link-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
            <polyline points="22,6 12,13 2,6"/>
          </svg>
        </div>
        <div>
          <div class="contact__link-label">Email</div>
          <div class="contact__link-value">{bio.email}</div>
        </div>
      </a>

      <!-- GitHub -->
      <a href={bio.github} target="_blank" rel="noopener" class="contact__link">
        <div class="contact__link-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
          </svg>
        </div>
        <div>
          <div class="contact__link-label">GitHub</div>
          <div class="contact__link-value">github.com/adebimpe01</div>
        </div>
      </a>

      <!-- LinkedIn -->
      <a href={bio.linkedin} target="_blank" rel="noopener" class="contact__link">
        <div class="contact__link-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        </div>
        <div>
          <div class="contact__link-label">LinkedIn</div>
          <div class="contact__link-value">abdulkareem-rukayat</div>
        </div>
      </a>

      <!-- Twitter/X -->
      <a href={bio.twitter} target="_blank" rel="noopener" class="contact__link">
        <div class="contact__link-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
        </div>
        <div>
          <div class="contact__link-label">Twitter / X</div>
          <div class="contact__link-value">@abdulkareemru19</div>
        </div>
      </a>

    </div>

    <form class="contact__form" on:submit={handleSubmit} novalidate>
      {#if status === 'sent'}
        <div class="contact__success">
          <span>✓</span>
          <p>Message sent! I'll get back to you soon.</p>
        </div>
      {:else}
        <div class="form-group">
          <label for="name" class="form-label">Name</label>
          <input id="name" type="text" class="form-input" class:error={errors.name} bind:value={name} placeholder="Your name" autocomplete="name" />
          {#if errors.name}<span class="form-error">{errors.name}</span>{/if}
        </div>

        <div class="form-group">
          <label for="email" class="form-label">Email</label>
          <input id="email" type="email" class="form-input" class:error={errors.email} bind:value={email} placeholder="your@email.com" autocomplete="email" />
          {#if errors.email}<span class="form-error">{errors.email}</span>{/if}
        </div>

        <div class="form-group">
          <label for="message" class="form-label">Message</label>
          <textarea id="message" class="form-input form-textarea" class:error={errors.message} bind:value={message} placeholder="Tell me about your project..." rows="5"></textarea>
          {#if errors.message}<span class="form-error">{errors.message}</span>{/if}
        </div>

        <button type="submit" class="form-submit" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending...' : 'Send Message →'}
        </button>
      {/if}
    </form>
  </div>
</section>

<style>
.contact {
  padding: 6rem 2rem;
  max-width: 1100px;
  margin: 0 auto;
}

.section-header { margin-bottom: 3rem; }

.section-label {
  font-family: 'Space Mono', monospace;
  font-size: 0.8rem;
  color: var(--accent);
  letter-spacing: 0.1em;
  display: block;
  margin-bottom: 0.5rem;
}

.section-title {
  font-family: 'Syne', sans-serif;
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 800;
  color: var(--text);
  letter-spacing: -0.02em;
  margin-bottom: 0.75rem;
}

.contact__sub {
  color: var(--text-muted);
  font-size: 1rem;
  line-height: 1.6;
}

.contact__layout {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 4rem;
  align-items: start;
}

.contact__info {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.contact__link {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 1rem 1.25rem;
  text-decoration: none;
  transition: all 0.2s;
}

.contact__link:hover {
  border-color: var(--accent);
  transform: translateX(4px);
}

.contact__link-icon {
  color: var(--accent);
  width: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.contact__link-label {
  font-family: 'Space Mono', monospace;
  font-size: 0.7rem;
  color: var(--text-muted);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.contact__link-value {
  font-size: 0.85rem;
  color: var(--text);
  margin-top: 2px;
  word-break: break-all;
}

.contact__form { display: flex; flex-direction: column; gap: 1.25rem; }
.form-group { display: flex; flex-direction: column; gap: 0.4rem; }

.form-label {
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  color: var(--text-muted);
  letter-spacing: 0.06em;
}

.form-input {
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 8px;
  color: var(--text);
  font-size: 0.95rem;
  padding: 0.75rem 1rem;
  transition: border-color 0.2s;
  outline: none;
  width: 100%;
  font-family: inherit;
}

.form-input:focus { border-color: var(--accent); }
.form-input.error { border-color: #ef4444; }
.form-textarea { resize: vertical; min-height: 120px; }

.form-error {
  font-family: 'Space Mono', monospace;
  font-size: 0.7rem;
  color: #ef4444;
}

.form-submit {
  font-family: 'Space Mono', monospace;
  font-size: 0.85rem;
  background: var(--accent);
  color: var(--bg);
  border: none;
  border-radius: 8px;
  padding: 0.85rem 2rem;
  cursor: pointer;
  transition: all 0.2s;
  letter-spacing: 0.05em;
  align-self: flex-start;
}

.form-submit:hover:not(:disabled) { opacity: 0.85; transform: translateY(-1px); }
.form-submit:disabled { opacity: 0.6; cursor: not-allowed; }

.contact__success {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 3rem;
  background: var(--card-bg);
  border: 1px solid var(--accent);
  border-radius: 12px;
  text-align: center;
}

.contact__success span { font-size: 2.5rem; color: var(--accent); }
.contact__success p { color: var(--text-muted); font-size: 1rem; }

@media (max-width: 768px) {
  .contact__layout { grid-template-columns: 1fr; gap: 2rem; }
}
</style>