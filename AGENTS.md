# Axi's Blog - 个人技术博客

## 技术栈

- **核心**: Vite 7, TypeScript, Express
- **UI**: Tailwind CSS
- **类型**: 单页应用 (SPA)

## 目录结构

```
├── scripts/            # 构建与启动脚本
├── server/             # 服务端逻辑
├── src/                # 前端源码
│   ├── index.css       # 全局样式（极简学术风格）
│   ├── index.ts        # 客户端入口
│   ├── main.ts         # 博客主逻辑（路由、页面渲染）
│   └── data.ts         # 博客文章数据
├── index.html          # 入口 HTML
├── package.json        # 项目依赖管理
├── tsconfig.json       # TypeScript 配置
└── vite.config.ts      # Vite 配置
```

## 设计风格

采用**极简学术风格**，参考 Axi's Blog 的设计：

### 配色方案
- **亮色主题（默认）**：
  - 背景：`#fafbfc`（浅冷调灰白）
  - 文字标题：`#000000`（纯黑）
  - 正文文字：`#333333`（深灰）
  - 辅助文字：`#999999`（浅灰）
  - 强调色：`#0066cc`（蓝色链接）

- **暗色主题**：
  - 背景：`#1a1a1a`
  - 文字：`#ffffff` / `#e0e0e0`
  - 强调色：`#5cacff`

### 字体
- 系统无衬线字体：`-apple-system, BlinkMacSystemFont, 'Segoe UI'`
- 清晰的字体层级：大标题 → 副标题 → 正文 → 辅助文字

### 布局
- 顶部固定导航栏
- 左侧头像 + 右侧文字的 Hero 区域
- 网格布局的文章卡片
- 充足的留白和间距

### 组件
- **卡片**：轻量圆角 + 轻微边框 + hover 阴影
- **按钮**：胶囊型链接按钮、简约矩形按钮
- **搜索框**：圆角输入框 + 搜索图标
- **分类标签**：圆角胶囊按钮

## 博客功能

- **首页**: Hero 区域 + 搜索 + 分类筛选 + 文章网格
- **文章详情**: Markdown 渲染 + 代码高亮 + 封面图
- **关于页面**: 个人介绍 + 技能标签 + 社交链接
- **双主题切换**: 亮色/暗色模式，主题偏好自动保存
- **文章配图**: 支持封面图，懒加载

## 文章数据

编辑 `src/data.ts` 添加/修改文章：

```typescript
{
  id: '7',
  title: '新文章标题',
  date: '2024-02-01',
  excerpt: '文章摘要...',
  content: `## 标题\n\n正文内容...`,
  tags: ['标签1', '标签2'],
  category: '技术',
  readingTime: '5 分钟',
  coverImage: 'https://example.com/cover.jpg' // 可选
}
```

## 开发规范

- 使用 Tailwind CSS 进行样式开发
- 使用 CSS 变量管理主题颜色
- 代码修改后自动热更新，无需重启服务
- 仅允许使用 pnpm 作为包管理器
