/*
 * @Author: Salt
 * @Date: 2022-06-25 11:30:11
 * @LastEditors: Salt
 * @LastEditTime: 2022-06-25 14:36:53
 */
export function mouseMoveHandler(this: HTMLElement, ev: MouseEvent) {
  console.log('mouseMove')
  const { offsetWidth, offsetHeight } = this
  const { offsetX, offsetY } = ev
  const posX = (offsetX / offsetWidth) * 2 - 1
  const posY = (offsetY / offsetHeight) * 2 - 1
  const bright = 1 - posY * 0.18 - posX * 0.02
  const rotateX = 15 * posX
  const rotateY = 15 * posY
  this.style.transform = `rotateX(${-rotateY}deg) rotateY(${rotateX}deg) `
  this.style.filter = `brightness(${bright})`
}
