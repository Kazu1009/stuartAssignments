import dotenv from "dotenv";
import pgPromise from "pg-promise";

dotenv.config();
const config = {
    database: process.env.PGDATABASE,
    host: process.env.PGHOST,
    user: process.env.PGUSER
};
const pgp = pgPromise();

class Globals {

    private static _instance: Globals;
    private readonly dbConnection: any

    private constructor() {
        this.dbConnection = pgp(config);
    }

    static getInstance() {
        if (this._instance) {
            return this._instance;
        }

        this._instance = new Globals();
        return this._instance;
    }

    public getDbConnection(): any {
        return this.dbConnection;
    }
}

export default Globals