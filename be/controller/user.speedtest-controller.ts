import { exception } from "console";
import { SpeedTestDataAccess } from "../db-components/db-access-speedtest";
import { Request, Response } from "express";
import { DTOSpeedTest, DTOSpeedTestWithID } from "../../sharedFolder/dto-speedtest";
import * as _ from "underscore";
import debug from "debug";

// Defines the controller for managing requests concerning the pool diary entries.
export class SpeedTestController {
    private readonly dbAccess: SpeedTestDataAccess;

    private readonly debugLog: debug.IDebugger = debug("User.SpeedTest-Controller");

    public constructor(dbAccess: SpeedTestDataAccess) {
        if (dbAccess === null) {
            // throw new exception("The access for the database cannot be null.");
        }

        this.dbAccess = dbAccess;
    }

    public async addNewEntry(req: Request, res: Response) {
        const data: any = req.body;

console.log(data);

        if (!this.validateNewData(data)) {
            console.log('validation failed');
            res.status(400).send(data);
            return;
        }

        // console.log('field note not allowed');

        // const entry: DTOSpeedTest = new DTOSpeedTest(
        //     data.userId,
        //     data.upload,
        //     data.download,
        //     data.provider,
        //     data.testProvider,
        //     data.ping,
        //     data.datum,
        //     data.os,
        //     data.comment,
        //     data.note
        // );

        if (this.areFieldsEmpty(data)) {
            console.log('fields empty');
            res.status(400).send("Some of the fields are empty!");
            return;
        }

        if (!this.isNoteFieldAllowed(data)) {
            console.log('field note not allowed');

            res.status(400).send("Note value not allowed! Allowed values: [1 2 3 4 5]");
            return;
        }

        if (!this.areNumberFieldsAllowed(data)) {
            console.log('fields number not allowed');

            res.status(400).send("Some of the field numbers are not integers!");
            return;
        }

        if (!this.isDateFieldLengthCorrect(data)) {
            console.log('field date not allowed');

            res.status(400).send("Date field is not correct!");
            return;
        }

        if (!this.isMinimumLengthCorrect(data)) {
            console.log('minimum length note not allowed');

            res.status(400).send("No field except 'note' can have length of 1!");
            return;
        }      
        
        console.log('trying to call addSpeedTest');
        var result = await this.dbAccess.addSpeedtestAsync(data);

        if (!result) {
            console.log('could not add');

            res.status(403).send("Could not add the entry.");
        } else {
            res.status(200).send(result);
        }
    }

    public async updateEntry(req: Request, res: Response) {
        const data: any = req.body;
        const id: string = req.params.speedTestId;
        if (!this.validateNewData(data)) {
            res.status(400).send(data);
            return;
        }

        const entry: DTOSpeedTest = new DTOSpeedTest(
            data.userId,
            data.upload,
            data.download,
            data.provider,
            data.testProvider,
            data.ping,
            data.datum,
            data.os,
            data.comment,
            data.note
        );        

        if (this.areFieldsEmpty(entry)) {
            res.status(400).send("Some of the fields are empty!");
            return;
        }

        if (!this.isNoteFieldAllowed(entry)) {
            res.status(400).send("Note value not allowed! Allowed values: [1 2 3 4 5]");
            return;
        }

        if (!this.areNumberFieldsAllowed(entry)) {
            res.status(400).send("Some of the field numbers are not integers!");
            return;
        }

        if (!this.isDateFieldLengthCorrect(entry)) {
            res.status(400).send("Date field is not correct!");
            return;
        }

        if (!this.isMinimumLengthCorrect(entry)) {
            res.status(400).send("No field except 'note' can have length of 1!");
            return;
        }

        let doesExist = false;

        const tests = this.dbAccess.getSpeedTestsAsync();
        (await tests).forEach(item => {
            if (item.id == id) {
                doesExist = true;
            }
        })

        if (!doesExist) {
            res.status(400).send("No such entry with that ID!");
            return;
        }

        const entryWithID: DTOSpeedTestWithID = new DTOSpeedTestWithID(
            entry, id
        );

        this.debugLog(`update() => id ${id}`);
        var result = await this.dbAccess.updateSpeedTestAsync(entryWithID);

        if (!result) {
            res.status(403).send("Could not add the entry.");
        } else {
            res.status(200).send(result);
        }
    }

    public async deleteEntry(req: Request, res: Response) {
        let doesExist = false;

        const id: string = req.params.speedTestId;
        const tests = this.dbAccess.getSpeedTestsAsync();
        (await tests).forEach(item => {
            if (item.id == id) {
                doesExist = true;
            }
        })

        if (!doesExist) {
            res.status(400).send("No such entry with that ID!");
            return;
        }

        var result = await this.dbAccess.deleteSpeedTestAsync(id);

        if (!result) {
            res.status(403).send("Could not delete the entry.");
        } else {
            res.status(200).send(result);
        }
    }

    public async getAllEntriesData(req: Request, res: Response) {
        let id = req.params.userID;
        const result = await this.dbAccess.getSpeedTestsByUserIDAsync(id);

        res.status(200).send(result);
    }

    public async getEntryById(req: Request, res: Response) {
        const id: string = req.params.speedTestId;

        if (!id || id == "" || id == null) {
            res.status(400).send("ID parameter can not be empty!");
            return;
        }

        if (this.dbAccess.checkIfSpeedTestExists(id)) {
            this.debugLog(`Speed test with id: ${id} exists`)
            return this.dbAccess.getSpeedTestById(id);
        }
        else {
            res.status(400).send("No such entry with that ID!");
        }

    //    const entry = this.dbAccess.getSpeedTestById(id);
    //    return entry;
    //     if (!entry) {
    //         res.status(400).send("No such entry with that ID!");
    //     }
    //     else {
    //         return entry;
    //     }
    }

    public async getSortedEntries(req: Request, res: Response) {
        if (req.query.sortByColumn == "" || req.query.sortByColumn == undefined || req.query.sortByColumn == null || req.query.sortByColumn.length == 0) {
            res.status(403).send("Invalid Column Parameter");
            return;
        }

        if ((req.query.ascDesc == "" || req.query.ascDesc == undefined || req.query.ascDesc == null || req.query.ascDesc.length == 0) || (req.query.ascDesc != "asc" && req.query.ascDesc != "desc")) {
            const result = await this.dbAccess.getSortedSpeedTestsAsync(req.query.sortByColumn, "asc");
            if (!result) {
                res.status(403).send("Could not sort records according to the provided column.");
            }
            else {
                this.debugLog(`SORTING DATA: [COLUMN] => ${req.query.sortByColumn}  [ASC / DESC] => not provided`)
                res.status(200).send(result);
            }

            return; 
        }
        else{
            const result = await this.dbAccess.getSortedSpeedTestsAsync(req.query.sortByColumn, req.query.ascDesc);
            if (!result) {
                res.status(403).send("Could not sort records according to the provided column.");
            }
            else {
                this.debugLog(`SORTING DATA: [COLUMN] => ${req.query.sortByColumn}  [ASC / DESC] => ${req.query.ascDesc}`)
                res.status(200).send(result);
            }
        }

        // const result = await this.dbAccess.getSortedSpeedTestsAsync(req.query.sortByColumn);
        // this.debugLog(`SORT ENTRIES BY [result.length]: ${result.length}`)

        // if (!result) {
        //     res.status(403).send("Could not sort records according to the provided column.");
        // }
        // else {
        //     res.status(200).send(result);
        // }
    } 

    private validateNewData(object: any): boolean {
        const validData: string[] = [
            "userID",
            "upload",
            "download",
            "provider",
            "testProvider",
            "ping",
            "datum",
            "os",
            "comment",
            "note",
        ];

        if(Object.keys(object).length != validData.length){
            return false;
        }

        if (_.isEmpty(object)) {
            this.debugLog("Empty POST request");
            return false;
        }

        return true;
    }

    private validateExistingNewData(object: any): boolean {
        const validData: string[] = [
            "upload",
            "download",
            "provider",
            "testProvider",
            "ping",
            "datum",
            "os",
            "comment",
            "note",
            "uuid"
        ];

        if(Object.keys(object).length != validData.length){
            return false;
        }

        if (_.isEmpty(object)) {
            this.debugLog("Empty POST request");
            return false;
        }

        return true;
    }

    private areFieldsEmpty(data: DTOSpeedTest ) : boolean {
        if (!data.upload || !data.download || !data.provider || !data.testProvider
            || !data.ping || !data.datum || !data.os || !data.comment || !data.note) {                
            return true;            
        }

        return false;
    }

    private isNoteFieldAllowed(data: DTOSpeedTest) : boolean {
        let allowedNotes: number[] = [1, 2, 3, 4, 5];
        let flag: boolean;
        for (let index = 0; index < allowedNotes.length; index++) {
            this.debugLog(`COMPARING: ${data.note} WITH ALLOWED VALUE OF ${allowedNotes[index]} => RESULT(===) ${data.note === allowedNotes[index]}    RESULT(==) ${data.note == allowedNotes[index]}`);
            if (data.note == allowedNotes[index]) {
                
                return true;
            }
            
        }

        return false;        
    }

    private areNumberFieldsAllowed(data: DTOSpeedTest ) : boolean {       

        this.debugLog(`IS UPLOAD INTEGER: ${Number.isInteger(Number(data.upload))} => ${data.upload}`);
        this.debugLog(`IS DOWNLOAD INTEGER: ${Number.isInteger(Number(data.download))} => ${data.download}`);
        this.debugLog(`IS PING INTEGER: ${Number.isInteger(Number(data.ping))} => ${data.ping}`);
        if (!Number.isInteger(Number(data.upload)) || !Number.isInteger(Number(data.ping)) || !Number.isInteger(Number(data.download))) {
            return false;
        }       

        return true;
    }

    private isMinimumLengthCorrect(data: DTOSpeedTest) : boolean {
        if (data.upload.toString().length == 1 || data.download.toString().length == 1 || data.provider.toString().length == 1 || data.testProvider.toString().length == 1
            || data.ping.toString().length == 1 || data.datum.toString().length == 1 || data.os.toString().length == 1 || data.comment.toString().length == 1 || data.note.toString().length != 1) {                
            return false;            
        }

        return true;
    }

    private isDateFieldLengthCorrect(data: DTOSpeedTest) : boolean {
        this.debugLog(`DATE FIELD LENGTH: ${data.datum.toString().length}`)
        if (data.datum.toString().length < 10) {
            return false;
        }

        return true;
    }
}