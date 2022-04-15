import { Router, Request, Response } from 'express'
import pgPromise from "pg-promise";
import dotenv from "dotenv";

dotenv.config();

const couriersRouter = Router()

const config = {
    database: process.env.PGDATABASE,
    host: process.env.PGHOST,
    user: process.env.PGUSER
};

const pgp = pgPromise();
const db = pgp(config);

couriersRouter.post("/", async (req: Request, res: Response) => {
    const data: any = req.body;
    try {
        const couriers = await db.any(`
                INSERT INTO couriers( id, max_capacity )
                VALUES( $[id], $[max_capacity] )
                RETURNING id, max_capacity;`,
            { id: `${data.id}`, max_capacity: `${data.max_capacity}` });
        return res.json(couriers);
    } catch (err) {
        // tslint:disable-next-line:no-console
        console.error(err);
        res.status(500).json({ error: err.message || err });
    }
});

couriersRouter.post("/lookup", async (req: Request, res: Response) => {
    const data: any = req.body;
    try {
        const couriers = await db.any(`
                SELECT
                    id,
                    max_capacity
                FROM  couriers
                WHERE max_capacity >= $[max_capacity]
                ORDER BY max_capacity desc`,
            { max_capacity: `${data.capacity_required}` });
        return res.json(couriers);
    } catch (err) {
        // tslint:disable-next-line:no-console
        console.error(err);
        res.status(500).json({ error: err.message || err });
    }
});

export default couriersRouter