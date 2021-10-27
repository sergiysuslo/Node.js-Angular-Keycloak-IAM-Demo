import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { AppService } from '../app.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(protected readonly keycloak: KeycloakService, public appService: AppService) { }

  userList:any = [];

  ngOnInit(): void {

    this.appService.getIndex().subscribe(data => {
      this.userList = data;
    });

  }

  getData(){
    console.log(this.userList);

  }

  logout() {
    this.keycloak.logout("http://localhost:4200/")
  }

}
