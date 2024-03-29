import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

const DeleteLocation = z
  .object({
    id: z.number(),
  })
  .nonstrict()

export default resolver.pipe(resolver.zod(DeleteLocation), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const location = await db.location.deleteMany({ where: { id } })

  return location
})
