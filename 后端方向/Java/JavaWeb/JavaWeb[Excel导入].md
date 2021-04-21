<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Excel 导入](#excel-%E5%AF%BC%E5%85%A5)
    - [不保存文件直接导入的场景](#%E4%B8%8D%E4%BF%9D%E5%AD%98%E6%96%87%E4%BB%B6%E7%9B%B4%E6%8E%A5%E5%AF%BC%E5%85%A5%E7%9A%84%E5%9C%BA%E6%99%AF)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

<!--
 * @Author: Gmsoft - WeiHong Ran
 * @Date: 2019-08-28 20:21:04
 * @LastEditors: Gmsoft - WeiHong Ran
 * @LastEditTime: 2019-08-29 14:21:37
 * @Description: Nothing
 -->

## Excel 导入

**需要导入的包：**

    activation-1.1.1.jar
    commons-codec-1.12.jar
    commons-collections4-4.3.jar
    commons-compress-1.18.jar
    commons-logging-1.2.jar
    commons-math3-3.6.1.jar
    curvesapi-1.06.jar
    jaxb-api-2.3.0.jar
    jaxb-core-2.3.0.1.jar
    jaxb-impl-2.3.0.1.jar
    junit-4.12.jar
    log4j-1.2.17.jar
    poi-4.1.0.jar
    poi-excelant-4.1.0.jar
    poi-ooxml-4.1.0.jar
    poi-ooxml-schemas-4.1.0.jar
    poi-scratchpad-4.1.0.jar
    xmlbeans-3.1.0.jar

_Tips：使用 POI 插件完成，需要 POI 相关包作为前置_

    public void imp(javax.servlet.http.HttpServletResponse response) {
        Workbook workbook = null;
        try {
            workbook = WorkbookFactory.create(new File("d:/test.xlsx"));
            Sheet sheet = workbook.getSheetAt(0);
            int rowNum = sheet.getLastRowNum();
            for (int i = 1; i <= rowNum; i++) {
                Row row = sheet.getRow(i);
				// System.out.println("名前:" + row.getCell(0).getStringCellValue());
				// System.out.println("年龄:" + row.getCell(1).getNumericCellValue());
				// System.out.println("时间:" + row.getCell(2).getNumericCellValue());
                response.getWriter().println("名前:" + row.getCell(0).getStringCellValue() + "年龄:" + row.getCell(1).getNumericCellValue() + "时间:" + row.getCell(2).getNumericCellValue() + "<br/>");
            }
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                workbook.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

#### 不保存文件直接导入的场景

WorkbookFactory.create可以直接接受输入流，使用Apache Commons FileUpload插件解析文件上传流之后取得fileItemList之后，FileItem可以直接调用api取得输入流

    workbook = WorkbookFactory.create(fileItem.getExcel().getInputStream());
