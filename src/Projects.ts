import { t } from '../i18n';
import type { Project } from '../types';

const PROJECTS: Project[] = [
  {
    name: 'NeuralKit',
    desc: '轻量级深度学习工具库，专为研究人员设计',
    tech: ['Python', 'PyTorch', 'CUDA'],
    stars: 1243,
    link: 'https://github.com',
    emoji: '🧠',
  },
  {
    name: 'DataFlow',
    desc: '高性能数据处理流水线框架',
    tech: ['Rust', 'Arrow', 'gRPC'],
    stars: 876,
    link: 'https://github.com',
    emoji: '⚡',
  },
  {
    name: 'VizBoard',
    desc: '科研实验可视化仪表盘',
    tech: ['React', 'TypeScript', 'D3.js'],
    stars: 542,
    link: 'https://github.com',
    emoji: '📊',
  },
  {
    name: 'LanBlog',
    desc: '本博客系统，基于 Astro 构建',
    tech: ['Astro', 'TypeScript', 'Tailwind'],
    stars: 210,
    link: 'https://github.com',
    emoji: '✍️',
  },
];

export function ProjectsPage(): string {
  return `
    <div class="container">
      <div class="inner-page animate-fade-in">
        <div class="page-header">
          <h1 class="page-title">${t('projects_title')}</h1>
          <p class="page-desc">${t('projects_desc')}</p>
        </div>

        <div class="projects-grid">
          ${PROJECTS.map((proj, i) => ProjectCard(proj, i)).join('')}
        </div>
      </div>
    </div>
  `;
}

function ProjectCard(proj: Project, index: number): string {
  return `
    <a href="${proj.link}" target="_blank" class="project-card animate-fade-in" style="animation-delay:${index * 70}ms">
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
          ${proj.tech.map(tech => `<span class="tech-badge">${tech}</span>`).join('')}
        </div>
      </div>
    </a>
  `;
}
