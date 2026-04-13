import { store } from '../store';
import { t } from '../i18n';
import type { BlogCategory } from '../types';

const BLOG_CATEGORIES: BlogCategory[] = ['Research', 'Technical', 'Daily Life', 'Month Journal'];
const CATEGORY_EMOJI: Record<string, string> = {
  Research: '🔬',
  Technical: '⚙️',
  'Daily Life': '☀️',
  'Month Journal': '📅',
};

export function Navbar(): string {
  return `
    <nav class="navbar">
      <div class="navbar-content">
        <a href="#" class="nav-brand" onclick="navigate('home')">${t('brand')}</a>
        <div class="nav-links">
          ${BlogDropdown()}
          <button onclick="navigate('academic')" class="nav-link ${store.currentPage === 'academic' ? 'active' : ''}">${t('nav_academic')}</button>
          <button onclick="navigate('projects')" class="nav-link ${store.currentPage === 'projects' ? 'active' : ''}">${t('nav_projects')}</button>
          <button onclick="navigate('links')" class="nav-link ${store.currentPage === 'links' ? 'active' : ''}">${t('nav_links')}</button>
          <button onclick="navigate('about')" class="nav-link ${store.currentPage === 'about' ? 'active' : ''}">${t('nav_about')}</button>
          <div class="nav-divider"></div>
          ${NavAvatar()}
          ${NavSearch()}
          ${LangToggle()}
          ${ThemeToggle()}
        </div>
      </div>
    </nav>
  `;
}

function BlogDropdown(): string {
  const isHomePage = store.currentPage === 'home';
  return `
    <div class="dropdown-wrapper" id="blog-dropdown">
      <button
        class="nav-link ${isHomePage ? 'active' : ''} dropdown-trigger"
        onclick="toggleBlogDropdown(event)"
        aria-haspopup="true"
        aria-expanded="${store.isBlogDropdownOpen}"
      >
        ${t('nav_blog')}
        <svg class="dropdown-chevron ${store.isBlogDropdownOpen ? 'open' : ''}" width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"/>
        </svg>
      </button>
      ${store.isBlogDropdownOpen ? `
        <div class="dropdown-menu" role="menu">
          ${BLOG_CATEGORIES.map(cat => `
            <button
              class="dropdown-item ${store.selectedCategory === cat ? 'active' : ''}"
              onclick="selectBlogCategory('${cat}')"
              role="menuitem"
            >
              <span style="font-size:14px">${CATEGORY_EMOJI[cat]}</span>
              ${cat}
            </button>
          `).join('')}
        </div>
      ` : ''}
    </div>
  `;
}

function NavAvatar(): string {
  return `
    <button class="nav-avatar" onclick="navigate('about')" title="About">
      <span>L</span>
    </button>
  `;
}

function NavSearch(): string {
  return `
    <button class="icon-btn" onclick="navigate('search')" aria-label="Search">
      <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
      </svg>
    </button>
  `;
}

function LangToggle(): string {
  return `
    <button class="lang-btn" onclick="toggleLang()" title="Switch language">
      <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"/>
      </svg>
      ${store.currentLang === 'zh' ? '中文' : 'EN'}
    </button>
  `;
}

function ThemeToggle(): string {
  const label = store.isDarkTheme ? t('toggle_light') : t('toggle_dark');
  return `
    <button class="icon-btn theme-toggle" onclick="toggleTheme()" aria-label="${label}" title="${label}">
      ${store.isDarkTheme
        ? `<svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
          </svg>`
        : `<svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
          </svg>`}
    </button>
  `;
}
