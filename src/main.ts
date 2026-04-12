import { posts, categories, allTags } from './data';
import './index.css';

type Page = 'home' | 'post' | 'about';

let currentPage: Page = 'home';
let currentPostId: string | null = null;
let selectedCategory = '全部';
let searchQuery = '';

// 主题状态
let isDarkTheme = false;

// 初始化主题
function initTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    isDarkTheme = savedTheme === 'dark';
  } else {
    isDarkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  document.documentElement.setAttribute('data-theme', isDarkTheme ? 'dark' : 'light');
}

// 切换主题
function toggleTheme() {
  isDarkTheme = !isDarkTheme;
  const theme = isDarkTheme ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}

// 主题切换按钮
function ThemeToggle() {
  return `
    <button class="theme-toggle" onclick="toggleTheme()" aria-label="切换主题" title="${isDarkTheme ? '切换到亮色模式' : '切换到暗色模式'}">
      ${isDarkTheme ? `
        <svg class="w-5 h-5" style="color: var(--text-secondary)" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
        </svg>
      ` : `
        <svg class="w-5 h-5" style="color: var(--text-secondary)" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
        </svg>
      `}
    </button>
  `;
}

// 导航栏
function Navbar() {
  return `
    <nav class="navbar">
      <div class="navbar-content">
        <a href="#" class="nav-brand" onclick="navigate('home')">Axi's Blog</a>
        <div class="nav-links">
          <button onclick="navigate('home')" class="nav-link ${currentPage === 'home' ? 'active' : ''}">Blog</button>
          <button onclick="navigate('about')" class="nav-link ${currentPage === 'about' ? 'active' : ''}">About</button>
          ${ThemeToggle()}
        </div>
      </div>
    </nav>
  `;
}

// Hero 区域
function Hero() {
  return `
    <section class="hero">
      <div class="container">
        <div class="hero-content animate-fade-in">
          <div class="avatar">A</div>
          <div class="hero-text">
            <h1>Hi, I'm Axi 👋</h1>
            <p class="subtitle">Software Engineer & Tech Enthusiast</p>
            <p class="description">
              分享技术与生活，记录成长路上的点点滴滴。
              热爱编程，关注前沿技术，喜欢用代码创造价值。
            </p>
            <div class="stats">
              <div class="stat-item">
                <span class="count">${posts.length}</span>
                <span>文章</span>
              </div>
              <div class="stat-item">
                <span class="count">${allTags.length}</span>
                <span>标签</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

// 文章卡片
function PostCard(post: typeof posts[0], index: number) {
  return `
    <article 
      class="post-card animate-fade-in"
      style="animation-delay: ${index * 50}ms"
      onclick="viewPost('${post.id}')"
    >
      ${post.coverImage ? `
        <img 
          src="${post.coverImage}" 
          alt="${post.title}"
          class="post-card-cover"
          loading="lazy"
        />
      ` : ''}
      <div class="post-card-meta">
        <span class="post-category">${post.category}</span>
        <span class="post-date">${post.date}</span>
      </div>
      <h3 class="post-card-title">${post.title}</h3>
      <p class="post-card-excerpt">${post.excerpt}</p>
      <div class="post-card-tags">
        ${post.tags.map(tag => `<span class="post-tag">#${tag}</span>`).join('')}
        <span class="post-tag" style="margin-left: auto">${post.readingTime}</span>
      </div>
    </article>
  `;
}

// 文章列表
function PostList() {
  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === '全部' || post.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return `
    <section class="content-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Latest Posts</h2>
          <div class="search-box">
            <svg class="search-icon w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            <input 
              type="text" 
              class="search-input"
              placeholder="搜索文章..."
              value="${searchQuery}"
              oninput="handleSearch(this.value)"
            />
          </div>
        </div>
        
        <div class="categories">
          ${categories.map(cat => `
            <button 
              onclick="filterCategory('${cat}')"
              class="category-btn ${selectedCategory === cat ? 'active' : ''}"
            >
              ${cat}
            </button>
          `).join('')}
        </div>
        
        <div class="post-grid">
          ${filteredPosts.length > 0 
            ? filteredPosts.map((post, i) => PostCard(post, i)).join('')
            : `
              <div class="empty-state" style="grid-column: 1 / -1">
                <div class="icon">📝</div>
                <p>暂无相关文章</p>
              </div>
            `
          }
        </div>
      </div>
    </section>
  `;
}

// 文章详情
function PostDetail(post: typeof posts[0]) {
  return `
    <div class="container">
      <div class="post-detail animate-fade-in">
        <button onclick="navigate('home')" class="post-back">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
          </svg>
          返回首页
        </button>
        
        <header class="post-header">
          ${post.coverImage ? `
            <img 
              src="${post.coverImage}" 
              alt="${post.title}"
              class="post-cover-large"
            />
          ` : ''}
          <h1 class="post-title">${post.title}</h1>
          <div class="post-info">
            <span class="post-category">${post.category}</span>
            <span>${post.date}</span>
            <span>·</span>
            <span>${post.readingTime}</span>
          </div>
          <div class="post-tags">
            ${post.tags.map(tag => `<span class="post-tag">#${tag}</span>`).join('')}
          </div>
        </header>
        
        <div class="markdown-content">
          ${post.content.trim().split('\n').map(line => {
            if (line.startsWith('```')) {
              if (line.slice(3)) {
                return `<pre class="language-${line.slice(3)}"><code>${line.slice(3)}</code></pre>`;
              }
              return '<pre><code>';
            }
            if (line === '```') return '</code></pre>';
            if (line.startsWith('## ')) return `<h2>${line.slice(3)}</h2>`;
            if (line.startsWith('# ')) return `<h1>${line.slice(2)}</h1>`;
            if (line.startsWith('### ')) return `<h3>${line.slice(4)}</h3>`;
            if (line.startsWith('- ')) return `<li>${line.slice(2)}</li>`;
            if (line.match(/^\d+\. /)) return `<li>${line.slice(line.indexOf(' ') + 1)}</li>`;
            if (!line.trim()) return '<br/>';
            line = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
            line = line.replace(/\*(.*?)\*/g, '<em>$1</em>');
            line = line.replace(/`([^`]+)`/g, '<code>$1</code>');
            return `<p>${line}</p>`;
          }).join('\n')}
        </div>
      </div>
    </div>
  `;
}

// 关于页面
function AboutPage() {
  return `
    <div class="container">
      <div class="about-page animate-fade-in">
        <div class="about-header">
          <div class="about-avatar">A</div>
          <div class="about-info">
            <h1>Axi</h1>
            <p class="role">Software Engineer</p>
            <p class="location">📍 Shanghai, China</p>
          </div>
        </div>
        
        <section class="about-section">
          <h2>About Me</h2>
          <div class="about-text">
            <p>
              你好！我是 Axi，一名热爱编程的软件工程师。
              专注于前端技术栈，包括 React、Vue、TypeScript 等。
            </p>
            <p>
              除了前端，我也对后端开发、云原生技术保持着浓厚的兴趣。
              喜欢探索新技术，追求代码的优雅与可维护性。
            </p>
            <p>
              在这个博客中，我会分享工作中的技术积累、踩坑记录以及学习心得。
              希望这些内容能对你有所帮助，也欢迎大家交流讨论！
            </p>
          </div>
        </section>
        
        <section class="about-section">
          <h2>Skills</h2>
          <div class="skills-grid">
            ${['React', 'Vue', 'TypeScript', 'Node.js', 'Python', 'Docker', 'Git', 'Kubernetes', 'AWS', 'PostgreSQL', 'Redis', 'Linux'].map(skill => `
              <div class="skill-item">${skill}</div>
            `).join('')}
          </div>
        </section>
        
        <section class="about-section">
          <h2>Connect</h2>
          <div class="social-links">
            <a href="https://github.com" target="_blank" class="social-btn">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              GitHub
            </a>
            <a href="mailto:axi@example.com" class="social-btn">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              Email
            </a>
            <a href="https://twitter.com" target="_blank" class="social-btn">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
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

// 页脚
function Footer() {
  return `
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <span class="footer-text">© 2024 Axi. All rights reserved.</span>
          <span class="footer-text">Made with ❤️</span>
        </div>
      </div>
    </footer>
  `;
}

// 主渲染
function render() {
  const app = document.getElementById('app');
  if (!app) return;

  let content = '';
  
  switch (currentPage) {
    case 'home':
      content = `
        ${Navbar()}
        <main class="main-content">
          ${Hero()}
          ${PostList()}
        </main>
        ${Footer()}
      `;
      break;
    case 'post':
      const post = posts.find(p => p.id === currentPostId);
      if (post) {
        content = `
          ${Navbar()}
          <main class="main-content">
            ${PostDetail(post)}
          </main>
          ${Footer()}
        `;
      }
      break;
    case 'about':
      content = `
        ${Navbar()}
        <main class="main-content">
          ${AboutPage()}
        </main>
        ${Footer()}
      `;
      break;
  }

  app.innerHTML = content;
}

// 导航函数
(window as any).navigate = (page: Page) => {
  currentPage = page;
  currentPostId = null;
  window.scrollTo({ top: 0, behavior: 'smooth' });
  render();
};

// 查看文章
(window as any).viewPost = (id: string) => {
  currentPage = 'post';
  currentPostId = id;
  window.scrollTo({ top: 0, behavior: 'smooth' });
  render();
};

// 分类筛选
(window as any).filterCategory = (category: string) => {
  selectedCategory = category;
  render();
};

// 搜索
(window as any).handleSearch = (query: string) => {
  searchQuery = query;
  render();
};

// 主题切换
(window as any).toggleTheme = toggleTheme;

// 初始化
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  render();
});

initTheme();
render();
