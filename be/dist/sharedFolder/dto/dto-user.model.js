"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DTOUserModelJustId = exports.DTOUserModelWithID = exports.DTOUserModel = void 0;
class DTOUserModel {
    // Property token: string;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHRvLXVzZXIubW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zaGFyZWRGb2xkZXIvZHRvL2R0by11c2VyLm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLE1BQWEsWUFBWTtJQUdyQiwwQkFBMEI7SUFFMUIsWUFBb0IsUUFBZ0IsRUFBRSxRQUFnQjtRQUU5QyxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6QixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztJQUM3QixDQUFDO0lBRUUsV0FBVztRQUNkLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN6QixDQUFDO0lBR00sV0FBVztRQUNkLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN6QixDQUFDO0NBS0g7QUF2QkYsb0NBdUJFO0FBRUQsTUFBYSxrQkFBa0I7SUFLNUIsWUFBb0IsUUFBZ0IsRUFBRSxRQUFnQixFQUFFLEVBQVU7UUFFMUQsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDekIsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDekIsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7SUFDakIsQ0FBQztJQUVFLFdBQVc7UUFDZCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDekIsQ0FBQztJQUdNLFdBQVc7UUFDZCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDekIsQ0FBQztDQUtIO0FBeEJELGdEQXdCQztBQUVELE1BQWEsa0JBQWtCO0lBRzVCLFlBQW9CLEVBQVU7UUFFdEIsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7SUFDakIsQ0FBQztDQUtQO0FBWEQsZ0RBV0MifQ==