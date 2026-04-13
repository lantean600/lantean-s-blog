import type { Post } from '../types';
import { t } from '../i18n';
import { renderMarkdown, getCategoryClass } from '../utils';

export function PostDetailPage(post: Post): string {
  return `
    <div class="container">
      <div class="post-detail animate-fade-in">
        <button onclick="navigate('home')" class="post-back">
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
          </svg>
          ${t('back')}
        </button>

        <header class="post-header">
          ${post.coverImage
            ? `<img src="${post.coverImage}" alt="${post.title}" class="post-cover-large" />`
            : ''}
          <h1 class="post-title">${post.title}</h1>
          <div class="post-info">
            <span class="post-category ${getCategoryClass(post.category)}">${post.category}</span>
            <span>${post.date}</span>
            <span>·</span>
            <span>${post.readingTime}</span>
          </div>
          <div class="post-tags">
            ${post.tags.map(tag => `<span class="post-tag">#${tag}</span>`).join('')}
          </div>
        </header>

        <div class="markdown-content">
          ${renderMarkdown(post.content)}
        </div>
      </div>
    </div>
  `;
}
