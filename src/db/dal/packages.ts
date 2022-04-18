import Globals from "../../globals";

// todo: use Sequelize

const globalsInstance = Globals.getInstance()

const db = globalsInstance.getDbConnection();

export const createPackage = async (packageObj: Package): Promise<Package> => {
    const newPackage = await db.one(`
                INSERT INTO packages ( id, size, origin, destination )
                VALUES( $[id], $[size], $[origin], $[destination] )
                RETURNING id, size, assignedcourier, origin, destination;`,
        { id: `${packageObj.id}`, size: `${packageObj.size}`, origin: `${packageObj.origin}`, destination: `${packageObj.destination}` });
    return newPackage
}



export const deletePackage = async (packageObj: Package): Promise<number> => {
    const deletedPackages = await db.one(`
                DELETE FROM packages
                WHERE id = $[id]
                RETURNING id`,
        { id: `${packageObj.id}` }, (r: any) => r.countRow);
    return deletedPackages
}

export const updateAssignedCourier = async (packageObj: Package, courierId: number | string): Promise<Package> => {
    const packages = await db.one(`
                UPDATE packages SET
                    assignedcourier = $[courierId]
                WHERE id = $[id]
                RETURNING id, size, assignedcourier, origin, destination;`,
        { id: `${packageObj.id}`, courierId: `${courierId}` });
    return packages
}

export const getById = async (id: number): Promise<Package | any> => {
    const packages = await db.oneOrNone(`
        SELECT
            id,
            size,
            assignedcourier,
            origin,
            destination
        FROM  packages
        WHERE id = $[id]`,
        { id: `${id}` });
    return packages
}