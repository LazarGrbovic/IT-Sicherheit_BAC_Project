* ``` npm install ng2-charts --save```

* ``` npm install chart.js --save```

* Add **chart.js** reference into ```index.html```

    * ```<script src="node_modules/chart.js/src/chart.js"></script>```

* Import module into Angular Application (**app.module.ts**)

    * ```import { ChartsModule } from 'ng2-charts/ng2-charts';```

    * ```TypeScript
        imports: [
            ChartsModule
        ]
        ```

* **pieChart.component.ts**    

    * **pieChartLabels** => used to define PIE chart label

    * **pieChartData** => array use for label values

    * **pieChartOptions** => use for add options for chart

     
      ```TypeScript
        import { Component } from '@angular/core';
        @Component({
            selector: 'app-root',
            templateUrl: './pie-Chart.component.html'
           // styleUrls: ['./app.component.css']
        })
        export class PieChartComponent {            
            public pieChartLabels:string[] = ["Pending", "InProgress", "OnHold", "Complete", "Cancelled"];
            public pieChartData:number[] = [21, 39, 10, 14, 16];
            public pieChartType:string = 'pie';
            public pieChartOptions:any = {'backgroundColor': [
                   "#FF6384",
                "#4BC0C0",
                "#FFCE56",
                "#E7E9ED",
                "#36A2EB"
                ]}
 
            // events on slice click
            public chartClicked(e:any):void {
                console.log(e);
            }
 
        // event on pie chart slice hover
        public chartHovered(e:any):void {
            console.log(e);
            }
        }
      ```

* **pieChart.component.html**      

    ```HTML
    <div class="container">
    <div class="col-sm-4 text-center">
    <h2 class="text-center">PIE chart using Chartjs and Angular 6</h2>
    <canvas baseChart
          [data]="pieChartData"
          [labels]="pieChartLabels"
          [chartType]="pieChartType"
          [options]="pieChartOptions"
          (chartHover)="chartHovered($event)"
          (chartClick)="chartClicked($event)"></canvas>
      </div>
    </div>
    ```

    