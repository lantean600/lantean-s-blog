// 博客数据
export interface Post {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  tags: string[];
  category: string;
  readingTime: string;
  coverImage?: string; // 文章封面图，可选
}

// 示例文章数据
export const posts: Post[] = [
  {
    id: '1',
    title: '深入理解 TypeScript 泛型',
    date: '2024-01-15',
    excerpt: 'TypeScript 泛型是提高代码复用性和类型安全性的强大工具。本文将带你深入理解泛型的各种用法和技巧。',
    tags: ['TypeScript', '前端'],
    category: '技术',
    readingTime: '8 分钟',
    coverImage: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=400&fit=crop',
    content: `
# 深入理解 TypeScript 泛型

泛型是 TypeScript 中最强大的特性之一，它允许你编写可复用且类型安全的代码。

## 什么是泛型？

泛型允许你创建一个可以在多种类型上工作的组件，而不是仅限于一种类型。

\`\`\`typescript
function identity<T>(arg: T): T {
  return arg;
}
\`\`\`

## 泛型约束

使用 extends 关键字来约束泛型的类型：

\`\`\`typescript
interface Lengthwise {
  length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}
\`\`\`

## 泛型接口

\`\`\`typescript
interface GenericResponse<T> {
  data: T;
  status: number;
  message: string;
}
\`\`\`

## 总结

掌握泛型可以让你的 TypeScript 代码更加灵活和类型安全。
    `
  },
  {
    id: '2',
    title: 'Node.js 异步编程指南',
    date: '2024-01-10',
    excerpt: 'Node.js 是基于事件驱动和非阻塞 I/O 的运行环境。本文将探讨异步编程的最佳实践。',
    tags: ['Node.js', '后端'],
    category: '技术',
    readingTime: '10 分钟',
    coverImage: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=400&fit=crop',
    content: `
# Node.js 异步编程指南

Node.js 的异步编程模型是其高性能的关键。

## 回调函数

最基础的异步模式：

\`\`\`javascript
fs.readFile('file.txt', (err, data) => {
  if (err) throw err;
  console.log(data);
});
\`\`\`

## Promise

解决回调地狱：

\`\`\`javascript
const readFile = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
};
\`\`\`

## Async/Await

更清晰的异步代码：

\`\`\`javascript
async function main() {
  try {
    const data = await readFile('file.txt');
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}
\`\`\`

## 最佳实践

1. 总是使用 try/catch 处理错误
2. 避免嵌套过深的回调
3. 使用 Promise.all 并行处理多个异步操作
    `
  },
  {
    id: '3',
    title: 'Docker 容器化实战',
    date: '2024-01-05',
    excerpt: '容器化技术已经改变了软件的开发和部署方式。本文将带你从零开始掌握 Docker。',
    tags: ['Docker', 'DevOps'],
    category: '运维',
    readingTime: '12 分钟',
    coverImage: 'https://images.unsplash.com/photo-1605745341112-85968b19335b?w=800&h=400&fit=crop',
    content: `
# Docker 容器化实战

Docker 让应用的打包、分发和运行变得前所未有的简单。

## 核心概念

- **镜像 (Image)**: 应用的只读模板
- **容器 (Container)**: 镜像的运行实例
- **仓库 (Registry)**: 存储和分发镜像的服务

## 常用命令

\`\`\`bash
# 构建镜像
docker build -t myapp:latest .

# 运行容器
docker run -d -p 3000:3000 myapp:latest

# 查看运行中的容器
docker ps

# 进入容器
docker exec -it <container_id> /bin/bash
\`\`\`

## Dockerfile 示例

\`\`\`dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["node", "index.js"]
\`\`\`

## Docker Compose

编排多容器应用：

\`\`\`yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    depends_on:
      - db
  db:
    image: postgres:14
    environment:
      POSTGRES_PASSWORD: secret
\`\`\`
    `
  },
  {
    id: '4',
    title: 'React Hooks 深入浅出',
    date: '2024-01-01',
    excerpt: 'React Hooks 彻底改变了 React 组件的开发方式。本文将全面解析常用 Hooks 的使用技巧。',
    tags: ['React', '前端'],
    category: '技术',
    readingTime: '15 分钟',
    coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
    content: `
# React Hooks 深入浅出

Hooks 让你在函数组件中使用 state 和其他 React 特性。

## useState

\`\`\`jsx
const [count, setCount] = useState(0);

// 惰性初始化
const [state, setState] = useState(() => {
  return initialState;
});
\`\`\`

## useEffect

副作用操作：

\`\`\`jsx
useEffect(() => {
  const subscription = dataSource.subscribe();
  return () => {
    subscription.unsubscribe();
  };
}, [dataSource]);
\`\`\`

## useMemo 和 useCallback

性能优化：

\`\`\`jsx
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
const memoizedCallback = useCallback(() => doSomething(a, b), [a, b]);
\`\`\`

## 自定义 Hook

提取可复用的逻辑：

\`\`\`jsx
function useWindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
}
\`\`\`
    `
  },
  {
    id: '5',
    title: 'Git 工作流详解',
    date: '2023-12-28',
    excerpt: '掌握 Git 的最佳实践，让团队协作更加高效。本文介绍几种常用的 Git 工作流。',
    tags: ['Git', '工具'],
    category: '工具',
    readingTime: '7 分钟',
    coverImage: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=800&h=400&fit=crop',
    content: `
# Git 工作流详解

选择合适的工作流对团队协作至关重要。

## Git Flow

经典的工作流模型：

- \`main\`: 稳定的生产代码
- \`develop\`: 开发分支
- \`feature/*\`: 功能分支
- \`release/*\`: 发布分支
- \`hotfix/*\`: 热修复分支

## GitHub Flow

适合持续部署的工作流：

1. 从 main 创建功能分支
2. 提交更改
3. 创建 Pull Request
4. 讨论和审查代码
5. 合并到 main
6. 部署

## 常用命令

\`\`\`bash
# 创建并切换分支
git checkout -b feature/new-feature

# 变基（保持线性历史）
git rebase main

# 交互式变基（整理提交）
git rebase -i HEAD~3

# 暂存特定文件
git add -p
\`\`\`
    `
  },
  {
    id: '6',
    title: 'CSS Grid 布局完全指南',
    date: '2023-12-20',
    excerpt: 'CSS Grid 是现代 CSS 布局的重要组成部分。本文深入讲解 Grid 的各种用法。',
    tags: ['CSS', '前端'],
    category: '技术',
    readingTime: '11 分钟',
    coverImage: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&h=400&fit=crop',
    content: `
# CSS Grid 布局完全指南

Grid 布局是二维布局系统，可以同时处理行和列。

## 基本概念

\`\`\`css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  gap: 20px;
}
\`\`\`

## 网格区域

命名网格区域让布局更清晰：

\`\`\`css
.container {
  grid-template-areas:
    "header header header"
    "sidebar main aside"
    "footer footer footer";
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
\`\`\`

## 响应式网格

\`\`\`css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}
\`\`\`

## 对齐方式

\`\`\`css
.container {
  justify-items: center;
  align-items: center;
  place-items: center;
}
\`\`\`
    `
  }
];

// 获取所有分类
export const categories = ['全部', ...new Set(posts.map(p => p.category))];

// 获取所有标签
export const allTags = [...new Set(posts.flatMap(p => p.tags))];
