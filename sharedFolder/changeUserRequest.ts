import {Token} from '../sharedFolder/token'

export class ChangeUserRequest{
    readonly token : Token
    readonly newUsername : string
    readonly newPassword : string

    constructor(token : Token, newUsername : string, newPassword : string){
        this.token = token;
        this.newUsername = newUsername;
        this.newPassword = newPassword;
    }
}