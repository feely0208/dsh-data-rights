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

## 软删除这条最有价值

因为它**看起来是对的** —— 代码里有 `deleteUser`，功能也在跑。
但个保法要的「删除」是**真的删掉或不可逆匿名化**。

## 安装

```bash
dsh plugin --profile web add @deepwhale-cn/dsh-data-rights
# 或纯 CLI
npx @deepwhale-cn/dsh-data-rights
```

![dsh-data-rights 的检查报告示例](https://raw.githubusercontent.com/feely0208/dsh-data-rights/main/docs/report.png)

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

## License

MIT © 深鲸 DeepWhale
