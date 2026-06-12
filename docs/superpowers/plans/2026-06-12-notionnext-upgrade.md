# NotionNext v4.8.3 → v4.10.2 升级计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将 NotionNext 从 v4.8.3（notion-client 6.x）升级到上游 v4.10.2（notion-client 7.10.0），修复构建失败并恢复自定义配置。

**Architecture:** 上游从 v4.8.3 → v4.10.2 经历了重大重构：`lib/db/getSiteData.js` → `lib/db/SiteDataApi.js`，`lib/notion/*` → `lib/db/notion/*`，新增 `normalizeUtil.js` 处理 Notion API 的嵌套 block 结构。不是手动打补丁，而是直接从 upstream/main 同步代码，然后重新应用自定义配置。

**Tech Stack:** Next.js 14.2.4, notion-client 7.10.0, notion-utils 7.10.0, react-notion-x 7.10.0, Vercel

---

### 关键背景

**根因：** `notion-client` v6.16.0 开始返回嵌套的 `block[id].value.value` 结构，v4.8.3 的代码读 `block[id].value.type` 拿到的是 `undefined`，触发 `EmptyData()` 回退，进而 `pageCoverThumbnail: undefined` 无法被 Next.js 序列化。

**上游修复（v4.10.2）：**
- `lib/db/notion/normalizeUtil.js` — 新增 `normalizeNotionMetadata()` / `normalizeCollection()` / `normalizePageBlock()` 处理嵌套结构
- `lib/db/SiteDataApi.js` — 重构后的站点数据入口
- `lib/utils/notion.util.js` — `adapterNotionBlockMap()` 适配器
- notion-client → 7.10.0, notion-utils → 7.10.0, react-notion-x → 7.10.0

**当前仓库状态：**
- `git diff` 显示 `lib/db/getSiteData.js`、`package.json`、`yarn.lock` 有手动修改（需撤销）
- `package.json` 已从 `notion-client: 6.15.6` 改为 `^6.16.0`（需还原+升级到 v7）
- 13 commits ahead of upstream（本地自定义 + 之前的合并），721 commits behind
- 自定义配置：THEME=heo, Cusdis 评论, NOTION_PAGE_ID=11c0312be533807f926acbe65b5bcf3b
- `.env.local` 中 `NOTION_PAGE_ID="11c0312be533807f926acbe65b5bcf3b"` 已正确配置

---

### Task 1: 撤销本次会话的临时修改

**Files:**
- Modify: `lib/db/getSiteData.js`
- Modify: `package.json`
- Modify: `yarn.lock`

- [ ] **Step 1: 还原 lib/db/getSiteData.js 的手动嵌套结构修复**

```bash
git checkout -- lib/db/getSiteData.js
```

- [ ] **Step 2: 还原 package.json 的版本改动**

```bash
git checkout -- package.json
```

- [ ] **Step 3: 还原 yarn.lock**

```bash
git checkout -- yarn.lock
```

- [ ] **Step 4: 验证工作区干净**

```bash
git diff --name-only
```

Expected: 只显示 `.gitignore` 和 `.claude/` 的改动（非本次破坏性修改）

---

### Task 2: 备份自定义配置

**Files:**
- Read: `blog.config.js`, `conf/*.js`, `.env.local`, `themes/heo/**/*.js`

- [ ] **Step 1: 备份 blog.config.js**

```bash
cp blog.config.js /tmp/notionnext-backup/blog.config.js
```

- [ ] **Step 2: 备份整个 conf 目录**

```bash
rm -rf /tmp/notionnext-backup
mkdir -p /tmp/notionnext-backup/conf
cp -r conf/* /tmp/notionnext-backup/conf/
```

- [ ] **Step 3: 备份 .env.local**

```bash
cp .env.local /tmp/notionnext-backup/.env.local
```

- [ ] **Step 4: 备份主题自定义修改（如有）**

```bash
# 检查 heo 主题是否有本地修改
git diff themes/heo/ --name-only
```

如果无输出，主题没有本地修改。如果有修改，执行：

```bash
cp -r themes/heo /tmp/notionnext-backup/themes/heo
```

---

### Task 3: 从上游同步代码

**Files:** 429+ 个文件会被修改（upstream/main 合并结果）

- [ ] **Step 1: Fetch upstream**

```bash
git fetch upstream main
```

- [ ] **Step 2: 暂存当前工作区改动**

```bash
git stash --include-untracked
```

- [ ] **Step 3: 合并上游**

由于本地有 13 个 commits ahead，使用 rebase 更干净：

```bash
git rebase upstream/main
```

Expected: 可能有冲突。如果冲突过于复杂（如 blog.config.js 的拆分冲突），改用：

```bash
git rebase --abort
git reset --hard upstream/main
git cherry-pick <你的13个本地commit的hash> --strategy-option=theirs
```

**注意：** 如果本地 13 个 commit 主要是合并 commit（`Merge branch 'tangly1024:main' into main`），rebase 会自动跳过它们，不会产生冲突。

- [ ] **Step 4: 检查合并结果**

```bash
git log --oneline -10
node -e "console.log(require('./package.json').dependencies['notion-client'])"
```

Expected: `notion-client` 版本为 `7.10.0`

- [ ] **Step 5: 安装新依赖**

```bash
npm install --legacy-peer-deps
```

---

### Task 4: 恢复自定义配置

**Files:**
- Modify: `blog.config.js`（可能需要检查兼容性）
- Modify: `.env.local`（恢复 NOTION_PAGE_ID 等）

- [ ] **Step 1: 检查上游 blog.config.js 结构变化**

```bash
diff /tmp/notionnext-backup/blog.config.js blog.config.js
```

v4.8→v4.10 中 `blog.config.js` 主要变化：
- `require('./conf/xxx')` → `require('./conf/xxx')`（基本不变）
- 新增一些配置项（LATEST_POSTS_COUNT, 新菜单配置等）

如果 diff 只有少量差异，手动合并自定义值（THEME, LANG 等）。

- [ ] **Step 2: 应用自定义配置值**

关键字段需要在 `blog.config.js` 中确认：
- `THEME: 'heo'`（已在 .env.local 中通过 `NEXT_PUBLIC_THEME=heo` 配置，无需改动文件）
- 其他通过环境变量的配置不需要改文件

- [ ] **Step 3: 恢复 conf 目录的自定义配置**

```bash
# 对比 conf 差异
diff -r /tmp/notionnext-backup/conf/ conf/
```

v4.10.2 的 conf 目录新增了一些配置项（如 `typedCollections` 等）。只恢复你有自定义改动的内容：
- `conf/notion.config.js` — 如果完全默认，则无需恢复
- `conf/comment.config.js` — Cusdis 通过 `NEXT_PUBLIC_COMMENT_CUSDIS_APP_ID` 环境变量配置，已正确设置

- [ ] **Step 4: 确认 .env.local 正确**

`.env.local` 中的关键值：
```
NEXT_PUBLIC_THEME=heo
NEXT_PUBLIC_COMMENT_CUSDIS_APP_ID=c009c5e6-09b9-4db9-8c49-3188b0989bc3
NOTION_PAGE_ID=11c0312be533807f926acbe65b5bcf3b
```

这些通过环境变量生效，不会被 git stash pop 覆盖。

---

### Task 5: 本地验证构建

- [ ] **Step 1: 运行本地构建**

```bash
npx next build 2>&1 | tail -40
```

Expected: 构建成功，无 `pageCoverThumbnail undefined` 或 `pageId is not a database` 错误。

- [ ] **Step 2: 如果构建失败，检查错误**

重点关注的构建日志关键词：
- `[API-->>请求]` — Notion API 调用是否成功
- `[缓存-->>API]` — 缓存命中情况
- 不应出现 `pageId is not a database`
- 不应出现 `undefined cannot be serialized`

- [ ] **Step 3: 恢复之前 stash 的改动（如 .gitignore 等需要保留的）**

```bash
git stash pop
```

如果 stash pop 产生冲突，手动解决 `.gitignore` 的冲突（Vercel `.vercel` 目录已被 gitignore 排除）。

---

### Task 6: 部署到 Vercel 生产环境

- [ ] **Step 1: 部署到生产**

```bash
npx vercel --scope leno0zs-projects --prod
```

- [ ] **Step 2: 验证部署结果**

```bash
npx vercel list --scope leno0zs-projects | head -5
```

Expected: 最新部署状态为 `● Ready`，域名 `pandacodingvlog.vercel.app` 生效。

- [ ] **Step 3: 浏览器验证**

访问 https://pandacodingvlog.vercel.app，确认博客页面正常显示 Notion 文章内容。

---

### Task 7: 提交并推送

- [ ] **Step 1: 提交改动**

```bash
git add -A
git commit -m "$(cat <<'EOF'
chore: merge upstream v4.10.2 upgrade

Merge upstream v4.10.2 to fix Notion API compatibility issues:
- notion-client 6.15.6 → 7.10.0
- notion-utils 6.15.6 → 7.10.0
- react-notion-x 6.16.0 → 7.10.0
- Fix nested block structure with normalizeUtil

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
EOF
)"
```

- [ ] **Step 2: 推送到 origin**

```bash
git push origin main
```
