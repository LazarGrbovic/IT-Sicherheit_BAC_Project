"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DTOSpeedTestWithID = exports.DTOSpeedTest = void 0;
class DTOSpeedTest {
    constructor(userId, upload, download, provider, testProvider, ping, datum, os, comment, note) {
        this.userId = userId;
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
        this.userId = DTOSpeedTest.userId;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHRvLXNwZWVkdGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NoYXJlZEZvbGRlci9kdG8tc3BlZWR0ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLE1BQWEsWUFBWTtJQVlyQixZQUNJLE1BQWMsRUFDZCxNQUFjLEVBQ2QsUUFBZ0IsRUFDaEIsUUFBZ0IsRUFDaEIsWUFBb0IsRUFDcEIsSUFBWSxFQUNaLEtBQWEsRUFDYixFQUFVLEVBQ1YsT0FBZSxFQUNmLElBQVk7UUFHWixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6QixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6QixJQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztRQUNqQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztRQUNiLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBQ3JCLENBQUM7Q0FDSjtBQXBDRCxvQ0FvQ0M7QUFFRCxNQUFhLGtCQUFrQjtJQWMzQixZQUNJLFlBQTBCLEVBQzFCLEVBQVU7UUFHVixJQUFJLENBQUMsTUFBTSxHQUFHLFlBQVksQ0FBQyxNQUFNLENBQUM7UUFDbEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxZQUFZLENBQUMsTUFBTSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxRQUFRLEdBQUcsWUFBWSxDQUFDLFFBQVEsQ0FBQztRQUN0QyxJQUFJLENBQUMsUUFBUSxHQUFHLFlBQVksQ0FBQyxRQUFRLENBQUM7UUFDdEMsSUFBSSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUMsWUFBWSxDQUFDO1FBQzlDLElBQUksQ0FBQyxJQUFJLEdBQUcsWUFBWSxDQUFDLElBQUksQ0FBQztRQUM5QixJQUFJLENBQUMsS0FBSyxHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUM7UUFDaEMsSUFBSSxDQUFDLEVBQUUsR0FBRyxZQUFZLENBQUMsRUFBRSxDQUFDO1FBQzFCLElBQUksQ0FBQyxPQUFPLEdBQUcsWUFBWSxDQUFDLE9BQU8sQ0FBQztRQUNwQyxJQUFJLENBQUMsSUFBSSxHQUFHLFlBQVksQ0FBQyxJQUFJLENBQUM7UUFDOUIsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7SUFDakIsQ0FBQztDQUNKO0FBL0JELGdEQStCQyJ9