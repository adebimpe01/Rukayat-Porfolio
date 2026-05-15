<script>
  import { skills, bio } from '$lib/data/portfolio.js';
  import { onMount } from 'svelte';

  let animate = false;

  onMount(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) animate = true;
    }, { threshold: 0.2 });

    const el = document.querySelector('.skills');
    if (el) observer.observe(el);
    return () => observer.disconnect();
  });
</script>

<section class="skills" id="skills">
  <div class="section-header">
    <span class="section-label">// skills</span>
    <h2 class="section-title">What I Work With</h2>
  </div>

  <div class="skills__grid">
    {#each skills as skill, i}
      <div class="skill-item" style="animation-delay: {i * 60}ms" class:animate>
        <div class="skill-item__header">
          <span class="skill-item__name">{skill.name}</span>
          <span class="skill-item__level">{skill.level}%</span>
        </div>
        <div class="skill-item__bar">
          <div
            class="skill-item__fill"
            style="width: {animate ? skill.level : 0}%; transition-delay: {i * 60}ms"
          ></div>
        </div>
      </div>
    {/each}
  </div>

  <div class="about" id="about">
    <div class="about__text">
      <span class="section-label">// about me</span>
      <h2 class="section-title">A Bit About Me</h2>
      <p>{bio.about}</p>
    </div>
    <div class="about__stats">
      <div class="stat">
        <span class="stat__num">4+</span>
        <span class="stat__label">Projects Built</span>
      </div>
      <div class="stat">
        <span class="stat__num">5+</span>
        <span class="stat__label">Technologies</span>
      </div>
      <div class="stat">
        <span class="stat__num">∞</span>
        <span class="stat__label">Curiosity</span>
      </div>
    </div>
  </div>
</section>

<style>
.skills {
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
}

.skills__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem 3rem;
  margin-bottom: 5rem;
}

.skill-item {
  opacity: 0;
  transform: translateX(-10px);
}

.skill-item.animate {
  animation: fadeIn 0.4s ease forwards;
}

@keyframes fadeIn {
  to { opacity: 1; transform: translateX(0); }
}

.skill-item__header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.skill-item__name {
  font-family: 'Space Mono', monospace;
  font-size: 0.82rem;
  color: var(--text);
  letter-spacing: 0.03em;
}

.skill-item__level {
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  color: var(--accent);
}

.skill-item__bar {
  height: 4px;
  background: var(--border);
  border-radius: 2px;
  overflow: hidden;
}

.skill-item__fill {
  height: 100%;
  background: linear-gradient(90deg, var(--accent), var(--accent-2));
  border-radius: 2px;
  transition: width 1s cubic-bezier(0.4, 0, 0.2, 1);
}

/* About */
.about {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  padding: 4rem 0;
  border-top: 1px solid var(--border);
}

.about__text p {
  color: var(--text-muted);
  line-height: 1.8;
  font-size: 1rem;
  margin-top: 1.5rem;
}

.about__stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 1.5rem 1rem;
}

.stat__num {
  font-family: 'Syne', sans-serif;
  font-size: 2rem;
  font-weight: 800;
  color: var(--accent);
}

.stat__label {
  font-family: 'Space Mono', monospace;
  font-size: 0.65rem;
  color: var(--text-muted);
  text-align: center;
  margin-top: 0.25rem;
  letter-spacing: 0.05em;
}

@media (max-width: 768px) {
  .about { grid-template-columns: 1fr; gap: 2rem; }
}
</style>
