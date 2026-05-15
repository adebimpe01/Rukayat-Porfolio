import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const stored = browser ? localStorage.getItem('theme') : 'dark';
export const theme = writable(stored || 'dark');

theme.subscribe(val => {
  if (browser) {
    localStorage.setItem('theme', val);
    document.documentElement.setAttribute('data-theme', val);
  }
});
