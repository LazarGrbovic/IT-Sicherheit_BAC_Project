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
exports.UsersDbAccess = void 0;
const rethinkdb_ts_1 = require("rethinkdb-ts");
const dto_user_model_1 = require("../../sharedFolder/dto-user.model");
const debug_1 = __importDefault(require("debug"));
const dbName = "Speed_Internet_Test_DB";
class UsersDbAccess {
    constructor(dataAccess) {
        this.usersTable = "Users";
        this.debugLog = debug_1.default("Database-Access-Users");
        if (dataAccess === null) {
            throw new Error("The data access cannot be null.");
        }
        this.dataAccess = dataAccess;
    }
    initUserAccessAsync() {
        return __awaiter(this, void 0, void 0, function* () {
            this.debugLog("Started initalization of initUserAccessAsync");
            return yield this.dataAccess.createTable(this.usersTable);
        });
    }
    updateUserAsync(user) {
        return __awaiter(this, void 0, void 0, function* () {
            this.debugLog(`Inside updateMethod =>    id = ${user.id}`);
            var result = yield rethinkdb_ts_1.r.table(this.usersTable).get(user.id).update(user).run(this.dataAccess.getConnection());
            if (result.replaced < 1) {
                return false;
            }
            return true;
        });
    }
    addNewUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            if (user === null) {
                throw new Error("The user cannnot be null.");
            }
            var valid = yield this.checkIfUsernameIsFreeAsync(user.getUserName());
            if (!valid) {
                return false;
            }
            const data = { username: user.getUserName(), password: user.getPassword() };
            const result = yield rethinkdb_ts_1.r
                .db(dbName)
                .table(this.usersTable)
                .insert(data)
                .run(this.dataAccess.getConnection());
            if (result.inserted < 1) {
                this.debugLog("User could not be inserted");
                return false;
            }
            this.debugLog(`User inserted NAME: ${user.getUserName()} PASSWORD: ${user.getPassword()}`);
            return true;
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let userId;
            const user = yield rethinkdb_ts_1.r.table(this.usersTable).filter({ "id": id }).run(this.dataAccess.getConnection());
            const userString = JSON.stringify(user);
            var userObj = JSON.parse(userString);
            const username = Object.values(userObj[0]).toString();
            const password = Object.values(userObj[1]).toString();
            return new dto_user_model_1.DTOUserModel(username, password);
            ;
        });
    }
    getUserIdByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            this.debugLog(`1. Searching for the ID of "${username}"`);
            let userId;
            const user = yield rethinkdb_ts_1.r.table(this.usersTable).filter({ "username": username }).pluck("id").run(this.dataAccess.getConnection());
            const userString = JSON.stringify(user);
            var userObj = JSON.parse(userString);
            userId = new dto_user_model_1.DTOUserModelJustId(Object.values(userObj[0]).toString());
            this.debugLog(userId.id);
            return userId;
        });
    }
    updateUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            this.debugLog(`Updating user NEW USERNAME: ${user.username}`);
            this.debugLog(`Updating user NEW PASSWORD: ${user.password}`);
            this.debugLog(`Updating user NEW ID: ${user.id}`);
            var valid = yield this.checkIfUsernameIsFreeAsync(user.getUserName());
            if (!valid) {
                return false;
            }
            var result = yield rethinkdb_ts_1.r.table(this.usersTable).get(user.id).update(user).run(this.dataAccess.getConnection());
            if (result.replaced < 1) {
                return false;
            }
            return true;
        });
    }
    verifyUserAsync(name, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.retrieveAllUsersAsync();
            let isValid = false;
            users.forEach((user) => {
                if (user.username === name && password === user.password) {
                    isValid = true;
                    return;
                }
            });
            return isValid;
        });
    }
    checkIfUsernameIsFreeAsync(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.retrieveAllUsersAsync();
            let isValid = true;
            users.forEach((user) => {
                this.debugLog(`ITERATING USER => NAME: ${user.getUserName()} PASSWORD: ${user.getPassword()}`);
                if (user.getUserName() === username) {
                    this.debugLog(`Checking [SAVED USER] NAME: ${user.getUserName()} PASSWORD: ${user.getPassword()}`);
                    this.debugLog(`Checking [NEW USER] NAME: ${username}`);
                    isValid = false;
                    return;
                }
            });
            this.debugLog(`Is valid: ${isValid}`);
            return isValid;
        });
    }
    retrieveAllUsersAsync() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield rethinkdb_ts_1.r
                .db(dbName)
                .table(this.usersTable)
                .run(this.dataAccess.getConnection());
            const userdtos = this.convertToDto(users);
            this.debugLog("retrieveAllUsersAsyncFinished()");
            return userdtos;
        });
    }
    convertToDto(data) {
        this.debugLog("convertToDto");
        const dtos = [];
        // username or name here ??? 
        data.forEach((entry) => {
            var user = new dto_user_model_1.DTOUserModel(entry.username, entry.password);
            dtos.push(user);
        });
        this.debugLog("Converted to DTO");
        return dtos;
    }
}
exports.UsersDbAccess = UsersDbAccess;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGItYWNjZXNzLXVzZXJzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vZGItY29tcG9uZW50cy9kYi1hY2Nlc3MtdXNlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsK0NBQWlDO0FBQ2pDLHNFQUF5RztBQUV6RyxrREFBMEI7QUFJMUIsTUFBTSxNQUFNLEdBQVcsd0JBQXdCLENBQUM7QUFFaEQsTUFBYSxhQUFhO0lBT3RCLFlBQW1CLFVBQTBCO1FBTjVCLGVBQVUsR0FBVyxPQUFPLENBQUM7UUFJN0IsYUFBUSxHQUFvQixlQUFLLENBQUMsdUJBQXVCLENBQUMsQ0FBQztRQUd4RSxJQUFJLFVBQVUsS0FBSyxJQUFJLEVBQUU7WUFDckIsTUFBTSxJQUFJLEtBQUssQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO1NBQ3REO1FBRUQsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7SUFDakMsQ0FBQztJQUVZLG1CQUFtQjs7WUFDNUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyw4Q0FBOEMsQ0FBQyxDQUFDO1lBQzlELE9BQU8sTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDOUQsQ0FBQztLQUFBO0lBRVksZUFBZSxDQUFDLElBQXlCOztZQUNsRCxJQUFJLENBQUMsUUFBUSxDQUFDLGtDQUFrQyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQTtZQUMxRCxJQUFJLE1BQU0sR0FBRyxNQUFNLGdCQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDO1lBQzNHLElBQUcsTUFBTSxDQUFDLFFBQVEsR0FBRyxDQUFDLEVB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