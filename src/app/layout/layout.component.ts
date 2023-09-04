import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  public mainLoader: boolean = false;
  public loginEmpId: any = "";
  public loginEmpName: any = "";
  public loginEmpRoleId: any = "";
  constructor(private _router: Router, private _snackBar: MatSnackBar){
    this.loginEmpId = localStorage.getItem("empId");
    this.loginEmpName = localStorage.getItem("empName");
    this.loginEmpRoleId = localStorage.getItem("empRoleId");
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  public openSnackBar(message: string) {
    this._snackBar.open(message, "Alert",{
      duration: 3 * 1000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition
    });
  }

  public logout() : void{
    let isConfirm = confirm("Do you want to logout ?");
    if(isConfirm){
      localStorage.clear();
      this._router.navigate(['/login']);
    }
  }
}
