import { DatabaseAccess } from "./db-access";
import { r } from "rethinkdb-ts";
import { DTOUserModel, DTOUserModelWithID, DTOUserModelJustId } from "../../sharedFolder/dto-user.model";
import { exception } from "console";
import debug from "debug";
import { error } from "winston";
import { result } from "underscore";

const dbName: string = "Speed_Internet_Test_DB";

export class UsersDbAccess {
    private readonly usersTable: string = "Users";

    private readonly dataAccess: DatabaseAccess;

    private readonly debugLog: debug.IDebugger = debug("Database-Access-Users");

    public constructor(dataAccess: DatabaseAccess) {
        if (dataAccess === null) {
            throw new Error("The data access cannot be null.");
        }

        this.dataAccess = dataAccess;
    }

    public async initUserAccessAsync() {
        this.debugLog("Started initalization of initUserAccessAsync");
        return await this.dataAccess.createTable(this.usersTable);
    }

    public async updateUserAsync(user : DTOUserModelWithID) : Promise<boolean>{              
        this.debugLog(`Inside updateMethod =>    id = ${user.id}`)                
        var result = await r.table(this.usersTable).get(user.id).update(user).run(this.dataAccess.getConnection());
        if(result.replaced < 1){
            return false;
        }

        return true;
    }

    public async addNewUser(user: DTOUserModel): Promise<boolean> {
        if (user === null) {
            throw new Error("The user cannnot be null.");
        }

        var valid = await this.checkIfUsernameIsFreeAsync(user.getUserName());
        if (!valid) {
            return false;
        }

        const data = { username: user.getUserName(), password: user.getPassword()};
        const result = await r
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
    }

    public async getUserById(id: string) : Promise<DTOUserModel> {
        let userId!: DTOUserModelWithID;
        const user = await r.table(this.usersTable).filter({"id": id}).run(this.dataAccess.getConnection());
        const userString: string = JSON.stringify(user);
        var userObj = JSON.parse(userString);
        
        const username = Object.values(userObj[0]).toString()
        const password = Object.values(userObj[1]).toString()        
        
        
        return new DTOUserModel(username, password);;
    }

    public async getUserIdByUsername(username: string) : Promise<DTOUserModelJustId> {
        this.debugLog(`1. Searching for the ID of "${username}"`)
        
        let userId!: DTOUserModelJustId;
        
        const user = await r.table(this.usersTable).filter({"username": username}).pluck("id").run(this.dataAccess.getConnection());
                
        const userString: string = JSON.stringify(user);
        var userObj = JSON.parse(userString);
                       
        userId = new DTOUserModelJustId(Object.values(userObj[0]).toString());
        
        this.debugLog(userId.id);
        return userId;        
    }
    
    public async updateUser(user: DTOUserModelWithID) {
        console.log('ATTEMPTING TO UPDATE USER.');
        this.debugLog(`Updating user NEW USERNAME: ${user.username}`)
        this.debugLog(`Updating user NEW PASSWORD: ${user.password}`)
        this.debugLog(`Updating user NEW ID: ${user.id}`)
        var valid = await this.checkIfUsernameIsFreeAsync(user.getUserName());
        if (!valid) {
            return false;
        }

        var result = await r.table(this.usersTable).get(user.id).update(user).run(this.dataAccess.getConnection());
        if(result.replaced < 1){
            return false;
        }

        return true;
    }    

    public async verifyUserAsync(name: string, password:string): Promise<boolean> 
    {
        const users: DTOUserModel[] = await this.retrieveAllUsersAsync();
        let isValid = false;
        users.forEach((user) => {
            if (user.username === name && password === user.password) {
                isValid = true;
                return;
        }
    });

    return isValid;
    }

    public async checkIfUsernameIsFreeAsync(username: string): Promise<boolean> {
        console.log('CHECK IF USERNAME IS AVAILABLE');

        const users: DTOUserModel[] = await this.retrieveAllUsersAsync();
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
        this.debugLog(`Is valid: ${isValid}`)
        return isValid;
    }

        
    public async retrieveAllUsersAsync(): Promise<DTOUserModel[]> {
        const users = await r
            .db(dbName)
            .table(this.usersTable)
            .run(this.dataAccess.getConnection());

        const userdtos = this.convertToDto(users);
        this.debugLog("retrieveAllUsersAsyncFinished()");
        return userdtos;
    }

    
    private convertToDto(data: any[]): DTOUserModel[] {
        this.debugLog("convertToDto");
        const dtos: DTOUserModel[] = [];
        // username or name here ??? 
        data.forEach((entry: { username: string; password: string }) => {
            var user = new DTOUserModel(entry.username, entry.password);
            dtos.push(user);
        });

        this.debugLog("Converted to DTO");
        return dtos;
    }
    
}