// user info service
import { Injectable } from '@angular/core';
import _ from 'lodash'
const userInfo = {
  token: '212121'
}
@Injectable()
export class UserInfoService {
    constructor () {}
    // get method
    public getUserInfo (type: string): Promise<any> {
      return Promise.resolve(userInfo[type])
    }
    // set method
    public setUserInfo (arg: any): void {
        _.merge(userInfo, arg)
    }
}
