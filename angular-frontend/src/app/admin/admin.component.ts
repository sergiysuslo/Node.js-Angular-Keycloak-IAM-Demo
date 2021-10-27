import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { AppService } from '../app.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit  {

  userList:any = [];
  displayedColumns: string[] = ['firstName', 'lastName', 'username', 'email', 'actions'];

  constructor(protected readonly keycloak: KeycloakService, public appService: AppService) { }

  ngOnInit(): void {

    this.appService.getIndex().subscribe(data => {
      this.userList = data;
    });

  }

  deleteUser(element: any){
    this.appService.deleteUser(element.id).subscribe(data => {

    })
    window.location.reload();
  }

  getData(){
    console.log(this.userList);

  }

  logout() {
    this.keycloak.logout("http://localhost:4200/")
  }

}
