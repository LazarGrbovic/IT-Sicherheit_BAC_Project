"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DTOSpeedTestWithID = exports.DTOSpeedTest = void 0;
class DTOSpeedTest {
    constructor(upload, download, provider, testProvider, ping, datum, os, comment, note) {
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
exports.DTOSpeedTest = DTOSpeedTest;
class DTOSpeedTestWithID {
    constructor(DTOSpeedTest, id) {
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
exports.DTOSpeedTestWithID = DTOSpeedTestWithID;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHRvLXNwZWVkdGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NoYXJlZEZvbGRlci9kdG8tc3BlZWR0ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLE1BQWEsWUFBWTtJQVlyQixZQUNJLE1BQWMsRUFDZCxRQUFnQixFQUNoQixRQUFnQixFQUNoQixZQUFvQixFQUNwQixJQUFZLEVBQ1osS0FBYSxFQUNiLEVBQVUsRUFDVixPQUFlLEVBQ2YsSUFBWTtRQUdaLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO1FBQ2IsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7SUFDckIsQ0FBQztDQUNKO0FBbENELG9DQWtDQztBQUVELE1BQWEsa0JBQWtCO0lBYTNCLFlBQ0ksWUFBMEIsRUFDMUIsRUFBVTtRQUdWLElBQUksQ0FBQyxNQUFNLEdBQUcsWUFBWSxDQUFDLE1BQU0sQ0FBQztRQUNsQyxJQUFJLENBQUMsUUFBUSxHQUFHLFlBQVksQ0FBQyxRQUFRLENBQUM7UUFDdEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxZQUFZLENBQUMsUUFBUSxDQUFDO1FBQ3RDLElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDLFlBQVksQ0FBQztRQUM5QyxJQUFJLENBQUMsSUFBSSxHQUFHLFlBQVksQ0FBQyxJQUFJLENBQUM7UUFDOUIsSUFBSSxDQUFDLEtBQUssR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxFQUFFLEdBQUcsWUFBWSxDQUFDLEVBQUUsQ0FBQztRQUMxQixJQUFJLENBQUMsT0FBTyxHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUM7UUFDcEMsSUFBSSxDQUFDLElBQUksR0FBRyxZQUFZLENBQUMsSUFBSSxDQUFDO1FBQzlCLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO0lBQ2pCLENBQUM7Q0FDSjtBQTdCRCxnREE2QkMifQ==