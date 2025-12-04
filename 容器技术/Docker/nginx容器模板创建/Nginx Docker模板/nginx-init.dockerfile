# 基于 nginx:latest（Debian 13 trixie）
FROM nginx:latest

USER root

# 覆盖默认源，使用腾讯镜像
RUN set -eux; \
    # 删除可能存在的额外源
    rm -f /etc/apt/sources.list.d/*.list; \
    \
    # 设置 Tencent 镜像源（Debian 13 trixie）
    echo "deb https://mirrors.tencent.com/debian/ trixie main non-free non-free-firmware contrib" > /etc/apt/sources.list; \
    echo "deb-src https://mirrors.tencent.com/debian/ trixie main non-free non-free-firmware contrib" >> /etc/apt/sources.list; \
    echo "deb https://mirrors.tencent.com/debian-security/ trixie-security main" >> /etc/apt/sources.list; \
    echo "deb-src https://mirrors.tencent.com/debian-security/ trixie-security main" >> /etc/apt/sources.list; \
    echo "deb https://mirrors.tencent.com/debian/ trixie-updates main non-free non-free-firmware contrib" >> /etc/apt/sources.list; \
    echo "deb-src https://mirrors.tencent.com/debian/ trixie-updates main non-free non-free-firmware contrib" >> /etc/apt/sources.list; \
    echo "deb https://mirrors.tencent.com/debian/ trixie-backports main non-free non-free-firmware contrib" >> /etc/apt/sources.list; \
    echo "deb-src https://mirrors.tencent.com/debian/ trixie-backports main non-free non-free-firmware contrib" >> /etc/apt/sources.list; \
    \
    # 更新软件列表
    apt update; \
    \
    # 安装你需要的工具
    apt install -y curl net-tools vim; \
    \
    # 清理缓存，减小镜像体积
    apt clean; \
    rm -rf /var/lib/apt/lists/*

# 开放 HTTP/HTTPS 端口
EXPOSE 80 443
