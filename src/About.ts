import { t } from '../i18n';

const SKILLS = ['React', 'Vue', 'TypeScript', 'Node.js', 'Python', 'Docker',
                 'Git', 'Kubernetes', 'AWS', 'PostgreSQL', 'Redis', 'Linux'];

export function AboutPage(): string {
  return `
    <div class="container">
      <div class="about-page animate-fade-in">
        <div class="about-header">
          <div class="about-avatar">L</div>
          <div class="about-info">
            <h1>Lantean</h1>
            <p class="role">${t('about_role')}</p>
            <p class="location">${t('about_location')}</p>
          </div>
        </div>

        <section class="about-section">
          <h2>${t('about_title')}</h2>
          <div class="about-text">
            <p>${t('about_p1')}</p>
            <p>${t('about_p2')}</p>
            <p>${t('about_p3')}</p>
          </div>
        </section>

        <section class="about-section">
          <h2>${t('skills_title')}</h2>
          <div class="skills-grid">
            ${SKILLS.map(s => `<div class="skill-item">${s}</div>`).join('')}
          </div>
        </section>

        <section class="about-section">
          <h2>${t('connect_title')}</h2>
          <div class="social-links">
            <a href="https://github.com" target="_blank" class="social-btn">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              GitHub
            </a>
            <a href="mailto:lantean@example.com" class="social-btn">
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
