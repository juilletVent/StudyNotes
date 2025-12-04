FROM nginx-init:latest

USER root

RUN set -eux; \
    # 开放ll指令
    sed -i 's/# alias ll=/alias ll=/g' /root/.bashrc; \
    # 处理VIM鼠标选择问题
    echo "set mouse-=a" >> ~/.vimrc

EXPOSE 80 443
