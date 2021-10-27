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
  public users:any = [];

  userInfo: any = [];

  constructor(protected readonly keycloak: KeycloakService, public appService: AppService) { }

  async ngOnInit(): Promise<void> {
    this.userObject = await this.keycloak.loadUserProfile();

    this.token = await this.keycloak.getToken();
    this.refreshToken = this.keycloak.getKeycloakInstance().refreshToken;

    /* this.appService.getUsers(this.token).subscribe(res => {
      console.log(res);
      this.users = res;
    }); */

    this.appService.getUserInfo().subscribe(data => {
      this.userInfo = data;
    })


  }


  logout() {
    this.keycloak.logout("http://localhost:4200/")
  }

  async update() {
    await this.keycloak.updateToken(-1).then(async () => {
      this.token = await this.keycloak.getToken()
    })
    this.refreshToken = this.keycloak.getKeycloakInstance().refreshToken
  }

}
