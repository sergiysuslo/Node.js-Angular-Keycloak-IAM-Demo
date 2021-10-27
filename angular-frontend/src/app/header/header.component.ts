import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { AppService } from '../app.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  panelOpenState = false;
  data:any = [];

  constructor(private appService: AppService,  protected readonly keycloak: KeycloakService) {}

  ngOnInit() {

   /* this.appService.getIndex()
    .subscribe(serverData => this.data = serverData); */
  }

}
