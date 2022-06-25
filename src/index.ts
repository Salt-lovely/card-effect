/*
 * @Author: Salt
 * @Date: 2022-01-19 22:52:37
 * @LastEditTime: 2022-06-25 11:22:45
 * @LastEditors: Salt
 * @Description: 入口文件
 */

import { docReady } from 'Utils/utils'

if (window.parent !== window) {
  console.error('这个脚本不允许在 iframe 等嵌入页面中运行！')
} else {
  docReady(() => {})
}
