import { initTheme } from './theme';
import { render } from './router';
import './index.css';

type Page = 'home' | 'post' | 'about' | 'academic' | 'projects' | 'links' | 'search';
type BlogCategory = '全部' | 'Research' | 'Technical' | 'Daily Life' | 'Month Journal';
type Lang = 'zh' | 'en';

let currentPage: Page = 'home';
let currentPostId: string | null = null;
let selectedCategory: BlogCategory = '全部';
let searchQuery = '';
let isBlogDropdownOpen = false;
let isDarkTheme = false;
let currentLang: Lang = 'zh';

// ─── i18n ─────────────────────────────────────────────────────────────────
const t: Record<Lang, Record<string, string>> = {
  zh: {
    brand: "Lantean's Blog",
    nav_blog: 'Blog',
    nav_academic: '学术',
    nav_projects: '项目',
    nav_links: '友链',
    nav_about: '关于',
    search_placeholder: '搜索文章...',
    search_title: '搜索',
    search_hint: '输入关键词以搜索博客。',
    latest_posts: '最新文章',
    no_posts: '暂无相关文章',
    back: '返回',
    cat_all: '全部',
    cat_research: 'Research',
    cat_technical: 'Technical',
    cat_daily: 'Daily Life',
    cat_journal: 'Month Journal',
    articles: '文章',
    tags: '标签',
    hero_title: "Hi, I'm Lantean 👋",
    hero_role: 'Software Engineer & Tech Enthusiast',
    hero_desc: '分享技术与生活，记录成长路上的点点滴滴。热爱编程，关注前沿技术，喜欢用代码创造价值。',
    about_role: 'Science Research',
    about_location: '📍 Taiyuan, China',
    about_title: 'About Me',
    about_p1: '你好！我是 Lantean.',
    about_p2: '喜欢探索新技术，追求代码的优雅与可维护性。',
    about_p3: '在这个博客中，我会分享工作中的技术积累、踩坑记录以及学习心得。希望这些内容能对你有所帮助，也欢迎大家交流讨论！',
    skills_title: 'Skills',
    connect_title: 'Connect',
    footer: '© 2026 Lantean. All rights reserved.',
    academic_title: '学术研究',
    academic_desc: '这里收录了我的学术论文、研究项目和学术活动。',
    projects_title: '项目',
    projects_desc: '这里展示了我的开源项目和个人作品。',
    links_title: '友链',
    links_desc: '这里收录了一些我喜欢的博客和网站。',
    toggle_light: '切换到亮色模式',
    toggle_dark: '切换到暗色模式',
  },
  en: {
    brand: "Lantean's Blog",
    nav_blog: 'Blog',
    nav_academic: 'Academic',
    nav_projects: 'Projects',
    nav_links: 'Links',
    nav_about: 'About',
    search_placeholder: 'Search posts...',
    search_title: 'Search',
    search_hint: 'Enter a search term or phrase to search the blog.',
    latest_posts: 'Latest Posts',
    no_posts: 'No posts found',
    back: 'Back',
    cat_all: 'All',
    cat_research: 'Research',
    cat_technical: 'Technical',
    cat_daily: 'Daily Life',
    cat_journal: 'Month Journal',
    articles: 'Posts',
    tags: 'Tags',
    hero_title: "Hi, I'm Lantean 👋",
    hero_role: 'Software Engineer & Tech Enthusiast',
    hero_desc: 'Sharing tech and life, recording every step of growth. Passionate about coding, cutting-edge tech, and creating value through code.',
    about_role: 'Science Research',
    about_location: '📍 Taiyuan, China',
    about_title: 'About Me',
    about_p1: "Hello! I'm Lantean.",
    about_p2: 'I love exploring new technologies and pursuing elegant, maintainable code.',
    about_p3: 'In this blog, I share technical knowledge, lessons learned, and study notes. Hope this helps you, and feel free to reach out!',
    skills_title: 'Skills',
    connect_title: 'Connect',
    footer: '© 2026 Lantean. All rights reserved.',
    academic_title: 'Academic',
    academic_desc: 'My academic papers, research projects and activities.',
    projects_title: 'Projects',
    projects_desc: 'Open-source projects and personal works.',
    links_title: 'Links',
    links_desc: 'A curated list of blogs and websites I enjoy.',
    toggle_light: 'Switch to Light Mode',
    toggle_dark: 'Switch to Dark Mode',
  }
};

function i(key: string): string {
  return t[currentLang][key] ?? key;
}

// ─── Theme ──────────────────────────────────────────────────────────────────
function initTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    isDarkTheme = savedTheme === 'dark';
  } else {
    isDarkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  document.documentElement.setAttribute('data-theme', isDarkTheme ? 'dark' : 'light');
}

function toggleTheme() {
  isDarkTheme = !isDarkTheme;
  const theme = isDarkTheme ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  render();
}

// ─── Blog categories (matching screenshot) ──────────────────────────────────
const blogCategories: BlogCategory[] = ['全部', 'Research', 'Technical', 'Daily Life', 'Month Journal'];

// ─── Academic data ──────────────────────────────────────────────────────────
interface Paper {
  title: string;
  authors: string;
  venue: string;
  year: number;
  abstract: string;
  tags: string[];
  link?: string;
}

const papers: Paper[] = [
  {
    title: 'Deep Reinforcement Learning for Adaptive Resource Allocation',
    authors: 'Lantean, Zhang Wei, Li Ming',
    venue: 'NeurIPS 2025',
    year: 2025,
    abstract: 'We propose a novel deep RL framework for dynamic resource allocation in distributed systems, achieving 23% efficiency gains over state-of-the-art baselines.',
    tags: ['Deep Learning', 'Reinforcement Learning', 'Systems'],
    link: '#'
  },
  {
    title: 'Efficient Transformer Architectures for Low-Latency Inference',
    authors: 'Lantean, Chen Fang',
    venue: 'ICML 2025',
    year: 2025,
    abstract: 'A novel attention mechanism that reduces inference latency by 40% while maintaining model accuracy on standard benchmarks.',
    tags: ['Transformers', 'Efficiency', 'NLP'],
    link: '#'
  },
  {
    title: 'Graph Neural Networks for Scientific Discovery',
    authors: 'Lantean et al.',
    venue: 'ICLR 2024',
    year: 2024,
    abstract: 'Applying GNNs to accelerate molecular property prediction with applications in drug discovery pipelines.',
    tags: ['GNN', 'Scientific ML', 'Drug Discovery'],
    link: '#'
  }
];

// ─── Projects data ───────────────────────────────────────────────────────────
interface Project {
  name: string;
  desc: string;
  tech: string[];
  stars: number;
  link: string;
  emoji: string;
}

const projects: Project[] = [
  {
    name: 'NeuralKit',
    desc: currentLang === 'zh' ? '轻量级深度学习工具库，专为研究人员设计' : 'Lightweight deep learning toolkit designed for researchers',
    tech: ['Python', 'PyTorch', 'CUDA'],
    stars: 1243,
    link: 'https://github.com',
    emoji: '🧠'
  },
  {
    name: 'DataFlow',
    desc: currentLang === 'zh' ? '高性能数据处理流水线框架' : 'High-performance data processing pipeline framework',
    tech: ['Rust', 'Arrow', 'gRPC'],
    stars: 876,
    link: 'https://github.com',
    emoji: '⚡'
  },
  {
    name: 'VizBoard',
    desc: currentLang === 'zh' ? '科研实验可视化仪表盘' : 'Scientific experiment visualization dashboard',
    tech: ['React', 'TypeScript', 'D3.js'],
    stars: 542,
    link: 'https://github.com',
    emoji: '📊'
  },
  {
    name: 'LanBlog',
    desc: currentLang === 'zh' ? '本博客系统，基于 Astro 构建' : 'This blog system, built with Astro',
    tech: ['Astro', 'TypeScript', 'Tailwind'],
    stars: 210,
    link: 'https://github.com',
    emoji: '✍️'
  }
];

// ─── Links data ───────────────────────────────────────────────────────────────
interface FriendLink {
  name: string;
  url: string;
  desc: string;
  avatar: string;
}

const friendLinks: FriendLink[] = [
  { name: 'Axi404', url: 'https://axi404.top', desc: 'Science Research & Tech Blog', avatar: '🤖' },
  { name: 'Ruancat', url: '#', desc: 'Full-stack dev, anime lover', avatar: '🐱' },
  { name: 'GeekBlog', url: '#', desc: '极客技术分享', avatar: '💻' },
  { name: 'MathNotes', url: '#', desc: '数学与算法笔记', avatar: '📐' },
  { name: 'OpenResearch', url: '#', desc: 'Open source research hub', avatar: '🔬' },
  { name: 'DevDiary', url: '#', desc: 'Weekly engineering notes', avatar: '📓' },
];

// ─── Components ───────────────────────────────────────────────────────────────

function ThemeToggle() {
  return `
    <button class="icon-btn theme-toggle" onclick="toggleTheme()" aria-label="切换主题" title="${isDarkTheme ? i('toggle_light') : i('toggle_dark')}">
      ${isDarkTheme
        ? `<svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
          </svg>`
        : `<svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
          </svg>`}
    </button>
  `;
}

function LangToggle() {
  return `
    <button class="lang-btn" onclick="toggleLang()" title="Switch language">
      <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"/>
      </svg>
      ${currentLang === 'zh' ? '中文' : 'EN'}
    </button>
  `;
}

function SearchIcon() {
  return `
    <button class="icon-btn" onclick="navigate('search')" aria-label="Search">
      <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
      </svg>
    </button>
  `;
}

function AvatarIcon() {
  return `
    <button class="nav-avatar" onclick="navigate('about')" aria-label="Profile" title="About">
      <span>L</span>
    </button>
  `;
}

function BlogDropdown() {
  return `
    <div class="dropdown-wrapper" id="blog-dropdown">
      <button 
        class="nav-link ${currentPage === 'home' ? 'active' : ''} dropdown-trigger"
        onclick="toggleBlogDropdown(event)"
        aria-haspopup="true"
        aria-expanded="${isBlogDropdownOpen}"
      >
        ${i('nav_blog')}
        <svg class="dropdown-chevron ${isBlogDropdownOpen ? 'open' : ''}" width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"/>
        </svg>
      </button>
      ${isBlogDropdownOpen ? `
        <div class="dropdown-menu" role="menu">
          ${(['Research', 'Technical', 'Daily Life', 'Month Journal'] as BlogCategory[]).map(cat => `
            <button 
              class="dropdown-item ${selectedCategory === cat ? 'active' : ''}" 
              onclick="selectBlogCategory('${cat}')"
              role="menuitem"
            >
              ${cat === 'Research' ? '🔬' : cat === 'Technical' ? '⚙️' : cat === 'Daily Life' ? '☀️' : '📅'}
              ${cat}
            </button>
          `).join('')}
        </div>
      ` : ''}
    </div>
  `;
}

function Navbar() {
  return `
    <nav class="navbar">
      <div class="navbar-content">
        <a href="#" class="nav-brand" onclick="navigate('home')">${i('brand')}</a>
        <div class="nav-links">
          ${BlogDropdown()}
          <button onclick="navigate('academic')" class="nav-link ${currentPage === 'academic' ? 'active' : ''}">${i('nav_academic')}</button>
          <button onclick="navigate('projects')" class="nav-link ${currentPage === 'projects' ? 'active' : ''}">${i('nav_projects')}</button>
          <button onclick="navigate('links')" class="nav-link ${currentPage === 'links' ? 'active' : ''}">${i('nav_links')}</button>
          <button onclick="navigate('about')" class="nav-link ${currentPage === 'about' ? 'active' : ''}">${i('nav_about')}</button>
          <div class="nav-divider"></div>
          ${AvatarIcon()}
          ${SearchIcon()}
          ${LangToggle()}
          ${ThemeToggle()}
        </div>
      </div>
    </nav>
  `;
}

function Hero() {
  return `
    <section class="hero">
      <div class="container">
        <div class="hero-content animate-fade-in">
          <div class="avatar">L</div>
          <div class="hero-text">
            <h1>${i('hero_title')}</h1>
            <p class="subtitle">${i('hero_role')}</p>
            <p class="description">${i('hero_desc')}</p>
            <div class="stats">
              <div class="stat-item">
                <span class="count">${posts.length}</span>
                <span>${i('articles')}</span>
              </div>
              <div class="stat-item">
                <span class="count">${allTags.length}</span>
                <span>${i('tags')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

function PostCard(post: typeof posts[0], index: number) {
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

function getCategoryClass(category: string): string {
  const map: Record<string, string> = {
    'Research': 'cat-research',
    'Technical': 'cat-technical',
    'Daily Life': 'cat-daily',
    'Month Journal': 'cat-journal',
  };
  return map[category] ?? '';
}

function PostList() {
  const filteredPosts = posts.filter(post => {
    const catKey = selectedCategory === '全部' ? null : selectedCategory;
    const matchesCategory = !catKey || post.category === catKey;
    const matchesSearch = searchQuery === '' ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const activeCatLabel = selectedCategory === '全部' ? i('latest_posts') :
    `${selectedCategory} — ${filteredPosts.length} ${i('articles')}`;

  return `
    <section class="content-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">${activeCatLabel}</h2>
          <div class="search-box">
            <svg class="search-icon" width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            <input 
              type="text" class="search-input"
              placeholder="${i('search_placeholder')}"
              value="${searchQuery}"
              oninput="handleSearch(this.value)"
            />
          </div>
        </div>

        <div class="categories">
          ${blogCategories.map(cat => `
            <button 
              onclick="filterCategory('${cat}')"
              class="category-btn ${selectedCategory === cat ? 'active' : ''}"
            >
              ${cat === '全部' ? i('cat_all') : cat}
            </button>
          `).join('')}
        </div>

        <div class="post-grid">
          ${filteredPosts.length > 0
            ? filteredPosts.map((post, i) => PostCard(post, i)).join('')
            : `<div class="empty-state" style="grid-column: 1 / -1">
                <div class="icon">📝</div>
                <p>${i('no_posts')}</p>
              </div>`
          }
        </div>
      </div>
    </section>
  `;
}

function PostDetail(post: typeof posts[0]) {
  return `
    <div class="container">
      <div class="post-detail animate-fade-in">
        <button onclick="navigate('home')" class="post-back">
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
          </svg>
          ${i('back')}
        </button>
        <header class="post-header">
          ${post.coverImage ? `<img src="${post.coverImage}" alt="${post.title}" class="post-cover-large" />` : ''}
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

function renderMarkdown(content: string): string {
  const lines = content.trim().split('\n');
  const output: string[] = [];
  let inCode = false;

  for (const raw of lines) {
    if (raw.startsWith('```')) {
      if (!inCode) {
        const lang = raw.slice(3).trim();
        output.push(`<pre class="code-block${lang ? ` language-${lang}` : ''}"><code>`);
        inCode = true;
      } else {
        output.push('</code></pre>');
        inCode = false;
      }
      continue;
    }
    if (inCode) { output.push(escapeHtml(raw)); continue; }

    if (raw.startsWith('### ')) { output.push(`<h3>${raw.slice(4)}</h3>`); continue; }
    if (raw.startsWith('## '))  { output.push(`<h2>${raw.slice(3)}</h2>`); continue; }
    if (raw.startsWith('# '))   { output.push(`<h1>${raw.slice(2)}</h1>`); continue; }
    if (raw.startsWith('- '))   { output.push(`<li>${inlineMarkdown(raw.slice(2))}</li>`); continue; }
    if (raw.match(/^\d+\. /))   { output.push(`<li>${inlineMarkdown(raw.slice(raw.indexOf(' ') + 1))}</li>`); continue; }
    if (!raw.trim())             { output.push('<br/>'); continue; }
    output.push(`<p>${inlineMarkdown(raw)}</p>`);
  }
  return output.join('\n');
}

function escapeHtml(str: string): string {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function inlineMarkdown(line: string): string {
  line = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  line = line.replace(/\*(.*?)\*/g, '<em>$1</em>');
  line = line.replace(/`([^`]+)`/g, '<code>$1</code>');
  return line;
}

// ─── Academic Page ────────────────────────────────────────────────────────────
function AcademicPage() {
  return `
    <div class="container">
      <div class="inner-page animate-fade-in">
        <div class="page-header">
          <h1 class="page-title">${i('academic_title')}</h1>
          <p class="page-desc">${i('academic_desc')}</p>
        </div>

        <div class="papers-list">
          ${papers.map((paper, idx) => `
            <div class="paper-card animate-fade-in" style="animation-delay:${idx * 80}ms">
              <div class="paper-top">
                <div class="paper-venue-row">
                  <span class="paper-venue">${paper.venue}</span>
                  <span class="paper-year">${paper.year}</span>
                </div>
                <h3 class="paper-title">${paper.title}</h3>
                <p class="paper-authors">${paper.authors}</p>
              </div>
              <p class="paper-abstract">${paper.abstract}</p>
              <div class="paper-footer">
                <div class="paper-tags">
                  ${paper.tags.map(t => `<span class="paper-tag">${t}</span>`).join('')}
                </div>
                ${paper.link ? `
                  <a href="${paper.link}" target="_blank" class="paper-link">
                    <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                    </svg>
                    PDF
                  </a>
                ` : ''}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

// ─── Projects Page ────────────────────────────────────────────────────────────
function ProjectsPage() {
  return `
    <div class="container">
      <div class="inner-page animate-fade-in">
        <div class="page-header">
          <h1 class="page-title">${i('projects_title')}</h1>
          <p class="page-desc">${i('projects_desc')}</p>
        </div>

        <div class="projects-grid">
          ${projects.map((proj, idx) => `
            <a href="${proj.link}" target="_blank" class="project-card animate-fade-in" style="animation-delay:${idx * 70}ms">
              <div class="project-emoji">${proj.emoji}</div>
              <div class="project-body">
                <div class="project-top">
                  <h3 class="project-name">${proj.name}</h3>
                  <div class="project-stars">
                    <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                    ${proj.stars}
                  </div>
                </div>
                <p class="project-desc">${proj.desc}</p>
                <div class="project-tech">
                  ${proj.tech.map(t => `<span class="tech-badge">${t}</span>`).join('')}
                </div>
              </div>
            </a>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

// ─── Links Page ───────────────────────────────────────────────────────────────
function LinksPage() {
  return `
    <div class="container">
      <div class="inner-page animate-fade-in">
        <div class="page-header">
          <h1 class="page-title">${i('links_title')}</h1>
          <p class="page-desc">${i('links_desc')}</p>
        </div>

        <div class="links-grid">
          ${friendLinks.map((link, idx) => `
            <a href="${link.url}" target="_blank" class="link-card animate-fade-in" style="animation-delay:${idx * 60}ms">
              <div class="link-avatar">${link.avatar}</div>
              <div class="link-info">
                <h3 class="link-name">${link.name}</h3>
                <p class="link-desc">${link.desc}</p>
              </div>
              <svg class="link-arrow" width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
              </svg>
            </a>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

// ─── Search Page ───────────────────────────────────────────────────────────────
function SearchPage() {
  const results = searchQuery
    ? posts.filter(p =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : [];

  return `
    <div class="container">
      <div class="inner-page animate-fade-in">
        <button onclick="navigate('home')" class="post-back">
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
          </svg>
          ${i('back')}
        </button>

        <h1 class="page-title" style="margin-top:1.5rem">${i('search_title')}</h1>
        <p class="page-desc">${i('search_hint')}</p>

        <div class="search-box search-box-lg">
          <svg class="search-icon" width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
          <input 
            id="search-main-input"
            type="text" class="search-input"
            placeholder="${i('search_placeholder')}"
            value="${searchQuery}"
            oninput="handleSearch(this.value)"
            autofocus
          />
        </div>

        ${searchQuery && `
          <div class="search-results">
            ${results.length > 0
              ? results.map((post, idx) => PostCard(post, idx)).join('')
              : `<div class="empty-state"><div class="icon">🔍</div><p>${i('no_posts')}</p></div>`
            }
          </div>
        `}
      </div>
    </div>
  `;
}

// ─── About Page ───────────────────────────────────────────────────────────────
function AboutPage() {
  const skills = ['React', 'Vue', 'TypeScript', 'Node.js', 'Python', 'Docker', 'Git', 'Kubernetes', 'AWS', 'PostgreSQL', 'Redis', 'Linux'];
  return `
    <div class="container">
      <div class="about-page animate-fade-in">
        <div class="about-header">
          <div class="about-avatar">L</div>
          <div class="about-info">
            <h1>Lantean</h1>
            <p class="role">${i('about_role')}</p>
            <p class="location">${i('about_location')}</p>
          </div>
        </div>

        <section class="about-section">
          <h2>${i('about_title')}</h2>
          <div class="about-text">
            <p>${i('about_p1')}</p>
            <p>${i('about_p2')}</p>
            <p>${i('about_p3')}</p>
          </div>
        </section>

        <section class="about-section">
          <h2>${i('skills_title')}</h2>
          <div class="skills-grid">
            ${skills.map(skill => `<div class="skill-item">${skill}</div>`).join('')}
          </div>
        </section>

        <section class="about-section">
          <h2>${i('connect_title')}</h2>
          <div class="social-links">
            <a href="https://github.com" target="_blank" class="social-btn">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              GitHub
            </a>
            <a href="mailto:axi@example.com" class="social-btn">
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              Email
            </a>
            <a href="https://twitter.com" target="_blank" class="social-btn">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              Twitter
            </a>
          </div>
        </section>
      </div>
    </div>
  `;
}

function Footer() {
  return `
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <span class="footer-text">${i('footer')}</span>
          <span class="footer-text">Made with ❤️ · Astro theme powered</span>
        </div>
      </div>
    </footer>
  `;
}

// ─── Render ───────────────────────────────────────────────────────────────────
function render() {
  const app = document.getElementById('app');
  if (!app) return;

  let pageContent = '';

  switch (currentPage) {
    case 'home':
      pageContent = `${Hero()}${PostList()}`;
      break;
    case 'post': {
      const post = posts.find(p => p.id === currentPostId);
      pageContent = post ? PostDetail(post) : '';
      break;
    }
    case 'about':
      pageContent = AboutPage();
      break;
    case 'academic':
      pageContent = AcademicPage();
      break;
    case 'projects':
      pageContent = ProjectsPage();
      break;
    case 'links':
      pageContent = LinksPage();
      break;
    case 'search':
      pageContent = SearchPage();
      break;
  }

  app.innerHTML = `
    ${Navbar()}
    <main class="main-content">${pageContent}</main>
    ${Footer()}
  `;

  // Auto-focus search input on search page
  if (currentPage === 'search') {
    const el = document.getElementById('search-main-input') as HTMLInputElement | null;
    if (el) el.focus();
  }
}

// ─── Global handlers ──────────────────────────────────────────────────────────
(window as any).navigate = (page: Page) => {
  currentPage = page;
  currentPostId = null;
  isBlogDropdownOpen = false;
  if (page !== 'search') searchQuery = '';
  window.scrollTo({ top: 0, behavior: 'smooth' });
  render();
};

(window as any).viewPost = (id: string) => {
  currentPage = 'post';
  currentPostId = id;
  isBlogDropdownOpen = false;
  window.scrollTo({ top: 0, behavior: 'smooth' });
  render();
};

(window as any).filterCategory = (category: BlogCategory) => {
  selectedCategory = category;
  render();
};

(window as any).handleSearch = (query: string) => {
  searchQuery = query;
  render();
};

(window as any).toggleTheme = toggleTheme;

(window as any).toggleLang = () => {
  currentLang = currentLang === 'zh' ? 'en' : 'zh';
  render();
};

(window as any).toggleBlogDropdown = (e: Event) => {
  e.stopPropagation();
  isBlogDropdownOpen = !isBlogDropdownOpen;
  render();
};

(window as any).selectBlogCategory = (cat: BlogCategory) => {
  selectedCategory = cat;
  currentPage = 'home';
  isBlogDropdownOpen = false;
  window.scrollTo({ top: 0, behavior: 'smooth' });
  render();
};

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
  if (isBlogDropdownOpen) {
    const dropdown = document.getElementById('blog-dropdown');
    if (dropdown && !dropdown.contains(e.target as Node)) {
      isBlogDropdownOpen = false;
      render();
    }
  }
});

// 首次渲染
document.addEventListener('DOMContentLoaded', render);

// 兼容直接执行的情况（Vite HMR / SSR 入口）
render();
