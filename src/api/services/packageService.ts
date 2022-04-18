import * as packagesDAL from "../../db/dal/packages"
import * as couriersDAL from "../../db/dal/couriers"
import { Courier } from "../types/couriersType";
import { ErrorObj } from "../types/errorsType";
import { Package } from "../types/packagesType";

export class PackageService {

    async getPackage(id: number): Promise<Package | any> {
        const packageExists = await packagesDAL.getById(id);
        if (!packageExists) {
            const err: ErrorObj = { code: 3, message: "Package not found" }
            return err;
        } else {
            return packageExists;
        }
    }

    async addPackage(data: Package): Promise<Package | any> {
        const packageExists = await packagesDAL.getById(data.id);
        if (packageExists) {
            const err: ErrorObj = { code: 2, message: "Package already exists" }
            return err;
        } else {
            const newPackage: Package = await packagesDAL.createPackage(data);
            // toDo: save logs
            return newPackage;
        }
    }

    async deletePackage(data: Package): Promise<Package | any> {
        const packageExists = await packagesDAL.getById(data.id);
        if (!packageExists) {
            const err: ErrorObj = { code: 3, message: "Package not found" }
            return err;
        } else {
            const deletedPackage: number = await packagesDAL.deletePackage(data);
            // toDo: save logs
            return deletedPackage;
        }
    }

    async assignPackageToCourier(data: Package): Promise<any> {
        const packageExists = await packagesDAL.getById(data.id);
        const availableCouriers = await couriersDAL.getByMinCapacity(data.size);
        if (!packageExists) {
            const err: ErrorObj = { code: 2, message: "Package not found" }
            return err;
        } else if (availableCouriers.length < 1) {
            const err: ErrorObj = { code: 4, message: "No couriers found with available capacity. Please try again in a few minutes" }
            return err;
        } else {
            const assignedCourier: Courier = availableCouriers[0];
            const updatedPackage: Package = await packagesDAL.updateAssignedCourier(data, assignedCourier.id);
            assignedCourier.max_capacity = assignedCourier.max_capacity - data.size;
            const updadesCourier: Courier = await couriersDAL.updateCapacity(assignedCourier);
            // toDo: save logs
            return { package: updatedPackage, courier: updadesCourier };
        }
    }

    async deliverPackage(data: Package): Promise<any> {
        const packageExists = await packagesDAL.getById(data.id);
        const assignedCourier: any = await couriersDAL.getById(packageExists.assignedcourier);
        if (!packageExists) {
            const err: ErrorObj = { code: 2, message: "Package not found" }
            return err;
        } else if (!assignedCourier) {
            const err: ErrorObj = { code: 1, message: "Assigned courier not found" }
            return err;
        } else {
            const updatedPackage: Package = await packagesDAL.updateAssignedCourier(data, 0); // courier with id 0 should not exist
            assignedCourier.max_capacity = assignedCourier.max_capacity + data.size;
            const updadesCourier: Courier = await couriersDAL.updateCapacity(assignedCourier);
            // toDo: save logs
            return { package: updatedPackage, courier: updadesCourier };
        }
    }

}