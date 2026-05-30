# 露营小助手

一站式露营计划管理工具，支持多家庭协作、物资清单、花费追踪与 AA 计算。

## 功能

| Tab | 说明 |
|---|---|
| 概况 | 露营信息、天气预报、倒计时、任务分配、花费预算进度 |
| 物资 | 按家庭/公共分组管理物资清单，勾选已备，购物清单，装备模板库 |
| 花费 | 记录各项支出，按家庭/类别筛选 |
| AA | 自动计算人均分摊与互相转账方案 |
| 分享 | 导出/分享露营计划 |

## 技术栈

- 纯前端单页应用（HTML + CSS + Vanilla JS）
- [Supabase](https://supabase.com) — GitHub OAuth 登录 + 云端数据同步
- 响应式设计，移动端优先（max-width 540px）

## 快速开始

1. 克隆仓库
```bash
git clone git@github.com:zx1184781795/PC-vibe-coding.git
cd PC-vibe-coding/camping
```

2. 用浏览器打开 `index.html` 即可使用

> 云端同步需要 [Supabase 项目](https://supabase.com) 配置，详见 `supabase-config.js`。

## 项目结构

```
camping/
├── index.html          # 主应用（2669 行）
├── supabase-config.js  # Supabase 配置
└── README.md
```

## License

MIT
