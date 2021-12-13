import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { AppService } from '../app.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  public userObject: any
  public token: any
  public refreshToken: any

  userInfo: any = [];

  constructor(protected readonly keycloak: KeycloakService, public appService: AppService) { }



  ngOnInit(): void {

    this.appService.getUserInfo().subscribe(data => {
      this.userInfo = data;
    });


  }


  logout() {
    this.keycloak.logout("http://localhost:4200/")
  }

}
