import { Ctx } from "blitz"
import db from "db"

export default async function getMyFavorite(_ = null, { session }: Ctx) {
  if (!session.userId) return null

  const user = await db.favorite.findMany({
    where: { userId: session.userId },
    select: { id: true, name: true },
  })

  return user
}
