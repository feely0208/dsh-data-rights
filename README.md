# @deepwhale-cn/dsh-data-rights

**个人信息权利** —— 查查阅、复制、删除权有没有**真的实现**。

## 不装它会怎样

你的代码里有这么一段「删除用户」：

```js
async function deleteUser(id) {
  await db.update('users').set({ is_deleted: true, deletedAt: new Date() }).where({ id });
}
```

看起来是删了。**但数据行还在库里** —— 还能被读取、导出、泄露。

```
《个人信息保护法》第四十七条
  —— 个人请求删除个人信息的，个人信息处理者应当主动删除

「删除」包括删除和匿名化两种 —— 只打标记不构成删除。
监管检查时，这会被认定为未删除。
```

## 关键词
**关键词**：个人信息权利 · 删除权 · 查阅权 · 复制权 · 账号注销 · 数据删除 · 个人信息导出 · 可携带权 · 个保法
**Keywords**: data rights · right to delete · right to access · data portability · account deletion · PIPL

## 它查什么

| 级别 | 内容 | 依据 |
|---|---|---|
| 🔴 高 | **「删除」只是打标记，数据还在库里** | 个保法 47 条 |
| 🔴 高 | 找不到删除信息/注销账号的实现 | 个保法 47、50 条 |
| 🟡 中 | 找不到查阅/复制/导出个人信息的实现 | 个保法 45 条 |
| 🟢 低 | 文档里找不到权利请求的受理渠道 | 个保法 50 条 |

## 软删除这条值得单独说

因为它**看起来是对的** —— 代码里有 `deleteUser`，功能也在跑。
但个保法要的「删除」是**真的删掉或不可逆匿名化**。

## 安装

```bash
dsh plugin --profile web add @deepwhale-cn/dsh-data-rights
# 或纯 CLI
npx @deepwhale-cn/dsh-data-rights
```

![dsh-data-rights 检查报告示例](https://www.deepwhale.org.cn/plugin-assets/dsh-data-rights/report.png)

![dsh-data-rights 演示模式输出](https://www.deepwhale.org.cn/plugin-assets/dsh-data-rights/demo.png)

![dsh-data-rights 规则与依据](https://www.deepwhale.org.cn/plugin-assets/dsh-data-rights/rules.png)

## 用法

```bash
dsh-data-rights --demo
dsh-data-rights --list-rules
dsh-data-rights --html r.html
```

## 边界

- **只看代码，不看数据库实际状态** —— 有可能代码里没软删，但数据留在备份里，本工具看不到。
- **「找不到」是弱信号** —— 权利请求可能由运营人工处理；注销入口可能在另一个仓库。
  报出来是**提示你确认**。
- **软删除识别靠模式**（`is_deleted` / `deletedAt` / `status: 'deleted'` 等）：
  自定义字段名会漏。
- **不检查响应时限** —— 个保法要求「及时」答复，具体时限（如 15 个工作日）需要人工确认。
- 与 [dsh-consent-guard](https://github.com/feely0208/dsh-consent-guard) 分工：
  那个查同意的**取得**，这个查权利的**行使**。

本插件是一个工具。使用者必须遵守所在地区法律法规，**对使用本项目造成的任何后果自行承担责任。**

---

## 深鲸网安守护系列（共 38 个）

> 一个插件做一件事。**安全问题是链式的** —— 配套用才完整。

**国内合规**（12）｜ [等保对照](https://github.com/feely0208/dsh-cn-mlps) · [日志留存](https://github.com/feely0208/dsh-cn-log-retention) · [备案公示](https://github.com/feely0208/dsh-cn-filing) · [用户同意](https://github.com/feely0208/dsh-consent-guard) · [个人信息权利](https://github.com/feely0208/dsh-data-rights) · [未成年人保护](https://github.com/feely0208/dsh-minor-guard) · [影响评估](https://github.com/feely0208/dsh-pipia) · [数据分类分级](https://github.com/feely0208/dsh-data-classify) · [算法备案](https://github.com/feely0208/dsh-algorithm-filing) · [数据出境](https://github.com/feely0208/dsh-cn-data-export) · [国密合规](https://github.com/feely0208/dsh-cn-crypto) · [AI 内容标识](https://github.com/feely0208/dsh-cn-ai-labeling)

**AI 与 Agent 治理**（6）｜ [AI 输出信任](https://github.com/feely0208/dsh-ai-output-trust) · [外部内容信任](https://github.com/feely0208/dsh-content-trust) · [MCP 安全](https://github.com/feely0208/dsh-mcp-audit) · [Agent 权限](https://github.com/feely0208/dsh-agent-scope) · [策略核对](https://github.com/feely0208/dsh-agent-policy) · [可疑指令](https://github.com/feely0208/dsh-phishing-guard)

**数据与凭据**（5）｜ [敏感数据](https://github.com/feely0208/dsh-data-scan) · [密钥轮换](https://github.com/feely0208/dsh-key-rotate) · [数据留存](https://github.com/feely0208/dsh-data-lifecycle) · [配置审计](https://github.com/feely0208/dsh-env-audit) · [密钥扫描](https://github.com/feely0208/dsh-secret-scan)

**供应链与构建**（5）｜ [开源许可](https://github.com/feely0208/dsh-license-guard) · [依赖投毒](https://github.com/feely0208/dsh-dep-audit) · [CI 安全](https://github.com/feely0208/dsh-ci-guard) · [工具审查](https://github.com/feely0208/dsh-tool-vet) · [物料清单](https://github.com/feely0208/dsh-sbom)

**权限与应急**（3）｜ [最小权限](https://github.com/feely0208/dsh-least-privilege) · [告警外发](https://github.com/feely0208/dsh-alert-relay) · [应急证据包](https://github.com/feely0208/dsh-incident-package)

**行业专项**（4）｜ [医疗行业专项](https://github.com/feely0208/dsh-industry-medical) · [教育行业专项](https://github.com/feely0208/dsh-industry-education) · [金融行业专项](https://github.com/feely0208/dsh-industry-finance) · [地方数据条例](https://github.com/feely0208/dsh-local-regulation)

**编排与交付**（3）｜ [一键体检](https://github.com/feely0208/dsh-guard-suite) · [改前改后复核](https://github.com/feely0208/dsh-fix-verify) · [合规可交付文档](https://github.com/feely0208/dsh-compliance-doc)

都在 DSH 插件市场（dsh-plugin.org）、npm 和 deepwhale.org.cn/guard.html 上。
