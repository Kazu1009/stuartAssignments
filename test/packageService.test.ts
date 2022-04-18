import { PackageService } from "../src/api/services/packageService"
import { CourierService } from "../src/api/services/courierService"
import { Courier } from "../src/api/types/couriersType"
import { Package } from "../src/api/types/packagesType"
import * as db from "../src/db/initdb"

const packageService: PackageService = new PackageService()
const courierService: CourierService = new CourierService()

describe("test package service", () => {

    const courier1: Courier = {
        id: 911,
        max_capacity: 50
    }

    const courier1updated: Courier = {
        id: 911,
        max_capacity: 20
    }

    const package1: Package = {
        id: 1,
        size: 100,
        assignedcourier: 0,
        origin: "abc",
        destination: "xyz"
    }

    const package2: Package = {
        id: 2,
        size: 30,
        assignedcourier: 0,
        origin: "abc",
        destination: "xyz"
    }

    const package2updated: Package = {
        id: 2,
        size: 30,
        assignedcourier: 911,
        origin: "abc",
        destination: "xyz"
    }

    beforeAll(async () => {
        //remove all db data and create courier1
        db.initdb();
        expect(JSON.stringify(await courierService.addCourier(courier1))).toBe(JSON.stringify(courier1));
    });

    it("try to create package1", async () => {
        expect(JSON.stringify(await packageService.addPackage(package1))).toBe(JSON.stringify(package1));
    });

    it("try to create package2", async () => {
        expect(JSON.stringify(await packageService.addPackage(package2))).toBe(JSON.stringify(package2));
    });

    it("get courier1", async () => {
        expect(JSON.stringify(await packageService.getPackage(1))).toBe(JSON.stringify(package1));
    })

    it("try to assign package1", async () => {
        expect(JSON.stringify(await packageService.assignPackageToCourier(package1))).toBe(JSON.stringify({code: 4, message: "No couriers found with available capacity. Please try again in a few minutes"}));
    })

    it("try to assign package2", async () => {
        expect(JSON.stringify(await packageService.assignPackageToCourier(package2))).toBe(JSON.stringify({package:package2updated, courier:courier1updated}));
    })

    it("try to deliver package2", async () => {
        expect(JSON.stringify(await packageService.deliverPackage(package2))).toBe(JSON.stringify({package:package2, courier:courier1}));
    })

});