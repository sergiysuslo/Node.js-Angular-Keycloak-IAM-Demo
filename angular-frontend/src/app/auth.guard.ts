import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';
import { AppService } from './app.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard extends KeycloakAuthGuard {

  constructor(protected readonly router: Router, protected readonly keycloak: KeycloakService, public appService: AppService) {
    super(router, keycloak);
  }

  public async isAccessAllowed(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Promise<boolean> {
    return new Promise(async (res, rej) => {
      var pass:boolean = false;

      if (!this.authenticated) {
        await this.keycloak.login(
          {
          redirectUri: window.location.origin + state.url,
        });
      }

        const requiredRoles = route.data.roles;
        if (!(requiredRoles instanceof Array) || requiredRoles.length === 0) {
          pass = true;
        }

        for (let myRole of requiredRoles) {
          if (this.roles.includes(myRole)) {
            pass = true;
            break;
          }
        }

      if(pass === false){
        this.keycloak.logout("http://localhost:4200/logout");
      }

      res(pass);
    });
  }


}
