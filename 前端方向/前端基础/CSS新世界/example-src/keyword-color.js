/**
 * @description CSS 自定义的keyword()方法的支持和使用
 * @author zhangxinxu(.com) 2020-08-11
 * @docs https://www.zhangxinxu.com/wordpress/?p=9537
 * @license MIT 作者和出处保留
 */

(function () {
    if (!window.CSS) {
        return;
    }

    if (!NodeList.prototype.forEach) {
        NodeList.prototype.forEach = Array.prototype.forEach;
    }


    // 获取页面中所有的CSS自定义属性
    var isSameDomain = function (styleSheet) {
        if (!styleSheet.href) {
            return true;
        }

        return styleSheet.href.indexOf(window.location.origin) === 0;
    };

    var isStyleRule = function (rule) {
        return rule.type === 1;
    };

    var arrCSSCustomProps = (function () {
        return [].slice.call(document.styleSheets).filter(isSameDomain).reduce(function (finalArr, sheet) {
            return finalArr.concat([].slice.call(sheet.cssRules).filter(isStyleRule).reduce(function (propValArr, rule) {
                var props = [].slice.call(rule.style).map(function (propName) {
                    return [
                        propName.trim(),
                        rule.style.getPropertyValue(propName).trim()
                    ];
                }).filter(function ([propName]) {
                    return propName.indexOf('--') === 0;
                });

                return [].concat(propValArr, props);
            }, []));
        }, []);
    })();

    // 使用了keyword()语法的CSS自定义属性名
    var arrCssPropsValueIsKeyword = arrCSSCustomProps.filter(function (arrPropVal) {
        return /keyword\([\w\W]+\)/i.test(arrPropVal[1]);
    });

    // 设置自定义属性值的方法
    var funKeywordColor2Rgba = function (node) {
        if (node.nodeType != 1 || ['script', 'style', 'meta', 'title', 'head'].includes(node.nodeName.toLowerCase())) {
            return;
        }

        // 当前节点的所有样式对象
        var objStyle = window.getComputedStyle(node);

        // 所有设置了keyword()的自定义属性的遍历处理
        arrCssPropsValueIsKeyword.forEach(function (arr) {
            var cssProp = arr[0];

            // 判断当前元素是否设置了当前自定义属性
            var cssVarValueKeyword = objStyle.getPropertyValue(cssProp);

            if (!cssVarValueKeyword || !cssVarValueKeyword.trim() || !/keyword\([\w\W]+\)/i.test(cssVarValueKeyword)) {
                return;
            }

            cssVarValueKeyword = arr[1];

            // 解析与处理
            var keyColorAndOpacity = cssVarValueKeyword.replace(/\w+\(([\w\W]+)\)/, '$1');

            var arrKeyColorAndOpacity = keyColorAndOpacity.split(/\s+/);

            if (/,/.test(keyColorAndOpacity)) {
                arrKeyColorAndOpacity = keyColorAndOpacity.split(',');
            } else if (/\//.test(keyColorAndOpacity)) {
                arrKeyColorAndOpacity = keyColorAndOpacity.split(',');
            }

            if (arrKeyColorAndOpacity.length != 2) {
                return;
            }

            // 分出颜色和透明度
            var keyColor = arrKeyColorAndOpacity[0].trim();
            var opacity = (arrKeyColorAndOpacity[1] || '1').trim();

            // keyColor转rgb
            document.head.style.backgroundColor = keyColor;
            var rgbColor = window.getComputedStyle(document.head).backgroundColor;

            // 应用的颜色
            var applyColor = '';
            // 透明度替换
            if (/^rgba/.test(rgbColor)) {
                applyColor = rgbColor.replace('1)', opacity + ')');
            } else {
                applyColor = rgbColor.replace(')', ', ' + opacity + ')');
            }

            node.style.setProperty(cssProp, applyColor);
        });
    };


    var funAutoInitAndWatching = function () {
        // DOM Insert自动初始化
        if (window.MutationObserver) {
            var observerSelect = new MutationObserver(function (mutationsList) {
                mutationsList.forEach(function (mutation) {
                    var nodeAdded = mutation.addedNodes;
                    // 新增元素
                    nodeAdded.forEach(function (eleAdd) {
                        funKeywordColor2Rgba(eleAdd);
                    });
                });
            });

            observerSelect.observe(document.body, {
                childList: true,
                subtree: true
            });
        }

        // 如果没有开启自动初始化，则返回
        document.querySelectorAll('*').forEach(function (ele) {
            funKeywordColor2Rgba(ele);
        });
    };

    if (document.readyState != 'loading') {
        funAutoInitAndWatching();
    } else {
        window.addEventListener('DOMContentLoaded', funAutoInitAndWatching);
    }
})();