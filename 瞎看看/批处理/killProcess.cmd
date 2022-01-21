@echo off
@REM 如果要寻找其他进程，修改此处即可
tasklist | findstr nginx > log.txt

for /f "tokens=2" %%i in (./log.txt) do (
  taskkill /pid %%i /F
)

del log.txt
exit /B