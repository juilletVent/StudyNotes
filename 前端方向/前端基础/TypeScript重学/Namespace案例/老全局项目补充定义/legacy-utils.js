// ============================================
// legacy-utils.js — 模拟一个老旧 JS 库
// 没有类型定义，全靠全局变量暴露 API
// 类似于上古时期的 jQuery / Underscore 的加载方式
// ============================================

// 方式1：挂载到 window（浏览器环境）
// 方式2：挂载到 global（Node.js 环境）
// 这里简化处理，直接挂到全局对象

;(function (global) {
  // --- 工具函数 ---
  function formatDate(date, fmt) {
    fmt = fmt || 'yyyy-MM-dd'
    var y = date.getFullYear()
    var m = date.getMonth() + 1
    var d = date.getDate()
    return fmt
      .replace('yyyy', y)
      .replace('MM', m < 10 ? '0' + m : '' + m)
      .replace('dd', d < 10 ? '0' + d : '' + d)
  }

  function debounce(fn, delay) {
    var timer = null
    return function () {
      var args = arguments
      var ctx = this
      if (timer) clearTimeout(timer)
      timer = setTimeout(function () {
        fn.apply(ctx, args)
      }, delay)
    }
  }

  function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj))
  }

  // --- DOM 子模块 ---
  var dom = {
    qs: function (selector) {
      return document.querySelector(selector)
    },
    qsa: function (selector) {
      return document.querySelectorAll(selector)
    },
    addClass: function (el, className) {
      el.classList.add(className)
    },
    removeClass: function (el, className) {
      el.classList.remove(className)
    },
  }

  // --- String 子模块 ---
  var str = {
    capitalize: function (s) {
      return s.charAt(0).toUpperCase() + s.slice(1)
    },
    truncate: function (s, maxLen) {
      return s.length > maxLen ? s.slice(0, maxLen) + '...' : s
    },
  }

  /** @constructor */
  function EventBus() {
    this._listeners = {}
  }
  EventBus.prototype.on = function (event, fn) {
    if (!this._listeners[event]) this._listeners[event] = []
    this._listeners[event].push(fn)
  }
  EventBus.prototype.emit = function (event, data) {
    var fns = this._listeners[event]
    if (fns) {
      for (var i = 0; i < fns.length; i++) {
        fns[i](data)
      }
    }
  }
  EventBus.prototype.off = function (event, fn) {
    var fns = this._listeners[event]
    if (fns) {
      this._listeners[event] = fns.filter(function (f) {
        return f !== fn
      })
    }
  }

  // 暴露到全局
  global.LegacyUtils = {
    formatDate: formatDate,
    debounce: debounce,
    deepClone: deepClone,
    dom: dom,
    str: str,
    EventBus: EventBus,
  }
})(typeof window !== 'undefined' ? window : global)
