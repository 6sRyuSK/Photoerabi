import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const searchFavorite = z.object({
  // This accepts type of undefined, but is required at runtime
  name: z.string(),
})

export default resolver.pipe(
  resolver.zod(searchFavorite),
  resolver.authorize(),
  async ({ name }, { session }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const favorite = await db.favorite.findFirst({ where: { name, userId: session.userId } })

    if (!favorite) throw new NotFoundError()

    return favorite
  }
)
