import { Component, Injectable, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http'
import { DialogService } from '../../services/dialog.service';
import { UserInfoService } from '../../services/userInfo.service'

@Component({
  selector: 'app-cash',
  templateUrl: './cash.component.html',
  styleUrls: ['./cash.component.css'],
  providers: []
})

// definition cash component
@Injectable()
export class CashConfirmComponent  implements OnInit {
  constructor (private http: Http, private dialog: DialogService, private userInfo: UserInfoService) {}
  ngOnInit () {
    setTimeout(() => {
      this.userInfo.getUserInfo('token').then(res => {
        console.log(res);
      })
      this.dialog.showDialog({
        msg: 'welcome to beijing',
        confrimText: '确定',
        cancelText: '取消',
        confrimFn () {
          // window.alert('click confirm button')
        }
      })
    }, 2000)
  }
}

