import { CourierService } from "../src/api/services/courierService"
import * as db from "../src/db/initdb"

const courierService: CourierService = new CourierService()

describe("test courier service", () => {

    const courier1: any = {
        id: 911,
        max_capacity: 50
    }

    const courier2: any = {
        id: 2022,
        max_capacity: 45
    }

    const courier2Updated: any = {
        id: 2022,
        max_capacity: 30
    }

    beforeAll(async () => {
        //remove all db data
        db.initdb();
    });
    
    /*
        afterAll(async () => {
            //close db?
        })
    */

    it("try to create courier1", async () => {
        expect(JSON.stringify(await courierService.addCourier(courier1))).toBe(JSON.stringify(courier1));
    });

    it("try to create courier1 and receive error message", async () => {
        expect(JSON.stringify(await courierService.addCourier(courier1))).toBe(JSON.stringify({
            "code": 0,
            "message": "Courier already exists"
        }));
    });

    it("get courier1", async () => {
        expect(JSON.stringify(await courierService.getCourier(911))).toBe(JSON.stringify(courier1));
    })


    it("try to create courier2", async () => {
        expect(JSON.stringify(await courierService.addCourier(courier2))).toBe(JSON.stringify(courier2));
    });

    it("update courier2 capacity", async () => {
        expect(JSON.stringify(await courierService.updateCourierCapacity(courier2Updated))).toBe(JSON.stringify(courier2Updated));
    })

    it("lookup couriers with min capacity 45 and only retrieve courier 1", async () => {
        expect(JSON.stringify(await courierService.lookUpCouriers({ capacity_required: 45 }))).toBe(JSON.stringify([courier1]));
    })

    it("lookup all couriers", async () => {
        expect(JSON.stringify(await courierService.lookUpCouriers({ capacity_required: 0 }))).toBe(JSON.stringify([courier2Updated, courier1]));
    })

    it("delete courier1", async () => {
        expect(JSON.stringify(await courierService.deleteCourier(courier1))).toBe(undefined);
    })
});