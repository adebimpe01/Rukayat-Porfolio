<script>
  import Nav from '$lib/components/Nav.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import AIChat from '$lib/components/AIChat.svelte';
  import { theme } from '$lib/stores/theme.js';
  import { onMount } from 'svelte';

  onMount(() => {
    document.documentElement.setAttribute('data-theme', $theme);
  });
</script>

<svelte:head>
  <title>Abdulkareem Rukayat — Frontend Developer</title>
  <meta name="description" content="Frontend developer specializing in React, JavaScript, Tailwind CSS and modern web experiences." />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
  <link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@400;700;800&display=swap" rel="stylesheet" />
</svelte:head>

<Nav />
<main>
  <slot />
</main>
<Footer />
<AIChat />

<style>
  :global(*), :global(*::before), :global(*::after) {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  :global(:root) {
    --accent: #00f5d4;
    --accent-2: #7c3aed;
    --accent-bg: #00f5d411;
    --accent-border: #00f5d433;
    --accent-glow: #00f5d418;
    --grid-color: #1a2332;
  }

  :global([data-theme='dark']) {
    --bg: #050a12;
    --bg-nav: #050a12cc;
    --card-bg: #0a1628;
    --text: #e8f0fe;
    --text-muted: #6b7fa3;
    --text-soft: #a8b8d8;
    --border: #1a2844;
    --border-strong: #2a3f66;
    --grid-color: #0f1f35;
  }

  :global([data-theme='light']) {
    --bg: #f8faff;
    --bg-nav: #f8faffe0;
    --card-bg: #ffffff;
    --text: #0a1628;
    --text-muted: #5a6a8a;
    --text-soft: #3a4a6a;
    --border: #dde6f5;
    --border-strong: #b0c0e0;
    --grid-color: #e8f0fe;
    --accent-glow: #00f5d40a;
  }

  :global(html) {
    scroll-behavior: smooth;
  }

  :global(body) {
    background: var(--bg);
    color: var(--text);
    font-family: 'Syne', 'Segoe UI', sans-serif;
    -webkit-font-smoothing: antialiased;
    transition: background 0.3s, color 0.3s;
  }

  :global(:focus-visible) {
    outline: 2px solid var(--accent);
    outline-offset: 3px;
    border-radius: 4px;
  }

  :global(::selection) {
    background: var(--accent);
    color: var(--bg);
  }

  main {
    padding-top: 64px;
  }
</style>
