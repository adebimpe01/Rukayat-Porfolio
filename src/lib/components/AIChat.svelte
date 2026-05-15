<script>
  import { onMount, tick } from 'svelte';
  import { aiContext } from '$lib/data/portfolio.js';

  let open = false;
  let messages = [
    { role: 'assistant', text: "Hi! I'm Rukayat's AI assistant. Ask me anything about her skills, projects, or experience! 👋" }
  ];
  let input = '';
  let loading = false;
  let chatEl;

  async function scrollBottom() {
    await tick();
    if (chatEl) chatEl.scrollTop = chatEl.scrollHeight;
  }

  async function sendMessage() {
    const text = input.trim();
    if (!text || loading) return;

    messages = [...messages, { role: 'user', text }];
    input = '';
    loading = true;
    await scrollBottom();

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: aiContext,
          messages: messages
            .filter(m => m.role !== 'assistant' || messages.indexOf(m) > 0)
            .map(m => ({ role: m.role === 'assistant' ? 'assistant' : 'user', content: m.text }))
        })
      });

      const data = await response.json();
      const reply = data.content?.[0]?.text || "Sorry, I couldn't process that.";
      messages = [...messages, { role: 'assistant', text: reply }];
    } catch (e) {
      messages = [...messages, { role: 'assistant', text: "Sorry, I'm having trouble connecting right now. Please try again!" }];
    }

    loading = false;
    await scrollBottom();
  }

  function handleKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  const suggestions = [
    "What are Rukayat's main skills?",
    "Tell me about ShopEase",
    "Is she available for work?",
  ];
</script>

<!-- Floating button -->
<button class="chat-fab" on:click={() => open = !open} aria-label="Open AI assistant">
  {#if open}
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  {:else}
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
    </svg>
    <span class="chat-fab__label">Ask AI</span>
  {/if}
</button>

<!-- Chat window -->
{#if open}
  <div class="chat-window" role="dialog" aria-label="AI Portfolio Assistant">
    <div class="chat-header">
      <div class="chat-header__info">
        <div class="chat-header__dot"></div>
        <div>
          <div class="chat-header__title">Portfolio Assistant</div>
          <div class="chat-header__sub">Powered by Claude</div>
        </div>
      </div>
    </div>

    <div class="chat-messages" bind:this={chatEl}>
      {#each messages as msg}
        <div class="chat-msg chat-msg--{msg.role}">
          <div class="chat-msg__bubble">{msg.text}</div>
        </div>
      {/each}
      {#if loading}
        <div class="chat-msg chat-msg--assistant">
          <div class="chat-msg__bubble chat-msg__typing">
            <span></span><span></span><span></span>
          </div>
        </div>
      {/if}
    </div>

    {#if messages.length === 1}
      <div class="chat-suggestions">
        {#each suggestions as s}
          <button class="chat-suggestion" on:click={() => { input = s; sendMessage(); }}>
            {s}
          </button>
        {/each}
      </div>
    {/if}

    <div class="chat-input-row">
      <textarea
        class="chat-input"
        bind:value={input}
        on:keydown={handleKey}
        placeholder="Ask about Rukayat..."
        rows="1"
        disabled={loading}
      ></textarea>
      <button class="chat-send" on:click={sendMessage} disabled={loading || !input.trim()} aria-label="Send">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="22" y1="2" x2="11" y2="13"/>
          <polygon points="22 2 15 22 11 13 2 9 22 2"/>
        </svg>
      </button>
    </div>
  </div>
{/if}

<style>
.chat-fab {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 200;
  background: var(--accent);
  color: var(--bg);
  border: none;
  border-radius: 999px;
  padding: 0.75rem 1.25rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'Space Mono', monospace;
  font-size: 0.8rem;
  font-weight: 700;
  box-shadow: 0 4px 20px var(--accent)44;
  transition: all 0.2s;
  letter-spacing: 0.05em;
}

.chat-fab:hover { transform: translateY(-2px); box-shadow: 0 8px 30px var(--accent)66; }

.chat-window {
  position: fixed;
  bottom: 5.5rem;
  right: 2rem;
  z-index: 199;
  width: 360px;
  max-height: 520px;
  background: var(--bg-nav);
  border: 1px solid var(--border);
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0,0,0,0.4);
  animation: slideUp 0.25s ease;
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(16px) scale(0.97); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

.chat-header {
  padding: 1rem 1.25rem;
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.chat-header__info { display: flex; align-items: center; gap: 0.75rem; }

.chat-header__dot {
  width: 8px; height: 8px;
  background: var(--accent);
  border-radius: 50%;
  animation: blink 2s infinite;
  flex-shrink: 0;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

.chat-header__title {
  font-family: 'Syne', sans-serif;
  font-weight: 700;
  font-size: 0.95rem;
  color: var(--text);
}

.chat-header__sub {
  font-family: 'Space Mono', monospace;
  font-size: 0.65rem;
  color: var(--text-muted);
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  scroll-behavior: smooth;
}

.chat-messages::-webkit-scrollbar { width: 4px; }
.chat-messages::-webkit-scrollbar-thumb { background: var(--border); border-radius: 2px; }

.chat-msg { display: flex; }
.chat-msg--user { justify-content: flex-end; }
.chat-msg--assistant { justify-content: flex-start; }

.chat-msg__bubble {
  max-width: 80%;
  padding: 0.6rem 0.9rem;
  border-radius: 12px;
  font-size: 0.88rem;
  line-height: 1.55;
}

.chat-msg--user .chat-msg__bubble {
  background: var(--accent);
  color: var(--bg);
  border-bottom-right-radius: 4px;
}

.chat-msg--assistant .chat-msg__bubble {
  background: var(--card-bg);
  color: var(--text);
  border: 1px solid var(--border);
  border-bottom-left-radius: 4px;
}

.chat-msg__typing {
  display: flex;
  gap: 4px;
  align-items: center;
  padding: 0.75rem 1rem;
}

.chat-msg__typing span {
  width: 6px; height: 6px;
  background: var(--text-muted);
  border-radius: 50%;
  animation: bounce 1.2s infinite;
}

.chat-msg__typing span:nth-child(2) { animation-delay: 0.2s; }
.chat-msg__typing span:nth-child(3) { animation-delay: 0.4s; }

@keyframes bounce {
  0%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-6px); }
}

.chat-suggestions {
  padding: 0 1rem 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.chat-suggestion {
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 8px;
  color: var(--text-muted);
  font-size: 0.78rem;
  padding: 0.45rem 0.75rem;
  cursor: pointer;
  text-align: left;
  transition: all 0.2s;
  font-family: 'Space Mono', monospace;
}

.chat-suggestion:hover {
  border-color: var(--accent);
  color: var(--accent);
}

.chat-input-row {
  display: flex;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border-top: 1px solid var(--border);
  align-items: flex-end;
}

.chat-input {
  flex: 1;
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 8px;
  color: var(--text);
  font-size: 0.88rem;
  padding: 0.6rem 0.8rem;
  outline: none;
  resize: none;
  font-family: inherit;
  transition: border-color 0.2s;
  max-height: 100px;
}

.chat-input:focus { border-color: var(--accent); }

.chat-send {
  background: var(--accent);
  border: none;
  border-radius: 8px;
  color: var(--bg);
  cursor: pointer;
  padding: 0.6rem 0.75rem;
  display: flex;
  align-items: center;
  transition: opacity 0.2s;
  flex-shrink: 0;
}

.chat-send:disabled { opacity: 0.4; cursor: not-allowed; }
.chat-send:hover:not(:disabled) { opacity: 0.85; }

@media (max-width: 480px) {
  .chat-window { width: calc(100vw - 2rem); right: 1rem; }
  .chat-fab { right: 1rem; bottom: 1rem; }
}
</style>
