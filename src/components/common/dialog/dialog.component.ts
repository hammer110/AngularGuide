import { Component, OnInit } from '@angular/core'
import { DialogService } from '../../../services/dialog.service';
import { DialogValue } from '../../../interface/index'
import { NgIf } from '@angular/common'
@Component({
    selector: 'app-dialog',
    template: `
    <!-- 弹框 s-->
    <div class="modal-dialog">
        <div class="wherther" id="wherther">
                <p>{{dialogInfo.msg}}</p>
                <div class="btnCom">
                    <ng-template *ngIf="dialogInfo.msg!=''">
                        <button class="btn" id="btnCancel">
                            {{dialogInfo.cancelText}}
                        </button>
                        <i></i>
                    </ng-template>
                    <button class="btn" id="btnTrue" (click)="confirmDialog()">{{dialogInfo.confrimText}}</button>
                </div>
        </div>
    </div>
    <!-- 弹框 e-->
    `,
    styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
   public dialogInfo: DialogValue = {
      msg: 'welcome to beijing',
      cancelText: '',
      confrimText: '确定',
      confrimFn (): void {}
   }
    constructor(private dialog: DialogService) {
      this.dialog.subject.subscribe({
        next: (v) => this.dialogInfo = v
      });
    }
    // init page
    ngOnInit() {
    }
    // dialog click confirm
    confirmDialog () {
        this.dialogInfo.msg = ''
        // 如果confrimFn存在，则执行该回调函数
        if (this.dialogInfo['confrimFn']) {
        this.dialogInfo.confrimFn()
        }
    }
}
