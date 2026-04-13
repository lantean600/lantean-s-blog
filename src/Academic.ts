import { t } from '../i18n';
import type { Paper } from '../types';

const PAPERS: Paper[] = [
  {
    title: 'Deep Reinforcement Learning for Adaptive Resource Allocation',
    authors: 'Lantean, Zhang Wei, Li Ming',
    venue: 'NeurIPS 2025',
    year: 2025,
    abstract: 'We propose a novel deep RL framework for dynamic resource allocation in distributed systems, achieving 23% efficiency gains over state-of-the-art baselines.',
    tags: ['Deep Learning', 'Reinforcement Learning', 'Systems'],
    link: '#',
  },
  {
    title: 'Efficient Transformer Architectures for Low-Latency Inference',
    authors: 'Lantean, Chen Fang',
    venue: 'ICML 2025',
    year: 2025,
    abstract: 'A novel attention mechanism that reduces inference latency by 40% while maintaining model accuracy on standard benchmarks.',
    tags: ['Transformers', 'Efficiency', 'NLP'],
    link: '#',
  },
  {
    title: 'Graph Neural Networks for Scientific Discovery',
    authors: 'Lantean et al.',
    venue: 'ICLR 2024',
    year: 2024,
    abstract: 'Applying GNNs to accelerate molecular property prediction with applications in drug discovery pipelines.',
    tags: ['GNN', 'Scientific ML', 'Drug Discovery'],
    link: '#',
  },
];

export function AcademicPage(): string {
  return `
    <div class="container">
      <div class="inner-page animate-fade-in">
        <div class="page-header">
          <h1 class="page-title">${t('academic_title')}</h1>
          <p class="page-desc">${t('academic_desc')}</p>
        </div>

        <div class="papers-list">
          ${PAPERS.map((paper, i) => PaperCard(paper, i)).join('')}
        </div>
      </div>
    </div>
  `;
}

function PaperCard(paper: Paper, index: number): string {
  return `
    <div class="paper-card animate-fade-in" style="animation-delay:${index * 80}ms">
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
          ${paper.tags.map(tag => `<span class="paper-tag">${tag}</span>`).join('')}
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
  `;
}
