import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import routes from "./api";

dotenv.config();

const port = process.env.SERVER_PORT;

export const get = () => {
    const app: Application = express()

    // Body parsing Middleware
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.get('/', async (req: Request, res: Response): Promise<Response> => {
        return res.status(200).send({ message: `Welcome to the Stuart API!` })
    })

    app.use(routes);

    return app
}

export const start = () => {
    const app = get()
    try {
        app.listen(port, () => {
            // tslint:disable-next-line:no-console
            console.log(`Server running on http://localhost:${port}`)
        })
    } catch (error: any) {
        // tslint:disable-next-line:no-console
        console.log(`Error occurred: ${error.message}`)
    }
}

start()