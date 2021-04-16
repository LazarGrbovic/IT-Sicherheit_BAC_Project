import { exception, table } from "console";

// Types for the database.
import {
Connection,
RValue
} from "rethinkdb-ts/lib/types";    

// Rethink db access
import { r } from "rethinkdb-ts";

// Debug tool
import debug from "debug";

export class DatabaseAccess {
    private readonly port: number;
    private readonly host: string;
    private readonly databaseName: string;
    private dbConnection: Connection;
    private readonly debubLog: debug.IDebugger = debug("Database-Access");

    public constructor(
        host: string,
        port: number,
        databaseName: string) 
    {
        if (host === null) 
        {            
            throw new Error("The connection cannot be null."); 
        }

        if (databaseName == null) 
        {
            throw new Error("The database cannot be null.");
        }

        this.host = host;
        this.port = port;
        this.databaseName = databaseName;
    }

    public getConnection() : Connection 
    {
     return this.dbConnection;
    }

    // Initialize all relevant components for the database access.
    public async initAsync(): Promise<void> {
        this.dbConnection = await r.connect({ host: this.host, port: this.port, db: this.databaseName });        
        this.debubLog("Connection to the database established.");
        await this.CreateDatabase();
        return 
    }

    // Create the database if it does not exist.
    protected async CreateDatabase(): Promise<void> {
        r.dbList()
            .contains(this.databaseName)
            .do((containsDb: RValue<boolean>) => {
            // At this point we are checking if the database exist. If not we create it.
            this.debubLog(`The database ${this.databaseName} was created.`);
            return r.branch(
                containsDb,
                { created: 0 },
                r.dbCreate(this.databaseName)
            );
        })
  .run(this.dbConnection);
    }

    // Creates the tables in the case they do not exist.
    public async createTable(tableName: string): Promise<void> {
        r.db(this.databaseName)
            .tableList()
            .contains(tableName)
            .do((containsTable: RValue<boolean>) => {
            // At this point we are checking if the database exist. If not we create it.
            this.debubLog(`The table ${tableName} was created or exists.`);

            return r.branch(
            containsTable,
                { created: 0 },
            r.db(this.databaseName).tableCreate(tableName)
            );
        })
    .run(this.dbConnection);
    }
}