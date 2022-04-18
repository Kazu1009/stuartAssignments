export type Courier = {
    id: number,
    max_capacity: number
}

export type CourierGetByCapacity = {
    capacity_required: number
}

export type CourierDelete = {
    id: number,
}