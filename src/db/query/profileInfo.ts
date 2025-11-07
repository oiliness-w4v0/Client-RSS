import type { ProfileInfo } from '../schema'
import { eq } from 'drizzle-orm'
import { db } from '../db'
import { profileInfosTable } from '../schema'

// 更新 ProfileInfo 信息
export async function updateProfileInfoByUserId(userId: number, profileInfo: Partial<ProfileInfo>): Promise<ProfileInfo | undefined> {
  console.log('更新用户的 ProfileInfo 信息', userId, profileInfo)
  try {
    const updatedProfileInfo = await db
      .update(profileInfosTable)
      .set(profileInfo)
      .where(eq(profileInfosTable.userId, userId))
      .returning()

    return updatedProfileInfo[0]
  }
  catch (error) {
    console.error('更新 ProfileInfo 失败:', error)
    return undefined
  }
}
