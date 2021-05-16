import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

const CreateLocation = z
  .object({
    name: z.string(),
  })
  .nonstrict()

export default resolver.pipe(resolver.zod(CreateLocation), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const location = await db.location.create({ data: input })

  return location
})
