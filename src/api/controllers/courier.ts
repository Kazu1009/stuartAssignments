import { Router, Request, Response } from 'express'
import * as couriers from "../dal/couriers"
import { CourierService } from "../services/courierService"

const couriersRouter = Router()
const courierService: CourierService = new CourierService()

couriersRouter.post("/", async (req: Request, res: Response) => {
    const data: any = req.body;
    try {
        const result = await courierService.addCourier(data);
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
        const result = await courierService.deleteCourier(data);
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
        const result = await courierService.updateCourierCapacity(data);
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
        const result = await courierService.lookUpCouriers(data);
        return res.json(result);
    } catch (err) {
        // tslint:disable-next-line:no-console
        console.error(err);
        res.status(500).json({ error: err.message || err });
    }
});

export default couriersRouter