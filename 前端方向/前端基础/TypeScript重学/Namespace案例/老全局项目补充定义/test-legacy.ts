// ============================================
// test-legacy.ts — 使用 LegacyUtils 库
// 看看 VSCode 是否有智能提示和类型检查 ✅
// ============================================

// 还是需要导入一下的，由于是全局定义，一般放到入口文件，加载一次即可
import "./legacy-utils.js";

// ✅ 格式化为中文日期
const result = LegacyUtils.formatDate(new Date(), "yyyy年MM月dd日");

// ✅ 防抖 — 参数类型自动推断
const onResize = LegacyUtils.debounce((width: number) => {
  console.log(width);
}, 300);

// ✅ 深拷贝 — 返回类型自动推断为 { name: string }
const obj = LegacyUtils.deepClone({ name: "hello" });
console.log(obj.name);

// ✅ 嵌套子模块 dom
const btn = LegacyUtils.dom.qs("#submit");
if (btn) {
  LegacyUtils.dom.addClass(btn, "active");
}

// ✅ 嵌套子模块 str
console.log(LegacyUtils.str.capitalize("typescript")); // "Typescript"
console.log(LegacyUtils.str.truncate("hello world", 5)); // "hello..."

// ✅ 类 — 完整的 new + 方法提示
const bus = new LegacyUtils.EventBus();
bus.on("login", (data) => {
  console.log(data);
});
bus.emit("login", { user: "admin" });

// ❌ 故意写错，看看 TS 是否报错（取消下面注释试试）
// LegacyUtils.formatDate("2024-01-01"); // 错误：第一个参数应当是 Date
// LegacyUtils.dom.addClass("not-element", "x"); // 错误：第一个参数应当是 Element
