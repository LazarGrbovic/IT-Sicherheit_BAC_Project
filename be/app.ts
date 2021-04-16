import express from 'express';
import * as http from 'http';
import * as bodyparser from 'body-parser';

import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import cors from 'cors';
import {CommonRoutesConfig} from './routes/common/common.routes.config';
import {UsersRoutes} from './routes/users/users.routes.config';
import debug from 'debug';

// DB
import { SpeedTestDataAccess } from "./db-components/db-access-speedtest";
import { UsersDbAccess } from "./db-components/db-access-users";
import { UserController } from "./controller/user-controller";
import { SpeedTestController } from "./controller/user.speedtest-controller";
import { DatabaseAccess } from "./db-components/db-access";
import { SpeedTestRoutes } from "./routes/speedtest/speedtest.routes.config";

// SERVER
const app: express.Application = express();
const server: http.Server = http.createServer(app);
const port: Number = 3000;
const routes: Array<CommonRoutesConfig> = [];
const debugLog: debug.IDebugger = debug('app');

configure();

// DB SETUP
const databaseName: string = "Speed_Internet_Test_DB";
const dbHost: string = "localhost";
const dbPort: number = 28015;
const dbAccess: DatabaseAccess = new DatabaseAccess(dbHost, dbPort, databaseName);
let dataAccessSpeedTest: SpeedTestDataAccess = null;
let dataAccessUser: UsersDbAccess = null;

// CONTROLLERS
let userController: UserController = null;
let speedTestController: SpeedTestController = null;



var initDatabasePromise = dbAccess.initAsync();
initDatabasePromise.then(() => {
    dataAccessSpeedTest = new SpeedTestDataAccess(dbAccess);
    dataAccessUser = new UsersDbAccess(dbAccess);
    
    speedTestController = new SpeedTestController(dataAccessSpeedTest);
    userController = new UserController(dataAccessUser);

const initPromisSpeedTestData = dataAccessSpeedTest.initSpeedTestDataAccess();
initPromisSpeedTestData.then(() => {
    const initPromisUser = dataAccessUser.initUserAccessAsync();
    initPromisUser.then(() => {
        startApp();
    });
    });
});


// // this is a simple route to make sure everything is working properly
// app.get('/', (req: express.Request, res: express.Response) => {
//     res.status(200).send(`Server up and running!`)
// });

// server.listen(port, () => {
//    debugLog(`PRACTICE Server running at http://localhost:${port}`);
//    routes.forEach((route: CommonRoutesConfig) => {
//        debugLog(`[PRACTICE] Routes configured for ${route.getName()}`);
//    });
// });

// Configures routes for our endpoints.
function configureRoutes(): void {
    app.get("/", (req: express.Request, res: express.Response) => {
        res.status(200).send("Server up and running");
    });

    routes.push(new UsersRoutes(app, userController));
    routes.push(new SpeedTestRoutes(app, speedTestController));
}

function startApp(): void {
    configureRoutes();
    server.listen(port, () => {
        debug.log(`Server running at http://localhost:${port}`);
        routes.forEach((route: CommonRoutesConfig) => {
            debug.log(`Routes configured for ${route.getName()}`);
        });
    });
}

// Setup middleware and logger.
function configure(): void {
    // Adding middleware for parsing requests to JSON.
    app.use(bodyparser.json());

    // Adding middleware for CORS.
    app.use(cors());

    // Configuring middleware for logging.
    app.use(
        expressWinston.logger({
            transports: [new winston.transports.Console()],
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.json()
            ),
        })
    );

    app.use(
        expressWinston.errorLogger({
            transports: [new winston.transports.Console()],
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.json()
            ),
        })
    );
}