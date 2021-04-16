import { DatabaseAccess } from "./db-access";
import { r } from 'rethinkdb-ts';
import { exception } from "console";
import { DTOSpeedTest, DTOSpeedTestWithID } from "../../sharedFolder/dto-speedtest";
import { v4 as uuidv4} from "uuid";
import debug from "debug";

const dbName : string = 'Speed_Internet_Test_DB';

export class SpeedTestDataAccess {
    private readonly speedTestTable : string = 'Speed_Test_Data';
    private readonly dataAccess : DatabaseAccess;
    private readonly debugLog: debug.IDebugger = debug("Database-Access-SpeedTest");

    public constructor (dataAccess : DatabaseAccess) {

        if(dataAccess === null){
            throw new Error('The data access cannot be null.');
        }

        this.dataAccess = dataAccess;
    }

    public async initSpeedTestDataAccess () {
        return await this.dataAccess.createTable(this.speedTestTable);
    }

    public async getSpeedTestsAsync() : Promise<DTOSpeedTestWithID[]>{

        return await r.table(this.speedTestTable).run(this.dataAccess.getConnection());        
    }

    public async getSpeedTestById(id: string) : Promise<DTOSpeedTestWithID> {        
        const stringId = '"' + id + '"';
        this.debugLog(`Getting speed test by id: "${id}"`);
        this.debugLog(`Getting speed test by concatenatedId: ${stringId}`);        
        return await r.table(this.speedTestTable).get(stringId).run(this.dataAccess.getConnection());
    }
    
    public async checkIfSpeedTestExists(id: string) : Promise<boolean> {
        const entries: DTOSpeedTestWithID[] = await this.getSpeedTestsAsync();
        entries.forEach((entry) => {
            if (entry.id == id) {
                return true;
            }
        })

        return false;
    }

    public async getSortedSpeedTestsAsync(column: any, order: string): Promise<DTOSpeedTestWithID[]> {

        if (column == "default") {
            this.debugLog("ORDER BY COLUMN: default column")
            return await r.table(this.speedTestTable).run(this.dataAccess.getConnection());
        }
        else{
            this.debugLog(`ORDER BY COLUMN: ${column}`)
            if (order == "asc") {
                return await r.table(this.speedTestTable).orderBy(r.asc(column)).run(this.dataAccess.getConnection());    
            }
            else {
                return await r.table(this.speedTestTable).orderBy(r.desc(column)).run(this.dataAccess.getConnection());    
            }
        }      
        
    }

    public async addSpeedtestAsync(speedTestEntry : DTOSpeedTest) : Promise<boolean>{      
        
        this.debugLog("Adding new entry");
        var result = await r.table(this.speedTestTable).insert(speedTestEntry).run(this.dataAccess.getConnection());
        if(result.inserted < 1){
            return false;
        }

        return true;
    }

    public async updateSpeedTestAsync(speedTestEntryWithID : DTOSpeedTestWithID) : Promise<boolean>{              
        this.debugLog(`Inside updateMethod =>    id = ${speedTestEntryWithID.id}`)                
        var result = await r.table(this.speedTestTable).get(speedTestEntryWithID.id).update(speedTestEntryWithID).run(this.dataAccess.getConnection());
        if(result.replaced < 1){
            return false;
        }

        return true;
    }

    public async deleteSpeedTestAsync(id: string) : Promise<boolean> {
        this.debugLog(`Inside delete method =>    id = ${id}`)                
        var result = await r.table(this.speedTestTable).get(id).delete().run(this.dataAccess.getConnection());

        if (result.deleted < 1) {
            return false;
        }

        return true;
    }
}