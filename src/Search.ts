import { posts } from '../data';
import { store } from '../store';
import { t } from '../i18n';
import { PostCard } from '../components/PostCard';

export function SearchPage(): string {
  const results = store.searchQuery
    ? posts.filter(p =>
        p.title.toLowerCase().includes(store.searchQuery.toLowerCase()) ||
        p.excerpt.toLowerCase().includes(store.searchQuery.toLowerCase()) ||
        p.tags.some(tag => tag.toLowerCase().includes(store.searchQuery.toLowerCase()))
      )
    : [];

  return `
    <div class="container">
      <div class="inner-page animate-fade-in">
        <button onclick="navigate('home')" class="post-back">
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
          </svg>
          ${t('back')}
        </button>

        <h1 class="page-title" style="margin-top:1.5rem">${t('search_title')}</h1>
        <p class="page-desc">${t('search_hint')}</p>

        <div class="search-box search-box-lg">
          <svg class="search-icon" width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
          <input
            id="search-main-input"
            type="text"
            class="search-input"
            placeholder="${t('search_placeholder')}"
            value="${store.searchQuery}"
            oninput="handleSearch(this.value)"
            autofocus
          />
        </div>

        ${store.searchQuery ? `
          <div class="search-results">
            ${results.length > 0
              ? results.map((post, i) => PostCard(post, i)).join('')
              : `<div class="empty-state"><div class="icon">🔍</div><p>${t('no_posts')}</p></div>`}
          </div>
        ` : ''}
      </div>
    </div>
  `;
}
