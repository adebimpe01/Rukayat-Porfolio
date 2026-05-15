<script>
  import { projects } from '$lib/data/portfolio.js';
  import { onMount } from 'svelte';

  let filter = 'all';
  let visible = [];

  $: filtered = filter === 'all'
    ? projects
    : filter === 'featured'
    ? projects.filter(p => p.featured)
    : projects;

  onMount(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const id = Number(e.target.dataset.id);
          if (!visible.includes(id)) visible = [...visible, id];
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.project-card').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  });

  const filters = [
    { label: 'All', value: 'all' },
    { label: 'Featured', value: 'featured' },
  ];
</script>

<section class="projects" id="projects">
  <div class="section-header">
    <span class="section-label">// projects</span>
    <h2 class="section-title">Things I've Built</h2>
  </div>

  <div class="projects__filters">
    {#each filters as f}
      <button
        class="filter-btn"
        class:active={filter === f.value}
        on:click={() => filter = f.value}
      >
        {f.label}
      </button>
    {/each}
  </div>

  <div class="projects__grid">
    {#each filtered as project (project.id)}
      <article
        class="project-card"
        class:visible={visible.includes(project.id)}
        data-id={project.id}
        style="--card-accent: {project.color}"
      >
        <div class="project-card__top">
          <div class="project-card__icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={project.color} stroke-width="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <path d="M8 12h8M12 8v8"/>
            </svg>
          </div>
          <div class="project-card__links">
            {#if project.github}
              <a href={project.github} target="_blank" rel="noopener" aria-label="GitHub">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
              </a>
            {/if}
            {#if project.live}
              <a href={project.live} target="_blank" rel="noopener" aria-label="Live demo">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
                  <polyline points="15 3 21 3 21 9"/>
                  <line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
              </a>
            {/if}
          </div>
        </div>

        <h3 class="project-card__title">{project.title}</h3>
        <p class="project-card__desc">{project.description}</p>

        <div class="project-card__tech">
          {#each project.tech as t}
            <span class="tech-tag" style="color: {project.color}; border-color: {project.color}33">{t}</span>
          {/each}
        </div>

        <div class="project-card__bar" style="background: {project.color}"></div>
      </article>
    {/each}
  </div>
</section>

<style>
.projects {
  padding: 6rem 2rem;
  max-width: 1100px;
  margin: 0 auto;
}

.section-header {
  margin-bottom: 3rem;
}

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
}

.projects__filters {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2.5rem;
}

.filter-btn {
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  padding: 0.4rem 1rem;
  border-radius: 4px;
  border: 1px solid var(--border);
  background: transparent;
  color: var(--text-muted);
  cursor: pointer;
  transition: all 0.2s;
  letter-spacing: 0.05em;
}

.filter-btn:hover, .filter-btn.active {
  border-color: var(--accent);
  color: var(--accent);
  background: var(--accent-bg);
}

.projects__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.project-card {
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 1.75rem;
  position: relative;
  overflow: hidden;
  transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
  opacity: 0;
  transform: translateY(30px);
}

.project-card.visible {
  animation: slideUp 0.5s ease forwards;
}

@keyframes slideUp {
  to { opacity: 1; transform: translateY(0); }
}

.project-card:hover {
  transform: translateY(-4px);
  border-color: var(--card-accent);
  box-shadow: 0 8px 30px var(--card-accent, #00f5d4)22;
}

.project-card__bar {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  opacity: 0;
  transition: opacity 0.3s;
}

.project-card:hover .project-card__bar { opacity: 1; }

.project-card__top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.25rem;
}

.project-card__links {
  display: flex;
  gap: 0.75rem;
}

.project-card__links a {
  color: var(--text-muted);
  transition: color 0.2s, transform 0.2s;
  display: flex;
}

.project-card__links a:hover {
  color: var(--accent);
  transform: translateY(-2px);
}

.project-card__title {
  font-family: 'Syne', sans-serif;
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 0.75rem;
}

.project-card__desc {
  font-size: 0.9rem;
  color: var(--text-muted);
  line-height: 1.7;
  margin-bottom: 1.5rem;
}

.project-card__tech {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tech-tag {
  font-family: 'Space Mono', monospace;
  font-size: 0.7rem;
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
  border: 1px solid;
  letter-spacing: 0.04em;
}
</style>
