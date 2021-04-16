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
            const entry = new dto_speedtest_1.DTOSpeedTest(data.upload, data.download, data.provider, data.testProvider, data.ping, data.datum, data.os, data.comment, data.note);
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
            const entry = new dto_speedtest_1.DTOSpeedTest(data.upload, data.download, data.provider, data.testProvider, data.ping, data.datum, data.os, data.comment, data.note);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5zcGVlZHRlc3QtY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NvbnRyb2xsZXIvdXNlci5zcGVlZHRlc3QtY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR0Esb0VBQW9GO0FBQ3BGLDhDQUFnQztBQUNoQyxrREFBMEI7QUFFMUIsa0ZBQWtGO0FBQ2xGLE1BQWEsbUJBQW1CO0lBSzVCLFlBQW1CLFFBQTZCO1FBRi9CLGFBQVEsR0FBb0IsZUFBSyxDQUFDLDJCQUEyQixDQUFDLENBQUM7UUFHNUUsSUFBSSxRQUFRLEtBQUssSUFBSSxFQUFFO1lBQ25CLHNFQUFzRTtTQUN6RTtRQUVELElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0lBQzdCLENBQUM7SUFFWSxXQUFXLENBQUMsR0FBWSxFQUFFLEdBQWE7O1lBQ2hELE1BQU0sSUFBSSxHQUFRLEdBQUcsQ0FBQyxJQUFJLENBQUM7WUFDM0IsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQzdCLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUMzQixPQUFPO2FBQ1Y7WUFFRCxNQUFNLEtBQUssR0FBaUIsSUFBSSw0QkFBWSxDQUN4QyxJQUFJLENBQUMsTUFBTSxFQUNYLElBQUksQ0FBQyxRQUFRLEVBQ2IsSUFBSSxDQUFDLFFBQVEsRUFDYixJQUFJLENBQUMsWUFBWSxFQUNqQixJQUFJLENBQUMsSUFBSSxFQUNULElBQUksQ0FBQyxLQUFLLEVBQ1YsSUFBSSxDQUFDLEVBQUUsRUFDUCxJQUFJLENBQUMsT0FBTyxFQUNaLElBQUksQ0FBQyxJQUFJLENBQ1osQ0FBQztZQUVGLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDNUIsR0FB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