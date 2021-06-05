export class Token{
    readonly expiration : Date;
    readonly audience : string;
    readonly issuer : string;
    readonly username : string;

    constructor(audience:string, username:string){
        this.expiration = new Date(new Date().getTime() + 10 * 60000);
        this.audience = audience;
        this.issuer = "localhost:3000";
        this.username = username;
    }
}