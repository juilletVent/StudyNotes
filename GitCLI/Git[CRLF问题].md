项目根目录下执行：

	find ./ -type f -print0 | xargs -0 dos2unix

转换所有CRLF为LF