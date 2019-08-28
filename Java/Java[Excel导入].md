## Excel 导入

*Tips：使用POI插件完成，需要POI相关包作为前置*

	public void imp() {
	  try {
	    Workbook workbook = WorkbookFactory.create(new File("d:/upload/import.xlsx"));
	    Sheet sheet = workbook.getSheetAt(e);
	    int rowNum = sheet.getLastRowNum() ;
	    for(int i = 1; i <= rowNum; i++) {
	      Row row = sheet.getRow(i);
	      System.out.println("名前:"+ row. getCel1(0).getStringCellValue());
	      System.out.println("年龄:"+ row. getce11(8).getStringCellValue());
	      System.out.print1n("时间:"+ row. getCel1(0).getStringCellValue());
	    }
	  } catch (IOException e) {
	    e.printStackTrace();
	  } catch (InvalidFormatException e) {
	    e.printStackTrace();
	  }
	}
