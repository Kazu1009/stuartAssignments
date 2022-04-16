import { Router, Request, Response } from 'express'
import * as couriers from "../dal/couriers"

const couriersRouter = Router()


couriersRouter.post("/", async (req: Request, res: Response) => {
    const data: any = req.body;
    try {
        const result = await couriers.createCourier(data);
        return res.json(result);
    } catch (err) {
        // tslint:disable-next-line:no-console
        console.error(err);
        res.status(500).json({ error: err.message || err });
    }
});

couriersRouter.delete("/", async (req: Request, res: Response) => {
    const data: any = req.body;
    try {
        const result = await couriers.deleteCourier(data);
        return res.json(result);
    } catch (err) {
        // tslint:disable-next-line:no-console
        console.error(err);
        res.status(500).json({ error: err.message || err });
    }
});

couriersRouter.put("/", async (req: Request, res: Response) => {
    const data: any = req.body;
    try {
        const result = await couriers.updateCapacity(data);
        return res.json(result);
    } catch (err) {
        // tslint:disable-next-line:no-console
        console.error(err);
        res.status(500).json({ error: err.message || err });
    }
});

couriersRouter.post("/lookup", async (req: Request, res: Response) => {
    const data: any = req.body;
    try {
        const result = await couriers.getByMinCapacity(data);
        return res.json(result);
    } catch (err) {
        // tslint:disable-next-line:no-console
        console.error(err);
        res.status(500).json({ error: err.message || err });
    }
});

export default couriersRouter