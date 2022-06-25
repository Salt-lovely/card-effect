/*
 * @Author: Salt
 * @Date: 2022-01-22 00:48:26
 * @LastEditors: Salt
 * @LastEditTime: 2022-06-25 11:19:41
 * @Description: 全局类型声明
 * @FilePath: \card-effect\src\global.d.ts
 */
// ======================== h 函数 ========================
type solvableChild = string | boolean | number | Node | undefined | null
type solvableChildren = solvableChild[]
type acceptableChildren =
  | solvableChild
  | solvableChildren
  | (solvableChild | solvableChildren)[]

interface componentFunction<Props extends object | null> {
  (): HTMLElement
  (props: Props): HTMLElement
  (props: Props, ...children: Node[]): HTMLElement
  (props: null, ...children: Node[]): HTMLElement
}

type hyperElementOption<T extends HTMLElement> =  Partial<Omit<T, 'style'>> & {
  style?: Partial<CSSStyleDeclaration> | undefined
}

interface hyperFunction {
  // tag => HTMLElement
  <Tag extends keyof HTMLElementTagNameMap>(
    tag: Tag,
    props?: hyperElementOption<HTMLElementTagNameMap[Tag]> | null
  ): HTMLElementTagNameMap[Tag]
  <Tag extends keyof HTMLElementTagNameMap>(
    tag: Tag,
    props: hyperElementOption<HTMLElementTagNameMap[Tag]> | null,
    ...children: acceptableChildren[]
  ): HTMLElementTagNameMap[Tag]
  // fn => HTMLElement 无参数
  (fn: () => HTMLElement): HTMLElement
  (
    fn: (props: null, ...children: Node[]) => HTMLElement,
    props: null,
    ...children: acceptableChildren[]
  ): HTMLElement
  // fn => HTMLElement 有参数
  <Props extends object>(
    fn: (props: Props) => HTMLElement,
    props: Props
  ): HTMLElement
  <Props extends object>(
    fn: (props: Props, ...children: Node[]) => HTMLElement,
    props: Props,
    ...children: acceptableChildren[]
  ): HTMLElement
}

