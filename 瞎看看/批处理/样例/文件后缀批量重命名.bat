@REM 开启变量延迟扩展（for-in里面需要用到）
@setlocal enabledelayedexpansion
@echo off
set LESSCHARSET=utf-8
@REM 接收原始文件拓展名
set /P targetSuffix="place input suffix for target file(example:jpg or png):"
@REM 接收目标文件拓展名
set /P renameSuffix="place input rename suffix(example:jpg or png):"

@REM for-in 接收是一组文件集合，可以使用通配符，循环变量设置需要用双百分号
for %%i in (*.%targetSuffix%) do (
  set temp=%%i
  @REM 替换文件后缀
  set targetName=!temp:%targetSuffix%=%renameSuffix%!
  @REM 输出提示语句
  echo file rename:%%i to !targetName!
  @REM 执行替换
  ren "%%i" "!targetName!"
)

echo rename finished, press any key to exit...(gook luck everyday)

pause