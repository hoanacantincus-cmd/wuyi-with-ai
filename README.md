# WuYi with AI Personal Website

个人 AI 作品展示主页，来自 ChatGPT Canvas 原型，已整理为可部署的 Vite + React 项目。

## 在线访问

| 访问区域 | 平台 | 网址 | 状态 |
| --- | --- | --- | --- |
| 国内优先 | Cloudflare Pages | https://wuyi-with-ai.pages.dev | 已上线 |
| 国外优先 | Vercel | https://wuyi-with-ai.vercel.app | 已上线 |

> Cloudflare Pages 和 Vercel 均已部署为生产访问地址。

## 技术栈

- React 19
- Vite 7
- Tailwind CSS 3
- Framer Motion
- Canvas 2D 动效
- SVG 组件图形
- Cloudflare Pages
- Vercel
- GitHub

## 本地开发

```bash
npm install
npm run dev
```

默认本地地址：

```text
http://127.0.0.1:5173/
```

## 构建

```bash
npm run build
```

构建输出目录：

```text
dist
```

## Cloudflare Pages 部署

推荐项目名：

```text
wuyi-with-ai
```

Cloudflare Pages 构建配置：

```text
Framework preset: React (Vite)
Build command: npm run build
Build output directory: dist
Root directory: /
```

如果使用 Wrangler CLI：

```bash
npm run build
npx wrangler pages deploy dist --project-name wuyi-with-ai
```

## Vercel 部署

Vercel 构建配置已写入 `vercel.json`：

```text
Framework: Vite
Build command: npm run build
Output directory: dist
```

如果使用 Vercel CLI：

```bash
npx vercel --prod --yes
```

## GitHub

建议仓库名：

```text
wuyi-with-ai
```

首次推送参考命令：

```bash
git init
git add .
git commit -m "Initial personal website"
gh repo create wuyi-with-ai --public --source=. --remote=origin --push --description "WuYi with AI personal website"
```

## 项目结构

```text
.
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   └── styles.css
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
├── vercel.json
├── wrangler.toml
└── README.md
```

## 维护说明

- 个人信息位于 `src/App.jsx` 的 `profile` 配置对象。
- 页面主要视觉效果由 Framer Motion、SVG 和 Canvas 2D 实现。
- 上线后请用平台返回的真实 URL 更新 README 的在线访问表。
