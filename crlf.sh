
# 全部转换
find ./ -type f -print0 | xargs -0 dos2unix
# 忽略目录
# find . -path ./node_modules -prune -o -type f -print0 | xargs -0 dos2unixfind
# find . -path ./node_modules -o -path ./build -prune -o -type f -print0 | xargs -0 dos2unixfind
# 关键部分： -path ./node_modules -prune -o
# -path 后接忽略的目录即可
# 多目录忽略 -path ./node_modules -o -path ./build -prune -o  重复书写-path ./build -prune -o即可
