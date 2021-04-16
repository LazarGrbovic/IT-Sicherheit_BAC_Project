"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpeedTestRoutes = void 0;
const common_routes_config_1 = require("../common/common.routes.config");
const debug_1 = __importDefault(require("debug"));
class SpeedTestRoutes extends common_routes_config_1.CommonRoutesConfig {
    constructor(app, controller) {
        super(app, "SpeedTestDataResources");
        this.debugLog = debug_1.default("SpeedTestRoutes");
        if (controller === null) {
            // throw new exception("The controller cannot be null.");
        }
        this.controller = controller;
    }
    configureRoutes() {
        this.app
            .route("/speedtestdata")
            .all((req, res, next) => {
            next();
        })
            .get((req, res) => {
            // http://expressjs.com/en/api.html [Section req.query]
            // https://stackoverflow.com/questions/34704593/express-routes-parameters
            var query = JSON.stringify(req.query);
            this.debugLog(`SortEntries Route req.query: ${req.query}`);
            this.debugLog(`SortEntries Route JSON.stringify(req.query) => QUERY: ${query}`);
            this.debugLog(`SortEntries Route req.query.sortByColumn => QUERY: ${req.query.sortByColumn}`);
            if (req.query.sortByColumn != "" && req.query.sortByColumn != undefined && req.query.sortByColumn != null && req.query.sortByColumn.length != 0) {
                this.debugLog(`QUERY IS NOT EMPTY`);
                this.controller.getSortedEntries(req, res);
            }
            // else if(req.query.ascDesc != "" && req.query.ascDesc != undefined && req.query.ascDesc != null && req.query.ascDesc.length != 0) {
            //     this.debugLog(`QUERY IS NOT EMPTY: ${req.query.sortByColumn} => ASC/DESC = ${req.query.ascDesc}`)
            //     this.controller.getSortedEntries(req, res);                    
            // }
            else {
                this.debugLog("QUERY IS EMPTY");
                this.controller.getAllEntriesData(req, res);
            }
        })
            .post((req, res) => {
            this.controller.addNewEntry(req, res);
        });
        this.app
            .route("/speedtestdata/:speedTestId")
            .all((req, res, next) => {
            next();
        })
            .get((req, res) => {
            this.controller.getEntryById(req, res);
        })
            .put((req, res) => {
            this.controller.updateEntry(req, res);
        })
            .delete((req, res) => {
            this.controller.deleteEntry(req, res);
        });
        return this.app;
    }
}
exports.SpeedTestRoutes = SpeedTestRoutes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BlZWR0ZXN0LnJvdXRlcy5jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9yb3V0ZXMvc3BlZWR0ZXN0L3NwZWVkdGVzdC5yb3V0ZXMuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLHlFQUFvRTtBQUlwRSxrREFBMEI7QUFHMUIsTUFBYSxlQUFnQixTQUFRLHlDQUFrQjtJQU1uRCxZQUFtQixHQUF3QixFQUFFLFVBQStCO1FBQ3hFLEtBQUssQ0FBQyxHQUFHLEVBQUUsd0JBQXdCLENBQUMsQ0FBQztRQUh4QixhQUFRLEdBQW9CLGVBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBS2xFLElBQUksVUFBVSxLQUFLLElBQUksRUFBRTtZQUNyQix5REFBeUQ7U0FDNUQ7UUFFRCxJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztJQUNqQyxDQUFDO0lBR00sZUFBZTtRQUNsQixJQUFJLENBQUMsR0FBRzthQUNILEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQzthQUN2QixHQUFHLENBQ0EsQ0FDQSxHQUFvQixFQUNwQixHQUFxQixFQUNyQixJQUEwQixFQUN4QixFQUFFO1lBQ0EsSUFBSSxFQUFFLENBQUM7UUFDWCxDQUFDLENBQ0o7YUFDQSxHQUFHLENBQUMsQ0FBQyxHQUFvQixFQUFFLEdBQXFCLEVBQUUsRUFBRTtZQUVqRCx1REFBdUQ7WUFDdkQseUVBQXlFO1lBQ3pFLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBRXRDLElBQUksQ0FBQyxRQUFRLENBQUMsZ0NBQWdDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFBO1lBQzFELElBQUksQ0FBQyxRQUFRLENBQUMseURBQXlELEtBQUssRUFBRSxDQUFDLENBQUE7WUFDL0UsSUFBSSxDQUFDLFFBQVEsQ0FBQyxzREFBc0QsR0FBRyxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFBO1lBRTdGLElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyxZQUFZLElBQUksRUFBRSxJQUFJLEdBQUcsQ0FBQyxLQUFLLENBQUMsWUFBWSxJQUFJLFNBQVMsSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLFlBQVksSUFBSSxJQUFJLElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRTtnQkFDN0ksSUFBSSxDQUFDLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFBO2dCQUNuQyxJQUFJLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQzthQUM5QztZQUNELHFJQUFxSTtZQUNySSx3R0FBd0c7WUFDeEcsc0VBQXNFO1lBQ3RFLElBQUk7aUJBQ0E7Z0JBQ0EsSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBO2dCQUMvQixJQUFJLENBQUMsVUFBVSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQzthQUMvQztRQUVMLENBQUMsQ0FBQzthQUNELElBQUksQ0FBQyxDQUFDLEdBQW9CLEVBQUUsR0FBcUIsRUFBRSxFQUFFO1lBQ2xELElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUMxQyxDQUFDLENBQUMsQ0FBQTtRQUdOLElBQUksQ0FBQyxHQUFHO2FBQ0gsS0FBSyxDQUFDLDZCQUE2QixDQUFDO2FBQ3BDLEdBQUcsQ0FDQSxDQUNBLEdBQW9CLEVBQ3BCLEdBQXFCLEVBQ3JCLElBQTBCLEVBQ3hCLEVBQUU7WUFDQSxJQUFJLEVBQUUsQ0FBQztRQUNYLENBQUMsQ0FDSjthQUNBLEdBQUcsQ0FBQyxDQUFDLEdBQW9CLEVBQUUsR0FBcUIsRUFBRSxFQUFFO1lBQ2pELElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUMzQyxDQUFDLENBQUM7YUFDRCxHQUFHLENBQUMsQ0FBQyxHQUFvQixFQUFFLEdBQXFCLEVBQUUsRUFBRTtZQUNqRCxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDMUMsQ0FBQyxDQUFDO2FBQ0QsTUFBTSxDQUFDLENBQUMsR0FBb0IsRUFBRSxHQUFxQixFQUFFLEVBQUU7WUFDcEQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQzFDLENBQUMsQ0FBQyxDQUFDO1FBRVAsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDO0lBQ3BCLENBQUM7Q0FDSjtBQWpGRCwwQ0FpRkMifQ==