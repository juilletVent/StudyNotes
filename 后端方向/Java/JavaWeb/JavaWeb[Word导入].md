<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Word 导入前置条件与 Excel 一致](#word-%E5%AF%BC%E5%85%A5%E5%89%8D%E7%BD%AE%E6%9D%A1%E4%BB%B6%E4%B8%8E-excel-%E4%B8%80%E8%87%B4)
    - [03 版本读取内容](#03-%E7%89%88%E6%9C%AC%E8%AF%BB%E5%8F%96%E5%86%85%E5%AE%B9)
    - [07 版本读取内容](#07-%E7%89%88%E6%9C%AC%E8%AF%BB%E5%8F%96%E5%86%85%E5%AE%B9)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

<!--
 * @Author: Gmsoft - WeiHong Ran
 * @Date: 2019-08-29 15:56:52
 * @LastEditors: Gmsoft - WeiHong Ran
 * @LastEditTime: 2019-08-29 16:18:05
 * @Description: Nothing
 -->

## Word 导入前置条件与 Excel 一致

#### 03 版本读取内容

```
  public void resolveWord(HttpServletResponse response/*FileItem fileItem*/) {
      HWPFDocument doc = null;
      try {
          FileInputStream fileInputStream = new FileInputStream(new File("d:/test.doc"));
          doc = new HWPFDocument(/*fileItem.getInputStream()*/fileInputStream);
          System.out.println(doc.getDocumentText()); // 内容
          response.getWriter().println(doc.getDocumentText());
      } catch (
              IOException e) {
          e.printStackTrace();
      } finally {
          if (doc != null) {
              try {
                  doc.close();
              } catch (IOException e) {
                  e.printStackTrace();
              }
          }
      }
  }
```

#### 07 版本读取内容

```
  public void resolveWord(HttpServletResponse response/*FileItem fileItem*/) {
      XWPFDocument docx = null;
      try {
          FileInputStream fileInputStream = new FileInputStream(new File("d:/test.docx"));
          docx = new XWPFDocument(/*fileItem.getInputStream()*/fileInputStream);

          StringBuilder stringBuilder = new StringBuilder();
          List<XWPFParagraph> xwpfParagraphs = docx.getParagraphs();

          for (XWPFParagraph paragraph : xwpfParagraphs) {
              stringBuilder.append(paragraph.getText() + "<br/>");
          }
          response.setHeader("content-type", "text/html; charset=UTF-8");
          response.getWriter().println(stringBuilder.toString());
      } catch (IOException e) {
          e.printStackTrace();
      } finally {
          if (docx != null) {
              try {
                  docx.close();
              } catch (IOException e) {
                  e.printStackTrace();
              }
          }
      }
  }
```
