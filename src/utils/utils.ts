/*
 * @Author: Salt
 * @Date: 2022-01-26 00:03:14
 * @LastEditors: Salt
 * @LastEditTime: 2022-06-25 15:56:28
 * @Description: 杂项方法
 * @FilePath: \card-effect\src\utils\utils.ts
 */

export function docReady(fn: () => unknown): void {
  if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', () => {
      if (document.readyState === 'interactive') fn()
    })
  } else {
    fn()
  }
}

export function extend<T extends object, K extends Partial<T>>(
  obj: T,
  ext: K
): T {
  for (const key in ext) {
    if (!(key in obj)) {
      Object.defineProperty(obj, key, {
        value: ext[key],
        enumerable: false,
      })
    }
  }
  return obj
}

export function offset(el: Element) {
  // 如果元素不存在或隐藏，默认返回0值
  if (!el || !el.getClientRects().length) return { top: 0, left: 0 }
  var rect = el.getBoundingClientRect() // 元素的大小及其相对于视口的位置
  var win = el.ownerDocument.defaultView! // 文档的默认窗口对象（只读）
  return { top: rect.top + win.pageYOffset, left: rect.left + win.pageXOffset }
}

export function scrollYToEl(el: Element, fix = -200) {
  const { top } = offset(el)
  window.scrollTo({
    behavior: 'smooth',
    top: top + fix,
  })
}
/** 处理过的容器会标记上salt-done方法 */
export function handleChildren(props: {
  queryContainer: string
  queryElement: string
  callback: (el: HTMLElement) => Element
}) {
  const { queryContainer, queryElement, callback } = props
  const containers = Array.from(document.body.querySelectorAll(queryContainer))
  containers.forEach((container) => {
    container.classList.add('salt-done')
    const elems = Array.from(container.querySelectorAll(queryElement)).filter(
      (el) => el instanceof HTMLElement
    ) as HTMLElement[]
    const res = elems.map((elem) => callback(elem))
    container.innerHTML = ''
    res.forEach((item) => container.appendChild(item))
  })
}
