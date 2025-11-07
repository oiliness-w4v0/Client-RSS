import type {
  User,
  UserSelect,
} from '~/db/schema'
import { eq } from 'drizzle-orm'
import { db } from '~/db/db'
import { usersTable } from '~/db/schema'

// 新增用户
export async function addUser(email: string) {
  // 添加用户的时候，同时添加用户的个人资料信息
  return await db
    .insert(usersTable)
    .values({ email })
    .onConflictDoNothing({ target: usersTable.email })
    .returning()
}

// 获取所有用户
export async function getAllUsers(): Promise<UserSelect[]> {
  return await db.select().from(usersTable)
}

// 根据ID获取用户
export async function getUserById(id: number): Promise<any> {
  const users = await db.select().from(usersTable).where(eq(usersTable.id, id))
  return users[0] || null
}

// 更新用户
export async function updateUser(id: number, user: Partial<User>): Promise<void> {
  await db.update(usersTable).set(user).where(eq(usersTable.id, id))
}
