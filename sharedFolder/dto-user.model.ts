export class DTOUserModel {
    username: string;
    password: string;   

    public constructor (username: string, password: string) 
        { 
            this.username = username;
            this.password = password;
        }

    public getUserName() : string {
        return this.username;
    }

    
    public getPassword() : string {
        return this.password;
    }   
 }

 export class DTOUserModelWithID {
    username: string;
    password: string;
    newPassword: string;
    id: string;

    public constructor (username: string, password: string, id: string, newPassword: string = "") 
        { 
            this.username = username;
            this.password = password;
            this.id = id;
            this.newPassword = newPassword;
        }

    public getUserName() : string {
        return this.username;
    }

    
    public getPassword() : string {
        return this.password;
    }    
 }

 export class DTOUserModelJustId {    
    id: string;

    public constructor (id: string) 
        {             
            this.id = id;
        }       
 }