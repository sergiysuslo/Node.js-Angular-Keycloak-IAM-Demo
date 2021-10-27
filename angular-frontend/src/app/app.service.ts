import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({providedIn: 'root'})
export class AppService {


  constructor(private http: HttpClient) {
  }

  isWarnMessage:boolean = false;

  /* getUsers(token:any){
    return this.http.get()
  } */
  getIndex(): Observable<any> {
    return this.http.get('http://localhost:3000/api/admin/allUser');
  }

  getUserInfo(): Observable<any> {
    return this.http.get('http://localhost:3000/api/user');
  }

  deleteUser(id:any): Observable<any> {
    return this.http.get('http://localhost:3000/api/admin/delete/' + id);
  }

}
