import { Router, Request, Response } from 'express'
import { CourierService } from "../services/courierService"
import Globals from "../../globals";

const globalsInstance = Globals.getInstance()
const couriersRouter = Router()
const courierService: CourierService = new CourierService()

couriersRouter.get("/:courierId", async (req: Request, res: Response) => {
    const release = await globalsInstance.getMutex().acquire();
    const data: number = Number.parseInt(req.params.courierId, 10);
    try {
        const result = await courierService.getCourier(data);
        return res.json(result);
    } catch (err) {
        // tslint:disable-next-line:no-console
        console.error(err);
        res.status(500).json({ error: err.message || err });
    } finally {
        release();
    }
});

couriersRouter.post("/", async (req: Request, res: Response) => {
    const release = await globalsInstance.getMutex().acquire();
    const data: any = req.body;
    try {
        const result = await courierService.addCourier(data);
        return res.json(result);
    } catch (err) {
        // tslint:disable-next-line:no-console
        console.error(err);
        res.status(500).json({ error: err.message || err });
    } finally {
        release();
    }
});

couriersRouter.delete("/", async (req: Request, res: Response) => {
    const release = await globalsInstance.getMutex().acquire();
    const data: any = req.body;
    try {
        const result = await courierService.deleteCourier(data);
        return res.json(result);
    } catch (err) {
        // tslint:disable-next-line:no-console
        console.error(err);
        res.status(500).json({ error: err.message || err });
    } finally {
        release();
    }
});

couriersRouter.put("/", async (req: Request, res: Response) => {
    const release = await globalsInstance.getMutex().acquire();
    const data: any = req.body;
    try {
        const result = await courierService.updateCourierCapacity(data);
        return res.json(result);
    } catch (err) {
        // tslint:disable-next-line:no-console
        console.error(err);
        res.status(500).json({ error: err.message || err });
    } finally {
        release();
    }
});

couriersRouter.post("/lookup", async (req: Request, res: Response) => {
    const release = await globalsInstance.getMutex().acquire();
    const data: any = req.body;
    try {
        const result = await courierService.lookUpCouriers(data);
        return res.json(result);
    } catch (err) {
        // tslint:disable-next-line:no-console
        console.error(err);
        res.status(500).json({ error: err.message || err });
    } finally {
        release();
    }
});

export default couriersRouter