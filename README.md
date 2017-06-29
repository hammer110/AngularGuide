## Angular 4.0 新手教程

[Angular4.0](https://angular.cn/docs/ts/latest/quickstart.html)发布已经有一段时间啦，正好最近有时间研究一番，踩了一点坑，做了一个[seed project](git@github.com:hammer110/AngularGuide.git), 教程如下，请多多指教

-----

消金前端组出品

### 教程
#### 仓库地址
```
git@github.com:hammer110/AngularGuide.git
```

#### 安装依赖程序

1. 确认本机是否安装[node](https://nodejs.org/en/), npm (node安装包里面包括npm)。确保node 6.9.x 和 npm 3.x.x
   <pre>
     node -v
     v6.10.0
     npm -v
     3.10.3
   </pre>
2. 全局安装 [Angular CLI](https://www.npmjs.com/package/angular-cli)

  <pre>
    sudo npm install -g @angular/cli
  </pre>
  
3. copy github 的angular4Demo到本地，然后进入对应目录，安装项目依赖包

   <pre>
     git clone git@github.com:hammer110/AngularGuide.git
     
     cd AngularGuide
     
     npm install
   </pre>
 4. 常用命令
    <pre>
      ng serve
      ng build --prod
    </pre>
   
#### 目录结构
![CA46DFE8-60C0-47EF-A022-8C6CE6B89EEE](http://www.hammer110.com/doc/angular/media/14986127891296/CA46DFE8-60C0-47EF-A022-8C6CE6B89EEE.png)

1. src/components 组件对应的目录
2. src/environments 打包环境对应的文件，比如执行不同的打包命令引入不同的打包配置文件。举个🌰，可以在里面配置接口的地址，接口在测试环境和线上环境地址是不同的，使用方法如下
  <pre>
    import { environment } from './environments/environment';
    console.log(environment.production)
  </pre>
3. src/interface/ [定义typescript接口的目录](https://www.tslang.cn/docs/handbook/interfaces.html)
4. src/router/ 路由的集中管理目录
5. src/service/ 定义服务的目录，目前有api, dialog, http, userInfo的service
6. src/static/ 静态资源存放的目录（图片，css）
7. src/index.html ***画重点，*** 里面一定要设置 base href="/" 如果直接放到服务器的根目录，可以直接设置为***"/"***
8. src/main.ts 项目入口文件
9. src/polyfills.ts 垫片，在文件中使用一些高级语法的时候，需要在这个里面统一配置
10. [src/typings.d.ts](https://github.com/DefinitelyTyped/tsd) 原则上，TypeScript 需要开发者做到先声明后使用。这就导致开发者在调用很多原生接口（浏览器、Node.js）或者第三方模块的时候，因为某些全局变量或者对象的方法并没有声明过，导致编译器的类型检查失败。如果在项目中使用zepto，需要如下配置

    <pre>
    需要在该文件内加入这段声明，否则会报 Cannot find name '$'. 配置完成以后需要重启服务才能生效
      declare const $: any;
    </pre>
11. [.angular-cli.json](http://www.conglin-site.com/book/pxx-angular2-note/chapter1/section2-1.html) 文件为 angular-cli 生成项目的最基本骨架文件， 定义项目的输入/输出 ， 打包/编译， 生产/开发等项目, 下面对一些比较重要的属性做一解析
12. [tsconfig.json](http://www.conglin-site.com/book/pxx-angular2-note/chapter1/section2-3.html)是对 TypeScript 编译的配置文件
13. [tslint.json](https://palantir.github.io/tslint/usage/tslint-json/) 和eslint.json是类似的，都是对代码校验规则进行配置的

#### 配置路由
1. 创建一个新的目录，对应借款流程  src/components/cash/
![87389937-C8A0-4CD1-A565-439BDE343240](http://www.hammer110.com/doc/angular/media/14986127891296/87389937-C8A0-4CD1-A565-439BDE343240.png)
2. 新建目录src/router/index.ts

<pre>
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
</pre>

***开始画重点***
* 由于我们是定义了两个NgModule （app.module.ts里面一个，router下面的这个NgModule最后也会引入到app.module的NgModule里面）。 我们也需要在这里引入BrowserModule，如果不引入，模版编译器会识别不出来*ngIf *ngFor 等语法
* 如果我们自定义了directive，需要配置***CUSTOM_ELEMENTS_SCHEMA**在schemas内，否则自定义指令会识别不了
* 最后在NgModule里面配置 exports: { RouterModule },要对外抛出，然后在app.module里面引入
* 指令都需要在declarations里面是声明
* NgModule里面配置的元数据，指导编译器怎么编译当前这个module所包含的的代码。他和app.module里面的NgModule是两个独立的，不能因为app.module里面配置啦，就不在这个module里面配置


3.&nbsp; app.module.ts里面引入

<pre>
  import { AppRoutesModule } from '../router/index';
  @NgModule({
      imports: [
        AppRoutesModule
      ]
  })
</pre>

4.&nbsp; 在src/components/app.components.html配置router-outlet

```
 <router-outlet></router-outlet>
```
5.&nbsp; 执行ng serve localhost:4200/#/cashConfirm可以看到你配置的页面啦

#### directive
1. 在src/directive下面新建dialog目录，在dialog目录下面，分别新建dialog.component.ts和dialog.component.css

dialog.component.css

<pre>
    .modal-dialog {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .5);
    }
    .modal-dialog .wherther{
        position: absolute;
    }
</pre>

dialog.component.ts

```
import { Component, OnInit } from '@angular/core'

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
export class DialogComponent implements OnInit {}
```
画重点
* @component 里面配置的 selector请记住，后期在别的组件内引入该directive的时候名字就是这个
* 配置完成以后，在src/components/app.module.ts里面的NgModule，declarations配置上该名字

<pre>
 import { DialogComponent } from '../directive/dialog/dialog.component';
 import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
 @NgModule({
     ...
    declarations: [
       DialogComponent
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
     ...
 })
</pre>
画重点
***配置指令的时候一定要配置 CUSTOM_ELEMENTS_SCHEMA***

2.&nbsp; cash.compoent.html里面可以直接引用啦<app-dialog></app-dialog>

3.&nbsp;关于组件传值目前设计都是用service,当然还有很多种方式，具体的可以angular文档

#### service
1. 在src/service/下面新建dialog.service.ts

   dialog.service.ts是配合dialog指令使用的，设计该service的意义，是做一个全局弹框，弹框会放到app.component.html里面，在各个组件内，通过调用service的方法然后展示隐藏该组件

```
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { DialogValue } from '../interface/index'

/**
* definition dialog service
*/
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
```

画重点
该service能实现各个组件控制最顶层dialog的显示隐藏，是通过rx.js下面的 BehaviorSubject实现的. Subject衍生类有很多种，为什么选择BehaviorSubject， 是因为BehaviorSubject具有“最新值”的概念，可以保持状态永远是最新的

```
public subject = new BehaviorSubject(this.dialogInfo);
```
2.&nbsp;在app.module.ts里面配置该service

```
import { DialogService } from '../services/dialog.service';

@NgModule({
 ...
  providers: [DialogService]
 ...
})
```
3.&nbsp; 在dialog.component.ts里面做进一步配置，初始化按钮的方法

```
import { Component, OnInit } from '@angular/core'
import { DialogService } from '../../services/dialog.service';
import { DialogValue } from '../../interface/index'

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
    // dialog click confirm
    confirmDialog () {
        this.dialogInfo.msg = ''
        // 如果confrimFn存在，则执行该回调函数
        if (this.dialogInfo['confrimFn']) {
        this.dialogInfo.confrimFn()
        }
    }
}
```
画重点
在上一步我们在dialog.service里面实例化了一个subject对象，在这个页面，我们注入该service，然后我们在constructor里面，进行订阅（也可以理解为监听数据变化）。当数据变化的时候，把最新的值复制给dialogInfo。页面接收到最新的值以后，会更新dialog的状态


5.&nbsp;其余的service，比如api(所有接口的配置文件)，http (封装的ajax的service)，userInfo(用户信息的service)，都比较简单不再做赘述

-----

##### 到这里已经把一些Angular常用的概念大致介绍了一下，后期在使用Angular的过程中，会继续更新该文档

### 参考文档
https://www.tslang.cn/
https://angular.cn/docs/ts/latest/quickstart.html
http://www.conglin-site.com/book/pxx-angular2-note/chapter1/section2-1.html

<center style="font-size:18px">👷‍♀️👮👵消金前端组出品👷‍♀️👮👵</center>


