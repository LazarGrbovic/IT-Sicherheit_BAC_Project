import { CommonRoutesConfig } from "../common/common.routes.config";
import * as express from "express";
import { exception } from "console";
import { SpeedTestController } from "../../controller/user.speedtest-controller";
import debug from "debug";
import { stringify } from "uuid";

export class SpeedTestRoutes extends CommonRoutesConfig {

    private readonly controller: SpeedTestController;

    private readonly debugLog: debug.IDebugger = debug("SpeedTestRoutes");

    public constructor(app: express.Application, controller: SpeedTestController) {
        super(app, "SpeedTestDataResources");

        if (controller === null) {
            throw new Error("The controller cannot be null.");
        }

        this.controller = controller;
    }


    public configureRoutes(): express.Application {
        this.app
            .route("/speedtestdata")
            .all(
                (
                req: express.Request,
                res: express.Response,
                next: express.NextFunction
                ) => {
                    next();
                }
            )
            .get((req: express.Request, res: express.Response) => {

                // http://expressjs.com/en/api.html [Section req.query]
                // https://stackoverflow.com/questions/34704593/express-routes-parameters
                var query = JSON.stringify(req.query);

                this.debugLog(`SortEntries Route req.query: ${req.query}`)
                this.debugLog(`SortEntries Route JSON.stringify(req.query) => QUERY: ${query}`)
                this.debugLog(`SortEntries Route req.query.sortByColumn => QUERY: ${req.query.sortByColumn}`)
                
                if (req.query.sortByColumn != "" && req.query.sortByColumn != undefined && req.query.sortByColumn != null && req.query.sortByColumn.length != 0) {
                    this.debugLog(`QUERY IS NOT EMPTY`)
                    this.controller.getSortedEntries(req, res);
                }
                
                else{
                    this.debugLog("QUERY IS EMPTY")
                    this.controller.getAllEntriesData(req, res);
                }
                
            })
            .post((req: express.Request, res: express.Response) => {
                this.controller.addNewEntry(req, res);
            })
            

        this.app
            .route("/speedtestdata/:speedTestId")
            .all(
                (
                req: express.Request,
                res: express.Response,
                next: express.NextFunction
                ) => {
                    next();
                }
            )
            .get((req: express.Request, res: express.Response) => {
                this.controller.getEntryById(req, res);
            })
            .put((req: express.Request, res: express.Response) => {
                this.controller.updateEntry(req, res);
            })
            .delete((req: express.Request, res: express.Response) => {
                this.controller.deleteEntry(req, res);
            });                

        return this.app;
    }
}