import dotenv from "dotenv";
import pgPromise from "pg-promise";

dotenv.config();
const config = {
    database: process.env.PGDATABASE,
    host: process.env.PGHOST,
    user: process.env.PGUSER
};

const pgp = pgPromise();
const db = pgp(config);

export const createCourier = async (payload: Courier): Promise<Courier> => {
    const couriers = await db.one(`
                INSERT INTO couriers( id, max_capacity )
                VALUES( $[id], $[max_capacity] )
                RETURNING id, max_capacity;`,
        { id: `${payload.id}`, max_capacity: `${payload.max_capacity}` });
    return couriers
}



export const deleteCourier = async (payload: CourierDelete): Promise<number> => {
    const couriers = await db.one(`
                DELETE FROM couriers
                WHERE id = $[id]
                RETURNING id`,
        { id: `${payload.id}` }, (r) => r.countRow);
    return couriers
}

export const updateCapacity = async (payload: Courier): Promise<Courier> => {
    const couriers = await db.one(`
                UPDATE couriers SET
                    max_capacity = $[max_capacity]
                WHERE id = $[id]
                RETURNING id, max_capacity;`,
        { id: `${payload.id}`, max_capacity: `${payload.max_capacity}` });
    return couriers
}

export const getByMinCapacity = async (payload: CourierGetByCapacity): Promise<Courier[]> => {
    const couriers = await db.any(`
                SELECT
                    id,
                    max_capacity
                FROM  couriers
                WHERE max_capacity >= $[max_capacity]
                ORDER BY max_capacity asc`,
        { max_capacity: `${payload.capacity_required}` });
    return couriers
}