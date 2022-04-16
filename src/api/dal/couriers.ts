import dotenv from "dotenv";
import pgPromise from "pg-promise";
// todo: use Sequelize

dotenv.config();
const config = {
    database: process.env.PGDATABASE,
    host: process.env.PGHOST,
    user: process.env.PGUSER
};

const pgp = pgPromise();
const db = pgp(config);

export const createCourier = async (courierObj: Courier): Promise<Courier> => {
    const couriers = await db.one(`
                INSERT INTO couriers( id, max_capacity )
                VALUES( $[id], $[max_capacity] )
                RETURNING id, max_capacity;`,
        { id: `${courierObj.id}`, max_capacity: `${courierObj.max_capacity}` });
    return couriers
}



export const deleteCourier = async (courierObj: CourierDelete): Promise<number> => {
    const couriers = await db.one(`
                DELETE FROM couriers
                WHERE id = $[id]
                RETURNING id`,
        { id: `${courierObj.id}` }, (r) => r.countRow);
    return couriers
}

export const updateCapacity = async (courierObj: Courier): Promise<Courier> => {
    const couriers = await db.one(`
                UPDATE couriers SET
                    max_capacity = $[max_capacity]
                WHERE id = $[id]
                RETURNING id, max_capacity;`,
        { id: `${courierObj.id}`, max_capacity: `${courierObj.max_capacity}` });
    return couriers
}

export const getById = async (courierId: number): Promise<Courier[]> => {
    const couriers = await db.oneOrNone(`
        SELECT
            id,
            max_capacity
        FROM  couriers
        WHERE id = $[id]`,
        { id: `${courierId}` });
    return couriers
}

export const getByMinCapacity = async (capacity: number): Promise<Courier[]> => {
    const couriers = await db.any(`
                SELECT
                    id,
                    max_capacity
                FROM  couriers
                WHERE max_capacity >= $[max_capacity]
                ORDER BY max_capacity asc`,
        { max_capacity: `${capacity}` });
    return couriers
}