"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseAccess = void 0;
// Rethink db access
const rethinkdb_ts_1 = require("rethinkdb-ts");
// Debug tool
// import * as debug from "debug";
const debug_1 = __importDefault(require("debug"));
class DatabaseAccess {
    constructor(host, port, databaseName) {
        this.debubLog = debug_1.default("Database-Access");
        if (host === null) {
            // throw new exception("The connection cannot be null."); 
        }
        if (databaseName == null) {
            // throw new exception("The database cannot be null.");
        }
        this.host = host;
        this.port = port;
        this.databaseName = databaseName;
    }
    getConnection() {
        return this.dbConnection;
    }
    // Initialize all relevant components for the database access.
    initAsync() {
        return __awaiter(this, void 0, void 0, function* () {
            this.dbConnection = yield rethinkdb_ts_1.r.connect({ host: this.host, port: this.port, db: this.databaseName });
            this.debubLog("Connection to the database established.");
            yield this.CreateDatabase();
            return;
        });
    }
    // Create the database if it does not exist.
    CreateDatabase() {
        return __awaiter(this, void 0, void 0, function* () {
            rethinkdb_ts_1.r.dbList()
                .contains(this.databaseName)
                .do((containsDb) => {
                // At this point we are checking if the database exist. If not we create it.
                this.debubLog(`The database ${this.databaseName} was created.`);
                return rethinkdb_ts_1.r.branch(containsDb, { created: 0 }, rethinkdb_ts_1.r.dbCreate(this.databaseName));
            })
                .run(this.dbConnection);
        });
    }
    // Creates the tables in the case they do not exist.
    createTable(tableName) {
        return __awaiter(this, void 0, void 0, function* () {
            rethinkdb_ts_1.r.db(this.databaseName)
                .tableList()
                .contains(tableName)
                .do((containsTable) => {
                // At this point we are checking if the database exist. If not we create it.
                this.debubLog(`The table ${tableName} was created or exists.`);
                return rethinkdb_ts_1.r.branch(containsTable, { created: 0 }, rethinkdb_ts_1.r.db(this.databaseName).tableCreate(tableName));
            })
                .run(this.dbConnection);
        });
    }
}
exports.DatabaseAccess = DatabaseAccess;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGItYWNjZXNzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vZGItY29tcG9uZW50cy9kYi1hY2Nlc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBUUEsb0JBQW9CO0FBQ3BCLCtDQUFpQztBQUVqQyxhQUFhO0FBQ2Isa0NBQWtDO0FBRWxDLGtEQUEwQjtBQUUxQixNQUFhLGNBQWM7SUFPdkIsWUFDSSxJQUFZLEVBQ1osSUFBWSxFQUNaLFlBQW9CO1FBTFAsYUFBUSxHQUFvQixlQUFLLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQU9sRSxJQUFJLElBQUksS0FBSyxJQUFJLEVBQ2pCO1lBQ0ksMERBQTBEO1NBQzdEO1FBRUQsSUFBSSxZQUFZLElBQUksSUFBSSxFQUN4QjtZQUNJLHVEQUF1RDtTQUMxRDtRQUVELElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO0lBQ3JDLENBQUM7SUFFTSxhQUFhO1FBRW5CLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztJQUMxQixDQUFDO0lBRUQsOERBQThEO0lBQ2pELFNBQVM7O1lBQ2xCLElBQUksQ0FBQyxZQUFZLEdBQUcsTUFBTSxnQkFBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLEVBQUUsRUFBRSxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQztZQUNqRyxJQUFJLENBQUMsUUFBUSxDQUFDLHlDQUF5QyxDQUFDLENBQUM7WUFDekQsTUFBTSxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDNUIsT0FBTTtRQUNWLENBQUM7S0FBQTtJQUVELDRDQUE0QztJQUM1QixjQUFjOztZQUMxQixnQkFBQyxDQUFDLE1BQU0sRUFBRTtpQkFDTCxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQztpQkFDM0IsRUFBRSxDQUFDLENBQUMsVUFBMkIsRUFBRSxFQUFFO2dCQUNwQyw0RUFBNEU7Z0JBQzVFLElBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLElBQUksQ0FBQyxZQUFZLGVBQWUsQ0FBQyxDQUFDO2dCQUNoRSxPQUFPLGdCQUFDLENBQUMsTUFBTSxDQUNYLFVBQVUsRUFDVixFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsRUFDZCxnQkFBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQ2hDLENBQUM7WUFDTixDQUFDLENBQUM7aUJBQ1AsR0FBRyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUN0QixDQUFDO0tBQUE7SUFFRCxvREFBb0Q7SUFDdkMsV0FBVyxDQUFDLFNBQWlCOztZQUN0QyxnQkFBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDO2lCQUNsQixTQUFTLEVBQUU7aUJBQ1gsUUFBUSxDQUFDLFNBQVMsQ0FBQztpQkFDbkIsRUFBRSxDQUFDLENBQUMsYUFBOEIsRUFBRSxFQUFFO2dCQUN2Qyw0RUFBNEU7Z0JBQzVFLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxTQUFTLHlCQUF5QixDQUFDLENBQUM7Z0JBRS9ELE9BQU8sZ0JBQUMsQ0FBQyxNQUFNLENBQ2YsYUFBYSxFQUNULEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxFQUNsQixnQkFBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUM3QyxDQUFDO1lBQ04sQ0FBQyxDQUFDO2lCQUNMLEdBQUcsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDeEIsQ0FBQztLQUFBO0NBQ0o7QUF6RUQsd0NBeUVDIn0=