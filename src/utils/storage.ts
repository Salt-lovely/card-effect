/*
 * @Author: Salt
 * @Date: 2022-01-25 23:10:30
 * @LastEditors: Salt
 * @LastEditTime: 2022-01-30 13:17:53
 * @Description: 这个文件的功能
 * @FilePath: \better-tieba\src\utils\storage.ts
 */

function parse<T>(str: string | null): T | null {
  if (str) {
    try {
      return JSON.parse(str) as T | null
    } catch (e) {}
  }
  return null
}

/** 从localStorage读取数据，没有的话会自动写入默认值 */
export function read<T>(key: string, defaultValue: T): T {
  const storage = localStorage.getItem(key)
  if (!storage) {
    write(key, defaultValue)
    return defaultValue
  }
  return parse(storage)!
}

/** 往localStorage保存数据 */
export function write<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value))
}

//! 下面这一段是从 https://gitee.com/moushu/ms-esbuild-react-scaffold/blob/master/src/utils/localStorage.ts 抄的

function unsafeRead<T>(key: string): T | null {
  // if (!localStorage) throw new Error('"localStorage" is required');
  const storage = localStorage.getItem(key)
  return parse(storage)
}

/**
 * 监听 localStorage 更改事件，可以用于同一网站不同页面间通信
 * @param listener 回调函数
 * @returns 返回一个方法，调用后停止监听
 */
function listen(
  listener: (this: Window, ev: StorageEvent) => unknown,
  options: AddEventListenerOptions | boolean | undefined = { passive: true }
): () => void {
  window.addEventListener('storage', listener, options)
  return () => window.removeEventListener('storage', listener, options)
}

interface EncapsulatedStorageEvent<T> {
  /** 键名 */
  readonly key: string
  /** 新值 */
  readonly newValue: T | null
  /** 旧值 */
  readonly oldValue: T | null
  /** 受影响的 Storage 对象 */
  readonly storageArea: Storage | null
  /** 修改储存的页面的 URL */
  readonly url: string
}
/**
 * 读取某个键值并监听
 * @param props 储存键和监听器必填，默认值不必填
 * - `key` 储存数据的键
 * - `defaultValue` 默认值（不必填）
 * - `listener` 回调函数
 * - `callOnChange` 仅在新旧值不同的时候执行回调
 * @returns 返回一个元组`[value, off]`
 * - `value` 读取的值
 * - `off` 调用后停止监听
 */
export function readAndListen<T>(props: {
  key: string
  defaultValue: T
  listener: (ev: EncapsulatedStorageEvent<T>) => unknown
  callOnChange?: boolean | undefined
  options?: AddEventListenerOptions | boolean | undefined
}): [T, () => void]
export function readAndListen<T>(props: {
  key: string
  defaultValue?: undefined
  listener: (ev: EncapsulatedStorageEvent<T>) => unknown
  callOnChange?: boolean | undefined
  options?: AddEventListenerOptions | boolean | undefined
}): [T | null, () => void]
export function readAndListen<T>(props: {
  key: string
  defaultValue?: T | undefined
  listener: (ev: EncapsulatedStorageEvent<T>) => unknown
  callOnChange?: boolean | undefined
  options?: AddEventListenerOptions | boolean | undefined
}): [T | null, () => void] {
  const {
    key,
    defaultValue,
    listener,
    callOnChange = true,
    options = { passive: true },
  } = props

  let v = unsafeRead<T>(key)
  if (defaultValue !== undefined && v === null) {
    write(key, defaultValue)
    v = defaultValue
  }

  const fn = (ev: StorageEvent) => {
    if (ev.key !== key || ev.storageArea !== localStorage) return
    const newValue = parse<T>(ev.newValue)
    const oldValue = parse<T>(ev.oldValue)
    if (callOnChange && newValue === oldValue) return
    const encapsulatedEvent = {
      key,
      newValue,
      oldValue,
      storageArea: ev.storageArea,
      url: ev.url,
    }
    listener(encapsulatedEvent)
  }
  const off = listen(fn, options)
  return [v, off]
}
