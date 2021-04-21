<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Word 导出](#word-%E5%AF%BC%E5%87%BA)
    - [03 版本](#03-%E7%89%88%E6%9C%AC)
    - [07 版本](#07-%E7%89%88%E6%9C%AC)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

<!--
 * @Author: Gmsoft - WeiHong Ran
 * @Date: 2019-08-29 16:42:52
 * @LastEditors: Gmsoft - WeiHong Ran
 * @LastEditTime: 2019-08-29 17:01:41
 * @Description: Nothing
 -->
## Word 导出

#### 03 版本

栗子代码：

```
public void exportWord03(HttpServletResponse response) {
    response.setHeader("Content-Disposition", "attachment;filename=export.doc");
    HWPFDocument doc = null;
    try {
        doc = new HWPFDocument(new FileInputStream("d:/test.doc"));
        Range range = doc.getRange();
        range.replaceText("${name}", "萧筱");
        doc.write(response.getOutputStream());
    } catch (IOException e) {
        e.printStackTrace();
    }
}
```

#### 07 版本

栗子代码：

```
public void exportWord07(HttpServletResponse response) {
    response.setHeader("Content-Disposition", "attachment;filename=export.docx");
    XWPFDocument docx = null;
    try {
        docx = new XWPFDocument(new FileInputStream("d:/test.docx"));
        List<XWPFParagraph> paragraphList = docx.getParagraphs();
        for (XWPFParagraph paragraph : paragraphList) {
            List<XWPFRun> runs = paragraph.getRuns();
            for (XWPFRun run : runs) {
                String str = run.getText(run.getTextPosition());
                str = str.replace("${name}", "小小");
                run.setText(str, 0);
            }
        }
        docx.write(response.getOutputStream());
        docx.close();
    } catch (IOException e) {
        e.printStackTrace();
    }
}
```
