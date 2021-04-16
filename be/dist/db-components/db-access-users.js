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
const dto_user_model_1 = require("../../sharedFolder/dto/dto-user.model");
const debug_1 = __importDefault(require("debug"));
const dbName = "Speed_Internet_Test_DB";
class UsersDbAccess {
    constructor(dataAccess) {
        this.usersTable = "Users";
        this.debugLog = debug_1.default("Database-Access-Users");
        if (dataAccess === null) {
            // throw new exception("The data access cannot be null.");
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
                // throw new exception("The user cannnot be null.");
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
            // const users = await r
            //     .db(dbName)
            //     .table(this.usersTable)
            //     .run(this.dataAccess.getConnection());
            const user = yield rethinkdb_ts_1.r.table(this.usersTable).filter({ "username": username }).pluck("id").run(this.dataAccess.getConnection());
            // return await r.table(this.usersTable).filter({"username" : username}).pluck("id").run(this.dataAccess.getConnection());
            // this.debugLog(`2. user from r.table => ${user}`);
            // this.debugLog(`3. JSON.stringify(user) => ${JSON.stringify(user)}`);
            const userString = JSON.stringify(user);
            var userObj = JSON.parse(userString);
            // this.debugLog(obj3);
            // this.debugLog(Object.values(obj3)[0]);
            // this.debugLog(Object.values(obj3[0]));        
            userId = new dto_user_model_1.DTOUserModelJustId(Object.values(userObj[0]).toString());
            this.debugLog(userId.id);
            return userId;
            // var obj2 = {name: "Jeeva", age: "22", gender: "Male"}        
            // this.debugLog(Object.keys(JSON.parse(JSON.stringify(user))));
            // // const js = JSON.stringify(user);
            // const userModelString = new DTOUserModelJustId(JSON.parse(JSON.stringify(user))) ;
            // this.debugLog(`4. JSON.parse(JSON.stringify(user)) => ${userModelString}`);
            // let obj: DTOUserModelJustId = userModelString;
            // // return new Promise(obj);
            // this.debugLog(`5. ${obj.id}`);
            // this.debugLog(`6. ${obj}`);
            // // this.debugLog(userModelString[0]);
            // const um: DTOUserModelJustId = userModelString as DTOUserModelJustId;
            // this.debugLog(`7. ${um.id}`);
            // this.debugLog(`8. ${um}`);
            // return userModelString;
            // user.forEach((entry: { id: string }) => {
            //     var user = new DTOUserModel(entry.username, entry.password);
            //     dtos.push(user);
            // });
            // return new DTOUserModelJustId(JSON.stringify(user.toString()));
            // this.debugLog(user);
            // const userdtos = this.convertToDtoWithId(users);
            // userdtos.forEach(element => {
            //     if (element.username == username) {
            //         this.debugLog(`User found! => ${element.id}`)
            //         id = new DTOUserModelJustId(element.id); 
            //     }
            // });     
            // this.debugLog(`New id object created ${id.id}`)    
            // return id;        
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
    // public async checkIfIdExists(id: string): Promise<boolean> {
    //     const users: DTOUserModelWithID[] = await this.retrieveAllUsersWithIdAsync();
    //     let isValid = false;
    //     users.forEach((user) => {
    //         this.debugLog(`ITERATING USER => NAME: ${user.getUserName()} PASSWORD: ${user.getPassword()}`);
    //         if (user.id == id) {              
    //             isValid = true;
    //             return;
    //         }
    //     });
    // this.debugLog(`Count of retrieveAllUsersAsync: ${users.length}`);    
    // this.debugLog("checkUserAsync()");
    // return isValid;
    // }
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
    // public async retrieveAllUsersWithIdAsync(): Promise<DTOUserModelWithID[]> {
    //     const users = await r
    //         .db(dbName)
    //         .table(this.usersTable)
    //         .run(this.dataAccess.getConnection());
    //     const userdtos = this.convertToDtoWithId(users);
    //     this.debugLog("retrieveAllUsersAsyncFinished()");
    //     return userdtos;
    // }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGItYWNjZXNzLXVzZXJzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vZGItY29tcG9uZW50cy9kYi1hY2Nlc3MtdXNlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsK0NBQWlDO0FBQ2pDLDBFQUE2RztBQUU3RyxrREFBMEI7QUFJMUIsTUFBTSxNQUFNLEdBQVcsd0JBQXdCLENBQUM7QUFFaEQsTUFBYSxhQUFhO0lBT3RCLFlBQW1CLFVBQTBCO1FBTjVCLGVBQVUsR0FBVyxPQUFPLENBQUM7UUFJN0IsYUFBUSxHQUFvQixlQUFLLENBQUMsdUJBQXVCLENBQUMsQ0FBQztRQUd4RSxJQUFJLFVBQVUsS0FBSyxJQUFJLEVBQUU7WUFDckIsMERBQTBEO1NBQzdEO1FBRUQsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7SUFDakMsQ0FBQztJQUVZLG1CQUFtQjs7WUFDNUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyw4Q0FBOEMsQ0FBQyxDQUFDO1lBQzlELE9BQU8sTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDOUQsQ0FBQztLQUFBO0lBRVksZUFBZSxDQUFDLElBQXlCOztZQUNsRCxJQUFJLENBQUMsUUFBUSxDQUFDLGtDQUFrQyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQTtZQUMxRCxJQUFJLE1BQU0sR0FBRyxNQUFNLGdCQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDO1lBQzNHLElBQUcsTUFBTSxDQUFDLFFBQVEsR0FBRyxDQUFDLEVBQUM7Z0JBQ25CLE9BQU8sS0FBSyxDQUFDO2FBQ2hCO1lB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