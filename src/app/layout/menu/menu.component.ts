import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { Constant } from 'src/app/shared/Constant';
import { Services } from 'src/app/shared/Services';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  public menuList:any = [];
  public loginEmpId: any = "";
  public loginEmpName: any = "";
  public loginEmpRoleId: any = "";
  public tenentId: any = "";
  
  constructor(private _services:Services){
    this.loginEmpId = localStorage.getItem("empId");
    this.loginEmpRoleId = localStorage.getItem("empRoleId");
    this.tenentId = localStorage.getItem("tenentId");
  }
  ngOnInit(): void {
    this.loadMenuList();
    throw new Error('Method not implemented.');
  }

  loadMenuList(){
    let json = {
      loginEmpId: this.loginEmpId,
      loginEmpRoleId: this.loginEmpRoleId,
      tenentId: this.tenentId
    }
    this._services.anyPostApi(json, "getMenuByEmpRole")
    .pipe(take(1)).subscribe({
      next: result=>{
        if(result.responseCode == Constant.SUCCESS_CODE){
          this.menuList = result.wrappedList;
        }
        else{
          
        } 
      },
      error: _=> {

      }
    })
  }

}
