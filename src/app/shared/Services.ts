import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http'
import { Constant } from "./Constant";

@Injectable({
    providedIn: 'root'
})

export class Services{
    private appURL = Constant.APP_URL;
    constructor(private http: HttpClient){}

    public anyPostApi(jsonData: any, serviceName: string){
        return this.http.post<any>(this.appURL+serviceName+".php",jsonData);
    }
}