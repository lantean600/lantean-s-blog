import type { Post } from '../types';
import { getCategoryClass } from '../utils';

export function PostCard(post: Post, index: number): string {
  return `
    <article
      class="post-card animate-fade-in"
      style="animation-delay: ${index * 50}ms"
      onclick="viewPost('${post.id}')"
    >
      ${post.coverImage ? `
        <img src="${post.coverImage}" alt="${post.title}" class="post-card-cover" loading="lazy" />
      ` : ''}
      <div class="post-card-meta">
        <span class="post-category ${getCategoryClass(post.category)}">${post.category}</span>
        <span class="post-date">${post.date}</span>
      </div>
      <h3 class="post-card-title">${post.title}</h3>
      <p class="post-card-excerpt">${post.excerpt}</p>
      <div class="post-card-tags">
        ${post.tags.map(tag => `<span class="post-tag">#${tag}</span>`).join('')}
        <span class="post-tag reading-time">${post.readingTime}</span>
      </div>
    </article>
  `;
}
