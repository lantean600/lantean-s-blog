import { defineConfig } from 'vite';

export default defineConfig({
  // 修改为你的仓库名，例如 '/lantean-blog/' 或留空 '/'
  base: '/',
  
  build: {
    // 构建输出目录
    outDir: 'dist',
    // 打包文件命名
    assetsDir: 'assets',
  },
  
  server: {
    port: 5000,
    host: '0.0.0.0',
    allowedHosts: true,
    hmr: {
      overlay: true,
      path: '/hot/vite-hmr',
      port: 6000,
      clientPort: 443,
      timeout: 30000,
    },
    watch: {
      usePolling: true,
      interval: 100,
    }
  },
});
