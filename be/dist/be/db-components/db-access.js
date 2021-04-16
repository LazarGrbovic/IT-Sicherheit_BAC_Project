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
const debug_1 = __importDefault(require("debug"));
class DatabaseAccess {
    constructor(host, port, databaseName) {
        this.debubLog = debug_1.default("Database-Access");
        if (host === null) {
            throw new Error("The connection cannot be null.");
        }
        if (databaseName == null) {
            throw new Error("The database cannot be null.");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGItYWNjZXNzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vZGItY29tcG9uZW50cy9kYi1hY2Nlc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBUUEsb0JBQW9CO0FBQ3BCLCtDQUFpQztBQUVqQyxhQUFhO0FBQ2Isa0RBQTBCO0FBRTFCLE1BQWEsY0FBYztJQU92QixZQUNJLElBQVksRUFDWixJQUFZLEVBQ1osWUFBb0I7UUFMUCxhQUFRLEdBQW9CLGVBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBT2xFLElBQUksSUFBSSxLQUFLLElBQUksRUFDakI7WUFDSSxNQUFNLElBQUksS0FBSyxDQUFDLGdDQUFnQyxDQUFDLENBQUM7U0FDckQ7UUFFRCxJQUFJLFlBQVksSUFBSSxJQUFJLEVBQ3hCO1lBQ0ksTUFBTSxJQUFJLEtBQUssQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO1NBQ25EO1FBRUQsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7SUFDckMsQ0FBQztJQUVNLGFBQWE7UUFFbkIsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQzFCLENBQUM7SUFFRCw4REFBOEQ7SUFDakQsU0FBUzs7WUFDbEIsSUFBSSxDQUFDLFlBQVksR0FBRyxNQUFNLGdCQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDO1lBQ2pHLElBQUksQ0FBQyxRQUFRLENBQUMseUNBQXlDLENBQUMsQ0FBQztZQUN6RCxNQUFNLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUM1QixPQUFNO1FBQ1YsQ0FBQztLQUFBO0lBRUQsNENBQTRDO0lBQzVCLGNBQWM7O1lBQzFCLGdCQUFDLENBQUMsTUFBTSxFQUFFO2lCQUNMLFFBQVEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDO2lCQUMzQixFQUFFLENBQUMsQ0FBQyxVQUEyQixFQUFFLEVBQUU7Z0JBQ3BDLDRFQUE0RTtnQkFDNUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsSUFBSSxDQUFDLFlBQVksZUFBZSxDQUFDLENBQUM7Z0JBQ2hFLE9BQU8sZ0JBQUMsQ0FBQyxNQUFNLENBQ1gsVUFBVSxFQUNWLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxFQUNkLGdCQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FDaEMsQ0FBQztZQUNOLENBQUMsQ0FBQztpQkFDUCxHQUFHLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3RCLENBQUM7S0FBQTtJQUVELG9EQUFvRDtJQUN2QyxXQUFXLENBQUMsU0FBaUI7O1lBQ3RDLGdCQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUM7aUJBQ2xCLFNBQVMsRUFBRTtpQkFDWCxRQUFRLENBQUMsU0FBUyxDQUFDO2lCQUNuQixFQUFFLENBQUMsQ0FBQyxhQUE4QixFQUFFLEVBQUU7Z0JBQ3ZDLDRFQUE0RTtnQkFDNUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLFNBQVMseUJBQXlCLENBQUMsQ0FBQztnQkFFL0QsT0FBTyxnQkFBQyxDQUFDLE1BQU0sQ0FDZixhQUFhLEVBQ1QsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLEVBQ2xCLGdCQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQzdDLENBQUM7WUFDTixDQUFDLENBQUM7aUJBQ0wsR0FBRyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUN4QixDQUFDO0tBQUE7Q0FDSjtBQXpFRCx3Q0F5RUMifQ==