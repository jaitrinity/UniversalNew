import { Component, OnInit } from '@angular/core';
import { AuthenticateModel } from './model/AuthenticateModel';
import { Services } from '../shared/Services';
import { take } from 'rxjs';
import { Router } from '@angular/router';
import { Constant } from '../shared/Constant';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginValid = true;
  public hide : boolean = true;
  public button = "#a649e9";
  public responseDesc = "";
  public loginModel : AuthenticateModel;
  constructor(private _services : Services, private _router: Router){
    this.loginModel = new AuthenticateModel();
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  public onSubmitting() : void{
    this.loginValid = true;
    this._services.anyPostApi(this.loginModel,'authenticate')
    .pipe(take(1)).subscribe({
      next: result=>{
        // console.log(result);
        if(result.responseCode == Constant.SUCCESS_CODE){
          let wrappedList = result.wrappedList[0];
          localStorage.setItem("empId",wrappedList.empId);
          localStorage.setItem("empName",wrappedList.empName);
          localStorage.setItem("empRoleId",wrappedList.empRoleId);
          localStorage.setItem("tenentId",wrappedList.tenentId);
          this.loginValid = true;
          localStorage.setItem(btoa("isValidToken"),btoa(Constant.TRINITY_PRIVATE_KEY));
          this._router.navigateByUrl("layout")
        }
        else{
          this.responseDesc = result.responseDesc;
          this.loginValid = false;
        } 
      },
      error: _=> this.loginValid = false
    })
  }

}
