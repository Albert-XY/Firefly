---
title: "示例项目"
slug: example-project
published: 2026-11-09
draft: false
order: 100
description: "占位用的项目条目。删掉这篇，或者在 src/content/projects/ 下新建 .md 写真正的项目。"
image: ""
status: "planning"
tags:
  - 占位
---

## 怎么加项目

在 `src/content/projects/` 下新建一个 `.md` 或 `.mdx` 文件即可。正文就是项目 README，渲染在详情页底部；frontmatter 用于列表卡片和详情页顶部。

## Frontmatter 字段

| 字段 | 类型 | 说明 |
|---|---|---|
| `title` | string | 必填。项目名称。 |
| `published` | date | 必填。发布/更新日期。 |
| `description` | string | 可选。卡片简介。 |
| `image` | string | 可选。封面图，留空则不显示。 |
| `tags` | string[] | 可选。标签。 |
| `link` | array | 可选。外链按钮：`{ label, icon, value }`。 |
| `status` | string | 可选。`planning` / `developing` / `published` / `archived`。 |
| `order` | number | 可选。越大越靠前。 |

文章写熟了，这一页用不上也可以直接在 `siteConfig` 里把 `projects` 关掉。
