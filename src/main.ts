import { initTheme } from './theme';
import { render } from './router';
import './index.css';

// 初始化主题（需在 render 前执行，避免闪屏）
initTheme();

// 首次渲染
document.addEventListener('DOMContentLoaded', render);

// 兼容直接执行的情况（Vite HMR / SSR 入口）
render();
