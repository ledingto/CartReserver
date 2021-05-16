import { resolver, NotFoundError } from "blitz"
import db from "db"
import * as z from "zod"

const GetReservation = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetReservation), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const reservation = await db.reservation.findFirst({ where: { id } })

  if (!reservation) throw new NotFoundError()

  return reservation
})
