import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import qs from 'qs'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import apis from './api.service';
import { AjaxParams } from '../interface/common.interface'

import _ from 'lodash'

@Injectable()
export class HttpService {
    constructor (private http: Http) {
    }
    // 基于httpModule封装的ajax库
    post (params: AjaxParams): any {
      const data = {token: '', version: '2.0'}
      const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
      const options = new RequestOptions({ headers: headers });
      return this.http.post(apis[params.url], qs.stringify(_.merge(data, params.data)), options)
                 .map(this.extractData)
                 .catch(this.handleError);
    }
    /**
     * 对接口返回的数据进行处理
     */
    private extractData(res: Response) {
      const body = res.json();
      return body || { };
    }
    /**
     * 对接口异常进行捕捉
     */
    private handleError(error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
        const body = error.json() || '';
        const err = body.error || JSON.stringify(body);
        errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
        errMsg = error.message ? error.message : error.toString();
        }
        return Observable.throw(errMsg);
    }
}
