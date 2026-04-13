import { posts, allTags } from '../data';
import { store } from '../store';
import { t } from '../i18n';
import { PostCard } from '../components/PostCard';
import type { BlogCategory } from '../types';

const BLOG_CATEGORIES: BlogCategory[] = ['全部', 'Research', 'Technical', 'Daily Life', 'Month Journal'];

export function HomePage(): string {
  return `${Hero()}${PostList()}`;
}

function Hero(): string {
  return `
    <section class="hero">
      <div class="container">
        <div class="hero-content animate-fade-in">
          <div class="avatar">L</div>
          <div class="hero-text">
            <h1>${t('hero_title')}</h1>
            <p class="subtitle">${t('hero_role')}</p>
            <p class="description">${t('hero_desc')}</p>
            <div class="stats">
              <div class="stat-item">
                <span class="count">${posts.length}</span>
                <span>${t('articles')}</span>
              </div>
              <div class="stat-item">
                <span class="count">${allTags.length}</span>
                <span>${t('tags')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

function PostList(): string {
  const filtered = posts.filter(post => {
    const catMatch =
      store.selectedCategory === '全部' ||
      post.category === store.selectedCategory;
    const searchMatch =
      store.searchQuery === '' ||
      post.title.toLowerCase().includes(store.searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(store.searchQuery.toLowerCase());
    return catMatch && searchMatch;
  });

  const sectionTitle =
    store.selectedCategory === '全部'
      ? t('latest_posts')
      : `${store.selectedCategory} — ${filtered.length} ${t('articles')}`;

  return `
    <section class="content-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">${sectionTitle}</h2>
          <div class="search-box">
            <svg class="search-icon" width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            <input
              type="text" class="search-input"
              placeholder="${t('search_placeholder')}"
              value="${store.searchQuery}"
              oninput="handleSearch(this.value)"
            />
          </div>
        </div>

        <div class="categories">
          ${BLOG_CATEGORIES.map(cat => `
            <button
              onclick="filterCategory('${cat}')"
              class="category-btn ${store.selectedCategory === cat ? 'active' : ''}"
            >
              ${cat === '全部' ? t('cat_all') : cat}
            </button>
          `).join('')}
        </div>

        <div class="post-grid">
          ${filtered.length > 0
            ? filtered.map((post, i) => PostCard(post, i)).join('')
            : `<div class="empty-state" style="grid-column:1/-1">
                <div class="icon">📝</div>
                <p>${t('no_posts')}</p>
              </div>`}
        </div>
      </div>
    </section>
  `;
}
