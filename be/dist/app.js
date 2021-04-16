"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http = __importStar(require("http"));
const bodyparser = __importStar(require("body-parser"));
const winston = __importStar(require("winston"));
const expressWinston = __importStar(require("express-winston"));
const cors_1 = __importDefault(require("cors"));
const users_routes_config_1 = require("./routes/users/users.routes.config");
const debug_1 = __importDefault(require("debug"));
// DB
const db_access_speedtest_1 = require("./db-components/db-access-speedtest");
const db_access_users_1 = require("./db-components/db-access-users");
const user_controller_1 = require("./controller/user-controller");
const user_speedtest_controller_1 = require("./controller/user.speedtest-controller");
const db_access_1 = require("./db-components/db-access");
const speedtest_routes_config_1 = require("./routes/speedtest/speedtest.routes.config");
// SERVER
const app = express_1.default();
const server = http.createServer(app);
const port = 3000;
const routes = [];
const debugLog = debug_1.default('app');
configure();
// DB SETUP
const databaseName = "Speed_Internet_Test_DB";
const dbHost = "localhost";
const dbPort = 28015;
const dbAccess = new db_access_1.DatabaseAccess(dbHost, dbPort, databaseName);
let dataAccessSpeedTest = null;
let dataAccessUser = null;
// CONTROLLERS
let userController = null;
let speedTestController = null;
var initDatabasePromise = dbAccess.initAsync();
initDatabasePromise.then(() => {
    dataAccessSpeedTest = new db_access_speedtest_1.SpeedTestDataAccess(dbAccess);
    dataAccessUser = new db_access_users_1.UsersDbAccess(dbAccess);
    speedTestController = new user_speedtest_controller_1.SpeedTestController(dataAccessSpeedTest);
    userController = new user_controller_1.UserController(dataAccessUser);
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
function configureRoutes() {
    app.get("/", (req, res) => {
        res.status(200).send("Server up and running");
    });
    routes.push(new users_routes_config_1.UsersRoutes(app, userController));
    routes.push(new speedtest_routes_config_1.SpeedTestRoutes(app, speedTestController));
}
function startApp() {
    configureRoutes();
    server.listen(port, () => {
        debug_1.default.log(`Server running at http://localhost:${port}`);
        routes.forEach((route) => {
            debug_1.default.log(`Routes configured for ${route.getName()}`);
        });
    });
}
// Setup middleware and logger.
function configure() {
    // Adding middleware for parsing requests to JSON.
    app.use(bodyparser.json());
    // Adding middleware for CORS.
    app.use(cors_1.default());
    // Configuring middleware for logging.
    app.use(expressWinston.logger({
        transports: [new winston.transports.Console()],
        format: winston.format.combine(winston.format.colorize(), winston.format.json()),
    }));
    app.use(expressWinston.errorLogger({
        transports: [new winston.transports.Console()],
        format: winston.format.combine(winston.format.colorize(), winston.format.json()),
    }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNEQUE4QjtBQUM5QiwyQ0FBNkI7QUFDN0Isd0RBQTBDO0FBRTFDLGlEQUFtQztBQUNuQyxnRUFBa0Q7QUFDbEQsZ0RBQXdCO0FBRXhCLDRFQUErRDtBQUMvRCxrREFBMEI7QUFFMUIsS0FBSztBQUNMLDZFQUEwRTtBQUMxRSxxRUFBZ0U7QUFDaEUsa0VBQThEO0FBQzlELHNGQUE2RTtBQUM3RSx5REFBMkQ7QUFDM0Qsd0ZBQTZFO0FBRTdFLFNBQVM7QUFDVCxNQUFNLEdBQUcsR0FBd0IsaUJBQU8sRUFBRSxDQUFDO0FBQzNDLE1BQU0sTUFBTSxHQUFnQixJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ25ELE1BQU0sSUFBSSxHQUFXLElBQUksQ0FBQztBQUMxQixNQUFNLE1BQU0sR0FBOEIsRUFBRSxDQUFDO0FBQzdDLE1BQU0sUUFBUSxHQUFvQixlQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7QUFFL0MsU0FBUyxFQUFFLENBQUM7QUFFWixXQUFXO0FBQ1gsTUFBTSxZQUFZLEdBQVcsd0JBQXdCLENBQUM7QUFDdEQsTUFBTSxNQUFNLEdBQVcsV0FBVyxDQUFDO0FBQ25DLE1BQU0sTUFBTSxHQUFXLEtBQUssQ0FBQztBQUM3QixNQUFNLFFBQVEsR0FBbUIsSUFBSSwwQkFBYyxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsWUFBWSxDQUFDLENBQUM7QUFDbEYsSUFBSSxtQkFBbUIsR0FBd0IsSUFBSSxDQUFDO0FBQ3BELElBQUksY0FBYyxHQUFrQixJQUFJLENBQUM7QUFFekMsY0FBYztBQUNkLElBQUksY0FBYyxHQUFtQixJQUFJLENBQUM7QUFDMUMsSUFBSSxtQkFBbUIsR0FBd0IsSUFBSSxDQUFDO0FBSXBELElBQUksbUJBQW1CLEdBQUcsUUFBUSxDQUFDLFNBQVMs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