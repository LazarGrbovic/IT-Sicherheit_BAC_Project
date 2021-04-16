import { Request, Response } from "express";
import { UsersDbAccess } from "../db-components/db-access-users";
import { DTOUserModel, DTOUserModelWithID } from "../../sharedFolder/dto-user.model";
import debug from "debug";

export class UserController {
    private readonly dbAccess: UsersDbAccess;
    private readonly debugLog: debug.IDebugger = debug("User-Controller");

    public constructor(dbAccess: UsersDbAccess) {
        this.dbAccess = dbAccess;
    }

    public async addNewUser(req: Request, res: Response) {
    const data = req.body;
    if (!this.validateData(data)) {
        res.status(400).send(data);
        return;
    }

    const user = new DTOUserModel(data.username, data.password);
    this.debugLog(`[NEW USER] NAME: ${user.getUserName()} PASSWORD: ${user.getPassword()}`);
    var result = await this.dbAccess.addNewUser(user);

    if (!result) 
        {
            res.status(403).send("The user already exist.");
        } 
    else 
        {
            res.status(200).send(result);
        }
    }

    public async updateUser(req: Request, res: Response) {
        this.debugLog("INSIDE UPDATE USER");
    const data = req.body;
    if (!this.validateData(data)) {
        res.status(400).send(data);
        return;
        }

    if (await this.dbAccess.checkIfUsernameIsFreeAsync(data.username)) {
        const user = new DTOUserModel(data.username, data.password);
        if(await this.dbAccess.updateUser(new DTOUserModelWithID(data.username, data.password, req.params.id)))
        {
            res.status(200).send(true);
        } 
        else {
            res.status(403).send("Can not update user.");    
        }
    }
    else {
        res.status(403).send("The username is already taken.");
    }   
        
    }

    public async verifyUserLoginAsync(req: Request, res: Response) {
        const data = req.body;
        const user = new DTOUserModel(data.username, data.password);

        var result = await this.dbAccess.verifyUserAsync(user.username, user.password);

        if (!result) 
            {
            res.status(404).send("The password or the username or both is wrong.");
            } 
        else 
            {
                res.status(200).send(result);
            }
    }

    public async getAllUsersAsync(req: Request, res: Response) {
        this.debugLog("Starting getAllUserAsync");
        return await this.dbAccess.retrieveAllUsersAsync()
    }

    public async getUserIdByUsername(req: Request, res: Response) {
        if (req.params.username == "") {
            res.status(404).send("The username can not be emtpy.");
            return;
        }

        var userNameIsFree = await this.dbAccess.checkIfUsernameIsFreeAsync(req.params.username)
        if (userNameIsFree) {
            this.debugLog("Inside if")
            res.status(404).send("The username does not exist.");
        }       
        
        else {
            this.debugLog("Inside else")
            res.status(200).send(await this.dbAccess.getUserIdByUsername(req.params.username));
        }
    }

    private validateData(object: any): boolean {
        const validData: string[] = ["username", "password"];
        let resultUserName = Object.keys(object).findIndex((k) => k === validData[0]) > -1;
        let resultPassword = Object.keys(object).findIndex((k) => k === validData[1]) > -1;

        return resultUserName && resultPassword;
    }
}