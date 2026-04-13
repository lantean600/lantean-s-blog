import { store } from './store';
import { toggleTheme } from './theme';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/Home';
import { PostDetailPage } from './pages/PostDetail';
import { AboutPage } from './pages/About';
import { AcademicPage } from './pages/Academic';
import { ProjectsPage } from './pages/Projects';
import { LinksPage } from './pages/Links';
import { SearchPage } from './pages/Search';
import { posts } from './data';
import type { Page, BlogCategory } from './types';

// ─── Render ───────────────────────────────────────────────────────────────────
export function render(): void {
  const app = document.getElementById('app');
  if (!app) return;

  let pageContent = '';

  switch (store.currentPage) {
    case 'home':
      pageContent = HomePage();
      break;
    case 'post': {
      const post = posts.find(p => p.id === store.currentPostId);
      pageContent = post ? PostDetailPage(post) : '';
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

  // 搜索页自动聚焦
  if (store.currentPage === 'search') {
    const el = document.getElementById('search-main-input') as HTMLInputElement | null;
    el?.focus();
  }
}

// ─── Global handlers（挂到 window 供 HTML inline 事件调用）─────────────────────
(window as any).navigate = (page: Page) => {
  store.currentPage = page;
  store.currentPostId = null;
  store.isBlogDropdownOpen = false;
  if (page !== 'search') store.searchQuery = '';
  window.scrollTo({ top: 0, behavior: 'smooth' });
  render();
};

(window as any).viewPost = (id: string) => {
  store.currentPage = 'post';
  store.currentPostId = id;
  store.isBlogDropdownOpen = false;
  window.scrollTo({ top: 0, behavior: 'smooth' });
  render();
};

(window as any).filterCategory = (category: BlogCategory) => {
  store.selectedCategory = category;
  render();
};

(window as any).handleSearch = (query: string) => {
  store.searchQuery = query;
  render();
};

(window as any).toggleTheme = () => {
  toggleTheme();
  render();
};

(window as any).toggleLang = () => {
  store.currentLang = store.currentLang === 'zh' ? 'en' : 'zh';
  render();
};

(window as any).toggleBlogDropdown = (e: Event) => {
  e.stopPropagation();
  store.isBlogDropdownOpen = !store.isBlogDropdownOpen;
  render();
};

(window as any).selectBlogCategory = (cat: BlogCategory) => {
  store.selectedCategory = cat;
  store.currentPage = 'home';
  store.isBlogDropdownOpen = false;
  window.scrollTo({ top: 0, behavior: 'smooth' });
  render();
};

// 点击页面其他区域关闭下拉菜单
document.addEventListener('click', (e) => {
  if (store.isBlogDropdownOpen) {
    const dropdown = document.getElementById('blog-dropdown');
    if (dropdown && !dropdown.contains(e.target as Node)) {
      store.isBlogDropdownOpen = false;
      render();
    }
  }
});
