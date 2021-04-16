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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHRvLXNwZWVkdGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NoYXJlZEZvbGRlci9kdG8vZHRvLXNwZWVkdGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxNQUFhLFlBQVk7SUFZckIsWUFDSSxNQUFjLEVBQ2QsUUFBZ0IsRUFDaEIsUUFBZ0IsRUFDaEIsWUFBb0IsRUFDcEIsSUFBWSxFQUNaLEtBQWEsRUFDYixFQUFVLEVBQ1YsT0FBZSxFQUNmLElBQVk7UUFHWixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6QixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6QixJQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztRQUNqQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztRQUNiLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBQ3JCLENBQUM7Q0FDSjtBQWxDRCxvQ0FrQ0M7QUFFRCxNQUFhLGtCQUFrQjtJQWEzQixZQUNJLFlBQTBCLEVBQzFCLEVBQVU7UUFHVixJQUFJLENBQUMsTUFBTSxHQUFHLFlBQVksQ0FBQyxNQUFNLENBQUM7UUFDbEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxZQUFZLENBQUMsUUFBUSxDQUFDO1FBQ3RDLElBQUksQ0FBQyxRQUFRLEdBQUcsWUFBWSxDQUFDLFFBQVEsQ0FBQztRQUN0QyxJQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQyxZQUFZLENBQUM7UUFDOUMsSUFBSSxDQUFDLElBQUksR0FBRyxZQUFZLENBQUMsSUFBSSxDQUFDO1FBQzlCLElBQUksQ0FBQyxLQUFLLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQztRQUNoQyxJQUFJLENBQUMsRUFBRSxHQUFHLFlBQVksQ0FBQyxFQUFFLENBQUM7UUFDMUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxZQUFZLENBQUMsT0FBTyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxJQUFJLEdBQUcsWUFBWSxDQUFDLElBQUksQ0FBQztRQUM5QixJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztJQUNqQixDQUFDO0NBQ0o7QUE3QkQsZ0RBNkJDIn0=