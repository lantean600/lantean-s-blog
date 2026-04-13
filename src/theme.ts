import { store } from './store';

export function initTheme(): void {
  const saved = localStorage.getItem('theme');
  if (saved) {
    store.isDarkTheme = saved === 'dark';
  } else {
    store.isDarkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  applyTheme();
}

export function toggleTheme(): void {
  store.isDarkTheme = !store.isDarkTheme;
  applyTheme();
  localStorage.setItem('theme', store.isDarkTheme ? 'dark' : 'light');
}

function applyTheme(): void {
  document.documentElement.setAttribute(
    'data-theme',
    store.isDarkTheme ? 'dark' : 'light'
  );
}
