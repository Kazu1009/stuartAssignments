import * as couriersDAL from "../dal/couriers"

export class CourierService {

    async getCourier(id: number): Promise<Courier | any> {
        const courierExists = await couriersDAL.getById(id);
        if (!courierExists) {
            const err: ErrorObj = {code: 1, message: "Courier not found"}
            return err;
        } else {
            return courierExists;
        }
    }

    async addCourier(data: Courier): Promise<Courier | any> {
        const courierExists = await couriersDAL.getById(data.id);
        if (courierExists) {
            const err: ErrorObj = {code: 0, message: "Courier already exists"}
            return err;
        } else {
            const newCourier: Courier = await couriersDAL.createCourier(data);
            // toDo: save logs
            return newCourier;
        }
    }

    async deleteCourier(data: CourierDelete): Promise<Courier | any> {
        const courierExists = await couriersDAL.getById(data.id);
        if (!courierExists) {
            const err: ErrorObj = {code: 1, message: "Courier not found"}
            return err;
        } else {
            const deletedCourier: number = await couriersDAL.deleteCourier(data);
            // toDo: save logs
            return deletedCourier;
        }
    }

    async updateCourierCapacity(data: Courier): Promise<Courier | any> {
        const courierExists = await couriersDAL.getById(data.id);
        if (!courierExists) {
            const err: ErrorObj = {code: 1, message: "Courier not found"}
            return err;
        } else {
            const updatedCourier: Courier = await couriersDAL.updateCapacity(data);
            // toDo: save logs
            return updatedCourier;
        }
    }

    async lookUpCouriers(data: CourierGetByCapacity): Promise<Courier[]> {
        const couriers: Courier[] = await couriersDAL.getByMinCapacity(data.capacity_required);
        // toDo: save logs
        return couriers;
    }

  }