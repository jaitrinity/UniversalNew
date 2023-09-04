import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { Constant } from 'src/app/shared/Constant';
import { Services } from 'src/app/shared/Services';
import { LayoutComponent } from '../layout.component';
import { MatDialog } from '@angular/material/dialog';
import { CommonDialogComponent } from '../common-dialog/common-dialog.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-common-page',
  templateUrl: './common-page.component.html',
  styleUrls: ['./common-page.component.scss']
})
export class CommonPageComponent implements OnInit {
  public menuId: any = "";
  public loginEmpId: any = "";
  public loginEmpRoleId: any = "";
  public tenentId: any = "";
  public hdrColumnList:any = [];
  public wrappedList:any = [];
  public commModel: any = CommonModule;
  resultsLength: number = 0;
  dataSource: any;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  constructor(private route: ActivatedRoute, private _services: Services,
    private layout: LayoutComponent, public dialog: MatDialog){
    this.loginEmpId = localStorage.getItem("empId");
    this.loginEmpRoleId = localStorage.getItem("empRoleId");
    this.tenentId = localStorage.getItem("tenentId");
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.menuId = params.get('menuId');
      this.getTransaction();
    }) ;

    // let dataList = [];
    // for(let i=0;i<10;i++){
    //   let json = {
    //     name: "jai "+i,
    //     email: 'jai'+i
    //   }
    //   dataList.push(json);
    // }
    // this.commModel.dataList = dataList;
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getTransaction(){
    let jsonData = {
      loginEmpId: this.loginEmpId,
      loginEmpRoleId: this.loginEmpRoleId,
      menuId: this.menuId,
      tenentId: this.tenentId
    }
    this.layout.mainLoader = true
    this._services.anyPostApi(jsonData,"getTransactions")
    .pipe(take(1)).subscribe(
      {
        next: result=>{
          // console.log(result);
          this.hdrColumnList = result.columnName;
          this.wrappedList = result.wrappedList;
          this.resultsLength = this.wrappedList.length;
          this.dataSource = new MatTableDataSource(this.wrappedList);
          this.dataSource.paginator = this.paginator;
          if(result.responseCode == Constant.SUCCESS_CODE){
          }
          else{
            this.layout.openSnackBar(result.responseDesc)
          }
          this.layout.mainLoader = false;
        },
        error: _=>{
          this.layout.mainLoader = false;
        }
      }
    )
  }

  viewTransaction(actId: any){
    let jsonData = {
      actId: actId
    }
    this._services.anyPostApi(jsonData, "viewTransactions")
    .pipe(take(1)).subscribe({
      next: result=>{
        let detColumnList = result.columnName;
        this.commModel.detColumnList = detColumnList;
        let dataList = result.wrappedList;
        this.commModel.dataList = dataList;
      },
      error: _=>{

      }
    })
    // alert(actId);
    this.commModel.actId = actId;
    const dialogRef = this.dialog.open(CommonDialogComponent, {
      height: '600px',
      width: '1100px',
      data: this.commModel,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      // console.log('The dialog was closed');
      // this.animal = result;
    });
  }
}
