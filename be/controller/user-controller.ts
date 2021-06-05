import { Request, Response } from "express";
import { UsersDbAccess } from "../db-components/db-access-users";
import { DTOUserModel, DTOUserModelWithID } from "../../sharedFolder/dto-user.model";
import debug from "debug";
import { Token } from '../../sharedFolder/token'
import { ChangeUserRequest } from '../../sharedFolder/changeUserRequest'

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
    let data = req.body as ChangeUserRequest;

    if (!await this.validateModifiedData(data)) {
        res.status(400).send(data);
        return;
        }

        console.log('DATA VALIDATED');
        
    if (await this.dbAccess.checkIfUsernameIsFreeAsync(data.newUsername)) {
        const user = new DTOUserModel(data.newUsername, data.newPassword);
        if(await this.dbAccess.updateUser(new DTOUserModelWithID(data.newUsername, data.newPassword, req.params.id)))
        {
            console.log('SHOULD HAVE SUCCEEDED');
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
                let id = await this.dbAccess.getUserIdByUsername(user.username);
                let token = new Token(id.id, user.username);
                let jsonToken = JSON.stringify(token);
                console.debug(jsonToken);
                res.status(200).send(jsonToken);
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
        console.debug("VALIDATING DATA");
        console.log(object);
        const validData: string[] = ["username", "password"];
        let resultUserName = Object.keys(object).findIndex((k) => k === validData[0]) > -1;
        let resultPassword = Object.keys(object).findIndex((k) => k === validData[1]) > -1;

        return resultUserName && resultPassword;
    }

    private async validateModifiedData(request : ChangeUserRequest) : Promise<boolean>{
        
        console.log(request);

        if (request === null || request.token.username == ''){
            return false;
        }

        let expectedID = await this.dbAccess.getUserIdByUsername(request.token.username);
        let isValid = expectedID.id == request.token.audience;

        console.log(isValid);
        return isValid;
    }
}