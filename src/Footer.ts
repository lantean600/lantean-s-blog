import { t } from '../i18n';

export function Footer(): string {
  return `
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <span class="footer-text">${t('footer')}</span>
          <span class="footer-text">Made with ❤️ · Astro theme powered</span>
        </div>
      </div>
    </footer>
  `;
}
