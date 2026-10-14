// 违规：所谓"删除"只是打标记，数据还在
async function deleteUser(id) {
  await db.update('users').set({ is_deleted: true, deletedAt: new Date() }).where({ id });
}
