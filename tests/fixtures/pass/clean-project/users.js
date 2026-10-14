// 合规：真删，且清掉关联数据
async function deleteUser(id) {
  // 1) 先清关联表，避免外键残留
  await db.delete('user_settings').where({ user_id: id });
  await db.delete('user_events').where({ user_id: id });
  // 2) 真删主记录（不是打标记）
  await db.delete('users').where({ id });
  // 3) 备份里做不可逆匿名化
  await anonymizeBackups(id);
}

// 合规：查阅 + 导出（个保法第 45 条）
async function exportMyData(userId) {
  const profile = await db.select('*').from('users').where({ id: userId });
  const settings = await db.select('*').from('user_settings').where({ user_id: userId });
  return { profile, settings };  // 导出个人信息
}

// 合规：账号注销入口
async function deleteAccount(req, res) {
  await deleteUser(req.user.id);
  res.json({ ok: true });
}
