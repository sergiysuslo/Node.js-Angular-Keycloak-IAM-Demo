import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './auth.guard';
import { HeaderComponent } from './header/header.component';
import { IndexComponent } from './index/index.component';
import { LogoutComponent } from './logout/logout.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {path: '', component: IndexComponent},
  {path: 'logout', component: LogoutComponent},
  {path: 'user', component: UserComponent, canActivate: [AuthGuard], data: {roles:['user','admin']}},
  {path: 'admin', component: AdminComponent, canActivate: [AuthGuard], data: {roles:['admin']}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
