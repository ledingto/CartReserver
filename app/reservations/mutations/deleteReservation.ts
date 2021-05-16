import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

const DeleteReservation = z
  .object({
    id: z.number(),
  })
  .nonstrict()

export default resolver.pipe(
  resolver.zod(DeleteReservation),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const reservation = await db.reservation.deleteMany({ where: { id } })

    return reservation
  }
)
