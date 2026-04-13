import { t } from '../i18n';
import type { FriendLink } from '../types';

const FRIEND_LINKS: FriendLink[] = [
  { name: 'Axi404',       url: 'https://axi404.top', desc: 'Science Research & Tech Blog', avatar: '🤖' },
  { name: 'Ruancat',      url: '#',                  desc: 'Full-stack dev, anime lover',  avatar: '🐱' },
  { name: 'GeekBlog',     url: '#',                  desc: '极客技术分享',                  avatar: '💻' },
  { name: 'MathNotes',    url: '#',                  desc: '数学与算法笔记',                avatar: '📐' },
  { name: 'OpenResearch', url: '#',                  desc: 'Open source research hub',     avatar: '🔬' },
  { name: 'DevDiary',     url: '#',                  desc: 'Weekly engineering notes',     avatar: '📓' },
];

export function LinksPage(): string {
  return `
    <div class="container">
      <div class="inner-page animate-fade-in">
        <div class="page-header">
          <h1 class="page-title">${t('links_title')}</h1>
          <p class="page-desc">${t('links_desc')}</p>
        </div>

        <div class="links-grid">
          ${FRIEND_LINKS.map((link, i) => LinkCard(link, i)).join('')}
        </div>
      </div>
    </div>
  `;
}

function LinkCard(link: FriendLink, index: number): string {
  return `
    <a href="${link.url}" target="_blank" class="link-card animate-fade-in" style="animation-delay:${index * 60}ms">
      <div class="link-avatar">${link.avatar}</div>
      <div class="link-info">
        <h3 class="link-name">${link.name}</h3>
        <p class="link-desc">${link.desc}</p>
      </div>
      <svg class="link-arrow" width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
      </svg>
    </a>
  `;
}
