import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CashConfirmComponent } from '../components/cash/cash.component'
import { BrowserModule } from '@angular/platform-browser';
import { UserInfoService } from '../services/userInfo.service'

const appRoutes: Routes = [
  { path: 'cashConfirm', component: CashConfirmComponent }
]
const directives: any[] = [
    CashConfirmComponent
]
@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  declarations: directives,
  providers: [UserInfoService],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  exports: [
    RouterModule
  ]
})
export class AppRoutesModule { }
