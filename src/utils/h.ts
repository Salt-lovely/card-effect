/*
 * @Author: Salt
 * @Date: 2022-01-21 23:00:09
 * @LastEditors: Salt
 * @LastEditTime: 2022-01-26 22:42:03
 * @Description: 提供一个快速生成 DOM 元素的方法
 * @FilePath: \better-tieba\src\utils\h.ts
 */

function handleChildren(children: acceptableChildren[] = []): Node[] {
  const res: Node[] = []
  const flattedChildren = children.flat(Infinity) as unknown[]
  flattedChildren.forEach((child) => {
    if (child instanceof Node) res.push(child)
    else if (typeof child === 'string') res.push(document.createTextNode(child))
    else if (typeof child === 'number') res.push(document.createTextNode(`${child}`))
  })
  return res
}

/** 用法：
 * 1. `h(元素标签名, 元素属性(可选), 子元素或文字(可选))`
 * ```js
 * h('div')                // 获得一个 div 元素
 * h('img', {src: '网址'}) // 获得一个 img 元素, 自带 src 属性
 * h('p', null, 'awa')     // 获得一个 p 元素, 自带内容“awa”
 * ```
 * 2. `h(返回HTML元素的方法, 方法的参数(是个对象), 子元素或文字(可选))`
 * ```js
 * const myComponent: componentFunction = (_: unknown, ...children) => h('div', null, ...children)
 * h(myComponent, null, 'awa')
 * ```
 */
const h: hyperFunction = (
  cmd: string | Function,
  props?: object | null,
  ...children: acceptableChildren[]
) => {
  if (typeof cmd === 'string') {
    const tag = cmd
    const el = document.createElement(tag)
    if (props) {
      for (const _attr in props) {
        const attr = _attr.toLowerCase()
        const value = (props as { [attr: string]: unknown })[_attr] as unknown
        if (attr === 'data' || attr === 'dataset') {
          // 数据类型
          if (value && typeof value === 'object') {
            // 对象格式
            for (const styleAttr in value) {
              // @ts-ignore
              el.dataset[styleAttr] = value[styleAttr]
            }
          } else if (typeof value === 'string') {
            // 字符串格式
            el.setAttribute(attr, value)
          }
        } else if (attr === 'style') {
          // 样式类型
          if (value && typeof value === 'object') {
            // 对象格式
            for (const styleAttr in value) {
              // @ts-ignore
              el.style[styleAttr] = value[styleAttr]
            }
          } else if (typeof value === 'string') {
            // 字符串格式
            el.setAttribute('style', value)
          }
        } else {
          // 其他类型
          // @ts-ignore
          el[_attr] = value
        }
      }
    }
    if (children?.length)
      handleChildren(children).forEach((child) => el.appendChild(child))
    return el
  } else if (typeof cmd === 'function') {
    return cmd(props || {}, ...handleChildren(children))
  } else {
    throw new Error('请输入正确的标签名或生成方法')
  }
}

export default h
