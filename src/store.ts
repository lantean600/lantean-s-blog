import type { Page, BlogCategory, Lang } from './types';

/** 全局状态，所有模块通过此对象读写，避免散落在各文件的全局变量 */
export const store = {
  currentPage: 'home' as Page,
  currentPostId: null as string | null,
  selectedCategory: '全部' as BlogCategory,
  searchQuery: '',
  isBlogDropdownOpen: false,
  isDarkTheme: false,
  currentLang: 'zh' as Lang,
};
