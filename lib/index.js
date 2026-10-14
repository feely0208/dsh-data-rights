import { createPlugin, pkgRootFrom } from '@deepwhale-cn/dsh-guard-core/plugin';

export const { name, inject, apply } = createPlugin({
  name: 'data-rights',
  pkgRoot: pkgRootFrom(import.meta.url),
  skillFile: 'skill/data-rights.md',
  binFile: 'bin/cli.mjs',
  description: '查查阅/复制/删除权有没有真的实现 —— 个保法第 45/47 条是明文要求',
  whenToUse: 'TODO：写清什么时候该用（用户会说的话也列上）',
});
