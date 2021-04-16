export class DTOSpeedTest {

    upload: number;
    download: number;
    provider: string;
    testProvider: string;
    ping: number;
    datum: string;
    os: string;
    comment: string;
    note: number;    

    public constructor (
        upload: number,
        download: number,
        provider: string,
        testProvider: string,
        ping: number,
        datum: string,
        os: string,
        comment: string,
        note: number) 

    { 
        this.upload = upload;
        this.download = download;
        this.provider = provider;
        this.testProvider = testProvider;
        this.ping = ping;
        this.datum = datum;
        this.os = os;
        this.comment = comment;
        this.note = note;
    }
}

export class DTOSpeedTestWithID {

    upload: number;
    download: number;
    provider: string;
    testProvider: string;
    ping: number;
    datum: string;
    os: string;
    comment: string;
    note: number;
    id: string;    

    public constructor (
        DTOSpeedTest: DTOSpeedTest,
        id: string) 

    { 
        this.upload = DTOSpeedTest.upload;
        this.download = DTOSpeedTest.download;
        this.provider = DTOSpeedTest.provider;
        this.testProvider = DTOSpeedTest.testProvider;
        this.ping = DTOSpeedTest.ping;
        this.datum = DTOSpeedTest.datum;
        this.os = DTOSpeedTest.os;
        this.comment = DTOSpeedTest.comment;
        this.note = DTOSpeedTest.note;
        this.id = id;
    }
}