import { Router, Request, Response } from 'express'
import { PackageService } from "../services/packageService"
import Globals from "../../globals";

const globalsInstance = Globals.getInstance()
const packagesRouter = Router()
const packageService: PackageService = new PackageService()

packagesRouter.get("/:packageId", async (req: Request, res: Response) => {
    const release = await globalsInstance.getMutex().acquire();
    const data: number = Number.parseInt(req.params.packageId, 10);
    try {
        const result = await packageService.getPackage(data);
        return res.json(result);
    } catch (err) {
        // tslint:disable-next-line:no-console
        console.error(err);
        res.status(500).json({ error: err.message || err });
    } finally {
        release();
    }
});

packagesRouter.post("/", async (req: Request, res: Response) => {
    const release = await globalsInstance.getMutex().acquire();
    const data: any = req.body;
    try {
        const result = await packageService.addPackage(data);
        return res.json(result);
    } catch (err) {
        // tslint:disable-next-line:no-console
        console.error(err);
        res.status(500).json({ error: err.message || err });
    } finally {
        release();
    }
});

packagesRouter.put("/assigncourier", async (req: Request, res: Response) => {
    const release = await globalsInstance.getMutex().acquire();
    const data: any = req.body;
    try {
        const result = await packageService.assignPackageToCourier(data);
        return res.json(result);
    } catch (err) {
        // tslint:disable-next-line:no-console
        console.error(err);
        res.status(500).json({ error: err.message || err });
    } finally {
        release();
    }
});

packagesRouter.put("/deliver", async (req: Request, res: Response) => {
    const release = await globalsInstance.getMutex().acquire();
    const data: any = req.body;
    try {
        const result = await packageService.deliverPackage(data);
        return res.json(result);
    } catch (err) {
        // tslint:disable-next-line:no-console
        console.error(err);
        res.status(500).json({ error: err.message || err });
    } finally {
        release();
    }
});

packagesRouter.delete("/", async (req: Request, res: Response) => {
    const release = await globalsInstance.getMutex().acquire();
    const data: any = req.body;
    try {
        const result = await packageService.deletePackage(data);
        return res.json(result);
    } catch (err) {
        // tslint:disable-next-line:no-console
        console.error(err);
        res.status(500).json({ error: err.message || err });
    } finally {
        release();
    }
});

export default packagesRouter