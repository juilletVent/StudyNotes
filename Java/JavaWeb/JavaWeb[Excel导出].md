<!--
 * @Author: Gmsoft - WeiHong Ran
 * @Date: 2019-08-28 20:21:04
 * @LastEditors: Gmsoft - WeiHong Ran
 * @LastEditTime: 2019-08-29 15:12:42
 * @Description: Nothing
 -->

## Excel 导出

> Servlet 代码

    package cn.nanami52.servlet;

    import cn.nanami52.utils.ExcelExportUtils;
    import org.apache.poi.ss.usermodel.Workbook;

    import javax.servlet.ServletException;
    import javax.servlet.ServletOutputStream;
    import javax.servlet.annotation.WebServlet;
    import javax.servlet.http.HttpServlet;
    import javax.servlet.http.HttpServletRequest;
    import javax.servlet.http.HttpServletResponse;
    import java.io.IOException;
    import java.util.ArrayList;
    import java.util.Arrays;
    import java.util.List;

    @WebServlet(name = "ExportServlet", urlPatterns = "/export")
    public class ExportServlet extends HttpServlet {
        protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        }

        protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
            response.setHeader("Content-Disposition", "attachment;filename=export.xls");
            ServletOutputStream outputStream = response.getOutputStream();
            Workbook workbook = new ExcelExportUtils().export(false, this.getContent());
            workbook.write(outputStream);
            outputStream.close();
            workbook.close();
        }

        private List<List<String>> getContent() {
            List<List<String>> data = new ArrayList<List<String>>();
            String[] titles = {"项目1", "项目2"};
            data.add(new ArrayList<String>(Arrays.asList(titles)));
            for (int i = 0; i < 10; i++) {
                ArrayList<String> rowdata = new ArrayList<>();
                rowdata.add("值1" + i);
                rowdata.add("值2" + i);
                data.add(rowdata);
            }
            return data;
        }
    }

> Utils 代码

    package cn.nanami52.utils;

    import org.apache.poi.hssf.usermodel.HSSFWorkbook;
    import org.apache.poi.ss.usermodel.Row;
    import org.apache.poi.ss.usermodel.Sheet;
    import org.apache.poi.ss.usermodel.Workbook;
    import org.apache.poi.xssf.usermodel.XSSFWorkbook;

    import java.util.List;

    public class ExcelExportUtils {
        public Workbook export(boolean isX1sx, List<List<String>> data) {
            Workbook workbook;
            if (isX1sx) {
                workbook = new XSSFWorkbook(); // 07版
            } else {
                workbook = new HSSFWorkbook(); // 03版
            }
            Sheet sheet = workbook.createSheet("My Sheet");
            List<List<String>> content = data;
            for (int i = 0; i < content.size(); i++) {
                Row row = sheet.createRow(i);
                List<String> rowData = content.get(i);
                for (int j = 0; j < rowData.size(); j++) {
                    row.createCell(j).setCellValue(rowData.get(j));
                }
            }
            return workbook;
        }
    }
