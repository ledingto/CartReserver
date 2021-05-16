import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

const CreateReservation = z
  .object({
    name: z.string(),
  })
  .nonstrict()

export default resolver.pipe(
  resolver.zod(CreateReservation),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const reservation = await db.reservation.create({ data: input })

    return reservation
  }
)
