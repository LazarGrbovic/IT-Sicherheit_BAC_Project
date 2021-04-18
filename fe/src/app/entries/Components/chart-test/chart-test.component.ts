import { Component, OnInit } from '@angular/core';
import { Chart } from "chart.js";
import { EntryService } from "../../../_services/entry.service"
import { DTOSpeedTestWithID} from "../../../../../../sharedFolder/dto-speedtest";
import { first } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UserService } from '@app/_services/user.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-chart-test',
  templateUrl: './chart-test.component.html',
  styleUrls: ['./chart-test.component.css']
})
export class ChartTestComponent implements OnInit {

    speedTestEntries!: DTOSpeedTestWithID[];
    private count1 = 0;        
    private count2 = 0;        
    private count3 = 0;        
    private count4 = 0;        
    private count5 = 0;      
    private noteChart!: Chart;
    private uploadChart!: Chart;
    private downloadChart!: Chart;
    private pingChart!: Chart;

  constructor(private entryService: EntryService, private userService: UserService, private router: Router) { }

  ngOnInit(): void {

    if(this.userService.UserData == null){
        this.router.navigate(['']);
    }
          
    this.entryService.getAll()            
            .subscribe(allEntries => { 
                console.log(`allEntries: ${allEntries.length}`);
                console.log(`allEntries: ${allEntries[0].note}`); 
                this.speedTestEntries = allEntries;
                this.handleEntries(allEntries);
            }); 

    console.log("Getting entries");
    console.log(typeof(this.speedTestEntries));
    
    console.log(`Before creating chart ${this.count2}`)   

  }

  handleEntries(DTO: DTOSpeedTestWithID[]) {
    
    console.log("Inside handleEntries");
    this.handleNoteChart(DTO);
    this.handleUploadChart(DTO);
    this.handleDownloadChart(DTO);
    this.handlePingChart(DTO);
    

  }

  handleNoteChart(DTO: DTOSpeedTestWithID[]) {
    DTO.forEach(element => {
        console.log(`NOTE: ${element.note}`);
        if (element.note == 1) {
            this.count1 += 1; 
        }
        else if (element.note == 2){
            this.count2 += 1;                     
        }
        else if (element.note == 3){
            this.count3 += 1;                     
        }
        else if (element.note == 4){
            this.count4 += 1;                     
        }
        else {
            this.count5 += 1;
        }
    });

    console.log("Inside handleNoteChart");
    this.noteChart = new Chart("noteChart", {
        type: 'bar',
        data: {
            labels: ['1', '2', '3', '4', '5'],
            datasets: [{
                label: '# of Notes',
                data: [this.count1, this.count2, this.count3, this.count4, this.count5],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });

  }

  handleUploadChart(DTO: DTOSpeedTestWithID[]) {
      console.log("Inside handleUploadChart");
      let uploads: Array<number> = new Array(); 
      DTO.forEach(element => {
          console.log(`Pushing Upload: ${element.upload}`);
          uploads.push(element.upload);
      });

      let counter = 1;
      let counters: Array<number> = new Array(); 
      DTO.forEach(element => {          
          counters.push(counter++);
      });
    for (let index = 0; index < uploads.length; index++) {
        console.log(uploads[index]);
        
    }

      this.uploadChart = new Chart("uploadChart", {
        type: 'line',
        data: {
            labels: counters,
            datasets: [{
                label: 'Uploads',                
                data: uploads,
                backgroundColor: [                    
                    'rgba(153, 102, 255, 0.2)',                    
                ],
                borderColor: "#3e95cd",
                fill: true,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
  }

  handleDownloadChart(DTO: DTOSpeedTestWithID[]) {
    console.log("Inside handleDownloadChart");
      let downloads: Array<number> = new Array(); 
      DTO.forEach(element => {
          console.log(`Pushing Download: ${element.download}`);
          downloads.push(element.download);
      });
      
      let counter = 1;
      let counters: Array<number> = new Array(); 
      DTO.forEach(element => {          
          counters.push(counter++);
      });

    this.downloadChart = new Chart("downloadChart", {
      type: 'line',
      data: {
          labels: counters,
          datasets: [{
              label: 'Downloads',
              data: downloads,
              backgroundColor: [
                  
                  'rgba(54, 162, 235, 0.2)',
                  
              ],
              borderColor: [
                'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }]
          }
      }
  });
  }

  handlePingChart(DTO: DTOSpeedTestWithID[]) {
    console.log("Inside handlePingChart");
      let pings: Array<number> = new Array(); 
      DTO.forEach(element => {
          console.log(`Pushing Ping: ${element.ping}`);
          pings.push(element.ping);
      });

      let counter = 1;
      let counters: Array<number> = new Array(); 
      DTO.forEach(element => {          
          counters.push(counter++);
      });

    this.pingChart = new Chart("pingChart", {
      type: 'line',
      data: {
          labels: counters,
          datasets: [{
              label: 'Pings',
              data: pings,
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }]
          }
      }
  });
  }

}
