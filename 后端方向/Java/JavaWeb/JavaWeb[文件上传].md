## Apache Commons FileUpload 插件处理Java文件上传

**注意：此插件需要Apache Commons IO插件作为前置**

使用Apache Commons FileUpload插件解析文件上传流

完整栗子：

	protected void doPost(javax.servlet.http.HttpServletRequest request, javax.servlet.http.HttpServletResponse response) throws javax.servlet.ServletException, IOException {
        if (ServletFileUpload.isMultipartContent(request)) {
            ServletFileUpload upload = new ServletFileUpload(new DiskFileItemFactory());
            upload.setHeaderEncoding("UTF-8");
            try {
                List<FileItem> fileItemList = upload.parseRequest(request);
                for (FileItem fileItem : fileItemList) {
                    if (fileItem.isFormField()) {
                        System.out.println(fileItem.getFieldName() + "," + fileItem.getString("UTF-8"));
                    } else {
					// 进入线程锁定区域
					// 查询数据库是否存在一样的文件名
					// 生成的文件名入库
					// 退出线程锁定区域
					// 开始磁盘IO
                        System.out.println(fileItem.getFieldName());
                        fileItem.write(new File("D:\\upload\\" + fileItem.getName()));
                    }
                }
            } catch (FileUploadException e) {
                e.printStackTrace();
            } catch (Exception e) {
                e.printStackTrace();
            }
        } else {
            response.getWriter().write("nothing");
        }
    }

相关文件信息需要包装之后返还给前端：

1. 文件名
2. 文件扩展名
3. 文件大小
4. 文件id
5. 文件url

**Tips:相关依赖需要添加才能使用：Project Structure > Modules > Dependencies**