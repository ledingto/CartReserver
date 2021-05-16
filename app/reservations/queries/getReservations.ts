import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetReservationsInput
  extends Pick<Prisma.ReservationFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetReservationsInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: reservations,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.reservation.count({ where }),
      query: (paginateArgs) => db.reservation.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      reservations,
      nextPage,
      hasMore,
      count,
    }
  }
)
