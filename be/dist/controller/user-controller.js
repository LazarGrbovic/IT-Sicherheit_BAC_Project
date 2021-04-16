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
exports.UserController = void 0;
const dto_user_model_1 = require("../../sharedFolder/dto/dto-user.model");
const debug_1 = __importDefault(require("debug"));
class UserController {
    constructor(dbAccess) {
        this.debugLog = debug_1.default("User-Controller");
        this.dbAccess = dbAccess;
    }
    addNewUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            if (!this.validateData(data)) {
                res.status(400).send(data);
                return;
            }
            const user = new dto_user_model_1.DTOUserModel(data.username, data.password);
            this.debugLog(`[NEW USER] NAME: ${user.getUserName()} PASSWORD: ${user.getPassword()}`);
            var result = yield this.dbAccess.addNewUser(user);
            if (!result) {
                res.status(403).send("The user already exist.");
            }
            else {
                res.status(200).send(result);
            }
        });
    }
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            this.debugLog("INSIDE UPDATE USER");
            const data = req.body;
            if (!this.validateData(data)) {
                res.status(400).send(data);
                return;
            }
            if (yield this.dbAccess.checkIfUsernameIsFreeAsync(data.username)) {
                const user = new dto_user_model_1.DTOUserModel(data.username, data.password);
                if (yield this.dbAccess.updateUser(new dto_user_model_1.DTOUserModelWithID(data.username, data.password, req.params.id))) {
                    res.status(200).send(true);
                }
                else {
                    res.status(403).send("Can not update user.");
                }
            }
            else {
                res.status(403).send("The username is already taken.");
            }
        });
    }
    verifyUserLoginAsync(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            const user = new dto_user_model_1.DTOUserModel(data.username, data.password);
            var result = yield this.dbAccess.verifyUserAsync(user.username, user.password);
            if (!result) {
                res.status(404).send("The password or the username or both is wrong.");
            }
            else {
                res.status(200).send(result);
            }
        });
    }
    getAllUsersAsync(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            this.debugLog("Starting getAllUserAsync");
            return yield this.dbAccess.retrieveAllUsersAsync();
        });
    }
    getUserIdByUsername(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.params.username == "") {
                res.status(404).send("The username can not be emtpy.");
                return;
            }
            var userNameIsFree = yield this.dbAccess.checkIfUsernameIsFreeAsync(req.params.username);
            if (userNameIsFree) {
                this.debugLog("Inside if");
                res.status(404).send("The username does not exist.");
            }
            else {
                this.debugLog("Inside else");
                res.status(200).send(yield this.dbAccess.getUserIdByUsername(req.params.username));
            }
        });
    }
    validateData(object) {
        const validData = ["username", "password"];
        let resultUserName = Object.keys(object).findIndex((k) => k === validData[0]) > -1;
        let resultPassword = Object.keys(object).findIndex((k) => k === validData[1]) > -1;
        return resultUserName && resultPassword;
    }
}
exports.UserController = UserController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vY29udHJvbGxlci91c2VyLWNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsMEVBQXlGO0FBQ3pGLGtEQUEwQjtBQUUxQixNQUFhLGNBQWM7SUFJdkIsWUFBbUIsUUFBdUI7UUFGekIsYUFBUSxHQUFvQixlQUFLLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUdsRSxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztJQUM3QixDQUFDO0lBRVksVUFBVSxDQUFDLEdBQVksRUFBRSxHQUFhOztZQUNuRCxNQUFNLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDO1lBQ3RCLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUMxQixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDM0IsT0FBTzthQUNWO1lBRUQsTUFBTSxJQUFJLEdBQUcsSUFBSSw2QkFBWSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzVELElBQUksQ0FBQyxRQUFRLENBQUMsb0JBQW9CLElBQUksQ0FBQyxXQUFXLEVBQUUsY0FBYyxJQUFJLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ3hGLElBQUksTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFbEQsSUFBSSxDQUFDLE1BQU0sRUFDUDtnQkFDSSxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO2FBQ25EO2lCQUVEO2dCQUNJLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxD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