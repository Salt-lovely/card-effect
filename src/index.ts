/*
 * @Author: Salt
 * @Date: 2022-01-19 22:52:37
 * @LastEditTime: 2022-06-25 14:15:35
 * @LastEditors: Salt
 * @Description: 入口文件
 */

import h from 'Utils/h'
import { docReady } from 'Utils/utils'
import './index.css'
import { mouseMoveHandler } from './mouseEvent'

if (window.parent !== window) {
  console.error('这个脚本不允许在 iframe 等嵌入页面中运行！')
} else {
  docReady(() => {
    const detailCards = Array.from(
      document.body.querySelectorAll(
        '.salt-card-effect-detail img:not(.salt-card-img)'
      )
    ) as HTMLImageElement[]
    const overviewCards = Array.from(
      document.body.querySelectorAll(
        '.salt-card-effect-overview img:not(.salt-card-img)'
      )
    ) as HTMLImageElement[]
    detailCards.forEach((img) => {
      img.classList.add('salt-card-img')
      img.addEventListener('mousemove', mouseMoveHandler)
      const container = h('div', {
        className: 'salt-card-container salt-card-container-detail',
      })
      img.parentElement?.replaceChild(container, img)
      container.appendChild(img)
    })
    overviewCards.forEach((img) => {
      img.classList.add('salt-card-img')
      const container = h('div', {
        className: 'salt-card-container salt-card-container-overview',
      })
      img.parentElement?.replaceChild(container, img)
      container.appendChild(img)
    })
  })
}
