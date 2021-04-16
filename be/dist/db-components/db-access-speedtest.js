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
exports.SpeedTestDataAccess = void 0;
const rethinkdb_ts_1 = require("rethinkdb-ts");
const debug_1 = __importDefault(require("debug"));
const dbName = 'Speed_Internet_Test_DB';
class SpeedTestDataAccess {
    constructor(dataAccess) {
        this.speedTestTable = 'Speed_Test_Data';
        this.debugLog = debug_1.default("Database-Access-SpeedTest");
        if (dataAccess === null) {
            // throw new exception('The data access cannot be null.');
        }
        this.dataAccess = dataAccess;
    }
    initSpeedTestDataAccess() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.dataAccess.createTable(this.speedTestTable);
        });
    }
    getSpeedTestsAsync() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield rethinkdb_ts_1.r.table(this.speedTestTable).run(this.dataAccess.getConnection());
        });
    }
    getSpeedTestById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const stringId = '"' + id + '"';
            this.debugLog(`Getting speed test by id: "${id}"`);
            this.debugLog(`Getting speed test by concatenatedId: ${stringId}`);
            return yield rethinkdb_ts_1.r.table(this.speedTestTable).get(stringId).run(this.dataAccess.getConnection());
        });
    }
    checkIfSpeedTestExists(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const entries = yield this.getSpeedTestsAsync();
            entries.forEach((entry) => {
                if (entry.id == id) {
                    return true;
                }
            });
            return false;
        });
    }
    getSortedSpeedTestsAsync(column, order) {
        return __awaiter(this, void 0, void 0, function* () {
            if (column == "default") {
                this.debugLog("ORDER BY COLUMN: default column");
                return yield rethinkdb_ts_1.r.table(this.speedTestTable).run(this.dataAccess.getConnection());
            }
            else {
                this.debugLog(`ORDER BY COLUMN: ${column}`);
                if (order == "asc") {
                    return yield rethinkdb_ts_1.r.table(this.speedTestTable).orderBy(rethinkdb_ts_1.r.asc(column)).run(this.dataAccess.getConnection());
                }
                else {
                    return yield rethinkdb_ts_1.r.table(this.speedTestTable).orderBy(rethinkdb_ts_1.r.desc(column)).run(this.dataAccess.getConnection());
                }
            }
        });
    }
    addSpeedtestAsync(speedTestEntry) {
        return __awaiter(this, void 0, void 0, function* () {
            // let uuid = uuidv4();
            // debug.log(`[INSIDE DB-ACCESS-SPEEDTEST.TS] id = ${uuid}`)        
            // let speedTestEntryId = new DTOSpeedTestWithID(speedTestEntry, uuid);  
            this.debugLog("Adding new entry");
            var result = yield rethinkdb_ts_1.r.table(this.speedTestTable).insert(speedTestEntry).run(this.dataAccess.getConnection());
            if (result.inserted < 1) {
                return false;
            }
            return true;
        });
    }
    updateSpeedTestAsync(speedTestEntryWithID) {
        return __awaiter(this, void 0, void 0, function* () {
            this.debugLog(`Inside updateMethod =>    id = ${speedTestEntryWithID.id}`);
            var result = yield rethinkdb_ts_1.r.table(this.speedTestTable).get(speedTestEntryWithID.id).update(speedTestEntryWithID).run(this.dataAccess.getConnection());
            if (result.replaced < 1) {
                return false;
            }
            return true;
        });
    }
    deleteSpeedTestAsync(id) {
        return __awaiter(this, void 0, void 0, function* () {
            this.debugLog(`Inside delete method =>    id = ${id}`);
            var result = yield rethinkdb_ts_1.r.table(this.speedTestTable).get(id).delete().run(this.dataAccess.getConnection());
            if (result.deleted < 1) {
                return false;
            }
            return true;
        });
    }
}
exports.SpeedTestDataAccess = SpeedTestDataAccess;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGItYWNjZXNzLXNwZWVkdGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2RiLWNvbXBvbmVudHMvZGItYWNjZXNzLXNwZWVkdGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFDQSwrQ0FBaUM7QUFJakMsa0RBQTBCO0FBRTFCLE1BQU0sTUFBTSxHQUFZLHdCQUF3QixDQUFDO0FBRWpELE1BQWEsbUJBQW1CO0lBSzVCLFlBQW9CLFVBQTJCO1FBSjlCLG1CQUFjLEdBQVksaUJBQWlCLENBQUM7UUFFNUMsYUFBUSxHQUFvQixlQUFLLENBQUMsMkJBQTJCLENBQUMsQ0FBQztRQUk1RSxJQUFHLFVBQVUsS0FBSyxJQUFJLEVBQUM7WUFDbkIsMERBQTBEO1NBQzdEO1FBRUQsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7SUFDakMsQ0FBQztJQUVZLHVCQUF1Qjs7WUFDaEMsT0FBTyxNQUFNLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUNsRSxDQUFDO0tBQUE7SUFFWSxrQkFBa0I7O1lBRTNCLE9BQU8sTUFBTSxnQkFBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQztRQUNuRixDQUFDO0tBQUE7SUFFWSxnQkFBZ0IsQ0FBQyxFQUFVOztZQUNwQyxNQUFNLFFBQVEsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsQ0FBQztZQUNoQyxJQUFJLENBQUMsUUFBUSxDQUFDLDhCQUE4QixFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ25ELElBQUksQ0FBQyxRQUFRLENBQUMseUNBQXlDLFFBQVEsRUFBRSxDQUFDLENBQUM7WUFDbkUsT0FBTyxNQUFNLGdCQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FB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