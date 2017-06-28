import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { DialogValue } from '../interface/index'

// definition dialog service
export class DialogService {
  public dialogInfo: DialogValue = {
    msg: '',
    confrimText: '确定',
    confrimFn () {}
  };
  public subject = new BehaviorSubject(this.dialogInfo);
  /**
   * show dialog
   */
  public showDialog = (dialogInfoValue: DialogValue) => {
     this.subject.next(dialogInfoValue)
  }
}
