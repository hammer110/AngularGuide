// 弹框interface
export interface DialogValue {
  msg: string,
  confrimText?: string,
  cancelText?: string,
  confrimFn?(): void
}
