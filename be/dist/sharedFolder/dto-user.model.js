"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DTOUserModelJustId = exports.DTOUserModelWithID = exports.DTOUserModel = void 0;
class DTOUserModel {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }
    getUserName() {
        return this.username;
    }
    getPassword() {
        return this.password;
    }
}
exports.DTOUserModel = DTOUserModel;
class DTOUserModelWithID {
    constructor(username, password, id) {
        this.username = username;
        this.password = password;
        this.id = id;
    }
    getUserName() {
        return this.username;
    }
    getPassword() {
        return this.password;
    }
}
exports.DTOUserModelWithID = DTOUserModelWithID;
class DTOUserModelJustId {
    constructor(id) {
        this.id = id;
    }
}
exports.DTOUserModelJustId = DTOUserModelJustId;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHRvLXVzZXIubW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zaGFyZWRGb2xkZXIvZHRvLXVzZXIubW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsTUFBYSxZQUFZO0lBSXJCLFlBQW9CLFFBQWdCLEVBQUUsUUFBZ0I7UUFFOUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDekIsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7SUFDN0IsQ0FBQztJQUVFLFdBQVc7UUFDZCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDekIsQ0FBQztJQUdNLFdBQVc7UUFDZCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDekIsQ0FBQztDQUNIO0FBbEJGLG9DQWtCRTtBQUVELE1BQWEsa0JBQWtCO0lBSzVCLFlBQW9CLFFBQWdCLEVBQUUsUUFBZ0IsRUFBRSxFQUFVO1FBRTFELElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO0lBQ2pCLENBQUM7SUFFRSxXQUFXO1FBQ2QsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3pCLENBQUM7SUFHTSxXQUFXO1FBQ2QsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3pCLENBQUM7Q0FDSDtBQXBCRCxnREFvQkM7QUFFRCxNQUFhLGtCQUFrQjtJQUc1QixZQUFvQixFQUFVO1FBRXRCLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO0lBQ2pCLENBQUM7Q0FDUDtBQVBELGdEQU9DIn0=