import dotenv from "dotenv";
import pgPromise from "pg-promise";
import { Mutex } from 'async-mutex';


dotenv.config();
const config = {
    database: process.env.PGDATABASE,
    host: process.env.PGHOST,
    user: process.env.PGUSER
};
const pgp = pgPromise();

class Globals {

    private static _instance: Globals;
    private readonly dbConnection: any;
    private readonly mutex: Mutex;

    private constructor() {
        this.dbConnection = pgp(config);
        this.mutex = new Mutex();
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

    public getMutex(): Mutex {
        return this.mutex;
    }
}

export default Globals