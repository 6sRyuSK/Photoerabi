import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const DeleteMyFavorite = z.object({
  name: z.string(),
})

export default resolver.pipe(
  resolver.zod(DeleteMyFavorite),
  resolver.authorize(),
  async ({ name }, { session }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const favorite = await db.favorite.deleteMany({ where: { name, userId: session.userId } })

    return favorite
  }
)
