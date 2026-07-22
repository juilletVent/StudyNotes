// ============================================
// legacy-utils.d.ts — 为老旧 JS 库添加类型定义
// 核心就是 declare namespace XXX { ... }
// .d.ts + 无 import/export = 全局环境声明，所有 TS 文件都能直接使用
// ============================================

declare namespace LegacyUtils {
  // --- 顶层函数 ---
  function formatDate(date: Date, fmt?: string): string;

  function debounce<T extends (...args: any[]) => void>(
    fn: T,
    delay: number,
  ): (...args: Parameters<T>) => void;

  function deepClone<T>(obj: T): T;

  // --- 嵌套子模块：dom ---
  namespace dom {
    function qs(selector: string): Element | null;
    function qsa(selector: string): NodeListOf<Element>;
    function addClass(el: Element, className: string): void;
    function removeClass(el: Element, className: string): void;
  }

  // --- 嵌套子模块：str ---
  namespace str {
    function capitalize(s: string): string;
    function truncate(s: string, maxLen: number): string;
  }

  // --- 类 ---
  class EventBus {
    on(event: string, fn: (data: any) => void): void;
    emit(event: string, data?: any): void;
    off(event: string, fn: (data: any) => void): void;
  }
}
