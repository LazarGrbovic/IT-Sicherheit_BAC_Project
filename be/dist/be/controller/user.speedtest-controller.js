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
exports.SpeedTestController = void 0;
const dto_speedtest_1 = require("../../sharedFolder/dto-speedtest");
const _ = __importStar(require("underscore"));
const debug_1 = __importDefault(require("debug"));
// Defines the controller for managing requests concerning the pool diary entries.
class SpeedTestController {
    constructor(dbAccess) {
        this.debugLog = debug_1.default("User.SpeedTest-Controller");
        if (dbAccess === null) {
            // throw new exception("The access for the database cannot be null.");
        }
        this.dbAccess = dbAccess;
    }
    addNewEntry(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            if (!this.validateNewData(data)) {
                res.status(400).send(data);
                return;
            }
            const entry = new dto_speedtest_1.DTOSpeedTest(data.userId, data.upload, data.download, data.provider, data.testProvider, data.ping, data.datum, data.os, data.comment, data.note);
            if (this.areFieldsEmpty(entry)) {
                res.status(400).send("Some of the fields are empty!");
                return;
            }
            if (!this.isNoteFieldAllowed(entry)) {
                res.status(400).send("Note value not allowed! Allowed values: [1 2 3 4 5]");
                return;
            }
            if (!this.areNumberFieldsAllowed(entry)) {
                res.status(400).send("Some of the field numbers are not integers!");
                return;
            }
            if (!this.isDateFieldLengthCorrect(entry)) {
                res.status(400).send("Date field is not correct!");
                return;
            }
            if (!this.isMinimumLengthCorrect(entry)) {
                res.status(400).send("No field except 'note' can have length of 1!");
                return;
            }
            var result = yield this.dbAccess.addSpeedtestAsync(entry);
            if (!result) {
                res.status(403).send("Could not add the entry.");
            }
            else {
                res.status(200).send(result);
            }
        });
    }
    updateEntry(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            const id = req.params.speedTestId;
            if (!this.validateNewData(data)) {
                res.status(400).send(data);
                return;
            }
            const entry = new dto_speedtest_1.DTOSpeedTest(data.userId, data.upload, data.download, data.provider, data.testProvider, data.ping, data.datum, data.os, data.comment, data.note);
            if (this.areFieldsEmpty(entry)) {
                res.status(400).send("Some of the fields are empty!");
                return;
            }
            if (!this.isNoteFieldAllowed(entry)) {
                res.status(400).send("Note value not allowed! Allowed values: [1 2 3 4 5]");
                return;
            }
            if (!this.areNumberFieldsAllowed(entry)) {
                res.status(400).send("Some of the field numbers are not integers!");
                return;
            }
            if (!this.isDateFieldLengthCorrect(entry)) {
                res.status(400).send("Date field is not correct!");
                return;
            }
            if (!this.isMinimumLengthCorrect(entry)) {
                res.status(400).send("No field except 'note' can have length of 1!");
                return;
            }
            let doesExist = false;
            const tests = this.dbAccess.getSpeedTestsAsync();
            (yield tests).forEach(item => {
                if (item.id == id) {
                    doesExist = true;
                }
            });
            if (!doesExist) {
                res.status(400).send("No such entry with that ID!");
                return;
            }
            const entryWithID = new dto_speedtest_1.DTOSpeedTestWithID(entry, id);
            this.debugLog(`update() => id ${id}`);
            var result = yield this.dbAccess.updateSpeedTestAsync(entryWithID);
            if (!result) {
                res.status(403).send("Could not add the entry.");
            }
            else {
                res.status(200).send(result);
            }
        });
    }
    deleteEntry(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let doesExist = false;
            const id = req.params.speedTestId;
            const tests = this.dbAccess.getSpeedTestsAsync();
            (yield tests).forEach(item => {
                if (item.id == id) {
                    doesExist = true;
                }
            });
            if (!doesExist) {
                res.status(400).send("No such entry with that ID!");
                return;
            }
            var result = yield this.dbAccess.deleteSpeedTestAsync(id);
            if (!result) {
                res.status(403).send("Could not delete the entry.");
            }
            else {
                res.status(200).send(result);
            }
        });
    }
    getAllEntriesData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.dbAccess.getSpeedTestsAsync();
            res.status(200).send(result);
        });
    }
    getEntryById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.speedTestId;
            if (!id || id == "" || id == null) {
                res.status(400).send("ID parameter can not be empty!");
                return;
            }
            if (this.dbAccess.checkIfSpeedTestExists(id)) {
                this.debugLog(`Speed test with id: ${id} exists`);
                return this.dbAccess.getSpeedTestById(id);
            }
            else {
                res.status(400).send("No such entry with that ID!");
            }
            //    const entry = this.dbAccess.getSpeedTestById(id);
            //    return entry;
            //     if (!entry) {
            //         res.status(400).send("No such entry with that ID!");
            //     }
            //     else {
            //         return entry;
            //     }
        });
    }
    getSortedEntries(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.query.sortByColumn == "" || req.query.sortByColumn == undefined || req.query.sortByColumn == null || req.query.sortByColumn.length == 0) {
                res.status(403).send("Invalid Column Parameter");
                return;
            }
            if ((req.query.ascDesc == "" || req.query.ascDesc == undefined || req.query.ascDesc == null || req.query.ascDesc.length == 0) || (req.query.ascDesc != "asc" && req.query.ascDesc != "desc")) {
                const result = yield this.dbAccess.getSortedSpeedTestsAsync(req.query.sortByColumn, "asc");
                if (!result) {
                    res.status(403).send("Could not sort records according to the provided column.");
                }
                else {
                    this.debugLog(`SORTING DATA: [COLUMN] => ${req.query.sortByColumn}  [ASC / DESC] => not provided`);
                    res.status(200).send(result);
                }
                return;
            }
            else {
                const result = yield this.dbAccess.getSortedSpeedTestsAsync(req.query.sortByColumn, req.query.ascDesc);
                if (!result) {
                    res.status(403).send("Could not sort records according to the provided column.");
                }
                else {
                    this.debugLog(`SORTING DATA: [COLUMN] => ${req.query.sortByColumn}  [ASC / DESC] => ${req.query.ascDesc}`);
                    res.status(200).send(result);
                }
            }
            // const result = await this.dbAccess.getSortedSpeedTestsAsync(req.query.sortByColumn);
            // this.debugLog(`SORT ENTRIES BY [result.length]: ${result.length}`)
            // if (!result) {
            //     res.status(403).send("Could not sort records according to the provided column.");
            // }
            // else {
            //     res.status(200).send(result);
            // }
        });
    }
    validateNewData(object) {
        const validData = [
            "upload",
            "download",
            "provider",
            "testProvider",
            "ping",
            "datum",
            "os",
            "comment",
            "note",
        ];
        if (Object.keys(object).length != validData.length) {
            return false;
        }
        if (_.isEmpty(object)) {
            this.debugLog("Empty POST request");
            return false;
        }
        return true;
    }
    validateExistingNewData(object) {
        const validData = [
            "upload",
            "download",
            "provider",
            "testProvider",
            "ping",
            "datum",
            "os",
            "comment",
            "note",
            "uuid"
        ];
        if (Object.keys(object).length != validData.length) {
            return false;
        }
        if (_.isEmpty(object)) {
            this.debugLog("Empty POST request");
            return false;
        }
        return true;
    }
    areFieldsEmpty(data) {
        if (!data.upload || !data.download || !data.provider || !data.testProvider
            || !data.ping || !data.datum || !data.os || !data.comment || !data.note) {
            return true;
        }
        return false;
    }
    isNoteFieldAllowed(data) {
        let allowedNotes = [1, 2, 3, 4, 5];
        let flag;
        for (let index = 0; index < allowedNotes.length; index++) {
            this.debugLog(`COMPARING: ${data.note} WITH ALLOWED VALUE OF ${allowedNotes[index]} => RESULT(===) ${data.note === allowedNotes[index]}    RESULT(==) ${data.note == allowedNotes[index]}`);
            if (data.note == allowedNotes[index]) {
                return true;
            }
        }
        return false;
    }
    areNumberFieldsAllowed(data) {
        this.debugLog(`IS UPLOAD INTEGER: ${Number.isInteger(Number(data.upload))} => ${data.upload}`);
        this.debugLog(`IS DOWNLOAD INTEGER: ${Number.isInteger(Number(data.download))} => ${data.download}`);
        this.debugLog(`IS PING INTEGER: ${Number.isInteger(Number(data.ping))} => ${data.ping}`);
        if (!Number.isInteger(Number(data.upload)) || !Number.isInteger(Number(data.ping)) || !Number.isInteger(Number(data.download))) {
            return false;
        }
        return true;
    }
    isMinimumLengthCorrect(data) {
        if (data.upload.toString().length == 1 || data.download.toString().length == 1 || data.provider.toString().length == 1 || data.testProvider.toString().length == 1
            || data.ping.toString().length == 1 || data.datum.toString().length == 1 || data.os.toString().length == 1 || data.comment.toString().length == 1 || data.note.toString().length != 1) {
            return false;
        }
        return true;
    }
    isDateFieldLengthCorrect(data) {
        this.debugLog(`DATE FIELD LENGTH: ${data.datum.toString().length}`);
        if (data.datum.toString().length < 10) {
            return false;
        }
        return true;
    }
}
exports.SpeedTestController = SpeedTestController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5zcGVlZHRlc3QtY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NvbnRyb2xsZXIvdXNlci5zcGVlZHRlc3QtY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR0Esb0VBQW9GO0FBQ3BGLDhDQUFnQztBQUNoQyxrREFBMEI7QUFFMUIsa0ZBQWtGO0FBQ2xGLE1BQWEsbUJBQW1CO0lBSzVCLFlBQW1CLFFBQTZCO1FBRi9CLGFBQVEsR0FBb0IsZUFBSyxDQUFDLDJCQUEyQixDQUFDLENBQUM7UUFHNUUsSUFBSSxRQUFRLEtBQUssSUFBSSxFQUFFO1lBQ25CLHNFQUFzRTtTQUN6RTtRQUVELElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0lBQzdCLENBQUM7SUFFWSxXQUFXLENBQUMsR0FBWSxFQUFFLEdBQWE7O1lBQ2hELE1BQU0sSUFBSSxHQUFRLEdBQUcsQ0FBQyxJQUFJLENBQUM7WUFDM0IsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQzdCLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUMzQixPQUFPO2FBQ1Y7WUFFRCxNQUFNLEtBQUssR0FBaUIsSUFBSSw0QkFBWSxDQUN4QyxJQUFJLENBQUMsTUFBTSxFQUNYLElBQUksQ0FBQyxNQUFNLEVBQ1gsSUFBSSxDQUFDLFFBQVEsRUFDYixJQUFJLENBQUMsUUFBUSxFQUNiLElBQUksQ0FBQyxZQUFZLEVBQ2pCLElBQUksQ0FBQyxJQUFJLEVBQ1QsSUFBSSxDQUFDLEtBQUssRUFDVixJQUFJLENBQUMsRUFBRSxFQUNQLElBQUksQ0FBQyxPQUFPLEVBQ1osSUFBSSxDQUFDLElBQUksQ0FDWixDQUFDO1lBRUYsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUss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