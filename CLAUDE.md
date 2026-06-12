# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

**NotionNext v4.10.2** — 基于 Next.js + Notion API 的开源站点系统。用 Notion 管理内容（文章、分类、标签、菜单、页面），自动发布为博客/文档站/作品集/官网等。

**本仓库部署信息：**
- 上游仓库：[notionnext-org/NotionNext](https://github.com/notionnext-org/NotionNext)
- 本仓库：[Chasen-Liao/NotionNext_PanDa](https://github.com/Chasen-Liao/NotionNext_PanDa)
- Vercel 项目名：`notion-next-pan-da`（`leno0zs-projects` team）
- 生产域名：[https://chasenclog.vercel.app/](https://chasenclog.vercel.app/)
- Notion 数据库：**Chasen_Clog**（ID: `11c0312be533807f926acbe65b5bcf3b`，在 `.env.local` 中配置）
- 当前主题：`endspace`（通过 `NEXT_PUBLIC_THEME` 环境变量设置）
- 评论系统：Cusdis（通过 `NEXT_PUBLIC_COMMENT_CUSDIS_APP_ID` 环境变量设置）
- Node 版本要求：`>=20 <25`

## 重要架构

### 数据流向

```
Notion API → notion-client 7.10.0 → SiteDataApi.js → Next.js SSG/ISR → 静态页面
```

- `lib/db/SiteDataApi.js` — 全站数据入口，拉取 Notion collection 并发回格式化数据
- `lib/db/notion/` — Notion 数据格式化工具（页面属性、封面、分类、标签等）
- `lib/db/notion/normalizeUtil.js` — 兼容 Notion API 嵌套结构（`block[id].value.value`）的适配器

### 关键目录

| 目录 | 职责 |
|------|------|
| `lib/db/` | 数据层：拉取和格式化 Notion 数据 |
| `lib/db/notion/` | Notion 数据格式化工具 |
| `lib/cache/` | 缓存管理器（内存/Vercel KV/Redis） |
| `lib/config.js` | 配置读取（环境变量 → NOTION_CONFIG → 默认值） |
| `conf/` | 分模块配置文件（评论、主题、分析、广告等） |
| `blog.config.js` | 入口配置，引用 `conf/*.js` |
| `themes/` | 25+ 主题（当前用 `heo`） |
| `pages/` | Next.js 页面路由 |
| `lib/lang/` | 多语言翻译文件 |

### 配置层级

1. `.env.local` → `process.env.*`（优先级最高，部署后通过 Vercel 环境变量管理）
2. `conf/*.js` 中的默认值
3. `blog.config.js` 中的默认值
4. Notion 数据库中的 `NOTION_CONFIG` 配置页

几乎所有配置都能通过 `.env.local` 或 Vercel 环境变量覆盖。

## 常用命令

```bash
# 开发
npm run dev          # 启动本地开发服务器

# 构建与部署
npm run build        # 生产构建
npm run export       # 静态导出
npm run export       # 直接部署到 Vercel（本地推送到 Vercel）
npx vercel --prod    # 部署到 Vercel 生产环境（需先登录 Vercel CLI）

# 代码质量
npm run lint         # ESLint 检查
npm run lint:fix     # 自动修复
npm run type-check   # TypeScript 类型检查

# 测试
npm run test         # Jest 测试
npm run test:coverage
```

## 与上游同步

```bash
git fetch upstream main
git reset --hard upstream/main   # 完全覆盖到上游（丢失本地改动）
# 或
git rebase upstream/main         # 保留本地 commit
```

## Notion 数据库字段

链接：[Chasen_Clog](https://www.notion.so/Chasen_Clog-11c0312be533807f926acbe65b5bcf3b)

数据库中每页是一个文章/页面，核心字段：
- `type` — `Post` / `Page` / `Notice` / `Menu` / `SubMenu` / `Config`
- `status` — `Published` / `Invisible` / `Draft`
- `category` — 知行合一 / 技术分享 / 心情随笔 / 心得体会
- `tags` — 推荐 / 开发 / AI / Python / 实用教程 等
- `slug` — URL 路径
- `date` — 发布日期
- `password` — 密码保护
