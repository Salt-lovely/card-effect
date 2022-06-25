/*
 * @Author: Salt
 * @Date: 2022-01-19 22:52:37
 * @LastEditTime: 2022-06-25 15:56:58
 * @LastEditors: Salt
 * @Description: 入口文件
 */

import h from 'Utils/h'
import { docReady, handleChildren } from 'Utils/utils'
import './index.css'
import { mouseLeaveDetailHandler, mouseMoveDetailHandler } from './mouseEvent'

if (window.parent !== window) {
  console.error('这个脚本不允许在 iframe 等嵌入页面中运行！')
} else {
  docReady(() => {
    handleChildren({
      queryContainer: '.salt-card-effect-detail:not(.salt-done)',
      queryElement: 'img',
      callback: (img) => {
        img.classList.add('salt-card-img')
        const container = h('div', {
          className: 'salt-card-container salt-card-container-detail',
        })
        const layer = h('div', { className: 'salt-card-layer' })
        container.appendChild(layer)
        layer.appendChild(img)
        img.addEventListener('mousemove', mouseMoveDetailHandler)
        container.addEventListener(
          'mouseleave',
          mouseLeaveDetailHandler.bind(img)
        )
        return container
      },
    })
    handleChildren({
      queryContainer: '.salt-card-effect-overview:not(.salt-done)',
      queryElement: 'img',
      callback: (img) => {
        img.classList.add('salt-card-img')
        const container = h('div', {
          className: 'salt-card-container salt-card-container-overview',
        })
        const layer = h('div', { className: 'salt-card-layer' })
        container.appendChild(layer)
        layer.appendChild(img)
        // img.addEventListener('mousemove', mouseMoveDetailHandler)
        // container.addEventListener(
        //   'mouseleave',
        //   mouseLeaveDetailHandler.bind(img)
        // )
        return container
      },
    })
  })
}
