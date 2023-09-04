import { Component, OnInit } from '@angular/core';
import * as ApexCharts from 'apexcharts';
import { take } from 'rxjs';
import { Services } from 'src/app/shared/Services';
import { LayoutComponent } from '../layout.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  searchText = "";
  count = 200;
  duration = 2000;
  loginEmpId: any = "";
  loginEmpRoleId: any = "";
  graphArr: any = [];
  countArr: any = [];
  constructor(private _services: Services, private layout: LayoutComponent){
    this.loginEmpId = localStorage.getItem("empId");
    this.loginEmpRoleId = localStorage.getItem("empRoleId");
  }

  ngOnInit(): void {
    // this.barChart();
    // this.lineChart();
    // let dataArr = [1,2,3,4,5];
    // let labelArr = ['a','b','c','d','e'];
    // let colorArr = ['red','green','yellow','pink','violet'];
    // this.pieChart('chartPie', dataArr, labelArr, colorArr);
    this.generateGraph1();
    this.generateGraph2();
  }

  generateGraph2(){
    let jsonData = {
      loginEmpId: this.loginEmpId,
      loginEmpRoleId: this.loginEmpRoleId,
      graphType: 2
    }
    this._services.anyPostApi(jsonData, "generateGraph")
    .pipe(take(1)).subscribe({
      next: result=>{
        let graphArr2 = result;
        let divId = 'barChart';
        let data = graphArr2.data;
        let label = graphArr2.label;
        let color = graphArr2.color;
        this.countArr = graphArr2.count;
        setTimeout(() => {
          this.barChart(divId,data,label,color);
        }, 10);
      },
      error: _=> {
      
      }
    })
  }

  generateGraph1(){
    this.layout.mainLoader = true;
    let jsonData = {
      loginEmpId: this.loginEmpId,
      loginEmpRoleId: this.loginEmpRoleId,
      graphType: 1
    }
    this._services.anyPostApi(jsonData, "generateGraph")
    .pipe(take(1)).subscribe({
      next: result=>{
        this.graphArr = result;

        setTimeout(() => {
          this.layout.mainLoader = false;
          for(let i=0;i<this.graphArr.length;i++){
            let resultObj = this.graphArr[i];
            let isPincodeGraph = resultObj.isPincodeGraph;
            if(isPincodeGraph){
              let pincodeSampling = resultObj.pincodeSampling;
              let divId = pincodeSampling.divId;
              let dataArr = pincodeSampling.series;
              let labelArr = pincodeSampling.labels;
              let colorArr = pincodeSampling.colors;
              this.pieChart(divId, dataArr, labelArr, colorArr);
            }
            let isDivisonGraph = resultObj.isDivisonGraph;
            if(isDivisonGraph){
              let divisonSampling = resultObj.divisonSampling;
              let divId = divisonSampling.divId;
              let dataArr = divisonSampling.series;
              let labelArr = divisonSampling.labels;
              let colorArr = divisonSampling.colors;
              this.pieChart(divId, dataArr, labelArr, colorArr);
            }
            let isStateGraph = resultObj.isStateGraph;
            if(isStateGraph){
              let stateSampling = resultObj.stateSampling;
              let divId = stateSampling.divId;
              let dataArr = stateSampling.series;
              let labelArr = stateSampling.labels;
              let colorArr = stateSampling.colors;
              this.pieChart(divId, dataArr, labelArr, colorArr);
            }
            let isLocalityGraph = resultObj.isLocalityGraph;
            if(isLocalityGraph){
              let localitySampling = resultObj.localitySampling;
              let divId = localitySampling.divId;
              let dataArr = localitySampling.series;
              let labelArr = localitySampling.labels;
              let colorArr = localitySampling.colors;
              this.pieChart(divId, dataArr, labelArr, colorArr);
            }
            let isCountryGraph = resultObj.isCountryGraph;
            if(isCountryGraph){
              let countrySampling = resultObj.countrySampling;
              let divId = countrySampling.divId;
              let dataArr = countrySampling.series;
              let labelArr = countrySampling.labels;
              let colorArr = countrySampling.colors;
              this.pieChart(divId, dataArr, labelArr, colorArr);
            }
            let isCheckpointGraph = resultObj.isCheckpointGraph;
            if(isCheckpointGraph){
              let checkpointSampling = resultObj.checkpointSampling;
              let divId = checkpointSampling.divId;
              let dataArr = checkpointSampling.series;
              let labelArr = checkpointSampling.labels;
              let colorArr = checkpointSampling.colors;
              this.pieChart(divId, dataArr, labelArr, colorArr);
            }
            
          }
        }, 10);
      },
      error: _=> {
      
      }
    })
  }

  // lineChart(){
  //   var options = {
  //     chart: {
  //       height: 350,
  //       type: "line",
  //       stacked: false
  //     },
  //     dataLabels: {
  //       enabled: false
  //     },
  //     colors: ["#FF1654", "#247BA0"],
  //     series: [
  //       {
  //         name: "Series A",
  //         data: [1.4, 2, 2.5, 1.5, 2.5, 2.8, 3.8, 4.6]
  //       },
  //       {
  //         name: "Series B",
  //         data: [20, 29, 37, 36, 44, 45, 50, 58]
  //       }
  //     ],
  //     stroke: {
  //       width: [4, 4]
  //     },
  //     plotOptions: {
  //       bar: {
  //         columnWidth: "20%"
  //       }
  //     },
  //     xaxis: {
  //       categories: [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016]
  //     },
  //     yaxis: [
  //       {
  //         axisTicks: {
  //           show: true
  //         },
  //         axisBorder: {
  //           show: true,
  //           color: "#FF1654"
  //         },
  //         labels: {
  //           style: {
  //             colors: "#FF1654"
  //           }
  //         },
  //         title: {
  //           text: "Series A",
  //           style: {
  //             color: "#FF1654"
  //           }
  //         }
  //       },
  //       {
  //         opposite: true,
  //         axisTicks: {
  //           show: true
  //         },
  //         axisBorder: {
  //           show: true,
  //           color: "#247BA0"
  //         },
  //         labels: {
  //           style: {
  //             colors: "#247BA0"
  //           }
  //         },
  //         title: {
  //           text: "Series B",
  //           style: {
  //             color: "#247BA0"
  //           }
  //         }
  //       }
  //     ],
  //     tooltip: {
  //       shared: false,
  //       intersect: true,
  //       x: {
  //         show: false
  //       }
  //     },
  //     legend: {
  //       horizontalAlign: "left",
  //       offsetX: 40
  //     }
  //   };
    
  //   var chart = new ApexCharts(document.querySelector("#chartLine"), options);
    
  //   chart.render();
  // }

  // barChart(){
  //   var options = {
  //     series: [{
  //     name: 'Inflation',
  //     data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2]
  //   }],
  //     chart: {
  //     height: 350,
  //     type: 'bar',
  //   },
  //   plotOptions: {
  //     bar: {
  //       borderRadius: 10,
  //       dataLabels: {
  //         position: 'top', // top, center, bottom
  //       },
  //     }
  //   },
  //   dataLabels: {
  //     enabled: true,
  //     formatter: function (val : any) {
  //       return val + "%";
  //     },
  //     offsetY: -20,
  //     style: {
  //       fontSize: '12px',
  //       colors: ["#304758"]
  //     }
  //   },
    
  //   xaxis: {
  //     categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  //     position: 'top',
  //     axisBorder: {
  //       show: false
  //     },
  //     axisTicks: {
  //       show: false
  //     },
  //     crosshairs: {
  //       fill: {
  //         type: 'gradient',
  //         gradient: {
  //           colorFrom: '#D8E3F0',
  //           colorTo: '#BED1E6',
  //           stops: [0, 100],
  //           opacityFrom: 0.4,
  //           opacityTo: 0.5,
  //         }
  //       }
  //     },
  //     tooltip: {
  //       enabled: true,
  //     }
  //   },
  //   yaxis: {
  //     axisBorder: {
  //       show: false
  //     },
  //     axisTicks: {
  //       show: false,
  //     },
  //     labels: {
  //       show: false,
  //       formatter: function (val : any) {
  //         return val + "%";
  //       }
  //     }
    
  //   },
  //   title: {
  //     text: 'Monthly Inflation in Argentina, 2002',
  //     floating: true,
  //     offsetY: 330,
  //     align: 'center',
  //     style: {
  //       color: '#444'
  //     }
  //   }
  //   };

  //   var chart = new ApexCharts(document.querySelector("#chartBar"), options);
  //   chart.render();
  // }

  pieChart(divId: any, dataArr: any, labelArr: any, colorArr: any){
    var options = {
      series: dataArr,
      chart: {
        width: 300,
        type: 'pie',
      },
      labels: labelArr,
      colors: colorArr,
      fill: {
        type: 'gradient',
      },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }],
      dataLabels: {
        formatter: function (val: any, opts: any) {
            return opts.w.config.series[opts.seriesIndex]
        },
      },
    };

    var chart = new ApexCharts(document.querySelector("#"+divId), options);
    chart.render();
  }

  barChart(divId: any, dataArr: any, labelArr: any, colorArr: any){
    var options = {
      series: [{
      data: dataArr
    }],
      chart: {
      type: 'bar',
      height: 350
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: false,
      }
    },
    // colors: colorArr,
    dataLabels: {
      enabled: true,
      style: {
        colors: ["Black"]
      }
    },
    xaxis: {
      categories: labelArr,
    },
    
    };

    var chart = new ApexCharts(document.querySelector("#"+divId), options);
    chart.render();
  }

  // searchText(){
  //   let objList = this.countArr.filter((x:any) => x.menuName == this.menuName);
  //   console.log(objList)
  // }

  
}
