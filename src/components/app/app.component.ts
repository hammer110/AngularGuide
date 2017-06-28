import { Component, Injectable, OnInit } from '@angular/core';
import { DialogService } from '../../services/dialog.service';
import { HttpService } from '../../services/http.service';
import { DialogValue } from '../../interface/index'
import { UserInfoService } from '../../services/userInfo.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [HttpService]
})

@Injectable()
export class AppComponent implements OnInit {
  public dialogInfo: DialogValue = {
    msg: ''
  }
  constructor (private http: HttpService, private dialog: DialogService, private userInfo: UserInfoService) {
    // subscribe dialogInfo
    this.dialog.subject.subscribe({
      next: (v) => this.dialogInfo = v
    });
  }
  ngOnInit () {
    // 获取用户信息
    this.userInfo.setUserInfo({token: 'abfafafa'})
    this.http.post({
      url: 'loanCheckV2'
    }).subscribe(res => {
      console.log(res)
    })
  }
}
